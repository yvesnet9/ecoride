// 🌿 backend/src/routes/Users.js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();

/* ====================================================
   🔐 Middleware d’authentification par token (protect)
   ==================================================== */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Non autorisé : token manquant" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    next();
  } catch (err) {
    console.error("Erreur middleware protect:", err);
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
};

/* ====================================================
   🔑 Middleware Admin
   ==================================================== */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "Accès refusé : rôle administrateur requis" });
  }
};

/* ====================================================
   👤 Connexion utilisateur (POST /api/users/login)
   ==================================================== */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "✅ Connexion réussie",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ecoPoints: user.ecoPoints,
      },
    });

    console.log(`👤 Connexion réussie : ${user.email} (${user.role})`);
  } catch (err) {
    console.error("❌ Erreur lors de la connexion :", err.message);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
});

/* ====================================================
   ➕ Inscription utilisateur (POST /api/users/register)
   ==================================================== */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      ecoPoints: 0,
    });

    res.status(201).json({
      message: "✅ Utilisateur créé avec succès",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        ecoPoints: newUser.ecoPoints,
      },
    });

    console.log(`🆕 Nouvel utilisateur créé : ${email}`);
  } catch (err) {
    console.error("❌ Erreur lors de l’inscription :", err.message);
    res.status(500).json({ message: "Erreur interne serveur" });
  }
});

/* ====================================================
   📋 Récupérer tous les utilisateurs (Admin)
   ==================================================== */
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
    console.log(
      `👀 Admin ${req.user.email} a consulté la liste des utilisateurs`
    );
  } catch (err) {
    console.error("❌ Erreur GET /api/users :", err.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});

/* ====================================================
   🔍 Profil utilisateur connecté
   ==================================================== */
router.get("/me", protect, async (req, res) => {
  res.json(req.user);
});

export default router;
