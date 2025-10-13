import express from "express";
import Trip from "../models/Trip.js";

const router = express.Router();

// 🟢 Récupérer tous les trajets
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🟢 Ajouter un nouveau trajet
router.post("/", async (req, res) => {
  try {
    const { departure, destination, date, seats } = req.body;

    if (!departure || !destination || !date || !seats) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const newTrip = new Trip({ departure, destination, date, seats });
    await newTrip.save();

    res
      .status(201)
      .json({ message: "Trajet ajouté avec succès", trip: newTrip });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l’ajout du trajet" });
  }
});

export default router;
