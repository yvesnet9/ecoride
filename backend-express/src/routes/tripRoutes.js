// 🌿 routes/tripRoutes.js – Gestion des trajets
import express from "express";
import Trip from "../models/Trip.js";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

export default function tripRoutesFactory(io) {
  const router = express.Router();

  // 🟢 Récupérer les trajets de l'utilisateur connecté
  router.get("/", protect, async (req, res) => {
    try {
      const trips = await Trip.find({ user: req.user.id }).sort({ date: -1 });
      res.json(trips);
    } catch (error) {
      console.error("❌ Erreur GET /api/trips :", error);
      res
        .status(500)
        .json({ message: "Erreur lors du chargement des trajets." });
    }
  });

  // 🟢 Récupérer tous les trajets (admin)
  router.get("/all", protect, adminOnly, async (req, res) => {
    try {
      const trips = await Trip.find()
        .populate("user", "name email")
        .sort({ date: -1 });
      res.json(trips);
    } catch (error) {
      console.error("❌ Erreur GET /api/trips/all :", error);
      res
        .status(500)
        .json({ message: "Erreur lors du chargement des trajets." });
    }
  });

  // 🟢 Ajouter un nouveau trajet (et incrémenter les écoPoints)
  router.post("/", protect, async (req, res) => {
    try {
      const { origin, destination, distanceKm } = req.body;

      if (!origin || !destination || !distanceKm) {
        return res.status(400).json({ message: "⚠️ Champs manquants" });
      }

      const ecoPoints = Math.round(distanceKm * 2);

      const newTrip = new Trip({
        user: req.user.id,
        origin,
        destination,
        distanceKm,
        ecoPoints,
        status: "planifié",
        date: new Date(),
      });

      await newTrip.save();

      // 🧮 Mise à jour des points utilisateur
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $inc: { ecoPoints } },
        { new: true }
      );

      // 📡 Émission WebSocket temps réel
      io.emit("newTripAdded", {
        user: user.name,
        origin,
        destination,
        ecoPoints,
      });

      res.status(201).json({
        message: `✅ Trajet ajouté (+${ecoPoints} écoPoints)`,
        trip: newTrip,
      });
    } catch (err) {
      console.error("❌ Erreur POST /api/trips :", err);
      res.status(500).json({ message: "Erreur lors de l’ajout du trajet." });
    }
  });

  // 🗑️ Supprimer un trajet (admin uniquement)
  router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.id);
      if (!trip)
        return res.status(404).json({ message: "Trajet introuvable." });

      await trip.deleteOne();
      io.emit("tripDeleted", { id: req.params.id }); // 🔔 informe le dashboard admin

      res.json({ message: "🗑️ Trajet supprimé avec succès." });
    } catch (error) {
      console.error("❌ Erreur suppression trajet :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression du trajet." });
    }
  });

  return router;
}
