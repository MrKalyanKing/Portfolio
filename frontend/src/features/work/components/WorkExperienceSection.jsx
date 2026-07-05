import { WorkExperienceSkeleton } from './WorkExperienceSkeleton';
import { SectionNotice } from '../../../shared/components/SectionNotice';

export function WorkExperienceSection({ timeline, loading = false, error = null }) {
  return (
    <section id="work" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px]">
      <div className="max-w-[920px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
          // Career timeline
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] mt-[12px] mb-[6px] text-[#f4f9f6]">
          Work Experience.
        </h2>
        <p data-reveal className="text-[#8ea097] text-[15px] m-0 mb-[46px]">
          Most recent first.
        </p>
        
        {!loading && <SectionNotice message={error} />}
        <div data-stagger className="relative pl-[34px]">
          <div 
            className="absolute left-[6px] top-[6px] bottom-[6px] w-[2px]"
            style={{
              background: 'linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 10%, transparent))'
            }}
          ></div>
          
          {loading ? <WorkExperienceSkeleton /> : timeline.map((t) => (
            <div key={t.id} data-reveal className="relative mb-[26px]">
              <div 
                className="absolute -left-[34px] top-[24px] w-[14px] h-[14px] rounded-full border-[3px] border-[#060907]"
                style={{
                  background: 'var(--accent)',
                  boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 22%, transparent)'
                }}
              ></div>
              
              <div 
                className="py-[26px] px-[28px] rounded-[20px] transition-all duration-250 hover:translate-x-[6px]"
                style={{
                  background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 40%, transparent)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
              >
                <div className="flex justify-between items-start gap-[16px] flex-wrap">
                  <div>
                    <h3 className="font-display font-semibold text-[clamp(19px,2.4vw,23px)] m-0 text-[#f4f9f6]">
                      {t.role}
                    </h3>
                    <div className="mt-[6px] text-[14.5px] font-semibold text-[color-mix(in_srgb,var(--accent),#fff_15%)]">
                      {t.company} <span className="text-[#647069] font-normal">· {t.location}</span>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-[12.5px] text-[#cdd8d2] py-[7px] px-[13px] rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] border border-[color-mix(in_srgb,var(--accent)_26%,transparent)]">
                    {t.date}
                  </span>
                </div>
                
                <ul className="m-0 mt-[18px] p-0 list-none flex flex-col gap-[11px]">
                  {t.points.map((pt, i) => (
                    <li key={i} className="flex gap-[11px] text-[14.5px] leading-[1.6] text-[#a6b6ae]">
                      <span className="shrink-0 mt-[8px] w-[6px] h-[6px] rounded-full bg-[var(--accent)]"></span>
                      {pt}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-wrap gap-[8px] mt-[18px]">
                  {t.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[12px] font-medium text-[#9fb0a7] py-[5px] px-[11px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
