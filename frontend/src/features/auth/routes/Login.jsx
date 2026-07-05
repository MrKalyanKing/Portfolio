import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Example secure logic goes here for production
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060907] text-[#e7efe9] font-sans">
      <div className="p-[30px] rounded-[22px] max-w-sm w-full bg-[linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.1)] backdrop-blur-[24px]">
        <h2 className="font-display font-bold text-2xl mb-6 text-center text-[#f4f9f6]">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-[#a6b6ae]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          {error && <div className="text-[#ff5f57] text-sm">{error}</div>}
          <button 
            type="submit"
            className="w-full mt-2 py-3 rounded-[12px] font-bold text-[#04140d] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent,#34d399),#fff_12%),var(--accent,#34d399))] transition-transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
