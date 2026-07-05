import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Settings } from "./components/Settings";
import { Projects } from "./components/Projects";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";

import Editcon from "./components/Editcon";
import LoginPopUp from "./components/LoginPage/Login";
const App = ()=> {
  return (
    <Router>
      <div className="flex w-full min-h-screen bg-gray-50">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience/>} />
            <Route path="/skill" element={<TechStack/>}/>
            <Route path="/contacts" element={<Editcon/>}/>
            <Route path="/login" element={<LoginPopUp/>}/>
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
 export default App