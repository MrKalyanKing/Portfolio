export function HeroSection({ hero }) {
  return (
    <section id="home" className="min-h-screen flex items-center pt-[132px] px-[clamp(20px,6vw,96px)] pb-[72px] scroll-mt-[90px]">
      <div className="flex gap-[clamp(28px,5vw,72px)] items-center w-full max-w-[1280px] mx-auto flex-wrap">
        <div className="flex-[1_1_480px] min-w-[300px]">
          {hero.availableForWork && (
            <div data-reveal className="inline-flex items-center gap-[9px] font-mono text-[12.5px] tracking-[.24em] uppercase py-[7px] px-[14px] rounded-full border border-[color-mix(in_srgb,var(--accent)_32%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
              <span 
                className="w-[7px] h-[7px] rounded-full"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)'
                }}
              />
              Available for work
            </div>
          )}
          
          <h1 data-reveal className="font-display font-bold text-[clamp(46px,8vw,102px)] leading-[.96] tracking-[-.035em] mt-[22px] text-[#f4f9f6]">
            Hi, I'm<br />
            <span className="gradient-text">{hero.firstName}</span> <span className="text-[#f4f9f6]">{hero.lastName}</span>
          </h1>
          
          <p data-reveal className="max-w-[520px] mt-[26px] text-[clamp(16px,2vw,19px)] leading-[1.7] text-[#9fb0a7]">
            {hero.description}
          </p>
          
          <div data-reveal className="flex gap-[14px] flex-wrap mt-[34px]">
            <a 
              href="#projects" 
              className="no-underline font-bold text-[15px] text-[#04140d] py-[14px] px-[26px] rounded-[14px] transition-all duration-200 hover:-translate-y-[3px]"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
                boxShadow: '0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent)'
              }}
              onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 16px 40px color-mix(in srgb, var(--accent) 55%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent)'}
            >
              View my work
            </a>
            <a 
              href="#contact" 
              className="no-underline font-semibold text-[15px] text-[#e7efe9] py-[14px] px-[26px] rounded-[14px] transition-all duration-200 hover:-translate-y-[3px]"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
            >
              Get in touch
            </a>
          </div>
          
          <div data-reveal className="flex gap-[28px] flex-wrap mt-[44px]">
            <div>
              <div className="font-display font-bold text-[26px] text-[#f4f9f6]">150+</div>
              <div className="text-[12.5px] text-[#7f9089] tracking-[.03em]">DSA solved</div>
            </div>
            <div className="w-[1px] bg-[rgba(255,255,255,0.1)]"></div>
            <div>
              <div className="font-display font-bold text-[26px] text-[#f4f9f6]">3</div>
              <div className="text-[12.5px] text-[#7f9089] tracking-[.03em]">flagship builds</div>
            </div>
            <div className="w-[1px] bg-[rgba(255,255,255,0.1)]"></div>
            <div>
              <div className="font-display font-bold text-[26px] gradient-text">OSS</div>
              <div className="text-[12.5px] text-[#7f9089] tracking-[.03em]">Rocket.Chat</div>
            </div>
          </div>
        </div>

        <div className="flex-[1_1_380px] min-w-[300px] flex justify-center relative">
          <div 
            data-reveal 
            className="relative w-full max-w-[420px] rounded-[22px] overflow-hidden"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              boxShadow: '0 24px 70px rgba(0,0,0,.5)'
            }}
          >
            <div className="flex items-center gap-[8px] py-[14px] px-[16px] border-b border-[rgba(255,255,255,0.07)]">
              <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]"></span>
              <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]"></span>
              <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]"></span>
              <span className="ml-[8px] font-mono text-[12px] text-[#7f9089]">kalyan.ts</span>
            </div>
            <div className="p-[20px] pb-[24px] font-mono text-[13.5px] leading-[1.85]">
              <div><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">kalyan</span> <span className="text-[#89ddff]">=</span> {'{'}</div>
              <div className="pl-[20px]"><span className="text-[#f78c6c]">role</span>: <span className="text-[var(--accent)]">"{hero.codeSnippet.role}"</span>,</div>
              <div className="pl-[20px]"><span className="text-[#f78c6c]">stack</span>: [{hero.codeSnippet.stack.map(s => `"${s}"`).join(', ')}],</div>
              <div className="pl-[20px]"><span className="text-[#f78c6c]">solved</span>: <span className="text-[var(--accent)]">"{hero.codeSnippet.solved}"</span>,</div>
              <div className="pl-[20px]"><span className="text-[#f78c6c]">ships</span>: <span className="text-[var(--accent)]">"{hero.codeSnippet.ships}"</span>,</div>
              <div>{'}'}<span className="inline-block w-[8px] h-[16px] bg-[var(--accent)] align-middle ml-[3px] animate-blink"></span></div>
            </div>
          </div>
          
          <div 
            data-float 
            className="absolute -top-[14px] -right-[6px] animate-float-a flex items-center gap-[8px] py-[9px] px-[14px] rounded-[12px] text-[12.5px] font-semibold text-[#e7efe9] shadow-[0_12px_30px_rgba(0,0,0,.4)]"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            {hero.badges[0].text}
          </div>
          
          <div 
            data-float 
            className="absolute -bottom-[16px] -left-[8px] animate-float-b flex items-center gap-[8px] py-[9px] px-[14px] rounded-[12px] text-[12.5px] font-semibold text-[#e7efe9] shadow-[0_12px_30px_rgba(0,0,0,.4)]"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03))',
              border: '1px solid rgba(255,255,255,0.14)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            {hero.badges[1].text}
          </div>
        </div>
      </div>
    </section>
  );
}
