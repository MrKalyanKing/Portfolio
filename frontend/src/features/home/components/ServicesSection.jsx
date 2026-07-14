import { Layers, Bot, Server, Rocket, Plug } from 'lucide-react';

const ICONS = { Layers, Bot, Server, Rocket, Plug };

export function ServicesSection({ services, note, onBookCall }) {
  return (
    <section id="services" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px]">
      <div className="max-w-[1180px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // What I build
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] text-[#f4f9f6]">
          Services.
        </h2>
        <p data-reveal className="max-w-[620px] text-[16px] leading-[1.75] text-[#9fb0a7] mt-[16px] mb-[46px]">
          Senior-level product engineering for teams that need real systems shipped — from multi-tenant architecture to AI features grounded in your data.
        </p>

        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[22px]">
          {services.map((s) => {
            const Icon = ICONS[s.icon] || Layers;
            return (
              <div
                key={s.id}
                data-reveal
                className="group relative p-[28px] rounded-[22px] transition-all duration-300 hover:-translate-y-[6px] overflow-hidden"
                style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 42%, transparent)';
                  e.currentTarget.style.boxShadow = '0 18px 44px color-mix(in srgb, var(--accent) 14%, transparent)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="absolute -top-[40px] -right-[40px] w-[130px] h-[130px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 70%)' }}
                />
                <div
                  className="w-[48px] h-[48px] rounded-[14px] grid place-items-center mb-[20px]"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                    border: '1px solid color-mix(in srgb, var(--accent) 28%, transparent)'
                  }}
                >
                  <Icon size={23} color="var(--accent)" strokeWidth={1.9} />
                </div>
                <h3 className="font-display font-bold text-[20px] m-0 text-[#f4f9f6] tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-[10px] text-[15px] leading-[1.65] text-[color-mix(in_srgb,var(--accent),#fff_25%)] font-medium italic m-0">
                  “{s.outcome}”
                </p>
                <div className="flex flex-wrap gap-[8px] mt-[18px]">
                  {s.deliverables.map((d, i) => (
                    <span
                      key={i}
                      className="text-[12px] font-medium text-[#9fb0a7] py-[5px] px-[11px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p data-reveal className="mt-[30px] text-[14.5px] text-[#8ea097] leading-[1.7]">
          {note}{' '}
          <button
            type="button"
            onClick={onBookCall}
            className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-[14.5px] text-[var(--accent)] hover:underline underline-offset-4"
          >
            Book a call
          </button>{' '}
          for a quote.
        </p>
      </div>
    </section>
  );
}
