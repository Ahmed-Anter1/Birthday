// client/src/components/sections/PhotoGallery.js
import React, { useState, useEffect } from 'react';
import { getMedia } from '../../services/api';
import { X, ZoomIn } from 'lucide-react';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await getMedia('image');
      console.log('Images loaded:', response.data);
      setImages(response.data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ 
        background: '#1a1a1a',
        position: 'relative'
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
            📸 Captured Moments
          </h2>
          <p className="text-xl text-gray-300">
            Precious memories frozen in time
          </p>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="loading mx-auto mb-4"></div>
            <p className="text-gray-400">Loading photos...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 mb-4">📷 No photos yet...</p>
            <p className="text-gray-500">Upload some memories to get started!</p>
          </div>
        )}

        {/* Gallery Grid - بحجم مناسب */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image._id}
                className="gallery-item relative overflow-hidden rounded-xl cursor-pointer group"
                style={{
                  aspectRatio: '1',
                  height: 'auto',
                  maxHeight: '300px',
                  background: '#2a2a2a',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedImage(image)}
              >
                {/* الصورة */}
                <img
                  src={image.path}
                  alt={image.originalName || 'Photo'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    console.error('Image load error:', image.path);
                    e.target.style.display = 'none';
                  }}
                />
                
                {/* Overlay على Hover */}
                <div 
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                  style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    opacity: 0
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                >
                  <div className="text-center text-white">
                    <ZoomIn className="w-12 h-12 mb-2 mx-auto" />
                    <p className="text-sm font-medium">Click to view</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal للصورة الكبيرة */}
      {selectedImage && (
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
            padding: '20px'
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }}>
            {/* زر الإغلاق */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                background: '#dc2626',
                borderRadius: '50%',
                padding: '12px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X style={{ width: '24px', height: '24px', color: 'white' }} />
            </button>
            
            {/* الصورة الكبيرة */}
            <img
              src={selectedImage.path}
              alt={selectedImage.originalName}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '12px',
                display: 'block'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* اسم الصورة */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>
                {selectedImage.originalName}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;