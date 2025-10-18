// 🌿 controllers/tripController.js – Gestion des trajets EcoRide
import Trip from "../models/Trip.js";
import User from "../models/User.js";

/* ====================================================
   🚗 Créer un nouveau trajet
   ==================================================== */
export const createTrip = async (req, res, io) => {
  try {
    const { userId, distance, co2Saved } = req.body;

    if (!userId || !distance || !co2Saved) {
      return res.status(400).json({ message: "Champs requis manquants." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    // Calcul des points : 1 écoPoint pour chaque kg de CO₂ économisé
    const ecoPointsEarned = Math.round(co2Saved);
    user.ecoPoints += ecoPointsEarned;

    // Sauvegarde du trajet
    const trip = new Trip({ userId, distance, co2Saved });
    await trip.save();

    // Mise à jour du profil utilisateur
    await user.save();

    // ⚡ Envoi temps réel via Socket.io
    if (io) io.emit("ecoPointsUpdated", { userId, newEcoPoints: user.ecoPoints });

    res.status(201).json({
      message: "Trajet enregistré avec succès !",
      trip,
      ecoPointsEarned,
      totalEcoPoints: user.ecoPoints,
    });
  } catch (error) {
    console.error("Erreur createTrip:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ====================================================
   🚴 Récupérer les trajets d’un utilisateur
   ==================================================== */
export const getUserTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Trip.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Erreur getUserTrips:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ====================================================
   🧪 Simuler un trajet (pour test)
   ==================================================== */
export const simulateTrip = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });

    const newEcoPoints = user.ecoPoints + 15;
    user.ecoPoints = newEcoPoints;
    await user.save();

    res.json({ success: true, ecoPoints: newEcoPoints });
  } catch (error) {
    console.error("Erreur simulateTrip:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/* ====================================================
   🧭 getAllTrips (Admin uniquement)
   ==================================================== */
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(trips);
  } catch (error) {
    console.error("Erreur getAllTrips:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
