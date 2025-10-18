// 🌿 src/pages/Dashboard.jsx
import { useState } from "react";
import { addFavorite } from "../api/favorites";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  // exemple de trajet par défaut
  const [trip] = useState({
    from: "Paris",
    to: "Versailles",
    distance: 17.5,
    ecoPoints: 42,
    coordinates: [
      [48.8566, 2.3522],
      [48.8049, 2.1204],
    ],
  });

  const handleAddFavorite = async () => {
    try {
      if (!token) {
        toast.error("Veuillez vous connecter pour enregistrer un favori");
        return;
      }

      await addFavorite(trip, token);
      toast.success(`⭐ Favori ajouté : ${trip.from} → ${trip.to}`);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l’ajout du favori");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4 text-center">
      <h1 className="text-2xl font-bold text-[#1F2A44] mb-4">
        Tableau de bord 🌍
      </h1>

      <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
        <p className="text-lg font-semibold text-[#1F2A44] mb-2">
          {trip.from} → {trip.to}
        </p>
        <p className="text-gray-600 mb-4">
          {trip.distance} km — {trip.ecoPoints} écoPoints
        </p>

        <button
          onClick={handleAddFavorite}
          className="flex items-center justify-center gap-2 mx-auto bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full font-medium transition"
        >
          <Star className="w-4 h-4" /> Ajouter aux favoris
        </button>
      </div>
    </div>
  );
}
