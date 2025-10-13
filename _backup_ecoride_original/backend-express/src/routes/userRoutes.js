// 🌿 routes/userRoutes.js – Gestion des utilisateurs EcoRide
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ====================================================
   📝 Inscription d’un utilisateur
   ==================================================== */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "⚠️ Nom, email et mot de passe requis." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "❌ Cet email est déjà utilisé." });
    }

    const user = new User({
      name,
      email,
      password, // hash automatique dans le modèle User.js
      ecoPoints: 0,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      message: "✅ Utilisateur créé avec succès !",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Erreur d’inscription :", err);
    return res.status(500).json({ message: "❌ Erreur serveur." });
  }
});

/* ====================================================
   🔑 Connexion utilisateur
   ==================================================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "⚠️ Email et mot de passe requis." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "❌ Utilisateur introuvable." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role || "user" },
      process.env.JWT_SECRET || "super_secret_key_ecoRide_2025",
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "✅ Connexion réussie !",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
        ecoPoints: user.ecoPoints ?? 0,
      },
    });
  } catch (err) {
    console.error("Erreur de connexion :", err);
    return res.status(500).json({ message: "❌ Erreur serveur." });
  }
});

/* ====================================================
   👤 Profil utilisateur (protégé)
   ==================================================== */
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "❌ Utilisateur non trouvé." });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Erreur profil :", err);
    return res.status(500).json({ message: "❌ Erreur serveur." });
  }
});

/* ====================================================
   🧑‍💼 Route admin : liste de tous les utilisateurs
   ==================================================== */
router.get("/admin/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (err) {
    console.error("Erreur admin :", err);
    return res.status(500).json({ message: "❌ Erreur serveur." });
  }
});

export default router;
