import React, { useEffect, useState } from 'react';
import { Gamepad2, Trophy, Zap, Star } from 'lucide-react';

// Modern Gaming Badge with animated elements
const HeroBot = () => {
  const [activeIcon, setActiveIcon] = useState(0);
  const icons = [Gamepad2, Trophy, Zap, Star];
  const IconComponent = icons[activeIcon];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-40 h-40 lg:w-56 lg:h-56 rounded-3xl mx-auto group">
      {/* Animated Background Rings */}
      <div className="absolute inset-0 rounded-3xl">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gaming-accent/30 via-blue-500/20 to-purple-500/30 animate-pulse" />
        <div className="absolute inset-2 rounded-3xl bg-gaming-card/90 backdrop-blur-xl border border-gaming-accent/40 shadow-2xl" />
      </div>

      {/* Rotating Ring */}
      <div className="absolute inset-0 rounded-3xl animate-spin-slow">
        <div className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-gaming-accent rounded-full shadow-gaming-glow" />
        <div className="absolute bottom-0 left-1/2 w-3 h-3 -translate-x-1/2 translate-y-1/2 bg-blue-500 rounded-full shadow-gaming-glow" />
        <div className="absolute left-0 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-purple-500 rounded-full shadow-gaming-glow" />
        <div className="absolute right-0 top-1/2 w-3 h-3 translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full shadow-gaming-glow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gaming-accent/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-gaming-accent to-blue-500 flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 shadow-gaming-glow">
            <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white animate-bounce-slow" />
          </div>
        </div>

        {/* Text Label */}
        <div className="mt-6 text-center">
          <div className="text-sm lg:text-base font-bold text-gaming-text tracking-wide">
            KGG Gaming
          </div>
          <div className="text-[10px] lg:text-xs text-gaming-text-secondary uppercase tracking-widest mt-1 animate-pulse">
            Level Up Your Game
          </div>
        </div>

        {/* Stat Indicators */}
        <div className="mt-4 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-gaming-accent animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gaming-accent/40 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBot;


