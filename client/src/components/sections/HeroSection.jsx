// client/src/components/sections/HeroSection.js
// نسخة بدون GSAP - تعتمد على CSS فقط

import React from 'react';

const HeroSection = () => {
  const title = "Happy Birthday lolo!";

  return (
    <section 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: '#1a1a1a',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: '4rem',
          opacity: 0.15,
          animation: 'fadeInRotate 1s ease-out'
        }}>🎉</div>
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          fontSize: '3.5rem',
          opacity: 0.15,
          animation: 'fadeInRotate 1.2s ease-out'
        }}>🎈</div>
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '20%',
          fontSize: '4rem',
          opacity: 0.15,
          animation: 'fadeInRotate 1.4s ease-out'
        }}>🎂</div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '12%',
          fontSize: '3.5rem',
          opacity: 0.15,
          animation: 'fadeInRotate 1.6s ease-out'
        }}>✨</div>
      </div>

      <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Title */}
        <h1 
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: '700',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #ff4757 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))',
            animation: 'fadeInUp 1s ease-out, float 3s ease-in-out 1s infinite'
          }}
        >
          {title.split('').map((char, i) => (
            <span 
              key={i}
              style={{ 
                display: 'inline-block',
                animation: `charFadeIn 0.8s ease-out ${i * 0.08}s both`
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#e0e0e0',
            marginBottom: '3rem',
            fontWeight: '300',
            lineHeight: '2',
            animation: 'fadeInUp 1s ease-out 0.5s both'
          }}
        >
          We wish you a sweet life always, a special year, and that you are always happy. 
          <br />
          This is a memory that will last forever. 🎉
        </p>

        {/* Decorative Line */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '1rem',
          marginBottom: '2rem',
          animation: 'fadeIn 1s ease-out 1s both'
        }}>
          <div style={{
            height: '4px',
            width: '80px',
            background: 'linear-gradient(to right, transparent, #dc2626)',
            borderRadius: '10px'
          }}></div>
          <div style={{ 
            fontSize: '2.5rem',
            animation: 'float 3s ease-in-out infinite'
          }}>💝</div>
          <div style={{
            height: '4px',
            width: '80px',
            background: 'linear-gradient(to left, transparent, #dc2626)',
            borderRadius: '10px'
          }}></div>
        </div>

        {/* Scroll Indicator */}
        <div 
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            animation: 'bounce 2s ease-in-out infinite'
          }}
        >
          <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>Scroll Down</div>
          <div style={{ fontSize: '1.5rem' }}>↓</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes charFadeIn {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(-90deg) scale(0.5);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(-180deg) scale(0);
          }
          to {
            opacity: 0.15;
            transform: rotate(0) scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;