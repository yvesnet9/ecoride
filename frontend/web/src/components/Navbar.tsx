import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // ✨ Animation du logo (zoom + fade)
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 💨 Animation de la barre de navigation
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // 💚 Animation de survol des liens
  const linkHover = {
    scale: 1.08,
    color: "#C8E6C9",
    textShadow: "0 0 6px rgba(76,175,80,0.6)",
    transition: { duration: 0.3 },
  };

  const linkStyle: React.CSSProperties = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    margin: "0 18px",
    padding: "6px 10px",
    borderRadius: "6px",
    position: "relative",
  };

  const activeLinkStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.25)",
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "60px",
        backgroundColor: "#2e7d32",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        padding: "0 40px",
        zIndex: 1000,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* 🌿 Logo + Titre avec animation */}
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate="visible"
        key={location.pathname} // relance l'animation à chaque changement de page
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <motion.img
          src="/Ecoride_logo.png"
          alt="Ecoride Logo"
          style={{
            height: "35px",
            borderRadius: "6px",
            boxShadow: "0 0 8px rgba(76,175,80,0.5)",
          }}
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: "white", fontSize: "18px", margin: 0 }}
        >
          Ecoride
        </motion.h1>
      </motion.div>

      {/* 🚀 Liens de navigation */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {[
          { path: "/", label: "Accueil" },
          { path: "/dashboard", label: "Tableau de bord" },
          { path: "/about", label: "À propos" },
        ].map(({ path, label }) => (
          <motion.div
            key={path}
            whileHover={linkHover}
            style={{
              display: "inline-block",
              position: "relative",
              margin: "0 10px",
            }}
          >
            <Link
              to={path}
              style={{
                ...linkStyle,
                ...(location.pathname === path ? activeLinkStyle : {}),
              }}
            >
              {label}
            </Link>

            {/* Soulignement animé */}
            <motion.span
              layoutId="underline"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "2px",
                backgroundColor: "#C8E6C9",
                borderRadius: "2px",
              }}
            ></motion.span>
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}
