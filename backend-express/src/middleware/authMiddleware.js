// 🌿 backend/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

/* ======================================================
   🔐 Middleware protect — Vérifie le token JWT et charge l’utilisateur
   ====================================================== */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;

    // 1️⃣ Vérifie la présence de l’en-tête Authorization
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn("🚫 Aucun token JWT trouvé dans l’en-tête Authorization");
      return res
        .status(401)
        .json({ message: "Accès refusé : token manquant ❌" });
    }

    // 2️⃣ Extraction du token
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.warn("⚠️ Aucun token trouvé après 'Bearer'");
      return res.status(401).json({ message: "Token manquant ❌" });
    }

    // 3️⃣ Vérification du token JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtErr) {
      console.error("❌ Erreur de vérification du JWT :", jwtErr.message);
      if (jwtErr.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expiré ❌" });
      }
      return res.status(401).json({ message: "Token invalide ❌" });
    }

    // 4️⃣ Vérifie que le token contient bien un id
    if (!decoded?.id) {
      console.warn("⚠️ Token décodé sans identifiant :", decoded);
      return res.status(401).json({ message: "Token invalide ❌" });
    }

    // 5️⃣ Recherche de l’utilisateur associé
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.warn("🚫 Aucun utilisateur trouvé pour ce token !");
      return res.status(404).json({ message: "Utilisateur introuvable ❌" });
    }

    // 6️⃣ Injection de l’utilisateur dans la requête
    req.user = user;
    console.log(`✅ Utilisateur authentifié : ${user.email} (${user.role})`);

    // 7️⃣ Passage au middleware suivant
    next();
  } catch (err) {
    console.error("💥 Erreur inattendue dans le middleware protect :", err);
    // ✅ On renvoie une réponse pour éviter tout blocage de requête
    res
      .status(500)
      .json({
        message: "Erreur interne d’authentification 💥",
        error: err.message,
      });
  }
};

/* ======================================================
   👑 Middleware adminOnly — accès restreint
   ====================================================== */
export const adminOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      console.log(`🛡️ Accès admin autorisé : ${req.user.email}`);
      return next();
    }
    console.warn(`⛔ Accès refusé (non-admin) : ${req.user?.email}`);
    return res.status(403).json({ message: "Accès refusé : admin requis ❌" });
  } catch (err) {
    console.error("💥 Erreur dans adminOnly :", err);
    return res
      .status(500)
      .json({ message: "Erreur interne du middleware admin 💥" });
  }
};
