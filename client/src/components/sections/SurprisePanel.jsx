import React, { useState } from 'react';
import FloatingButton from '../common/FloatingButton';
import RocketExplosion from '../animations/RocketExplosion';
import ConfettiBurst from '../animations/ConfettiBurst';

const SurprisePanel = () => {
  const [showRocket, setShowRocket] = useState(false);

  const handleBalloon = () => {
    document.getElementById('balloon-trigger')?.click();
  };

  const handleRocket = () => {
    setShowRocket(true);
    setTimeout(() => setShowRocket(false), 3000);
  };

  const handleConfetti = () => {
    document.getElementById('confetti-trigger')?.click();
  };

  const handleGradient = () => {
    const colors = [
      'linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)',
      'linear-gradient(135deg, #1a0000 0%, #0a0a0a 100%)',
      'linear-gradient(135deg, #7f1d1d 0%, #0a0a0a 100%)'
    ];
    document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <FloatingButton icon="🎈" label="Balloon Pop" onClick={handleBalloon} />
        <FloatingButton icon="🚀" label="Rocket Launch" onClick={handleRocket} />
        <FloatingButton icon="🎆" label="Confetti Burst" onClick={handleConfetti} />
        <FloatingButton icon="🎨" label="Change Background" onClick={handleGradient} />
      </div>
      {showRocket && <RocketExplosion />}
    </>
  );
};

export default SurprisePanel;