import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// 🧩 Import des routes
import userRoutes from "./routes/users.js";
import tripRoutes from "./routes/trips.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🌍 Route de test simple
app.get("/", (req, res) => {
  console.log("➡️  GET / reçu !");
  res.send("🌱 API EcoRide fonctionne ✅");
});

// 🔗 Connexion à MongoDB
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecoride";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) =>
    console.error("❌ Erreur de connexion MongoDB :", err.message)
  );

// 🧭 Logs pour suivre le chargement des routes
console.log("📦 Chargement des routes : users et trips...");

// 🔀 Routes principales
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutes);

console.log("✅ Routes /api/users et /api/trips prêtes.");

// 🚀 Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌍 Serveur EcoRide lancé sur le port ${PORT}`);
});
