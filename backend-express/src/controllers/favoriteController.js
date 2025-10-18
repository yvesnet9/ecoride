// 🌿 src/controllers/favoriteController.js
import Favorite from "../models/Favorite.js";

// ✅ Ajouter un favori
export const addFavorite = async (req, res) => {
  try {
    const { from, to, distance, ecoPoints, coordinates } = req.body;
    const userId = req.user?.id;

    if (!userId)
      return res.status(401).json({ message: "Utilisateur non authentifié" });

    const favorite = await Favorite.create({
      user: userId,
      from,
      to,
      distance,
      ecoPoints,
      coordinates,
    });

    res.status(201).json(favorite);
  } catch (err) {
    console.error("❌ Erreur ajout favori :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Récupérer les favoris de l'utilisateur connecté
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId)
      return res.status(401).json({ message: "Utilisateur non authentifié" });

    const favorites = await Favorite.find({ user: userId }).sort({
      createdAt: -1,
    });
    res.json(favorites);
  } catch (err) {
    console.error("❌ Erreur récupération favoris :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
