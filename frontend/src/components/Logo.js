import React from 'react';

const Logo = ({ className = "w-10 h-10", textClassName = "text-2xl" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Symbol */}
      <div className="relative">
        <div className="w-10 h-10 bg-accent-primary rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-primary via-accent-hover to-accent-pressed opacity-80"></div>
          
          {/* Gaming Controller Pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-bg-primary rounded-full absolute top-2 left-2"></div>
            <div className="w-2 h-2 bg-bg-primary rounded-full absolute top-2 right-2"></div>
            <div className="w-1 h-3 bg-bg-primary rounded absolute bottom-2 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          {/* Main KGG Text */}
          <div className="relative z-10">
            <span className="font-bold text-bg-primary text-sm tracking-tight">KGG</span>
          </div>
        </div>
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-accent-primary rounded-lg blur-md opacity-30 -z-10"></div>
      </div>
      
      {/* Text Logo */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold text-accent-primary ${textClassName}`}>
          Karthikeya
        </span>
        <span className="text-text-secondary text-xs font-medium -mt-1">
          GAMES GALAXY
        </span>
      </div>
    </div>
  );
};

export default Logo;