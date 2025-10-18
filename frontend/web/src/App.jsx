// 🌿 src/App.js — Application React EcoRide (frontend)
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
import AddTripPage from "./pages/AddTripPage";
import StyleGuide from "./pages/StyleGuide";
import ProtectedRoute from "./components/ProtectedRoute";
import "leaflet/dist/leaflet.css";
import { UserProvider } from "./context/UserContext";
import useAuthCheck from "./hooks/useAuthCheck";
import useSessionTimer from "./hooks/useSessionTimer";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
      <UserProvider>
            <AppContent />
                </UserProvider>
                  );
                  }

                  function AppContent() {
                    const location = useLocation();
                      useAuthCheck();
                        useSessionTimer();

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
                                                                                                                                            <Route path="/" element={<Home />} />
                                                                                                                                                        <Route path="/about" element={<AboutPage />} />
                                                                                                                                                                    <Route path="/login" element={<LoginPage />} />
                                                                                                                                                                                <Route path="/register" element={<RegisterPage />} />
                                                                                                                                                                                            <Route path="/style-guide" element={<StyleGuide />} />
                                                                                                                                                                                                        <Route path="/dashboard" element={<Dashboard />} />
                                                                                                                                                                                                                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                                                                                                                                                                                                                <Route path="/add-trip" element={<AddTripPage />} />
                                                       <Route path="/favorites" element={<FavoritesPage />} />
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
                                                                                                                                                                                                                                                                                                                                                                                        
