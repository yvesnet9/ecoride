// 🌿 src/routes/favoriteRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Favorite from "../models/Favorite.js";

const router = express.Router();

// 📋 GET /api/favorites — Liste tous les favoris de l’utilisateur connecté
router.get("/", protect, async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(favorites);
  } catch (error) {
    console.error("Erreur GET /favorites :", error);
    res.status(500).json({
      message: "Erreur lors du chargement des favoris ❌",
    });
  }
});

// ➕ POST /api/favorites — Ajouter un nouveau favori (avec vérification des doublons)
router.post("/", protect, async (req, res) => {
  try {
    const { from, to, distance, ecoPoints, coordinates } = req.body;

    // 🔍 Vérifie si ce favori existe déjà pour cet utilisateur
    const existing = await Favorite.findOne({
      from,
      to,
      user: req.user._id,
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Ce trajet est déjà dans vos favoris ⭐" });
    }

    const favorite = await Favorite.create({
      from,
      to,
      distance,
      ecoPoints,
      coordinates,
      user: req.user._id,
    });

    res.status(201).json(favorite);
  } catch (error) {
    console.error("Erreur POST /favorites :", error);
    res.status(400).json({ message: "Erreur lors de l’ajout du favori ❌" });
  }
});

// ❌ DELETE /api/favorites/:id — Supprimer un favori spécifique
router.delete("/:id", protect, async (req, res) => {
  try {
    const favorite = await Favorite.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favori introuvable ❌" });
    }

    res.json({ message: "Favori supprimé avec succès ✅" });
  } catch (error) {
    console.error("Erreur DELETE /favorites :", error);
    res.status(500).json({
      message: "Erreur lors de la suppression du favori 💥",
    });
  }
});

export default router;
