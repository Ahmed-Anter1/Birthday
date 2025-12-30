import React, { useState } from 'react';
import { uploadMedia, getMedia, deleteMedia } from '../../services/api';
import { Upload, Trash2 } from 'lucide-react';

const MediaUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    setMessage('');

    try {
      await uploadMedia(formData);
      setMessage('✅ Uploaded successfully!');
      setFile(null);
      e.target.reset();
      fetchMedia();
    } catch (error) {
      setMessage('❌ Upload failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await getMedia();
      setMedia(response.data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media?')) return;
    try {
      await deleteMedia(id);
      setMessage('✅ Deleted successfully!');
      fetchMedia();
    } catch (error) {
      setMessage('❌ Delete failed');
    }
  };

  React.useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <div>
      <form onSubmit={handleUpload} className="mb-8">
        <div className="border-2 border-dashed border-white/30 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-4"
          />
          {file && (
            <p className="text-sm text-gray-400 mb-4">
              Selected: {file.name}
            </p>
          )}
          <button
            type="submit"
            disabled={!file || loading}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-burgundy-700 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center">{message}</p>
        )}
      </form>

      <div className="grid grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item._id} className="relative group">
            {item.type === 'image' ? (
              <img
                src={item.path}
                alt={item.originalName}
                className="w-full h-32 object-cover rounded-lg"
              />
            ) : (
              <video
                src={item.path}
                className="w-full h-32 object-cover rounded-lg"
              />
            )}
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-2 p-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaUpload;