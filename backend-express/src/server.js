// 🌿 src/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ✅ Import des routes nécessaires
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

import tripRoutesFactory from "./routes/tripRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();
const app = express();

// ======================================================
// 🧩 CONFIGURATION DE BASE
// ======================================================

// 🌍 CORS — autorise ton frontend local (Vite/React)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL, // utile en production
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// 🧰 Middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// ======================================================
// 🗄️ CONNEXION MONGODB
// ======================================================
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ecoride";

mongoose
  .connect(mongoURI)
  .then(() => console.log(`✅ MongoDB connecté avec succès : ${mongoURI}`))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// ======================================================
// 🚦 ROUTES PRINCIPALES
// ======================================================
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/trips", tripRoutesFactory());
app.use("/api/test", testRoutes);

// ======================================================
// 🌍 ROUTE PAR DÉFAUT
// ======================================================
app.get("/", (req, res) => {
  res.send("🌍 API EcoRide en ligne et opérationnelle !");
});

// ======================================================
// ⚠️ GESTION DES ERREURS
// ======================================================

// 404 : route non trouvée
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée ❌" });
});

// Erreur serveur générique
app.use((err, req, res, next) => {
  console.error("💥 Erreur serveur :", err.stack);
  res.status(500).json({ message: "Erreur interne du serveur 💥" });
});

// ======================================================
// 🚀 LANCEMENT DU SERVEUR
// ======================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur EcoRide en ligne sur http://0.0.0.0:${PORT}`);
  console.log("✅ CORS autorisé pour :", allowedOrigins.join(", "));
});
