export function DSASection({ dsaStats }) {
  return (
    <section id="dsa" className="pt-[clamp(60px,8vw,110px)] px-[clamp(20px,6vw,96px)] pb-[clamp(60px,8vw,110px)] scroll-mt-[80px]">
      <div className="max-w-[1100px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Problem solving
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] mb-[40px] text-[#f4f9f6]">
          DSA & Fundamentals.
        </h2>
        
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[18px]">
          {dsaStats.map((d, idx) => (
            <div 
              key={idx} 
              data-reveal 
              className="py-[32px] px-[28px] rounded-[20px] transition-all duration-250 hover:-translate-y-[6px]"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
            >
              <div className="font-display font-bold text-[clamp(42px,6vw,58px)] leading-none gradient-text">
                {d.n}
              </div>
              <div className="mt-[14px] text-[16px] font-semibold text-[#dfe8e3]">
                {d.l}
              </div>
              <div className="mt-[4px] text-[13px] text-[#7f9089]">
                {d.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
