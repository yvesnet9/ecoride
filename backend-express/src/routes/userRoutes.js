// 🌿 routes/userRoutes.js – Authentification & gestion des utilisateurs
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧩 Génère un token JWT
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || "super_secret_key_ecoRide_2025",
    { expiresIn: "3h" } // ⏰ session un peu plus longue
  );
};

/* ====================================================
   🧾 1️⃣ Inscription utilisateur
   ==================================================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifie si l'email existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "⚠️ Cet email est déjà utilisé." });
    }

    // Création du nouvel utilisateur
    const user = await User.create({
      name,
      email,
      password, // hash fait automatiquement dans le modèle
      role: role || "user",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "✅ Inscription réussie.",
      user,
      token,
    });
  } catch (error) {
    console.error("❌ Erreur lors de l’inscription :", error);
    res.status(500).json({ message: "Erreur serveur pendant l’inscription." });
  }
});

/* ====================================================
   🔐 2️⃣ Connexion utilisateur
   ==================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "❌ Identifiants incorrects." });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "❌ Identifiants incorrects." });

    const token = generateToken(user._id, user.role);

    res.json({
      message: "✅ Connexion réussie.",
      user,
      token,
    });
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

/* ====================================================
   🧠 3️⃣ Vérification du token (session active)
   ==================================================== */
router.get("/check", protect, async (req, res) => {
  res.json({
    message: "✅ Session valide.",
    user: req.user,
  });
});

/* ====================================================
   👑 4️⃣ Route test admin-only
   ==================================================== */
router.get("/admin-only", protect, adminOnly, (req, res) => {
  res.json({
    message: "👑 Accès admin autorisé.",
  });
});

/* ====================================================
   📋 5️⃣ Liste de tous les utilisateurs (admin)
   ==================================================== */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("❌ Erreur lors du chargement des utilisateurs :", error);
    res.status(500).json({
      message: "Erreur lors du chargement des utilisateurs.",
    });
  }
});

/* ====================================================
   🗑️ 6️⃣ Supprimer un utilisateur (admin)
   ==================================================== */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur introuvable." });

    await user.deleteOne();

    res.json({ message: "🗑️ Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("❌ Erreur suppression utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
});

/* ====================================================
   📊 7️⃣ Statistiques globales (admin dashboard)
   ==================================================== */
router.get("/stats/global", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const users = await User.find();

    const totalEcoPoints = users.reduce(
      (sum, u) => sum + (u.ecoPoints || 0),
      0
    );

    // 🔁 Import dynamique pour éviter import circulaire
    const Trip = (await import("../models/Trip.js")).default;
    const totalTrips = await Trip.countDocuments();

    res.json({
      totalUsers,
      totalTrips,
      totalEcoPoints,
    });
  } catch (error) {
    console.error("❌ Erreur stats globales :", error);
    res.status(500).json({
      message: "Erreur lors du chargement des statistiques globales.",
    });
  }
});

export default router;
