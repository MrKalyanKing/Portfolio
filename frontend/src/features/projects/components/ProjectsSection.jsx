import { ProjectsSkeleton } from './ProjectsSkeleton';
import { SectionNotice } from '../../../shared/components/SectionNotice';

export function ProjectsSection({ projects, loading = false, error = null }) {
  return (
    <section id="projects" className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] scroll-mt-[80px] bg-[#020b08]">
      <div className="max-w-[1180px] mx-auto">
        <div data-reveal className="font-mono text-[13px] tracking-[.24em] uppercase text-[#0bc793] mb-[12px]">
          // Selected work
        </div>
        <h2 data-reveal className="font-display font-bold text-[clamp(34px,5vw,60px)] tracking-[-.025em] text-[#f4f9f6]">
          Projects.
        </h2>
        <p data-reveal className="max-w-[620px] text-[16px] leading-[1.75] text-[#9fb0a7] mt-[16px] mb-[46px]">
          Real-world builds that show how I solve problems end to end — from database design and APIs to real-time features and load-tested reliability.
        </p>
        
        {!loading && <SectionNotice message={error} />}
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[24px]">
          {loading ? <ProjectsSkeleton /> : projects.map((p) => (
            <div 
              key={p.id} 
              data-reveal 
              className="rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-[6px] flex flex-col"
              style={{
                backgroundColor: '#071310',
                border: '1px solid #142f24',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
              }}
            >
              <div className="relative h-[240px] w-full overflow-hidden">
                {/* Background Pattern / Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                  style={{ 
                    backgroundImage: p.image 
                      ? `linear-gradient(to bottom, rgba(7,19,16,0.2) 0%, #071310 100%), url(${p.image})` 
                      : 'linear-gradient(to bottom, rgba(11,199,147,0.05) 0%, #071310 100%)' 
                  }}
                />
                
                {/* Action Buttons Top Right */}
                <div className="absolute top-[16px] right-[16px] flex gap-[12px]">
                  <a 
                    href={p.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="View source" 
                    className="w-[42px] h-[42px] rounded-[12px] grid place-items-center no-underline transition-all duration-200 hover:scale-110"
                    style={{
                      background: '#0d1311',
                      border: '1px solid #23332c',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffffff">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  <a 
                    href={p.live} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    title="Live preview" 
                    className="w-[42px] h-[42px] rounded-[12px] grid place-items-center no-underline transition-all duration-200 hover:scale-110"
                    style={{
                      background: '#0bc793',
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#04140d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="flex-1 px-[32px] pb-[36px] bg-[#071310] relative z-10 flex flex-col">
                {/* Kind Badge */}
                <div 
                  className="self-start font-mono text-[11px] tracking-[.15em] uppercase px-[12px] py-[6px] rounded-lg mb-[20px]"
                  style={{
                    color: '#8ca59d',
                    border: '1px solid #1a2f26',
                    backgroundColor: '#0a1714'
                  }}
                >
                  {p.kind}
                </div>

                <h3 className="font-display font-bold text-[24px] m-0 text-[#f4f9f6] tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-[14px] text-[15px] leading-[1.6] text-[#91a69e] flex-1">
                  {p.desc}
                </p>
                
                <div className="flex flex-wrap gap-[10px] mt-[24px]">
                  {p.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="text-[13px] font-medium py-[6px] px-[14px] rounded-[10px]"
                      style={{
                        color: '#08c999',
                        background: '#041c15',
                        border: '1px solid #093b2d'
                      }}
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
