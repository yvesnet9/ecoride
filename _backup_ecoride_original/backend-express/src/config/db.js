import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion MongoDB réussie !"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));
