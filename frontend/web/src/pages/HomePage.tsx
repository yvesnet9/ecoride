import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
    width: "100%", // ✅ largeur totale
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)",
    fontFamily: "'Poppins', sans-serif",
    color: "#2e7d32",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box"
        }}
      >
        {/* 🌿 Titre principal */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ fontSize: "2rem", marginBottom: "10px" }}
        >
          🌿 Bienvenue sur <strong>Ecoride</strong>
        </motion.h1>

        {/* 💚 Sous-titre */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            fontSize: "1.1rem",
            color: "#388e3c",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          Simplifiez vos trajets, partagez vos voitures et cumulez des écoPoints
          pour un avenir plus vert 🌍💚
        </motion.p>

        {/* 🚗 Bouton d’accès */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "40px",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "8px",
            color: "white",
            padding: "12px 24px",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          🚗 Accéder au tableau de bord
        </motion.button>
      </div>
    </>
  );
}
