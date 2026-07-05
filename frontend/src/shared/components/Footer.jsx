export function Footer() {
  return (
    <footer className="max-w-[1180px] mx-auto mt-[90px] pt-[26px] border-t border-[rgba(255,255,255,0.07)] flex justify-between items-center gap-[16px] flex-wrap">
      <div className="flex items-center gap-[10px]">
        <span 
          className="w-[26px] h-[26px] rounded-[8px] grid place-items-center font-display font-bold text-[14px] text-[#04140d]"
          style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 14%), color-mix(in srgb, var(--accent), #000 18%))'
          }}
        >
          K
        </span>
        <span className="text-[13.5px] text-[#7f9089]">© 2026 Kalyan Badhavath</span>
      </div>
      <a 
        href="#home" 
        className="no-underline text-[13.5px] text-[#8ea097] transition-colors duration-200 hover:text-white"
      >
        Back to top ↑
      </a>
    </footer>
  );
}
