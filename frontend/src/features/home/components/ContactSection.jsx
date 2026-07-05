import { Footer } from '../../../shared/components/Footer';

export function ContactSection({ socials }) {
  const emailObj = socials.find(s => s.id === 'email') || socials[socials.length - 1];
  const otherSocials = socials.filter(s => s.id !== 'email');

  return (
    <section id="contact" className="pt-[clamp(80px,10vw,150px)] px-[clamp(20px,6vw,96px)] pb-[70px] scroll-mt-[80px] text-center">
      <div className="max-w-[760px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Get in touch
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(38px,6vw,72px)] tracking-[-.03em] leading-[1.02] mt-[14px] text-[#f4f9f6]">
          Let's build something <span className="gradient-text">great.</span>
        </h2>
        <p data-reveal className="text-[17px] leading-[1.7] text-[#9fb0a7] mt-[22px] mx-auto max-w-[520px]">
          Open to SDE roles, freelance projects and open-source collaboration. Drop me a line — I usually reply fast.
        </p>
        
        <div data-reveal className="flex gap-[14px] flex-wrap justify-center mt-[36px]">
          <a 
            href={emailObj.href} 
            className="no-underline font-bold text-[15px] text-[#04140d] py-[15px] px-[30px] rounded-[14px] transition-all duration-200 hover:-translate-y-[3px]"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
              boxShadow: '0 12px 32px color-mix(in srgb, var(--accent) 42%, transparent)'
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 18px 44px color-mix(in srgb, var(--accent) 55%, transparent)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 12px 32px color-mix(in srgb, var(--accent) 42%, transparent)'}
          >
            ✉ {emailObj.href.replace('mailto:', '')}
          </a>
        </div>
        
        <div data-reveal className="flex gap-[12px] flex-wrap justify-center mt-[20px]">
          {socials.map((s, idx) => (
            <a 
              key={idx} 
              href={s.href} 
              target="_blank" 
              rel="noopener" 
              title={s.name}
              className="w-[46px] h-[46px] rounded-[12px] grid place-items-center no-underline transition-all duration-200 hover:-translate-y-[4px]"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <img src={s.icon} alt={s.name} width="20" height="20" className="block" />
            </a>
          ))}
        </div>
      </div>
      
      <Footer />
    </section>
  );
}
