import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #ffffff 0%, #e8f5e9 100%)",
          fontFamily: "'Poppins', sans-serif",
          padding: "100px 20px",
          textAlign: "center",
          color: "#2e7d32",
        }}
      >
        <h1>🌱 À propos d’Ecoride</h1>
        <p style={{ maxWidth: "700px", margin: "20px auto", lineHeight: 1.6 }}>
          Ecoride est une plateforme de mobilité partagée qui promeut un mode de
          transport plus écologique et collaboratif. Notre mission est de
          simplifier les trajets du quotidien tout en réduisant l’empreinte
          carbone. 🚗💚
        </p>

        <p style={{ maxWidth: "700px", margin: "20px auto", lineHeight: 1.6 }}>
          Ce projet a été développé dans le cadre de la formation{" "}
          <strong>Développeur Web & Web Mobile – Studi 2025</strong>, en
          utilisant les technologies modernes du web : React, Node.js,
          Express et MongoDB.
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
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
          ⬅️ Retour
        </motion.button>
      </motion.div>
    </>
  );
}
