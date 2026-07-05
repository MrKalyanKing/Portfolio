import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import resumePdf from '../../assets/resume/KalyanResume.pdf';

export function Navigation({ navData }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop & Mobile Top Navbar */}
      <nav 
        className="fixed top-[13px] left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-[12px] py-[9px] pl-[18px] rounded-full max-w-[calc(100vw-22px)] w-[808px] h-[56px]"
        style={{
          background: 'linear-gradient(155deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(22px) saturate(150%)',
          WebkitBackdropFilter: 'blur(22px) saturate(150%)',
          boxShadow: '0 12px 44px rgba(0,0,0,.45)'
        }}
      >
        <a href="#home" className="flex items-center gap-[10px] no-underline text-white group">
          <span 
            className="w-[30px] h-[30px] rounded-[9px] grid place-items-center font-display font-bold text-[16px] text-[#04140d] transition-transform duration-200 group-hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 14%), color-mix(in srgb, var(--accent), #000 18%))'
            }}
          >
            K
          </span>
          <span className="font-display font-semibold text-[16px] tracking-[.2px]">Kalyan</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-[4px]">
          {navData.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              className="no-underline text-[#a6b6ae] text-[14px] font-medium px-[14px] py-[7px] rounded-full transition-all duration-200 border border-transparent hover:text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] hover:border-[color-mix(in_srgb,var(--accent)_30%,transparent)] shadow-sm"
            >
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="hidden md:block pr-[2px]">
          <a 
            href={resumePdf || "/KalyanResume.pdf"} 
            download="KalyanResume.pdf" 
            className="no-underline text-[13.5px] font-bold text-[#04140d] px-[16px] py-[9px] rounded-full transition-all duration-200 hover:-translate-y-[2px] inline-block"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
              boxShadow: '0 6px 22px color-mix(in srgb, var(--accent) 42%, transparent)',
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 10px 30px color-mix(in srgb, var(--accent) 55%, transparent)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 6px 22px color-mix(in srgb, var(--accent) 42%, transparent)'}
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-[#e7efe9] rounded-full hover:text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar (Opening from the LEFT side) */}
      <div 
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[280px] sm:w-[320px] p-6 flex flex-col transition-transform duration-400 ease-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(155deg, rgba(16,20,18,0.96), rgba(8,11,9,0.98))',
          borderRight: '1px solid color-mix(in srgb, var(--accent) 25%, rgba(255,255,255,0.09))',
          boxShadow: '20px 0 60px rgba(0,0,0,0.75)'
        }}
      >
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[rgba(255,255,255,0.08)]">
          <a href="#home" className="flex items-center gap-[10px] no-underline text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <span 
              className="w-[32px] h-[32px] rounded-[9px] grid place-items-center font-display font-bold text-[16px] text-[#04140d]"
              style={{
                background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 14%), color-mix(in srgb, var(--accent), #000 18%))'
              }}
            >
              K
            </span>
            <span className="font-display font-semibold text-[17px] tracking-[.2px]">Kalyan</span>
          </a>
          <button 
            className="p-2 text-[#a6b6ae] rounded-full hover:text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {navData.map((item, idx) => (
            <a 
              key={idx} 
              href={item.href} 
              className="no-underline text-[#e7efe9] text-base font-medium py-3.5 px-4 rounded-xl transition-all duration-200 hover:text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] border-b border-[rgba(255,255,255,0.04)] last:border-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <a 
            href={resumePdf || "/KalyanResume.pdf"} 
            download="KalyanResume.pdf" 
            className="flex items-center justify-center w-full no-underline text-[15px] font-bold text-[#04140d] py-[14px] rounded-xl transition-all duration-200 hover:-translate-y-[2px]"
            style={{
              background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
              boxShadow: '0 6px 22px color-mix(in srgb, var(--accent) 42%, transparent)',
            }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}


