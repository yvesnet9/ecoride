import jwt from "jsonwebtoken";

// ✅ Middleware de vérification du token + rôle
export const verifyToken = (roles = []) => {
  return (req, res, next) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant ou invalide." });
    }

    const token = header.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Vérifie le rôle si spécifié (admin, user, etc.)
      if (roles.length && !roles.includes(decoded.role)) {
        return res
          .status(403)
          .json({ message: "Accès refusé : rôle insuffisant." });
      }

      next();
    } catch (err) {
      console.error("Erreur JWT :", err);
      return res.status(401).json({ message: "Token invalide ou expiré." });
    }
  };
};
