// client/src/components/admin/FutureMessagesManager.js
import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Save, X, Lock, Unlock, Calendar } from 'lucide-react';
import { getFutureMessages, createFutureMessage, updateFutureMessage, deleteFutureMessage } from '../../services/api';

const FutureMessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    unlockDate: '',
    message: '',
    icon: 'heart',
    color: 'from-red-500 to-pink-500'
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await getFutureMessages();
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      if (editingId) {
        await updateFutureMessage(editingId, formData);
        setStatusMessage('✅ Future message updated!');
        setEditingId(null);
      } else {
        await createFutureMessage(formData);
        setStatusMessage('✅ Future message created!');
        setIsAdding(false);
      }
      
      resetForm();
      fetchMessages();
    } catch (error) {
      setStatusMessage('❌ Operation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (message) => {
    setFormData({
      title: message.title,
      unlockDate: new Date(message.unlockDate).toISOString().split('T')[0],
      message: message.message,
      icon: message.icon,
      color: message.color
    });
    setEditingId(message._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this future message?')) return;
    
    try {
      await deleteFutureMessage(id);
      setStatusMessage('✅ Message deleted!');
      fetchMessages();
    } catch (error) {
      setStatusMessage('❌ Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      unlockDate: '',
      message: '',
      icon: 'heart',
      color: 'from-red-500 to-pink-500'
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const isUnlocked = (unlockDate) => {
    return new Date() >= new Date(unlockDate);
  };

  const colorPresets = [
    { value: 'from-red-500 to-pink-500', label: '❤️ Red to Pink' },
    { value: 'from-purple-500 to-pink-500', label: '💜 Purple to Pink' },
    { value: 'from-blue-500 to-purple-500', label: '💙 Blue to Purple' },
    { value: 'from-yellow-500 to-orange-500', label: '🧡 Yellow to Orange' },
    { value: 'from-green-500 to-teal-500', label: '💚 Green to Teal' },
    { value: 'from-pink-500 to-rose-500', label: '💗 Pink to Rose' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">✨ Future Messages</h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Message
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-white">
              {editingId ? 'Edit Future Message' : 'Add New Future Message'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., New Year Surprise 🎊"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Unlock Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Unlock Date</label>
              <input
                type="date"
                value={formData.unlockDate}
                onChange={(e) => setFormData({ ...formData, unlockDate: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                required
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="heart">❤️ Heart</option>
                <option value="gift">🎁 Gift</option>
                <option value="star">⭐ Star</option>
                <option value="calendar">📅 Calendar</option>
              </select>
            </div>
          </div>

          {/* Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Color Theme</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            >
              {colorPresets.map(preset => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message Content */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message Content</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Write your heartfelt message that will be revealed on the unlock date..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg min-h-[150px] text-white"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Character count: {formData.message.length}
            </p>
          </div>

          {/* Preview */}
          <div className="mb-4 p-4 rounded-xl" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}>
            <p className="text-white font-medium mb-2">Preview:</p>
            <p className="text-white/90 text-sm">{formData.message || 'Your message will appear here...'}</p>
          </div>

          {statusMessage && (
            <div className={`mb-4 p-3 rounded-lg ${
              statusMessage.includes('✅') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
            }`}>
              {statusMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : editingId ? 'Update Message' : 'Create Message'}
          </button>
        </form>
      )}

      {/* Messages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {messages.length === 0 ? (
          <div className="col-span-2 text-center py-10 text-gray-400">
            <p>No future messages yet. Create your first one! ✨</p>
          </div>
        ) : (
          messages.map((msg) => {
            const unlocked = isUnlocked(msg.unlockDate);
            
            return (
              <div
                key={msg._id}
                className="glass-effect p-4 rounded-xl"
                style={{
                  border: unlocked ? '2px solid rgba(168, 85, 247, 0.3)' : '2px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {unlocked ? (
                      <Unlock className="w-5 h-5 text-green-400" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                    <h4 className="font-bold text-white">{msg.title}</h4>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    unlocked ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <Calendar className="w-4 h-4" />
                  {new Date(msg.unlockDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>

                {/* Message Preview */}
                <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                  {msg.message}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(msg)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FutureMessagesManager;