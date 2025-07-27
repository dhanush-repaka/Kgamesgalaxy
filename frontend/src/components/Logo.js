import React from 'react';

const Logo = ({ className = "", textClassName = "text-2xl" }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Symbol */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-gaming-accent via-gaming-accent-hover to-gaming-accent rounded-xl flex items-center justify-center relative overflow-hidden shadow-gaming-glow">
          {/* Geometric Pattern Background */}
          <div className="absolute inset-0">
            <div className="absolute top-2 left-2 w-2 h-2 bg-gaming-dark/30 rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gaming-dark/30 rounded-full"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-gaming-dark/30 rounded-full"></div>
            <div className="absolute inset-2 border border-gaming-dark/20 rounded-lg"></div>
          </div>
          
          {/* Main KGG Text */}
          <div className="relative z-10">
            <span className="font-bold text-gaming-dark text-sm tracking-wider">KGG</span>
          </div>
        </div>
        
        {/* Animated Glow Ring */}
        <div className="absolute inset-0 rounded-xl border-2 border-gaming-accent/30 animate-pulse"></div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold text-gaming-accent ${textClassName} tracking-tight`}>
          Karthikeya
        </span>
        <span className="text-gaming-text-secondary text-xs font-medium -mt-1 tracking-widest uppercase">
          GAMES GALAXY
        </span>
      </div>
    </div>
  );
};

export default Logo;