import React, { useState, useEffect } from 'react';
import { createMessage, getMessages, deleteMessage } from '../../services/api';
import { Trash2, Star } from 'lucide-react';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    text: '',
    author: '',
    isSurprise: false
  });
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.text.trim()) return;

    setLoading(true);
    try {
      await createMessage(newMessage);
      setNewMessage({ text: '', author: '', isSurprise: false });
      fetchMessages();
    } catch (error) {
      alert('Failed to create message');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      fetchMessages();
    } catch (error) {
      alert('Failed to delete message');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-xl mb-8">
        <h3 className="text-xl font-bold mb-4">Add New Message</h3>
        
        <textarea
          value={newMessage.text}
          onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })}
          placeholder="Birthday message..."
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg mb-4 min-h-[100px]"
          required
        />

        <input
          type="text"
          value={newMessage.author}
          onChange={(e) => setNewMessage({ ...newMessage, author: e.target.value })}
          placeholder="Author name (optional)"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg mb-4"
        />

        <label className="flex items-center gap-2 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={newMessage.isSurprise}
            onChange={(e) => setNewMessage({ ...newMessage, isSurprise: e.target.checked })}
            className="w-4 h-4"
          />
          <Star className="w-4 h-4" />
          <span>Surprise Message (hidden until revealed)</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-burgundy-700 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Message'}
        </button>
      </form>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg._id} className="glass-effect p-4 rounded-xl flex justify-between items-start">
            <div className="flex-1">
              <p className="mb-2">{msg.text}</p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>— {msg.author}</span>
                {msg.isSurprise && (
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3 h-3" /> Surprise
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDelete(msg._id)}
              className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageManager;