import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingHearts = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'absolute text-4xl opacity-0 pointer-events-none';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.bottom = '-50px';
      containerRef.current.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        opacity: 1,
        duration: gsap.utils.random(6, 10),
        ease: 'none',
        onComplete: () => heart.remove()
      });

      gsap.to(heart, {
        x: `+=${gsap.utils.random(-50, 50)}`,
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(2, 4),
        ease: 'sine.inOut'
      });
    };

    const interval = setInterval(createHeart, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
};

export default FloatingHearts;