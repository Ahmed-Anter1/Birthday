// client/src/components/admin/MemoryManager.js
import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';
import { getMemories, createMemory, updateMemory, deleteMemory } from '../../services/api';

const MemoryManager = () => {
  const [memories, setMemories] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: '',
    image: '',
    reactionText: '',
    tone: 'nostalgic'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMemories();
  }, []);

  const fetchMemories = async () => {
    try {
      const response = await getMemories();
      setMemories(response.data);
    } catch (error) {
      console.error('Failed to fetch memories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

   try {
    if (editingId) {
      // ❌ سيبه زي ما هو
      await updateMemory(editingId, formData);
      setMessage('✅ Memory updated successfully!');
      setEditingId(null);
    } else {
      // ✅ CREATE فقط
      const data = new FormData();
      data.append('year', formData.year);
      data.append('title', formData.title);
      data.append('reactionText', formData.reactionText);
      data.append('tone', formData.tone);
      data.append('image', selectedFile); // 👈 ملف الصورة

      await createMemory(data);

      setMessage('✅ Memory created successfully!');
      setIsAdding(false);
    }

    resetForm();
    fetchMemories();
  } catch (error) {
    setMessage('❌ Operation failed');
  } finally {
    setLoading(false);
  }
};

  const handleEdit = (memory) => {
    setFormData({
      year: memory.year,
      title: memory.title,
      image: memory.image,
      reactionText: memory.reactionText,
      tone: memory.tone
    });
    setEditingId(memory._id);
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this memory?')) return;
    
    try {
      await deleteMemory(id);
      setMessage('✅ Memory deleted successfully!');
      fetchMemories();
    } catch (error) {
      setMessage('❌ Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear(),
      title: '',
      image: '',
      reactionText: '',
      tone: 'nostalgic'
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">🕰️ Memory Timeline</h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Memory
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="glass-effect p-6 rounded-xl mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold text-white">
              {editingId ? 'Edit Memory' : 'Add New Memory'}
            </h4>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                required
                min="1900"
                max="2100"
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                <option value="funny">😄 Funny</option>
                <option value="emotional">💝 Emotional</option>
                <option value="nostalgic">✨ Nostalgic</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., First Day We Met"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              required
            />
          </div>

<div className="mb-4">
  <label className="block text-sm font-medium mb-2">Image</label>
  <input
  type="file"
  accept="image/*"
  onChange={(e) => setSelectedFile(e.target.files[0])}
  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
  required
/>
</div>


          {/* Reaction Text */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Reaction Text (What the site says)</label>
            <textarea
              value={formData.reactionText}
              onChange={(e) => setFormData({ ...formData, reactionText: e.target.value })}
              placeholder="Write what the website should say when this memory is opened..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg min-h-[120px] text-white"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Character count: {formData.reactionText.length}
            </p>
          </div>

          {/* Preview */}
          {formData.image && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Preview</label>
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {message && (
            <div className={`mb-4 p-3 rounded-lg ${
              message.includes('✅') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : editingId ? 'Update Memory' : 'Create Memory'}
          </button>
        </form>
      )}

      {/* Memories List */}
      <div className="space-y-4">
        {memories.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No memories yet. Create your first one! 🕰️</p>
          </div>
        ) : (
          memories.map((memory) => (
            <div
              key={memory._id}
              className="glass-effect p-4 rounded-xl flex gap-4"
            >
              {/* Image Thumbnail */}
              <img
                src={memory.image}
                alt={memory.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                }}
              />

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm text-purple-400 font-medium">{memory.year}</span>
                    <h4 className="text-lg font-bold text-white">{memory.title}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    memory.tone === 'funny' ? 'bg-yellow-500/20 text-yellow-300' :
                    memory.tone === 'emotional' ? 'bg-pink-500/20 text-pink-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {memory.tone === 'funny' ? '😄' : memory.tone === 'emotional' ? '💝' : '✨'} {memory.tone}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 line-clamp-2 mb-3">
                  {memory.reactionText}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(memory)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(memory._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MemoryManager;