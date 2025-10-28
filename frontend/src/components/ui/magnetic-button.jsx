import React, { useRef } from 'react';

export const MagneticButton = ({ className = '', children, strength = 20, ...props }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0,0)';
  };

  return (
    <div className="relative inline-block" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={ref} className="transition-transform duration-150 will-change-transform">
        <button className={className} {...props}>{children}</button>
      </div>
    </div>
  );
};

export default MagneticButton;


