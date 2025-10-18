// 🌿 src/models/Favorite.js
import mongoose from "mongoose";

// 📦 Définition du schéma Favorite
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
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
      min: 0,
    },
    ecoPoints: {
      type: Number,
      min: 0,
    },
    coordinates: {
      type: [[Number]], // tableau de coordonnées [[lng, lat], ...]
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && arr.length >= 2;
        },
        message: "Le trajet doit contenir au moins deux coordonnées",
      },
    },
  },
  { timestamps: true }
);

// 🌍 Index unique : un utilisateur ne peut pas avoir deux fois le même trajet
favoriteSchema.index({ from: 1, to: 1, user: 1 }, { unique: true });

// ✅ Prévention du hot-reload Mongoose
const Favorite =
  mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);

export default Favorite;
