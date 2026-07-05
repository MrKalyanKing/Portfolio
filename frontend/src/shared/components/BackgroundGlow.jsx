import { useEffect, useRef } from 'react';

export function BackgroundGlow({ accent, showGrid, reduceMotion = false }) {
  const glowRef = useRef(null);

  useEffect(() => {
    if (reduceMotion) return;
    
    const handleMouseMove = (ev) => {
      if (!glowRef.current) return;
      const x = (ev.clientX / window.innerWidth - 0.5);
      const y = (ev.clientY / window.innerHeight - 0.5);
      glowRef.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduceMotion]);

  return (
    <>
      <div 
        ref={glowRef}
        id="kx-glow" 
        className="fixed inset-[-12%] z-0 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          background: `
            radial-gradient(600px circle at 14% 16%, color-mix(in srgb, ${accent} 18%, transparent), transparent 60%),
            radial-gradient(520px circle at 88% 22%, color-mix(in srgb, ${accent} 11%, transparent), transparent 62%),
            radial-gradient(760px circle at 60% 98%, color-mix(in srgb, ${accent} 10%, transparent), transparent 60%)
          `
        }}
      />
      {showGrid && (
        <div 
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px)`,
            backgroundSize: '66px 66px',
            WebkitMaskImage: 'radial-gradient(circle at 50% 28%, #000 0%, transparent 76%)',
            maskImage: 'radial-gradient(circle at 50% 28%, #000 0%, transparent 76%)'
          }}
        />
      )}
    </>
  );
}
