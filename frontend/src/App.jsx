import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './features/auth/components/ProtectedRoute';
import { PageSkeleton } from './shared/components/PageSkeleton';

// Lazy loading the routes
const PortfolioPage = React.lazy(() => import('./features/portfolio/routes/PortfolioPage'));
const Login = React.lazy(() => import('./features/auth/routes/Login'));
const Dashboard = React.lazy(() => import('./features/admin/routes/Dashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-[#060907] flex items-center justify-center text-[var(--accent)] font-mono">Loading...</div>}>
        <Routes>
          {/* Public Route — full-page skeleton mirrors the portfolio layout
              so the real page swaps in without any visual shift */}
          <Route
            path="/"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <PortfolioPage />
              </Suspense>
            }
          />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;