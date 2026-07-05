// Skeleton placeholders matching the real timeline entry layout (same dot,
// glass card padding and spacing) so real data swaps in without shift.
export function WorkExperienceSkeleton({ count = 2 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="relative mb-[26px]">
          {/* Timeline dot */}
          <div
            className="absolute -left-[34px] top-[24px] w-[14px] h-[14px] rounded-full border-[3px] border-[#060907]"
            style={{
              background: 'color-mix(in srgb, var(--accent) 30%, transparent)'
            }}
          ></div>

          <div
            className="py-[26px] px-[28px] rounded-[20px]"
            style={{
              background: 'linear-gradient(155deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              border: '1px solid rgba(255,255,255,0.09)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <div className="flex justify-between items-start gap-[16px] flex-wrap">
              <div className="flex-1 min-w-[200px]">
                {/* Role */}
                <div className="skeleton h-[24px] w-[60%]" />
                {/* Company · location */}
                <div className="skeleton h-[15px] w-[45%] mt-[10px]" />
              </div>
              {/* Date pill */}
              <div className="skeleton shrink-0 h-[32px] w-[130px] rounded-full" />
            </div>

            {/* Bullet points */}
            <div className="mt-[18px] flex flex-col gap-[11px]">
              <div className="flex gap-[11px] items-center">
                <span className="skeleton shrink-0 w-[6px] h-[6px] rounded-full" />
                <div className="skeleton h-[14px] w-full" />
              </div>
              <div className="flex gap-[11px] items-center">
                <span className="skeleton shrink-0 w-[6px] h-[6px] rounded-full" />
                <div className="skeleton h-[14px] w-[85%]" />
              </div>
            </div>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-[8px] mt-[18px]">
              <div className="skeleton h-[26px] w-[64px] rounded-[8px]" />
              <div className="skeleton h-[26px] w-[86px] rounded-[8px]" />
              <div className="skeleton h-[26px] w-[58px] rounded-[8px]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
