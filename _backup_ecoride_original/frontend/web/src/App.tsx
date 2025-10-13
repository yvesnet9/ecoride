import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardEcoRide from "./components/DashboardEcoRide";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || !user) return <Navigate to="/login" replace />;
  const parsedUser = JSON.parse(user);

  if (role && parsedUser.role !== role)
    return <Navigate to="/dashboard" replace />;

  return children;
}

export default function App() {
  const userId = "68e863460ff51ea9ebce5f47"; // ID de test

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Barre de navigation */}
      <Navbar />

      {/* ✅ Contenu principal */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ecoride"
            element={
              <ProtectedRoute>
                <DashboardEcoRide userId={userId} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* ✅ Footer unique */}
      <Footer />
    </div>
  );
}
