import React, { useState } from 'react';
import { updateCredentials } from '../../services/api';
import { Key } from 'lucide-react';

const CredentialsManager = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateCredentials(credentials);
      setMessage('✅ Credentials updated successfully!');
      setCredentials({ username: '', password: '' });
    } catch (error) {
      setMessage('❌ Failed to update credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect p-6 rounded-xl max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Key className="w-6 h-6" />
        <h3 className="text-xl font-bold">Update Credentials</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">New Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
            placeholder="Leave empty to keep current"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg"
            placeholder="Leave empty to keep current"
          />
        </div>

        {message && (
          <div className={`p-3 rounded-lg ${message.includes('✅') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (!credentials.username && !credentials.password)}
          className="w-full py-3 bg-gradient-to-r from-red-600 to-burgundy-700 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Credentials'}
        </button>
      </form>
    </div>
  );
};

export default CredentialsManager;