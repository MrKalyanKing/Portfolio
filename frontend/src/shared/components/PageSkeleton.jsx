import { BackgroundGlow } from './BackgroundGlow';
import { WorkExperienceSkeleton } from '../../features/work/components/WorkExperienceSkeleton';
import { ProjectsSkeleton } from '../../features/projects/components/ProjectsSkeleton';

// Glass card style shared by the nav pill, hero code card and stat cards —
// identical to the real components so the skeleton doesn't "pop" on swap.
const glass = {
  background: 'linear-gradient(155deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(22px) saturate(150%)',
  WebkitBackdropFilter: 'blur(22px) saturate(150%)'
};

// Section header placeholder: the "// label" mono line + big display heading.
function SectionHeaderSkeleton({ headingWidth = 240, withIntro = false }) {
  return (
    <>
      <div className="skeleton h-[13px] w-[150px]" />
      <div className="skeleton mt-[16px] h-[clamp(34px,5vw,60px)] rounded-[12px]" style={{ maxWidth: headingWidth }} />
      {withIntro && (
        <>
          <div className="skeleton h-[15px] w-full max-w-[620px] mt-[20px]" />
          <div className="skeleton h-[15px] w-[70%] max-w-[440px] mt-[10px] mb-[46px]" />
        </>
      )}
    </>
  );
}

