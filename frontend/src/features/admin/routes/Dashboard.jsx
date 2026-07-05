import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8 bg-[#060907] text-[#e7efe9] font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-display font-bold text-3xl gradient-text">Admin Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="p-8 rounded-[22px] bg-[linear-gradient(155deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] border border-[rgba(255,255,255,0.1)]">
          <h2 className="text-xl font-bold mb-4">Portfolio Configuration</h2>
          <p className="text-[#a6b6ae] mb-6">
            This dashboard is protected by authentication. In a full production setup, you would manage your portfolio configuration (`portfolioData.js`) directly from here, connected to your backend API.
          </p>
          <div className="font-mono text-sm p-4 bg-[rgba(0,0,0,0.3)] rounded-lg text-[#cdd8d2]">
            {"// Configuration mapping will appear here"}
            <br />
            {"// e.g., editing Hero details, Projects, etc."}
          </div>
        </div>
      </div>
    </div>
  );
}
