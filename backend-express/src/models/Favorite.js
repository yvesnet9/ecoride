// 🌿 src/models/Favorite.js
import mongoose from "mongoose";

// 📦 Définition du schéma Favorite
const favoriteSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: [true, "Le point de départ est requis"],
      trim: true,
    },
    to: {
      type: String,
      required: [true, "Le point d’arrivée est requis"],
      trim: true,
    },
    distance: {
      type: Number,
      required: [true, "La distance est requise"],
      min: 0,
    },
    ecoPoints: {
      type: Number,
      required: [true, "Les écoPoints sont requis"],
      min: 0,
    },
    coordinates: {
      type: [[Number]], // Tableau de coordonnées [[lng, lat], ...]
      required: [true, "Les coordonnées du trajet sont requises"],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 2;
        },
        message: "Le trajet doit contenir au moins deux coordonnées",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Utilisateur associé requis"],
    },
  },
  { timestamps: true }
);

// ✅ Vérifie si le modèle existe déjà (évite l’erreur en hot-reload)
const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
