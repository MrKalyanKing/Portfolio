// Small inline notice shown inside a section when its live data failed to
// load. Uses existing card tokens; amber-free — stays on brand colors.
export function SectionNotice({ message }) {
  if (!message) return null;
  return (
    <div
      className="flex items-start gap-[10px] mb-[24px] py-[12px] px-[16px] rounded-[14px] text-[13.5px] leading-[1.6] text-[#9fb0a7]"
      style={{
        background: '#071310',
        border: '1px solid #142f24'
      }}
      role="status"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-[3px]">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
