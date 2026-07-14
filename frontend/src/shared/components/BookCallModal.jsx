import { useEffect, useRef, useState } from 'react';
import { X, CalendarCheck, Loader2, CheckCircle2, ChevronDown, Check, Sparkles } from 'lucide-react';
import { API_BASE } from '../../config/api';

// Deterministic pseudo-random bubbles so every open looks alive but never
// re-shuffles mid-animation.
const BUBBLES = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 137.5) % 100;
  return {
    left: `${4 + ((seed * 0.92) % 92)}%`,
    size: 8 + ((i * 29) % 30),
    duration: `${7 + ((i * 13) % 8)}s`,
    delay: `${-((i * 17) % 12)}s`,
    sway: `${10 + ((i * 7) % 22)}px`,
    opacity: 0.18 + ((i * 11) % 30) / 100,
  };
});

const PROJECT_TYPES = [
  'SaaS platform (multi-tenant)',
  'AI / LLM features',
  'Backend & APIs',
  'Full-stack product / MVP',
  'Integrations & automation',
  'Something else',
];

const BUDGETS = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $10,000',
  '$10,000+',
  'Not sure yet',
];

const TIMELINES = [
  'ASAP',
  'Within 1 month',
  '1 – 3 months',
  'Flexible / exploring',
];

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
};

const fieldBase = {
  background: 'rgba(255,255,255,0.045)',
  border: '1px solid rgba(255,255,255,0.11)',
};

function focusAccent(e) {
  e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--accent) 55%, transparent)';
  e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent)';
}

function blurAccent(e) {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.11)';
  e.currentTarget.style.boxShadow = 'none';
}

const inputClass =
  'w-full rounded-[12px] py-[12px] px-[15px] text-[14.5px] text-[#e7efe9] placeholder-[#647069] outline-none transition-all duration-200';

const labelClass =
  'block font-mono text-[11px] tracking-[.16em] uppercase text-[#8ea097] mb-[8px]';

