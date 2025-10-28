import React, { useEffect, useRef, useState } from 'react';

// 3D Dice Following Mouse with Rolling Animation
const HeroBot = () => {
  const diceRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const dice = diceRef.current;
    if (!dice) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let diceX = mouseX;
    let diceY = mouseY;
    let rotateX = 0;
    let rotateY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateDice = () => {
      // Smooth follow animation
      const dx = mouseX - diceX;
      const dy = mouseY - diceY;
      diceX += dx * 0.1;
      diceY += dy * 0.1;
      
      // Rotate based on movement if not loading
      if (!isLoading) {
        rotateX += dy * 0.05;
        rotateY += dx * 0.05;
      } else {
        // Continuous rolling when loading
        rotateX += 2;
        rotateY += 2;
      }
      
      dice.style.transform = `translate(${diceX}px, ${diceY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      requestAnimationFrame(animateDice);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateDice();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(loadingTimer);
    };
  }, [isLoading]);

  return (
    <div
      ref={diceRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        width: '50px',
        height: '50px',
        marginLeft: '-25px',
        marginTop: '-25px',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Dice */}
      <div 
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transition: isLoading ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Dice Container */}
        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {/* Front face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-3 gap-1 p-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              ))}
            </div>
          </div>
          
          {/* Back face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'translateZ(-25px) rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="w-2 h-2 bg-gaming-accent rounded-full" />
          </div>
          
          {/* Right face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'rotateY(90deg) translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-2 gap-2 p-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              ))}
            </div>
          </div>
          
          {/* Left face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'rotateY(-90deg) translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-1 gap-3 p-2">
              <div className="w-2 h-2 bg-gaming-accent rounded-full mx-auto" />
              <div className="w-2 h-2 bg-gaming-accent rounded-full mx-auto" />
            </div>
          </div>
          
          {/* Top face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'rotateX(90deg) translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-3 gap-1 p-2">
              <div className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              <div className="w-1.5 h-1.5" />
              <div className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              <div className="w-1.5 h-1.5" />
              <div className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              <div className="w-1.5 h-1.5" />
              <div className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
              <div className="w-1.5 h-1.5" />
              <div className="w-1.5 h-1.5 bg-gaming-accent rounded-full" />
            </div>
          </div>
          
          {/* Bottom face */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-white to-gray-100 border-2 border-gaming-accent rounded-lg shadow-gaming-glow flex items-center justify-center"
            style={{
              transform: 'rotateX(-90deg) translateZ(25px)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="grid grid-cols-2 gap-1 p-2">
              <div className="w-2 h-2 bg-gaming-accent rounded-full" />
              <div className="w-2 h-2 bg-gaming-accent rounded-full" />
              <div className="w-2 h-2 bg-gaming-accent rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Glow effect */}
        <div 
          className="absolute inset-0 bg-gaming-accent/20 rounded-lg blur-xl animate-pulse"
          style={{ transform: 'translateZ(-10px)' }}
        />
      </div>
    </div>
  );
};

export default HeroBot;


