export function AboutSection({ aboutText, aboutStats, socials }) {
  return (
    <section id="about" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px]">
      <div className="max-w-[1180px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // About me
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] text-[#f4f9f6]">
          Overview.
        </h2>
        
        <div className="flex gap-[clamp(30px,5vw,64px)] flex-wrap mt-[44px]">
          <div className="flex-[1_1_440px] min-w-[300px]">
            {aboutText.map((text, idx) => (
              <p 
                key={idx} 
                data-reveal 
                className={`text-[clamp(16px,1.8vw,18.5px)] leading-[1.85] text-[#a6b6ae] ${idx === 0 ? 'm-0' : 'mt-[20px]'}`}
              >
                {/* To support the span around Rocket.Chat inside the string, we might need dangerouslySetInnerHTML or parse it. For exact clone, let's render it directly */}
                {idx === 1 ? (
                  <>
                    Beyond client work, I contribute production-ready code to <span className="text-[#e7efe9] font-semibold">Rocket.Chat</span>, a large-scale open-source platform, and sharpen my fundamentals with 260+ solved DSA problems. I like turning complex problems into clean, reliable software.
                  </>
                ) : (
                  text
                )}
              </p>
            ))}
            
            <div data-reveal className="flex gap-[12px] flex-wrap mt-[30px]">
              {socials.map((s, idx) => (
                <a 
                  key={idx} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener" 
                  title={s.name}
                  className="flex items-center gap-[9px] no-underline py-[11px] px-[16px] rounded-[12px] text-[14px] font-semibold text-[#cdd8d2] transition-all duration-200 hover:-translate-y-[3px] hover:text-white"
                  style={{
                    background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <img src={s.icon} alt={s.name} width="18" height="18" className="block" />
                  {s.name}
                </a>
              ))}
            </div>
          </div>
          
          <div data-stagger className="flex-[1_1_320px] min-w-[280px] grid grid-cols-2 gap-[16px]">
            {aboutStats.map((a, idx) => (
              <div 
                key={idx} 
                data-reveal 
                className="py-[26px] px-[22px] rounded-[18px] transition-all duration-250 hover:-translate-y-[4px]"
                style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
              >
                <div className="font-display font-bold text-[clamp(30px,4vw,42px)] leading-none gradient-text">
                  {a.n}
                </div>
                <div className="mt-[10px] text-[13.5px] text-[#8ea097] tracking-[.02em]">{a.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
