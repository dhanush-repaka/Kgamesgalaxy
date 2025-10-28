import React, { useEffect, useState } from 'react';
import { Gamepad2, Trophy, Zap, Star, Users, Clock, Award } from 'lucide-react';

// Modern Gaming Stats Card - Clean and Professional
const HeroBot = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const stats = [
    { icon: Gamepad2, label: 'Platforms', value: '5+', color: 'text-blue-400' },
    { icon: Trophy, label: 'Games', value: '100+', color: 'text-yellow-400' },
    { icon: Users, label: 'Players', value: '500+', color: 'text-green-400' },
    { icon: Award, label: 'Rating', value: '4.8★', color: 'text-purple-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = stats[activeIndex].icon;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-gaming-card via-gaming-card to-gaming-light rounded-2xl lg:rounded-3xl border-2 border-gaming-accent/40 shadow-2xl overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-gaming-accent/10 animate-pulse" />
        
        {/* Main Content */}
        <div className="relative p-6 lg:p-8">
          {/* Top Section - Animated Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gaming-accent/30 blur-2xl rounded-full scale-150 animate-pulse" />
              <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-br from-gaming-accent via-blue-500 to-purple-500 flex items-center justify-center shadow-gaming-glow animate-bounce-slow">
                <ActiveIcon className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl lg:text-2xl font-bold text-gaming-text mb-1">
              {stats[activeIndex].label}
            </h3>
            <p className={`text-3xl lg:text-4xl font-extrabold ${stats[activeIndex].color}`}>
              {stats[activeIndex].value}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`p-3 lg:p-4 rounded-xl border transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gaming-accent/20 border-gaming-accent/60 scale-105'
                      : 'bg-gaming-light/50 border-gaming-border hover:border-gaming-accent/40'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                    <div className="text-xs lg:text-sm font-semibold text-gaming-text-secondary text-center">
                      {stat.label}
                    </div>
                    <div className={`text-sm lg:text-base font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Branding */}
          <div className="mt-6 pt-4 border-t border-gaming-border/50">
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-8 bg-gaming-accent'
                        : 'w-1.5 bg-gaming-border'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-center text-xs lg:text-sm text-gaming-text-secondary mt-3 font-medium">
              Premium Gaming Experience
            </p>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gaming-accent/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-tr-full" />
      </div>
    </div>
  );
};

export default HeroBot;


