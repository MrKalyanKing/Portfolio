export function ApproachSection({ approach }) {
  return (
    <section id="approach" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px]">
      <div className="max-w-[1100px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Approach
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] text-[#f4f9f6]">
          How I think about <span className="gradient-text">systems.</span>
        </h2>
        <p data-reveal className="max-w-[620px] text-[16px] leading-[1.75] text-[#9fb0a7] mt-[16px] mb-[46px]">
          The principles behind every complex build I take on — they're why the software keeps working after launch.
        </p>

        <div data-stagger className="flex flex-col gap-[14px]">
          {approach.map((a, idx) => (
            <div
              key={a.id}
              data-reveal
              className="group flex items-start gap-[clamp(16px,3vw,30px)] p-[clamp(20px,3vw,28px)] rounded-[18px] transition-all duration-250 hover:translate-x-[6px]"
              style={{
                background: 'linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <div className="font-display font-bold text-[clamp(26px,4vw,38px)] leading-none gradient-text shrink-0 w-[58px]">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-display font-semibold text-[clamp(17px,2.2vw,20px)] m-0 text-[#f4f9f6] tracking-tight">
                  {a.title}
                </h3>
                <p className="mt-[8px] mb-0 text-[15px] leading-[1.7] text-[#a6b6ae]">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
