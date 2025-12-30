// client/src/components/sections/MemoryTimeline.js
import React, { useState, useEffect } from 'react';
import { X, Heart, Smile, Sparkles } from 'lucide-react';
import { getMemories } from '../../services/api';

const MemoryTimeline = () => {
  const [memories, setMemories] = useState([]);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch memories from API
  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await getMemories();
      setMemories(response.data);
    } catch (error) {
      console.error('Failed to fetch memories:', error);
    } finally {
      setLoading(false);
    }
  };

  // Typing Animation Effect
  useEffect(() => {
    if (selectedMemory && selectedMemory.reactionText) {
      setIsTyping(true);
      setDisplayedText('');
      
      let index = 0;
      const text = selectedMemory.reactionText;
      
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(prev => prev + text.charAt(index));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }
  }, [selectedMemory]);

  const getToneIcon = (tone) => {
    const icons = {
      funny: <Smile />,
      emotional: <Heart />,
      nostalgic: <Sparkles />
    };
    return icons[tone] || <Sparkles />;
  };

  const getToneStyles = (tone) => {
    const styles = {
      funny: {
        bg: 'linear-gradient(135deg, #feca57 0%, #ff9ff3 100%)',
        color: '#2d3436'
      },
      emotional: {
        bg: 'linear-gradient(135deg, #ee5a6f 0%, #f368e0 100%)',
        color: '#ffffff'
      },
      nostalgic: {
        bg: 'linear-gradient(135deg, #48dbfb 0%, #0abde3 100%)',
        color: '#ffffff'
      }
    };
    return styles[tone] || styles.nostalgic;
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: '#1a1a1a' }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16" style={{ animation: 'fadeInUp 1s ease-out' }}>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            🕰️ Memory Timeline
          </h2>
          <p className="text-xl text-gray-300">
            A journey through our precious moments... Click to hear what I think! 💭
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="loading mx-auto mb-4"></div>
            <p className="text-gray-400">Loading memories...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && memories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">🕰️ No memories yet...</p>
            <p className="text-gray-500">Add some memories from Admin Panel!</p>
          </div>
        )}

        {/* Timeline */}
        {!loading && memories.length > 0 && (
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-600 via-pink-500 to-purple-600"
              style={{ top: 0, bottom: 0 }}
            />

            {/* Memory Items */}
            <div className="space-y-20">
              {memories.map((memory, index) => {
                const isLeft = index % 2 === 0;
                
                return (
                  <div 
                    key={memory._id}
                    className="relative"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
                    }}
                  >
                    <div className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                      {/* Memory Card */}
                      <div 
                        className="w-5/12 cursor-pointer group"
                        onClick={() => setSelectedMemory(memory)}
                      >
                        <div 
                          className="glass-effect p-6 rounded-2xl hover:scale-105 transition-all duration-300"
                          style={{
                            border: '2px solid rgba(220, 38, 38, 0.3)',
                            boxShadow: '0 8px 32px rgba(220, 38, 38, 0.2)'
                          }}
                        >
                          {/* Image */}
                          <div className="relative overflow-hidden rounded-xl mb-4">
                            <img
                              src={memory.image.startsWith('http') ? memory.image : `http://localhost:5000${memory.image}`}
                              alt={memory.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23333" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 text-white font-bold text-2xl">
                              {memory.year}
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-bold mb-2 text-white">
                            {memory.title}
                          </h3>
                          
                          {/* Click Hint */}
                          <p className="text-sm text-gray-400 flex items-center gap-2">
                            {getToneIcon(memory.tone)}
                            Click to hear my thoughts...
                          </p>
                        </div>
                      </div>

                      {/* Timeline Dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2">
                        <div 
                          className="w-6 h-6 rounded-full bg-red-500 border-4 border-white shadow-lg"
                          style={{
                            boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
                          }}
                        />
                      </div>

                      {/* Empty Space */}
                      <div className="w-5/12" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal - Reaction Text */}
      {selectedMemory && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setSelectedMemory(null)}
        >
          <div 
            style={{
              maxWidth: '800px',
              width: '100%',
              animation: 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#dc2626',
                borderRadius: '50%',
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000
              }}
            >
              <X style={{ width: '24px', height: '24px', color: 'white' }} />
            </button>

            {/* Content */}
            <div className="glass-effect rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={selectedMemory.image.startsWith('http') ? selectedMemory.image : `http://localhost:5000${selectedMemory.image}`}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    {selectedMemory.year}
                  </div>
                  <div className="text-2xl text-white">
                    {selectedMemory.title}
                  </div>
                </div>
              </div>

              {/* Reaction Text */}
              <div 
                style={{
                  padding: '2rem',
                  background: getToneStyles(selectedMemory.tone).bg
                }}
              >
                <div 
                  style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.8',
                    color: getToneStyles(selectedMemory.tone).color,
                    minHeight: '100px',
                    fontWeight: '500'
                  }}
                >
                  {displayedText}
                  {isTyping && (
                    <span 
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '24px',
                        background: getToneStyles(selectedMemory.tone).color,
                        marginLeft: '4px',
                        animation: 'blink 1s infinite'
                      }}
                    />
                  )}
                </div>

                {/* Tone Badge */}
                {!isTyping && (
                  <div 
                    style={{
                      marginTop: '1.5rem',
                      paddingTop: '1.5rem',
                      borderTop: `2px solid ${getToneStyles(selectedMemory.tone).color}33`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: getToneStyles(selectedMemory.tone).color,
                      opacity: 0.8
                    }}
                  >
                    {getToneIcon(selectedMemory.tone)}
                    <span className="text-sm font-medium capitalize">
                      {selectedMemory.tone} Memory
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default MemoryTimeline;