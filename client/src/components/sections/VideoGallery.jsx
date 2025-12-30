// client/src/components/sections/VideoGallery.js
import React, { useState, useEffect } from 'react';
import { getMedia } from '../../services/api';
import { X, Play } from 'lucide-react';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getMedia('video');
      console.log('Videos loaded:', response.data);
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: '#1a1a1a' }}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            🎥 Video Memories
          </h2>
          <p className="text-xl text-gray-300">
            Moments that came to life
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="loading mx-auto mb-4"></div>
            <p className="text-gray-400">Loading videos...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && videos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">🎬 No videos yet...</p>
            <p className="text-gray-500">Upload some video memories!</p>
          </div>
        )}

        {/* Video Grid */}
        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video._id}
                className="video-wrapper cursor-pointer"
                onClick={() => setSelectedVideo(video)}
                style={{ aspectRatio: '16/9' }}
              >
                {/* Video Preview */}
                <video
                  src={video.path}
                  className="w-full h-full object-cover rounded-xl"
                  preload="metadata"
                />
                
                {/* Play Overlay */}
                <div className="media-overlay">
                  <div className="text-center text-white">
                    <div className="bg-red-600 rounded-full p-4 mb-2 inline-block">
                      <Play className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">Click to play</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="modal-backdrop"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="modal-content flex items-center justify-center p-4">
            <div className="relative" style={{ maxWidth: '90vw', maxHeight: '90vh' }}>
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVideo(null);
                }}
                className="absolute -top-4 -right-4 bg-red-600 rounded-full p-3 z-50 hover:bg-red-700"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Video Player */}
              <video
                src={selectedVideo.path}
                controls
                autoPlay
                className="rounded-xl"
                style={{
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  width: 'auto',
                  height: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Video Name */}
              <div className="text-center mt-4">
                <p className="text-gray-300 text-sm">{selectedVideo.originalName}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoGallery;