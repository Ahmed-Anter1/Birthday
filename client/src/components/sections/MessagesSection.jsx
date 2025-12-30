import React, { useState, useEffect } from 'react';
import { getMessages } from '../../services/api';

const MessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const normalMessages = messages.filter(m => !m.isSurprise);
  const surpriseMessages = messages.filter(m => m.isSurprise);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-red-400 to-burgundy-600 bg-clip-text text-transparent">
            💝 Birthday Wishes
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {normalMessages.map((message) => (
            <div key={message._id} className="glass-effect p-6 rounded-xl shadow-xl">
              <p className="text-lg mb-4 leading-relaxed">{message.text}</p>
              <p className="text-sm text-gray-400 text-right">— {message.author}</p>
            </div>
          ))}
        </div>

        {surpriseMessages.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowSurprise(!showSurprise)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-burgundy-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {showSurprise ? '💝 Hide Surprise' : '💝 Reveal Surprise Message'}
            </button>

            {showSurprise && (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {surpriseMessages.map((message) => (
                  <div key={message._id} className="glass-effect p-8 rounded-xl shadow-2xl border-2 border-red-500">
                    <p className="text-xl mb-4 leading-relaxed">{message.text}</p>
                    <p className="text-sm text-gray-400 text-right">— {message.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default MessagesSection;