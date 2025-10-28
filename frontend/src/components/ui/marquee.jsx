import React from 'react';

export const Marquee = ({ items = [], speed = 30, className = '' }) => {
  const style = {
    animation: `scroll ${speed}s linear infinite`,
  };
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex whitespace-nowrap" style={style}>
        {[...items, ...items].map((it, idx) => (
          <span key={idx} className="mx-6 text-sm text-gaming-text-secondary">{it}</span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;


