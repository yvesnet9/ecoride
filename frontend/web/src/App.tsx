// 🌿 src/App.tsx – Application EcoRide avec transitions de pages ✨
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthCheck from "./hooks/useAuthCheck";

// ✅ Le Router est maintenant au niveau supérieur
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// ✅ On déplace useAuthCheck() ici, à l’intérieur du Router
function AppContent() {
  useAuthCheck();
  const location = useLocation();

  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="min-h-screen bg-gray-50"
        >
          <Routes location={location} key={location.pathname}>
            {/* 🌍 Pages publiques */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 👤 Utilisateur */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 👑 Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 🚫 404 */}
            <Route
              path="*"
              element={
                <div className="text-center mt-20 text-red-600 text-lg">
                  404 - Page non trouvée 🌍
                </div>
              }
            />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </>
  );
}
