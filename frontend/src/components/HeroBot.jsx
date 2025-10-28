import React, { useEffect, useRef } from 'react';

// Smooth Mouse Follower with Glow Effect
const HeroBot = () => {
  const cursorRef = useRef(null);
  const cursorOuterRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorOuter = cursorOuterRef.current;
    
    if (!cursor || !cursorOuter) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let outerX = 0;
    let outerY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Smooth follow animation for inner cursor
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      // Even smoother follow for outer cursor
      const dxOuter = mouseX - outerX;
      const dyOuter = mouseY - outerY;
      outerX += dxOuter * 0.08;
      outerY += dyOuter * 0.08;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursorOuter.style.transform = `translate(${outerX}px, ${outerY}px)`;
      
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Outer cursor - large glow */}
      <div
        ref={cursorOuterRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{
          width: '60px',
          height: '60px',
          marginLeft: '-30px',
          marginTop: '-30px',
        }}
      >
        <div className="w-full h-full rounded-full bg-gaming-accent/20 blur-xl animate-pulse" />
      </div>
      
      {/* Inner cursor - small dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: '12px',
          height: '12px',
          marginLeft: '-6px',
          marginTop: '-6px',
        }}
      >
        <div className="w-full h-full rounded-full bg-gaming-accent shadow-gaming-glow border-2 border-white/50" />
      </div>
    </>
  );
};

export default HeroBot;


