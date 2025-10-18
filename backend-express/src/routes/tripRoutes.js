// 🌿 src/routes/tripRoutes.js — Routes liées aux trajets EcoRide
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Trip from "../models/Trip.js";
import {
  createTrip,
  getUserTrips,
  simulateTrip,
} from "../controllers/tripController.js";

export default function tripRoutesFactory(io) {
  const router = express.Router();

  /* ============================================================
     🚗 Création d’un trajet
     ============================================================ */
  router.post("/", protect, async (req, res) => {
    console.log("🟢 [POST] /api/trips — Création d’un trajet");
    try {
      const trip = await createTrip(req, res, io);
      if (trip) {
        console.log("✅ Trajet créé avec succès :", trip._id);
        return res.status(201).json(trip);
      } else {
        console.log("⚠️ Aucun trajet créé — contrôleur n’a rien renvoyé");
        return res
          .status(400)
          .json({ message: "Impossible de créer le trajet ❌" });
      }
    } catch (err) {
      console.error("💥 Erreur création trajet :", err);
      res.status(500).json({ message: "Erreur interne serveur 💥" });
    }
  });

  /* ============================================================
     👤 Récupération des trajets de l’utilisateur connecté
     ============================================================ */
  router.get("/mine", protect, async (req, res) => {
    console.log(`🟢 [GET] /api/trips/mine — Utilisateur : ${req.user.email}`);
    try {
      const trips = await Trip.find({ user: req.user._id }).sort({ date: -1 });
      console.log(`✅ ${trips.length} trajets trouvés`);
      res.status(200).json(trips);
    } catch (err) {
      console.error("💥 Erreur getUserTrips :", err);
      res.status(500).json({ message: "Erreur interne serveur 💥" });
    }
  });

  /* ============================================================
     📊 Liste de tous les trajets (admin ou debug)
     ============================================================ */
  router.get("/all", protect, async (req, res) => {
    console.log("🟢 [GET] /api/trips/all — Liste complète (admin/dev)");
    try {
      const trips = await Trip.find()
        .populate("user", "name email role")
        .sort({ date: -1 });

      console.log(`✅ ${trips.length} trajets récupérés`);
      res.status(200).json(trips);
    } catch (err) {
      console.error("💥 Erreur getAllTrips :", err);
      res.status(500).json({ message: "Erreur interne serveur 💥" });
    }
  });

  /* ============================================================
     🌍 Recherche de trajets (par ville)
     ============================================================ */
  router.get("/search", async (req, res) => {
    console.log("🟢 [GET] /api/trips/search — Recherche de trajets");
    try {
      const { from, to } = req.query;
      const query = {};

      if (from) query.from = new RegExp(from, "i");
      if (to) query.to = new RegExp(to, "i");

      const trips = await Trip.find(query)
        .populate("user", "name email")
        .sort({ date: 1 });

      if (trips.length === 0) {
        console.log("⚠️ Aucun trajet trouvé pour la recherche");
        return res.status(404).json({ message: "Aucun trajet trouvé." });
      }

      console.log(`✅ ${trips.length} trajets trouvés`);
      res.json(trips);
    } catch (err) {
      console.error("💥 Erreur recherche trajets :", err);
      res
        .status(500)
        .json({ message: "Erreur serveur lors de la recherche 💥" });
    }
  });

  /* ============================================================
     🧪 Simulation de trajet (test écoPoints)
     ============================================================ */
  router.post("/simulate", async (req, res) => {
    console.log("🧪 [POST] /api/trips/simulate — Simulation de trajet");
    try {
      await simulateTrip(req, res);
    } catch (err) {
      console.error("💥 Erreur simulation trajet :", err);
      res.status(500).json({ message: "Erreur simulation trajet 💥" });
    }
  });

  return router;
}
