import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

// ➕ Ajouter un trajet
router.post("/", async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json({ message: "Trajet ajouté 🚗✅", trip });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📋 Lister tous les trajets
router.get("/", async (req, res) => {
  const trips = await Trip.find().populate("user", "name email");
  res.json(trips);
});

// ❌ Supprimer un trajet
router.delete("/:id", async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: "Trajet supprimé 🗑️" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
