import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    origin: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    distanceKm: {
      type: Number,
      required: true,
      min: [0.1, "La distance doit être supérieure à 0 km"],
    },
    ecoPoints: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["planifié", "en cours", "terminé"],
      default: "planifié",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🔢 Calcul automatique des écoPoints
tripSchema.pre("save", function (next) {
  if (this.isModified("distanceKm")) {
    this.ecoPoints = Math.round(this.distanceKm * 2); // 2 points par km
  }
  next();
});

// 🌍 Méthode utilitaire : CO₂ économisé (kg)
tripSchema.methods.co2SavedKg = function () {
  return +(this.distanceKm * 0.12).toFixed(2);
};

// ⚡ Index pour requêtes rapides
tripSchema.index({ user: 1, date: -1 });

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
