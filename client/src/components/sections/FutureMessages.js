// client/src/components/sections/FutureMessages.js
import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Calendar, Heart, Gift, Star } from 'lucide-react';
import { getFutureMessages, markMessageAsOpened } from '../../services/api';

const FutureMessages = () => {
  const [currentDate] = useState(new Date());
  const [messages, setMessages] = useState([]);
  const [openedMessage, setOpenedMessage] = useState(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getFutureMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUnlocked = (unlockDate) => {
    return currentDate >= new Date(unlockDate);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntilUnlock = (unlockDate) => {
    const diffTime = new Date(unlockDate) - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getIconComponent = (iconName) => {
    const icons = {
      heart: <Heart className="w-6 h-6" />,
      gift: <Gift className="w-6 h-6" />,
      star: <Star className="w-6 h-6" />,
      calendar: <Calendar className="w-6 h-6" />
    };
    return icons[iconName] || <Heart className="w-6 h-6" />;
  };

  const handleOpenMessage = async (message) => {
    if (isUnlocked(message.unlockDate)) {
      setIsRevealing(true);
      
      // Mark as opened in backend
      try {
        await markMessageAsOpened(message._id);
      } catch (error) {
        console.error('Failed to mark message as opened:', error);
      }
      
      setTimeout(() => {
        setOpenedMessage(message);
        setIsRevealing(false);
      }, 1000);
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ 
        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Stars Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(2px 2px at 20% 30%, white, transparent),
          radial-gradient(2px 2px at 60% 70%, white, transparent),
          radial-gradient(1px 1px at 50% 50%, white, transparent),
          radial-gradient(1px 1px at 80% 10%, white, transparent),
          radial-gradient(2px 2px at 90% 60%, white, transparent)
        `,
        backgroundSize: '200% 200%',
        animation: 'twinkle 20s ease-in-out infinite',
        opacity: 0.4
      }} />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16" style={{ animation: 'fadeInDown 1s ease-out' }}>
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ✨ Messages From the Future
          </h2>
          <p className="text-xl text-gray-300">
            Special moments waiting to be unlocked... 🔮
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="loading mx-auto mb-4"></div>
            <p className="text-gray-400">Loading messages...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && messages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">✨ No future messages yet...</p>
            <p className="text-gray-500">Create some from Admin Panel!</p>
          </div>
        )}

        {/* Messages Grid */}
        {!loading && messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages.map((message, index) => {
              const unlocked = isUnlocked(message.unlockDate);
              const daysLeft = getDaysUntilUnlock(message.unlockDate);

              return (
                <div
                  key={message._id}
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
                  }}
                >
                  <div
                    onClick={() => handleOpenMessage(message)}
                    className={`relative p-6 rounded-2xl transition-all duration-300 ${
                      unlocked ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'
                    }`}
                    style={{
                      background: unlocked 
                        ? 'rgba(168, 85, 247, 0.15)'
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: unlocked 
                        ? '2px solid rgba(168, 85, 247, 0.3)'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: unlocked 
                        ? '0 8px 32px rgba(168, 85, 247, 0.3)'
                        : 'none'
                    }}
                  >
                    {/* Icon */}
                    <div className={`mb-4 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                      {unlocked ? (
                        <div className="flex items-center gap-2">
                          <Unlock className="w-8 h-8" />
                          {getIconComponent(message.icon)}
                        </div>
                      ) : (
                        <Lock className="w-8 h-8" />
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-3 ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                      {message.title}
                    </h3>

                    {/* Date Info */}
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span className={unlocked ? 'text-gray-300' : 'text-gray-500'}>
                        {formatDate(message.unlockDate)}
                      </span>
                    </div>

                    {/* Status */}
                    {unlocked ? (
                      <div 
                        className="text-sm font-medium"
                        style={{
                          background: `linear-gradient(135deg, ${message.color})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        ✨ Click to reveal your message
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        🔒 Unlocks in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                      </div>
                    )}

                    {/* Locked Overlay */}
                    {!unlocked && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Lock className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Revealing Animation Overlay */}
      {isRevealing && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'black',
          zIndex: 9998,
          animation: 'revealFlash 1s ease-out'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold',
            animation: 'pulse 1s ease-in-out infinite'
          }}>
            Unlocking Your Message... ✨
          </div>
        </div>
      )}

      {/* Message Modal */}
      {openedMessage && !isRevealing && (
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
            animation: 'fadeIn 0.5s ease-out'
          }}
          onClick={() => setOpenedMessage(null)}
        >
          <div 
            style={{
              maxWidth: '700px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              animation: 'messageReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="rounded-3xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${openedMessage.color})`,
                padding: '3rem',
                position: 'relative'
              }}
            >
              {/* Decorative Elements */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                filter: 'blur(60px)'
              }} />

              {/* Icon */}
              <div className="text-white mb-6 flex items-center justify-center">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '1rem',
                  borderRadius: '50%'
                }}>
                  {getIconComponent(openedMessage.icon)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-white text-center mb-4">
                {openedMessage.title}
              </h3>

              {/* Date */}
              <div className="text-center text-white/80 text-sm mb-6">
                {formatDate(openedMessage.unlockDate)}
              </div>

              {/* Message */}
              <div 
                className="text-white text-lg leading-relaxed mb-8"
                style={{
                  animation: 'fadeInUp 0.8s ease-out 0.3s both',
                  textAlign: 'center',
                  fontWeight: '400',
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  padding: '1rem'
                }}
              >
                {openedMessage.message}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setOpenedMessage(null)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '1rem',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                Close Message ✨
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        @keyframes messageReveal {
          from {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes revealFlash {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Custom Scrollbar for Message */
        .text-white::-webkit-scrollbar {
          width: 8px;
        }

        .text-white::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .text-white::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .text-white::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default FutureMessages;