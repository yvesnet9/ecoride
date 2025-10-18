// 🌿 src/config/db.js – Connexion MongoDB simplifiée
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecoride";

    // ✅ Nouvelle syntaxe sans options dépréciées
    await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB connecté : ${MONGO_URI}`);
  } catch (error) {
    console.error("❌ Erreur connexion MongoDB :", error.message);
    process.exit(1); // Stoppe le serveur si la DB échoue
  }
};

export default connectDB;
