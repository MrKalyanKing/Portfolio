import { ShieldCheck, Sparkles } from 'lucide-react';

export function FlagshipSection({ flagship, onBookCall }) {
  return (
    <section id="flagship" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px] bg-[#020b08]">
      <div className="max-w-[1180px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[#0bc793]">
          // Flagship build
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5.4vw,64px)] tracking-[-.025em] mt-[12px] text-[#f4f9f6]">
          {flagship.title} — <span className="gradient-text">{flagship.subtitle}.</span>
        </h2>
        <p data-reveal className="max-w-[760px] text-[clamp(16px,1.9vw,18.5px)] leading-[1.8] text-[#9fb0a7] mt-[18px]">
          {flagship.framing}
        </p>
        <div data-reveal className="inline-flex items-center gap-[9px] mt-[18px] font-mono text-[12px] tracking-[.12em] uppercase text-[#8ca59d] py-[7px] px-[13px] rounded-full border border-[#1a2f26] bg-[#0a1714]">
          <ShieldCheck size={14} color="var(--accent)" />
          {flagship.confidentialNote}
        </div>

        <div
          data-reveal
          className="mt-[44px] rounded-[26px] p-[clamp(22px,3.5vw,44px)] relative overflow-hidden"
          style={{
            background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
            border: '1px solid color-mix(in srgb, var(--accent) 22%, rgba(255,255,255,0.09))',
            boxShadow: '0 30px 80px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.05)'
          }}
        >
          <div
            className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[520px] h-[240px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)' }}
          />

          <div className="font-mono text-[12px] tracking-[.2em] uppercase text-[#647069] mb-[22px]">
            Architecture pillars
          </div>

          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[16px]">
            {flagship.pillars.map((p, idx) => (
              <div
                key={p.id}
                data-reveal
                className="p-[20px] rounded-[16px] transition-all duration-250 hover:-translate-y-[3px]"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
              >
                <div className="flex items-baseline gap-[10px]">
                  <span className="font-mono text-[12px] text-[var(--accent)] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-semibold text-[16.5px] m-0 text-[#f4f9f6] tracking-tight">
                    {p.title}
                  </h3>
                </div>
                <p className="mt-[9px] mb-0 text-[13.5px] leading-[1.65] text-[#91a69e]">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="font-mono text-[12px] tracking-[.2em] uppercase text-[#647069] mt-[34px] mb-[14px]">
            Built with
          </div>
          <div data-reveal className="flex flex-wrap gap-[10px]">
            {flagship.techChips.map((chip, i) => (
              <span
                key={i}
                className="text-[13px] font-medium py-[6px] px-[14px] rounded-[10px]"
                style={{
                  color: '#08c999',
                  background: '#041c15',
                  border: '1px solid #093b2d'
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div
            data-reveal
            className="mt-[30px] flex items-start gap-[12px] p-[18px] rounded-[14px]"
            style={{
              background: 'color-mix(in srgb, var(--accent) 6%, transparent)',
              border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)'
            }}
          >
            <Sparkles size={18} color="var(--accent)" className="shrink-0 mt-[2px]" />
            <p className="m-0 text-[14.5px] leading-[1.7] text-[#cdd8d2]">
              <span className="font-semibold text-[#f4f9f6]">My role:</span> {flagship.roleLine}
            </p>
          </div>
        </div>

        <div data-reveal className="mt-[36px] flex items-center gap-[18px] flex-wrap">
          <span className="text-[16px] text-[#9fb0a7]">Want something like this built?</span>
          <button
            type="button"
            onClick={onBookCall}
            className="cursor-pointer border-0 font-bold text-[15px] text-[#04140d] py-[13px] px-[24px] rounded-[14px] transition-all duration-200 hover:-translate-y-[3px] inline-block"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
              boxShadow: '0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent)'
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 16px 40px color-mix(in srgb, var(--accent) 55%, transparent)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent)'}
          >
            Book a call
          </button>
        </div>
      </div>
    </section>
  );
}