// Full-page skeleton shown while the portfolio bundle loads. Mirrors the real
// page structure (nav, hero, about, work, stack, projects, contact) with the
// same section padding, max-widths, radii and brand glass/accent styling so
// the real page renders into the exact same layout without shift.
export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      aria-busy="true"
      className="relative min-h-screen overflow-x-hidden font-sans bg-[#060907] text-[#e7efe9]"
    >
      <BackgroundGlow accent="#34d399" showGrid={true} reduceMotion={true} />

      <div className="relative z-10">
        {/* ── Navigation pill ─────────────────────────────────────────── */}
        <nav
          className="fixed top-[13px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-[12px] py-[9px] pl-[18px] rounded-full max-w-[calc(100vw-22px)] w-[808px] h-[56px]"
          style={{ ...glass, boxShadow: '0 12px 44px rgba(0,0,0,.45)' }}
        >
          <div className="flex items-center gap-[10px]">
            <div className="skeleton w-[30px] h-[30px] rounded-[9px]" />
            <div className="skeleton h-[16px] w-[68px]" />
          </div>
          <div className="hidden md:flex items-center gap-[18px]">
            <div className="skeleton h-[13px] w-[44px]" />
            <div className="skeleton h-[13px] w-[52px]" />
            <div className="skeleton h-[13px] w-[40px]" />
            <div className="skeleton h-[13px] w-[58px]" />
            <div className="skeleton h-[13px] w-[56px]" />
          </div>
          <div className="skeleton h-[36px] w-[88px] rounded-full" />
        </nav>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex items-center pt-[132px] px-[clamp(20px,6vw,96px)] pb-[72px]">
          <div className="flex gap-[clamp(28px,5vw,72px)] items-center w-full max-w-[1280px] mx-auto flex-wrap">
            <div className="flex-[1_1_480px] min-w-[300px]">
              {/* Available-for-work badge */}
              <div className="skeleton h-[32px] w-[210px] rounded-full" />

              {/* "Hi, I'm Name" display heading */}
              <div className="skeleton mt-[26px] h-[clamp(46px,8vw,96px)] w-[52%] rounded-[16px]" />
              <div className="skeleton mt-[14px] h-[clamp(46px,8vw,96px)] w-[78%] rounded-[16px]" />

              {/* Description */}
              <div className="skeleton mt-[30px] h-[16px] w-full max-w-[520px]" />
              <div className="skeleton mt-[12px] h-[16px] w-[88%] max-w-[460px]" />
              <div className="skeleton mt-[12px] h-[16px] w-[64%] max-w-[340px]" />

              {/* CTA buttons */}
              <div className="flex gap-[14px] flex-wrap mt-[34px]">
                <div className="skeleton h-[49px] w-[158px] rounded-[14px]" />
                <div className="skeleton h-[49px] w-[148px] rounded-[14px]" />
              </div>

              {/* Quick stats row */}
              <div className="flex gap-[28px] flex-wrap mt-[44px] items-stretch">
                <div>
                  <div className="skeleton h-[26px] w-[64px]" />
                  <div className="skeleton mt-[8px] h-[12px] w-[76px]" />
                </div>
                <div className="w-[1px] bg-[rgba(255,255,255,0.1)]" />
                <div>
                  <div className="skeleton h-[26px] w-[36px]" />
                  <div className="skeleton mt-[8px] h-[12px] w-[92px]" />
                </div>
                <div className="w-[1px] bg-[rgba(255,255,255,0.1)]" />
                <div>
                  <div className="skeleton h-[26px] w-[52px]" />
                  <div className="skeleton mt-[8px] h-[12px] w-[80px]" />
                </div>
              </div>
            </div>

            {/* Code editor card */}
            <div className="flex-[1_1_380px] min-w-[300px] flex justify-center">
              <div
                className="relative w-full max-w-[420px] rounded-[22px] overflow-hidden"
                style={{ ...glass, boxShadow: '0 24px 70px rgba(0,0,0,.5)' }}
              >
                <div className="flex items-center gap-[8px] py-[14px] px-[16px] border-b border-[rgba(255,255,255,0.07)]">
                  <span className="skeleton w-[11px] h-[11px] rounded-full" />
                  <span className="skeleton w-[11px] h-[11px] rounded-full" />
                  <span className="skeleton w-[11px] h-[11px] rounded-full" />
                  <div className="skeleton ml-[8px] h-[12px] w-[72px]" />
                </div>
                <div className="p-[20px] pb-[24px] flex flex-col gap-[13px]">
                  <div className="skeleton h-[13px] w-[55%]" />
                  <div className="skeleton h-[13px] w-[78%] ml-[20px]" />
                  <div className="skeleton h-[13px] w-[88%] ml-[20px]" />
                  <div className="skeleton h-[13px] w-[62%] ml-[20px]" />
                  <div className="skeleton h-[13px] w-[70%] ml-[20px]" />
                  <div className="skeleton h-[13px] w-[24%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── About ───────────────────────────────────────────────────── */}
        <section className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)]">
          <div className="max-w-[1180px] mx-auto">
            <SectionHeaderSkeleton headingWidth={260} />

            <div className="flex gap-[clamp(30px,5vw,64px)] flex-wrap mt-[44px]">
              <div className="flex-[1_1_440px] min-w-[300px]">
                <div className="skeleton h-[16px] w-full" />
                <div className="skeleton mt-[12px] h-[16px] w-[94%]" />
                <div className="skeleton mt-[12px] h-[16px] w-[88%]" />
                <div className="skeleton mt-[24px] h-[16px] w-full" />
                <div className="skeleton mt-[12px] h-[16px] w-[72%]" />

                {/* Social pills */}
                <div className="flex gap-[12px] flex-wrap mt-[30px]">
                  <div className="skeleton h-[42px] w-[104px] rounded-[12px]" />
                  <div className="skeleton h-[42px] w-[116px] rounded-[12px]" />
                  <div className="skeleton h-[42px] w-[96px] rounded-[12px]" />
                </div>
              </div>

              {/* Stat cards grid */}
              <div className="flex-[1_1_320px] min-w-[280px] grid grid-cols-2 gap-[16px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="py-[26px] px-[22px] rounded-[18px]" style={glass}>
                    <div className="skeleton h-[30px] w-[60px]" />
                    <div className="skeleton mt-[12px] h-[13px] w-[85%]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Work experience (timeline) ──────────────────────────────── */}
        <section className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)]">
          <div className="max-w-[920px] mx-auto">
            <SectionHeaderSkeleton headingWidth={340} withIntro />

            <div className="relative pl-[34px]">
              <div
                className="absolute left-[6px] top-[6px] bottom-[6px] w-[2px]"
                style={{ background: 'color-mix(in srgb, var(--accent, #34d399) 22%, transparent)' }}
              />
              <WorkExperienceSkeleton count={2} />
            </div>
          </div>
        </section>

        {/* ── Tech stack ──────────────────────────────────────────────── */}
        <section className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)]">
          <div className="max-w-[1180px] mx-auto">
            <SectionHeaderSkeleton headingWidth={220} />

            <div className="flex flex-wrap gap-[12px] mt-[44px]">
              {[92, 110, 78, 128, 86, 104, 96, 118, 84, 100, 90, 112].map((w, i) => (
                <div key={i} className="skeleton h-[44px] rounded-[12px]" style={{ width: w }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────────────────── */}
        <section className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)] bg-[#020b08]">
          <div className="max-w-[1180px] mx-auto">
            <SectionHeaderSkeleton headingWidth={260} withIntro />

            <div className="grid grid-cols-[repeat(auto-fit,minmax(330px,1fr))] gap-[24px]">
              <ProjectsSkeleton count={3} />
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────── */}
        <section className="pt-[clamp(70px,9vw,130px)] px-[clamp(20px,6vw,96px)] pb-[clamp(70px,9vw,130px)]">
          <div className="max-w-[720px] mx-auto flex flex-col items-center text-center">
            <div className="skeleton h-[13px] w-[140px]" />
            <div className="skeleton mt-[16px] h-[clamp(34px,5vw,60px)] w-[70%] max-w-[420px] rounded-[12px]" />
            <div className="skeleton mt-[20px] h-[16px] w-full max-w-[480px]" />
            <div className="skeleton mt-[12px] h-[16px] w-[70%] max-w-[340px]" />
            <div className="skeleton mt-[32px] h-[52px] w-[190px] rounded-[14px]" />
          </div>
        </section>
      </div>
    </div>
  );
}
