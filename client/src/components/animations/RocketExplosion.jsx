import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const RocketExplosion = ({ onComplete }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.className = 'absolute text-6xl';
    rocket.style.left = '50%';
    rocket.style.bottom = '0';
    rocket.style.transform = 'translateX(-50%)';
    container.appendChild(rocket);

    const tl = gsap.timeline({
      onComplete: () => {
        createExplosion();
        if (onComplete) onComplete();
      }
    });

    tl.to(rocket, { y: -window.innerHeight * 0.6, duration: 2, ease: 'power2.in' });

    const createExplosion = () => {
      rocket.remove();
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-3 h-3 rounded-full';
        particle.style.left = '50%';
        particle.style.top = '40%';
        particle.style.background = `hsl(${Math.random() * 60}, 100%, ${50 + Math.random() * 50}%)`;
        container.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 100 + Math.random() * 200;
        gsap.to(particle, {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          opacity: 0,
          scale: 0,
          duration: 1.5,
          ease: 'power2.out',
          onComplete: () => particle.remove()
        });
      }
    };
  }, [onComplete]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default RocketExplosion;