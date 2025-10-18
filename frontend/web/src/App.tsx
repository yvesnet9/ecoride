// 🌿 src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddTripPage from "./pages/AddTripPage";
import StyleGuide from "./pages/StyleGuide";
import FavoritesPage from "./pages/FavoritesPage"; // ⭐
import "leaflet/dist/leaflet.css";
import { UserProvider } from "./context/UserContext";
import useAuthCheck from "./hooks/useAuthCheck";
import useSessionTimer from "./hooks/useSessionTimer";

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

function AppContent() {
  useAuthCheck();
  useSessionTimer();
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
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-gray-50 mt-20"
        >
          <Routes location={location} key={location.pathname}>
            {/* 🌍 Pages principales */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/add-trip" element={<AddTripPage />} />
            <Route path="/style-guide" element={<StyleGuide />} />

            {/* ⭐ Page Favoris avec simulation dynamique */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />

            {/* 🚨 Page 404 */}
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
