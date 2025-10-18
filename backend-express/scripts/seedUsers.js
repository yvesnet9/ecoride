// 🌿 backend-express/scripts/seedUsers.js – Réinitialisation des utilisateurs de test EcoRide
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../src/models/User.js";
 // ⚠️ Vérifie que ton modèle s'appelle bien "User.js"

dotenv.config();

const users = [
  {
    name: "Charlie",
    email: "charlie@ecoride.io",
    password: "test1234",
    role: "user",
    ecoPoints: 120,
  },
  {
    name: "Admin",
    email: "admin@ecoride.io",
    password: "admin123",
    role: "admin",
    ecoPoints: 500,
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("📦 Connecté à MongoDB");

    await User.deleteMany();
    console.log("🧹 Collection users vidée");

    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashedPassword });
      console.log(`👤 ${u.name} créé avec succès`);
    }

    console.log("🌿 Données de test réinitialisées !");
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors du seed :", err);
    process.exit(1);
  }
};

seedUsers();

