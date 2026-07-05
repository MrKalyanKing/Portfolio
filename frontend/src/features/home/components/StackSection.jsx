export function StackSection({ techGroups }) {
  return (
    <section id="stack" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px]">
      <div className="max-w-[1100px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Toolkit
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] mb-[44px] text-[#f4f9f6]">
          Tech <span className="gradient-text">Stack.</span>
        </h2>
        
        <div className="flex flex-col gap-[30px]">
          {techGroups.map((g, idx) => (
            <div key={idx} data-reveal>
              <div className="font-mono text-[12px] tracking-[.14em] uppercase text-[#647069] mb-[15px]">
                {g.label}
              </div>
              <div data-stagger className="flex flex-wrap gap-[12px]">
                {g.items.map((it, i) => (
                  <div 
                    key={i} 
                    data-reveal 
                    className="flex items-center gap-[11px] py-[13px] px-[18px] rounded-[14px] transition-all duration-200 hover:-translate-y-[5px]"
                    style={{
                      background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                      border: '1px solid rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 45%, transparent)';
                      e.currentTarget.style.boxShadow = '0 12px 28px color-mix(in srgb, var(--accent) 18%, transparent)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <img 
                      src={it.icon} 
                      alt={it.name} 
                      width="24" 
                      height="24" 
                      className="block object-contain" 
                      onError={(e) => {
                        e.target.onerror = null;
                        if (it.name === 'AWS') {
                          e.target.src = 'https://api.iconify.design/logos:aws.svg';
                        }
                      }}
                    />
                    <span className="text-[14.5px] font-semibold text-[#dfe8e3]">{it.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
