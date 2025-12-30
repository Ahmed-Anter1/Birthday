import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    gsap.from('.modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="modal-content relative max-w-5xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="glass-effect p-4 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;