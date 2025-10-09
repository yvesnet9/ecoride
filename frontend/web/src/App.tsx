import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AboutPage from "./pages/AboutPage";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 🕒 Affiche le loader pendant 2 secondes au démarrage
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ⏳ Affiche le loader si l'app charge
  if (loading) return <Loader />;

  // 🌿 Variantes d’animation pour le contenu
  const pageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.98,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  // 🌈 Couleur de fond selon la page
  const getBackground = () => {
    switch (location.pathname) {
      case "/":
        return "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)"; // Home
      case "/dashboard":
        return "linear-gradient(180deg, #ffffff 0%, #f1f8e9 100%)"; // Dashboard
      case "/about":
        return "linear-gradient(180deg, #f9fff9 0%, #e8f5e9 100%)"; // About
      default:
        return "#ffffff";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* 🎨 Conteneur avec fond animé */}
      <motion.div
        key={location.pathname + "-bg"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: getBackground(),
          minHeight: "100vh",
          width: "100%",
          transition: "background 0.8s ease-in-out",
        }}
      >
        {/* 🌿 Contenu des pages */}
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
