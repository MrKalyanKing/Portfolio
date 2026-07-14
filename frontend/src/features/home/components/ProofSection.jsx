import { Quote, CheckCircle2 } from 'lucide-react';

export function ProofSection({ proof }) {
  return (
    <section id="proof" className="pt-[clamp(60px,8vw,110px)] px-[clamp(20px,6vw,96px)] pb-[clamp(60px,8vw,110px)] scroll-mt-[80px]">
      <div className="max-w-[1100px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Trusted work
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] mb-[40px] text-[#f4f9f6]">
          Proof.
        </h2>

        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[20px]">
          {proof.testimonials.map((t) => (
            <div
              key={t.id}
              data-reveal
              className="p-[28px] rounded-[20px] transition-all duration-250 hover:-translate-y-[4px] flex flex-col"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
            >
              <Quote size={22} color="var(--accent)" className="mb-[14px] opacity-80" />
              <p className="m-0 text-[15px] leading-[1.75] text-[#a6b6ae] flex-1">
                {t.quote}
              </p>
              <div className="mt-[20px] pt-[16px] border-t border-[rgba(255,255,255,0.07)]">
                <div className="text-[14.5px] font-semibold text-[#f4f9f6]">{t.name}</div>
                <div className="text-[13px] text-[#7f9089] mt-[2px]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="flex flex-wrap gap-[12px] mt-[26px]">
          {proof.strip.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-[9px] no-underline py-[11px] px-[16px] rounded-[12px] text-[13.5px] font-semibold text-[#cdd8d2] transition-all duration-200 hover:-translate-y-[3px] hover:text-white"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 50%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <CheckCircle2 size={16} color="var(--accent)" />
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
