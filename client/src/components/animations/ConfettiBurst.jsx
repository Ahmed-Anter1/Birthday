import React, { useRef } from 'react';
import { gsap } from 'gsap';

const ConfettiBurst = () => {
  const containerRef = useRef(null);

  const burst = () => {
    const colors = ['#dc2626', '#7f1d1d', '#fbbf24', '#f59e0b', '#ffffff'];
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-3 h-3';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      containerRef.current.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 200 + Math.random() * 300;
      gsap.to(confetti, {
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 100,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => confetti.remove()
      });
    }
  };

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50">
      <button onClick={burst} className="hidden" id="confetti-trigger" />
    </div>
  );
};

export default ConfettiBurst;