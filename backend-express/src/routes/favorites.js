// 🌿 src/models/Favorite.js
import mongoose from "mongoose";

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
      type: [[Number]], // Tableau de [latitude, longitude]
      required: [true, "Les coordonnées du trajet sont requises"],
      validate: {
        validator: function (arr) {
          return arr.length >= 2; // au moins deux points
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

favoriteSchema.index({ user: 1 });

favoriteSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  },
});

// ✅ Correction ici : réutilise le modèle s’il est déjà compilé
export default mongoose.models.Favorite ||
  mongoose.model("Favorite", favoriteSchema);
