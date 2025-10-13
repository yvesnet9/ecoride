import Trip from "../models/Trip.js";

export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().populate("user", "name email");
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const createTrip = async (req, res) => {
  try {
    const { user, origin, destination, distanceKm } = req.body;
    const trip = new Trip({ user, origin, destination, distanceKm });
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la création du trajet" });
  }
};
