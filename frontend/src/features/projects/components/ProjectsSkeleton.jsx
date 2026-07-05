// Skeleton placeholders matching the real project card layout (same radius,
// image height, padding and grid sizing) so real data swaps in without shift.
export function ProjectsSkeleton({ count = 3 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-[24px] overflow-hidden flex flex-col"
          style={{
            backgroundColor: '#071310',
            border: '1px solid #142f24',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}
        >
          {/* Image area */}
          <div className="skeleton h-[240px] w-full !rounded-none" />

          <div className="flex-1 px-[32px] pb-[36px] flex flex-col">
            {/* Kind badge */}
            <div className="skeleton self-start h-[26px] w-[150px] rounded-lg mb-[20px]" />

            {/* Title */}
            <div className="skeleton h-[26px] w-[65%]" />

            {/* Description lines */}
            <div className="skeleton h-[14px] w-full mt-[16px]" />
            <div className="skeleton h-[14px] w-[90%] mt-[10px]" />
            <div className="skeleton h-[14px] w-[75%] mt-[10px]" />

            {/* Tag pills */}
            <div className="flex flex-wrap gap-[10px] mt-[24px]">
              <div className="skeleton h-[30px] w-[74px] rounded-[10px]" />
              <div className="skeleton h-[30px] w-[92px] rounded-[10px]" />
              <div className="skeleton h-[30px] w-[64px] rounded-[10px]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
