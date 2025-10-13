import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  ecoPoints: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

// Calcul automatique des éco-points selon la distance
tripSchema.pre("save", function (next) {
  this.ecoPoints = Math.round(this.distanceKm * 2); // 2 points par km
  next();
});

const Trip = mongoose.model("Trip", tripSchema);
export default Trip;
