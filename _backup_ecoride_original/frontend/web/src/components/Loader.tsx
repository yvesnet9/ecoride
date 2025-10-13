import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background:
          "linear-gradient(180deg, #e8f5e9 0%, #ffffff 100%)", // fond vert doux
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* 🌿 Logo Ecoride tournant */}
      <motion.img
        src="/Ecoride_logo.png"
        alt="Ecoride Logo"
        initial={{ scale: 0.6, rotate: 0, opacity: 0 }}
        animate={{
          scale: [0.6, 1, 0.9, 1],
          rotate: [0, 360],
          opacity: 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: "100px",
          borderRadius: "16px",
          boxShadow: "0 0 18px rgba(76,175,80,0.5)",
        }}
      />

      {/* 🌍 Texte animé */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: "#2e7d32",
          marginTop: "25px",
          fontWeight: 600,
          letterSpacing: "0.5px",
        }}
      >
        Ecoride se met en route...
      </motion.h2>
    </div>
  );
}
