// client/src/components/admin/AdminPanel.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, Upload, MessageSquare, LogOut, Clock, Sparkles } from 'lucide-react';
import MediaUpload from './MediaUpload';
import MessageManager from './MessageManager';
import CredentialsManager from './CredentialsManager';
import MemoryManager from './MemoryManager';
import FutureMessagesManager from './FutureMessagesManager';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [showPanel, setShowPanel] = useState(false);
  const { isAdmin, logout } = useAuth();

  if (!isAdmin) return null;

  return (
    <>
      {/* Floating Admin Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-8 right-8 z-50 p-4 bg-burgundy-700 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
          boxShadow: '0 4px 20px rgba(127, 29, 29, 0.5)'
        }}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Admin Panel */}
      {showPanel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-effect w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-burgundy-600 bg-clip-text text-transparent">
                Lo2a
              </h2>
              <button
                onClick={() => setShowPanel(false)}
                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-white/20 pb-4">
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'upload' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload Media
              </button>
              
              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'messages' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Messages
              </button>

              <button
                onClick={() => setActiveTab('memories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'memories' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Clock className="w-4 h-4" />
                🕰️ Memories
              </button>

              <button
                onClick={() => setActiveTab('future-messages')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'future-messages' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                ✨ Future Messages
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-red-600' : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors ml-auto"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Content */}
            <div>
              {activeTab === 'upload' && <MediaUpload />}
              {activeTab === 'messages' && <MessageManager />}
              {activeTab === 'memories' && <MemoryManager />}
              {activeTab === 'future-messages' && <FutureMessagesManager />}
              {activeTab === 'settings' && <CredentialsManager />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;