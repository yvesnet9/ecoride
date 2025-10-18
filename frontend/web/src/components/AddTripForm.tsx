// 🌿 src/components/AddTripForm.tsx – Formulaire de création de trajet EcoRide
import { useState } from "react";
import toast from "react-hot-toast";
import { createTrip } from "../api/api";

export default function AddTripForm({ userId }: { userId: string }) {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [distance, setDistance] = useState<number | "">("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // ✅ barre verte animée

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const co2Saved = (Number(distance) * 0.21).toFixed(2); // estimation CO₂
      const res = await createTrip({
        userId,
        distance,
        co2Saved,
        departureCity,
        arrivalCity,
        date,
      });

      toast.success("�� Trajet enregistré avec succès !");
      console.log("Trajet créé :", res);

      // ✅ Barre verte temporaire
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);

      // Reset des champs
      setDepartureCity("");
      setArrivalCity("");
      setDistance("");
      setDate("");
    } catch (err) {
      console.error("Erreur création trajet :", err);
      toast.error("❌ Impossible d’enregistrer le trajet.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 max-w-md mx-auto"
    >
      {/* 🌆 Ville de départ */}
      <div>
        <label
          htmlFor="departureCity"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Ville de départ
        </label>
        <input
          id="departureCity"
          type="text"
          placeholder="Ville de départ"
          value={departureCity}
          onChange={(e) => setDepartureCity(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
          aria-describedby="departureHelp"
        />
        <p id="departureHelp" className="text-sm text-gray-500 mt-1">
          Indiquez la ville où commence votre trajet.
        </p>
      </div>

      {/* 🏙️ Ville d’arrivée */}
      <div>
        <label
          htmlFor="arrivalCity"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Ville d’arrivée
        </label>
        <input
          id="arrivalCity"
          type="text"
          placeholder="Ville d’arrivée"
          value={arrivalCity}
          onChange={(e) => setArrivalCity(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
          aria-describedby="arrivalHelp"
        />
        <p id="arrivalHelp" className="text-sm text-gray-500 mt-1">
          Indiquez la ville où se termine votre trajet.
        </p>
      </div>

      {/* 📏 Distance */}
      <div>
        <label
          htmlFor="distance"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Distance (km)
        </label>
        <input
          id="distance"
          type="number"
          placeholder="Ex : 12.5"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
        />
      </div>

      {/* ⏰ Date et heure */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Date et heure de départ
        </label>
        <input
          id="date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
          required
          aria-describedby="dateHelp"
        />
        <p id="dateHelp" className="text-sm text-gray-500 mt-1">
          Utilisez les flèches pour naviguer dans le sélecteur de date.
        </p>
      </div>

      {/* 🚀 Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full py-2 font-medium transition disabled:opacity-50"
      >
        {isLoading ? "Enregistrement..." : "Ajouter le trajet"}
      </button>

      {/* ✅ Barre verte de confirmation */}
      {showConfirmation && (
        <div className="h-1 bg-emerald-500 mt-3 rounded-full animate-pulse transition-all"></div>
      )}
    </form>
  );
}

