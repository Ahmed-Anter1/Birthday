// client/src/components/animations/AutoAnimationsController.js
// هذا الكومبوننت هيشغل كل الأنيميشن أوتوماتيك

import { useEffect, useRef } from 'react';

const AutoAnimationsController = () => {
  const intervalRefs = useRef([]);

  useEffect(() => {
    console.log('🎉 Auto Animations Started!');

    // ============================================
    // 1. تغيير الخلفية كل 30 ثانية
    // ============================================
    const backgrounds = [
      'linear-gradient(135deg, #1a1a1a 0%, #2d0a0a 100%)',
      'linear-gradient(135deg, #0a1a1a 0%, #1a0a2d 100%)',
      'linear-gradient(135deg, #1a0a0a 0%, #2d1a0a 100%)',
      'linear-gradient(135deg, #0a0a1a 0%, #1a1a2d 100%)'
    ];
    let bgIndex = 0;

    const changeBg = setInterval(() => {
      bgIndex = (bgIndex + 1) % backgrounds.length;
      document.body.style.background = backgrounds[bgIndex];
      console.log('🎨 Background changed!');
    }, 30000); // كل 30 ثانية

    intervalRefs.current.push(changeBg);

    // ============================================
    // 2. البالونات تطلع كل 45 ثانية
    // ============================================
    const balloonInterval = setInterval(() => {
      createBalloons();
      console.log('🎈 Balloons spawned!');
    }, 45000); // كل 45 ثانية

    intervalRefs.current.push(balloonInterval);

    // ============================================
    // 3. الصواريخ تنطلق كل دقيقة
    // ============================================
    const rocketInterval = setInterval(() => {
      launchRocket();
      console.log('🚀 Rocket launched!');
    }, 60000); // كل دقيقة

    intervalRefs.current.push(rocketInterval);

    // ============================================
    // 4. Confetti ينزل كل 40 ثانية
    // ============================================
    const confettiInterval = setInterval(() => {
      burstConfetti();
      console.log('🎆 Confetti burst!');
    }, 40000); // كل 40 ثانية

    intervalRefs.current.push(confettiInterval);

    // ============================================
    // 5. شغل واحد عشوائي كل 20 ثانية
    // ============================================
    const randomInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.33) {
        createBalloons();
        console.log('🎈 Random balloons!');
      } else if (random < 0.66) {
        burstConfetti();
        console.log('🎆 Random confetti!');
      } else {
        createHeartBurst();
        console.log('❤️ Random hearts!');
      }
    }, 20000); // كل 20 ثانية

    intervalRefs.current.push(randomInterval);

    // ============================================
    // شغل أول مرة بعد 3 ثواني من فتح الصفحة
    // ============================================
    setTimeout(() => {
      burstConfetti();
      console.log('🎉 Welcome confetti!');
    }, 3000);

    setTimeout(() => {
      createBalloons();
      console.log('🎈 Welcome balloons!');
    }, 5000);

    // Cleanup عند إغلاق الصفحة
    return () => {
      intervalRefs.current.forEach(interval => clearInterval(interval));
    };
  }, []);

  // ============================================
  // دوال الأنيميشن
  // ============================================

  const createBalloons = () => {
    const container = document.body;
    const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'];
    
    balloons.forEach((balloon, i) => {
      setTimeout(() => {
        const balloonEl = document.createElement('div');
        balloonEl.innerHTML = balloon;
        balloonEl.style.cssText = `
          position: fixed;
          left: ${Math.random() * 90}%;
          top: ${80 + Math.random() * 15}%;
          font-size: 3rem;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          animation: floatUp 8s ease-out forwards;
        `;
        
        container.appendChild(balloonEl);

        // البالون يفرقع لو دست عليه
        balloonEl.addEventListener('click', () => {
          balloonEl.style.transform = 'scale(1.5)';
          balloonEl.style.opacity = '0';
          setTimeout(() => balloonEl.remove(), 300);
        });

        // يتشال بعد 8 ثواني
        setTimeout(() => {
          if (balloonEl.parentNode) balloonEl.remove();
        }, 8000);
      }, i * 300);
    });
  };

  const launchRocket = () => {
    const container = document.body;
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.style.cssText = `
      position: fixed;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      font-size: 4rem;
      z-index: 1000;
      animation: rocketLaunch 2s ease-in forwards;
    `;
    
    container.appendChild(rocket);

    // انفجار بعد ثانيتين
    setTimeout(() => {
      rocket.remove();
      createExplosion();
    }, 2000);
  };

  const createExplosion = () => {
    const container = document.body;
    const colors = ['#ff6b6b', '#ee5a6f', '#ff4757', '#feca57', '#48dbfb'];
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        left: 50%;
        top: 40%;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        z-index: 1000;
        pointer-events: none;
      `;
      
      container.appendChild(particle);

      const angle = (Math.PI * 2 * i) / 50;
      const velocity = 100 + Math.random() * 200;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      particle.style.animation = `explode 1.5s ease-out forwards`;
      particle.style.setProperty('--x', `${x}px`);
      particle.style.setProperty('--y', `${y}px`);

      setTimeout(() => particle.remove(), 1500);
    }
  };

  const burstConfetti = () => {
    const container = document.body;
    const colors = ['#dc2626', '#7f1d1d', '#fbbf24', '#f59e0b', '#ffffff'];
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        left: 50%;
        top: 0;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        z-index: 1000;
        pointer-events: none;
        animation: confettiFall 3s ease-out forwards;
      `;
      
      confetti.style.setProperty('--x', `${(Math.random() - 0.5) * 1000}px`);
      confetti.style.setProperty('--rotation', `${Math.random() * 720}deg`);
      confetti.style.animationDelay = `${Math.random() * 0.3}s`;
      
      container.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }
  };

  const createHeartBurst = () => {
    const container = document.body;
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        top: 50%;
        font-size: 2rem;
        z-index: 1000;
        pointer-events: none;
        animation: heartFloat 3s ease-out forwards;
      `;
      heart.style.animationDelay = `${i * 0.1}s`;
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }
  };

  return null; // هذا كومبوننت بدون UI
};

export default AutoAnimationsController;

// ============================================
// CSS Animations (ضيف في index.css)
// ============================================
/*
@keyframes floatUp {
  from {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translateY(-100vh) rotate(15deg);
    opacity: 0;
  }
}

@keyframes rocketLaunch {
  from {
    bottom: 0;
    transform: translateX(-50%) rotate(0deg);
  }
  to {
    bottom: 60vh;
    transform: translateX(-50%) rotate(15deg);
  }
}

@keyframes explode {
  from {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
}

@keyframes confettiFall {
  from {
    transform: translate(0, 0) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translate(var(--x), 100vh) rotate(var(--rotation));
    opacity: 0;
  }
}

@keyframes heartFloat {
  from {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    transform: translateY(-200px) scale(1.5);
    opacity: 0;
  }
}
*/