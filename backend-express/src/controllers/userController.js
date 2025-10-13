// 🌿 controllers/userController.js – Gestion des utilisateurs EcoRide

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/* ====================================================
   📝 Inscription d’un nouvel utilisateur
   ==================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "⚠️ Tous les champs sont requis." });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "❌ Cet email est déjà enregistré." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "✅ Inscription réussie !",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Erreur registerUser :", err);
    res.status(500).json({ message: "❌ Erreur serveur" });
  }
};

/* ====================================================
   🔑 Connexion utilisateur
   ==================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "⚠️ Email et mot de passe requis." });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "❌ Utilisateur non trouvé." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "❌ Mot de passe incorrect." });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "super_secret_key_ecoRide_2025",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "✅ Connexion réussie !",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ecoPoints: user.ecoPoints,
      },
    });
  } catch (err) {
    console.error("Erreur loginUser :", err);
    res.status(500).json({ message: "❌ Erreur serveur" });
  }
};

/* ====================================================
   👤 Profil utilisateur connecté
   ==================================================== */
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "❌ Utilisateur non trouvé." });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Erreur getUserProfile :", err);
    res.status(500).json({ message: "❌ Erreur serveur" });
  }
};

/* ====================================================
   🧑‍💼 Liste de tous les utilisateurs (admin)
   ==================================================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Erreur getAllUsers :", err);
    res.status(500).json({ message: "❌ Erreur serveur" });
  }
};

