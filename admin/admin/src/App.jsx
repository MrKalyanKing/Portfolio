import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, cssTransition } from "react-toastify";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { MobileNav } from "./components/MobileNav";
import { Dashboard } from "./components/Dashboard";
import { Settings } from "./components/Settings";
import { Projects } from "./components/Projects";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Editcon from "./components/Editcon";
import LoginPopUp from "./components/LoginPage/Login";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#edf0f7] text-on-surface font-body-md overflow-x-hidden relative flex flex-col">
      {/* High Contrast Atmospheric Background Ambient Mesh Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-gradient-to-br from-primary/30 via-secondary/25 to-purple-600/30 blur-[130px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-5%] left-[-10%] w-[55%] h-[55%] bg-gradient-to-tr from-secondary/30 via-indigo-500/25 to-blue-600/30 blur-[140px] rounded-full"></div>
        <div className="absolute top-[25%] left-[5%] w-[45%] h-[45%] bg-gradient-to-r from-blue-400/25 to-pink-500/20 blur-[110px] rounded-full"></div>
      </div>

      {/* Top Header */}
      <Header />


      {/* Main Grid Workspace */}
      <main className="pt-20 md:pt-24 pb-36 md:pb-24 px-3 sm:px-6 md:px-8 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 flex-1">
        <Sidebar />
        <div className="lg:col-span-9 space-y-8 md:space-y-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skill" element={<TechStack />} />
            <Route path="/contacts" element={<Editcon />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {/* Mobile Application Bottom Navigation Bar */}
      <MobileNav />
    </div>
  );
};

// Branded toast animation — springy slide-in from the right, soft slide-out
// (keyframes live in index.css next to the liquid-glass toast styles).
const brandToast = cssTransition({
  enter: "brand-toast-in",
  exit: "brand-toast-out",
  collapseDuration: 220,
});

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPopUp />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Single global toast host — pages just call toast.success/error */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        transition={brandToast}
        newestOnTop
        limit={3}
        closeOnClick
        pauseOnHover
        draggable={false}
        icon={true}
      />
    </Router>
  );
};

export default App;