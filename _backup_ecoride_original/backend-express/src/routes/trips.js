import express from "express";
import Trip from "../models/Trip.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * 🧪 Route de test
 */
router.get("/ping", (req, res) => {
  console.log("✅ Route /api/trips/ping atteinte !");
  res.send("pong");
});

/**
 * ➕ Ajouter un trajet
 * POST /api/trips
 */
router.post("/", async (req, res) => {
  console.log("➡️  Requête POST /api/trips reçue !");
  try {
    const { origin, destination, distanceKm, userId } = req.body;
    console.log("🧠 Corps reçu :", req.body);

    // Vérification des champs requis
    if (!origin || !destination || !distanceKm || !userId) {
      console.warn("⚠️  Champs manquants !");
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    // Vérifier que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      console.warn("⚠️  Utilisateur non trouvé !");
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    console.log("✅ Utilisateur trouvé :", user.name);

    // Créer le trajet avec calcul automatique des écoPoints
    const trip = new Trip({ origin, destination, distanceKm, user: userId });
    console.log("🧮 Calcul ecoPoints et préparation du save...");
    await trip.save();
    console.log("✅ Trajet sauvegardé avec succès :", trip._id);

    // Mettre à jour le total d’écoPoints de l’utilisateur
    user.ecoPoints += trip.ecoPoints || 0;
    await user.save({ validateBeforeSave: false }); // ✅ évite l'erreur "password required"
    console.log("🌱 Points utilisateur mis à jour :", user.ecoPoints);

    res.status(201).json({
      message: "✅ Trajet ajouté avec succès",
      trip,
    });
  } catch (err) {
    console.error("❌ Erreur lors de l’ajout du trajet :", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 📋 Lister tous les trajets
 * GET /api/trips
 */
router.get("/", async (req, res) => {
  console.log("➡️  Requête GET /api/trips reçue !");
  try {
    const trips = await Trip.find().populate("user", "name email ecoPoints");
    console.log(`✅ ${trips.length} trajets récupérés`);
    res.json(trips);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des trajets :", err);
    res.status(500).json({
      error: "Erreur lors de la récupération des trajets",
    });
  }
});

/**
 * 📦 Récupérer tous les trajets d’un utilisateur spécifique
 * GET /api/trips/user/:userId
 */
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(`➡️  Requête GET /api/trips/user/${userId} reçue !`);

  try {
    // Vérifie que l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      console.warn("⚠️  Utilisateur non trouvé !");
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupère tous les trajets liés à cet utilisateur
    const trips = await Trip.find({ user: userId }).sort({ date: -1 });

    console.log(`✅ ${trips.length} trajets trouvés pour ${user.name}`);
    res.json({
      user: {
        name: user.name,
        email: user.email,
        ecoPoints: user.ecoPoints,
      },
      trips,
    });
  } catch (err) {
    console.error(
      "❌ Erreur lors de la récupération des trajets utilisateur :",
      err
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des trajets utilisateur",
    });
  }
});

/**
 * 📊 Statistiques des trajets d’un utilisateur
 * GET /api/trips/user/:userId/stats
 */
router.get("/user/:userId/stats", async (req, res) => {
  const { userId } = req.params;
  console.log(`➡️  Requête GET /api/trips/user/${userId}/stats reçue !`);

  try {
    // Vérifie si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      console.warn("⚠️  Utilisateur non trouvé !");
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Récupère tous les trajets de cet utilisateur
    const trips = await Trip.find({ user: userId });

    if (trips.length === 0) {
      console.log("ℹ️ Aucun trajet trouvé pour cet utilisateur.");
      return res.json({
        user: { name: user.name, ecoPoints: user.ecoPoints },
        totalTrips: 0,
        totalDistance: 0,
        totalEcoPoints: 0,
        averageDistance: 0,
      });
    }

    // Calcule les statistiques
    const totalDistance = trips.reduce((sum, t) => sum + t.distanceKm, 0);
    const totalEcoPoints = trips.reduce(
      (sum, t) => sum + (t.ecoPoints || 0),
      0
    );
    const averageDistance = totalDistance / trips.length;

    // Réponse
    res.json({
      user: {
        name: user.name,
        email: user.email,
        ecoPoints: user.ecoPoints,
      },
      totalTrips: trips.length,
      totalDistance: totalDistance.toFixed(2),
      totalEcoPoints,
      averageDistance: averageDistance.toFixed(2),
    });

    console.log(`📈 Stats calculées pour ${user.name} :
      - Trajets : ${trips.length}
      - Distance totale : ${totalDistance} km
      - Points gagnés : ${totalEcoPoints}
    `);
  } catch (err) {
    console.error("❌ Erreur lors du calcul des statistiques :", err);
    res.status(500).json({ error: "Erreur lors du calcul des statistiques" });
  }
});

export default router;