// Custom glass dropdown — native <select> popups can't be styled, so this
// renders its own option list in the same design language as the modal.
function Select({ id, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`${inputClass} flex items-center justify-between gap-[10px] text-left cursor-pointer`}
        style={
          open
            ? {
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid color-mix(in srgb, var(--accent) 55%, transparent)',
                boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 14%, transparent)',
              }
            : fieldBase
        }
      >
        <span className={`truncate ${value ? 'text-[#e7efe9]' : 'text-[#647069]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          color={open ? 'var(--accent)' : '#8ea097'}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-40 left-0 right-0 mt-[8px] rounded-[14px] overflow-hidden animate-dropdown-in p-[6px]"
          style={{
            background: 'linear-gradient(160deg, rgba(16,26,22,0.98), rgba(8,14,11,0.99))',
            border: '1px solid color-mix(in srgb, var(--accent) 30%, rgba(255,255,255,0.1))',
            boxShadow: '0 22px 60px rgba(0,0,0,.65), 0 0 30px color-mix(in srgb, var(--accent) 10%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {options.map((opt) => {
            const selected = value === opt;
            return (
              <button
                type="button"
                key={opt}
                role="option"
                aria-selected={selected}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-[10px] text-left cursor-pointer border-0 rounded-[10px] py-[10px] px-[13px] text-[14px] transition-all duration-150 ${
                  selected
                    ? 'text-[#04140d] font-bold'
                    : 'text-[#cdd8d2] font-medium bg-transparent hover:translate-x-[3px]'
                }`}
                style={
                  selected
                    ? { background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))' }
                    : {}
                }
                onMouseOver={(e) => {
                  if (!selected) e.currentTarget.style.background = 'color-mix(in srgb, var(--accent) 12%, transparent)';
                }}
                onMouseOut={(e) => {
                  if (!selected) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="truncate">{opt}</span>
                {selected && <Check size={15} className="shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function BookCallModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');

  // Lock page scroll and reset transient state whenever the modal opens
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    setStatus('idle');
    setErrorMsg('');
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setValue = (key) => (v) => setForm((f) => ({ ...f, [key]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.projectType) {
      setStatus('error');
      setErrorMsg('Please pick a project type so I can prepare for the call.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/book-call`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Something went wrong — please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg("Couldn't reach the server — please try again, or email me directly.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(12px,3vw,28px)] animate-overlay-in"
      style={{ background: 'rgba(2,8,6,0.78)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Book a call"
    >
      <div
        className="relative w-full max-w-[640px] max-h-[92vh] overflow-y-auto rounded-[26px] animate-modal-in"
        style={{
          background: 'linear-gradient(160deg, #0b1512 0%, #060d0a 100%)',
          border: '1px solid color-mix(in srgb, var(--accent) 26%, rgba(255,255,255,0.1))',
          boxShadow: '0 40px 120px rgba(0,0,0,.7), 0 0 60px color-mix(in srgb, var(--accent) 10%, transparent)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent hairline across the top edge */}
        <div
          className="absolute top-0 left-[8%] right-[8%] h-[2px] rounded-full z-20"
          style={{
            background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 80%, #fff 10%), transparent)',
            boxShadow: '0 0 18px color-mix(in srgb, var(--accent) 60%, transparent)',
          }}
        />

        {/* Falling bubbles layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[26px]">
          {BUBBLES.map((b, i) => (
            <span
              key={i}
              className="bubble"
              style={{
                left: b.left,
                width: `${b.size}px`,
                height: `${b.size}px`,
                '--bubble-t': b.duration,
                '--bubble-d': b.delay,
                '--bubble-sway': b.sway,
                '--bubble-o': b.opacity,
              }}
            />
          ))}
          <div
            className="absolute -top-[90px] left-1/2 -translate-x-1/2 w-[440px] h-[200px]"
            style={{ background: 'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)' }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[16px] right-[16px] z-20 w-[38px] h-[38px] rounded-full grid place-items-center text-[#a6b6ae] transition-all duration-200 hover:text-white hover:rotate-90 cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <X size={18} />
        </button>

        <div className="relative z-10 p-[clamp(24px,4vw,44px)]">
          {status === 'success' ? (
            <div className="text-center py-[clamp(30px,6vw,60px)]">
              <div
                className="animate-success-pop mx-auto w-[86px] h-[86px] rounded-full grid place-items-center mb-[26px]"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                  boxShadow: '0 0 50px color-mix(in srgb, var(--accent) 30%, transparent)',
                }}
              >
                <CheckCircle2 size={44} color="var(--accent)" />
              </div>
              <h3 className="font-display font-bold text-[clamp(26px,4vw,36px)] tracking-[-.02em] text-[#f4f9f6] m-0">
                Request <span className="gradient-text">received.</span>
              </h3>
              <p className="text-[15.5px] leading-[1.75] text-[#9fb0a7] mt-[14px] max-w-[400px] mx-auto">
                Thanks for reaching out — I'll reply within 24 hours to lock in a time that works for you.
              </p>
              <button
                onClick={onClose}
                className="mt-[28px] font-bold text-[14.5px] text-[#04140d] py-[13px] px-[28px] rounded-[13px] transition-all duration-200 hover:-translate-y-[2px] cursor-pointer border-0"
                style={{
                  background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
                  boxShadow: '0 10px 30px color-mix(in srgb, var(--accent) 40%, transparent)',
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-[9px] font-mono text-[11.5px] tracking-[.22em] uppercase py-[6px] px-[13px] rounded-full border border-[color-mix(in_srgb,var(--accent)_32%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[color-mix(in_srgb,var(--accent),#fff_12%)]">
                <CalendarCheck size={13} />
                Free 30-min intro call
              </div>

              <h3 className="font-display font-bold text-[clamp(28px,4.5vw,42px)] leading-[1.05] tracking-[-.03em] text-[#f4f9f6] mt-[16px] m-0">
                Tell me what you're <span className="gradient-text">building.</span>
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#9fb0a7] mt-[12px] mb-[22px]">
                No sales pitch — a straight technical conversation about your product, the scope, and the fastest way to ship it.
              </p>

              <div className="flex flex-wrap gap-[8px] mb-[26px]">
                {['Architecture review', 'Scope & estimate', 'AI feasibility'].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-[6px] text-[12px] font-semibold text-[#cdd8d2] py-[6px] px-[12px] rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Sparkles size={12} color="var(--accent)" />
                    {chip}
                  </span>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  <div>
                    <label htmlFor="bc-name" className={labelClass}>Full name *</label>
                    <input
                      id="bc-name" required value={form.name} onChange={set('name')}
                      placeholder="Jane Founder" autoComplete="name"
                      className={inputClass} style={fieldBase} onFocus={focusAccent} onBlur={blurAccent}
                    />
                  </div>
                  <div>
                    <label htmlFor="bc-email" className={labelClass}>Email *</label>
                    <input
                      id="bc-email" type="email" required value={form.email} onChange={set('email')}
                      placeholder="jane@company.com" autoComplete="email"
                      className={inputClass} style={fieldBase} onFocus={focusAccent} onBlur={blurAccent}
                    />
                  </div>
                  <div>
                    <label htmlFor="bc-company" className={labelClass}>Company / startup</label>
                    <input
                      id="bc-company" value={form.company} onChange={set('company')}
                      placeholder="Optional" autoComplete="organization"
                      className={inputClass} style={fieldBase} onFocus={focusAccent} onBlur={blurAccent}
                    />
                  </div>
                  <div>
                    <label htmlFor="bc-type" className={labelClass}>Project type *</label>
                    <Select
                      id="bc-type"
                      value={form.projectType}
                      onChange={setValue('projectType')}
                      options={PROJECT_TYPES}
                      placeholder="Select one…"
                    />
                  </div>
                  <div>
                    <label htmlFor="bc-budget" className={labelClass}>Budget range</label>
                    <Select
                      id="bc-budget"
                      value={form.budget}
                      onChange={setValue('budget')}
                      options={BUDGETS}
                      placeholder="Select one…"
                    />
                  </div>
                  <div>
                    <label htmlFor="bc-timeline" className={labelClass}>Timeline</label>
                    <Select
                      id="bc-timeline"
                      value={form.timeline}
                      onChange={setValue('timeline')}
                      options={TIMELINES}
                      placeholder="Select one…"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bc-message" className={labelClass}>Project details *</label>
                    <textarea
                      id="bc-message" required value={form.message} onChange={set('message')}
                      rows={4} placeholder="What are you building? What's the goal, and where are you stuck?"
                      className={`${inputClass} resize-y min-h-[110px]`}
                      style={fieldBase} onFocus={focusAccent} onBlur={blurAccent}
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <p className="text-[14px] text-[#ff8a8a] mt-[16px] mb-0" role="alert">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-[24px] w-full flex items-center justify-center gap-[10px] font-bold text-[15.5px] text-[#04140d] py-[15px] rounded-[14px] transition-all duration-200 hover:-translate-y-[2px] cursor-pointer border-0 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
                  style={{
                    background: 'linear-gradient(135deg, color-mix(in srgb, var(--accent), #fff 12%), var(--accent))',
                    boxShadow: '0 12px 34px color-mix(in srgb, var(--accent) 42%, transparent)',
                  }}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <>Request my call →</>
                  )}
                </button>

                <p className="text-center text-[12.5px] text-[#647069] mt-[14px] mb-0">
                  I reply within 24 hours. Your details are never shared.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
