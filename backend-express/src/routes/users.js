// 🌿 routes/users.js – Routes liées aux utilisateurs EcoRide
import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Trip from "../models/Trip.js";

const router = express.Router();

/* ====================================================
   🔑 Authentification
   ==================================================== */

// 📝 Inscription
router.post("/register", registerUser);

// 🔐 Connexion
router.post("/login", loginUser);

// 👤 Profil utilisateur connecté
router.get("/me", protect, getUserProfile);

/* ====================================================
   🧑‍💼 Gestion des utilisateurs (Admin)
   ==================================================== */

// 📋 Liste complète des utilisateurs
router.get("/", protect, adminOnly, getAllUsers);

// 📊 Statistiques globales du tableau de bord admin
router.get("/stats/global", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTrips = await Trip.countDocuments();
    const ecoStats = await User.aggregate([
      { $group: { _id: null, totalEcoPoints: { $sum: "$ecoPoints" } } },
    ]);

    res.json({
      totalUsers,
      totalTrips,
      totalEcoPoints: ecoStats[0]?.totalEcoPoints || 0,
    });
  } catch (err) {
    console.error("Erreur /stats/global :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/* ====================================================
   🌍 Fallback (non trouvée)
   ==================================================== */
router.use((req, res) => {
  res.status(404).json({ message: "Route utilisateur non trouvée" });
});

export default router;

