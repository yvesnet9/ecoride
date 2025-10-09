import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import tripRoutes from "./routes/trips.js"; // ✅ à garder ici

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 🌿 Connexion MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecoride")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

// 📡 Routes API
app.get("/health", (req, res) => res.json({ status: "ok" }));
app.use("/users", userRoutes);
app.use("/trips", tripRoutes); // ✅ après "app" est défini

// 🚀 Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🌿 Ecoride API est en ligne sur le port ${PORT}`));
