// 🌿 middleware/authMiddleware.js – Protection des routes EcoRide
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ====================================================
   🔐 Middleware de protection – vérifie le token JWT
   ==================================================== */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "⚠️ Accès refusé : token manquant." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secret_key_ecoRide_2025"
    );

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    next();
  } catch (err) {
    console.error("❌ Erreur protect :", err);
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

/* ====================================================
   👑 Middleware adminOnly – limite aux administrateurs
   ==================================================== */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // autorisé
  } else {
    return res
      .status(403)
      .json({ message: "🚫 Accès refusé : réservé aux administrateurs." });
  }
};
