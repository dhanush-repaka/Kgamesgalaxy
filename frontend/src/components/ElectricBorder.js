import React, { useRef, useEffect, useMemo } from 'react';

const ElectricBorder = ({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.5,
  thickness = 4,
  style = {},
  className = ''
}) => {
  const turbulenceRef = useRef(null);
  const animationRef = useRef(null);
  const filterId = useMemo(() => `turbulent-displace-${Math.random().toString(36).substr(2, 9)}`, []);

  useEffect(() => {
    if (!turbulenceRef.current) return;

    let baseFrequency = 0.02;
    const animationSpeed = speed * 0.001;

    const animate = () => {
      baseFrequency += animationSpeed;
      if (turbulenceRef.current) {
        turbulenceRef.current.setAttribute('baseFrequency', `${baseFrequency} 0.02`);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  const borderRadius = style.borderRadius || 16;

  return (
    <div
      className={`electric-border-container ${className}`}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        padding: `${thickness}px`,
        background: color,
        boxShadow: `0 0 40px ${color}, 0 0 80px ${color}80`,
        ...style
      }}
    >
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency="0.02 0.02"
              numOctaves="2"
              result="turbulence"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={chaos * 15}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="electric-border-inner"
        style={{
          position: 'relative',
          borderRadius: `${borderRadius - thickness}px`,
          overflow: 'hidden',
          background: '#1a1a2e',
          filter: `url(#${filterId})`
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;