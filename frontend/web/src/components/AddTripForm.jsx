// 🌿 src/components/AddTripForm.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddTripForm({ onTripAdded }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [distanceKm, setDistanceKm] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/trips",
        { origin, destination, distanceKm: Number(distanceKm) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message || "Trajet ajouté !");
      setOrigin("");
      setDestination("");
      setDistanceKm("");
      onTripAdded(); // 🔁 rafraîchit la liste après ajout
    } catch (err) {
      console.error("Erreur ajout trajet :", err);
      toast.error("❌ Erreur lors de l’ajout du trajet");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-3 mt-4"
    >
      <h2 className="text-lg font-semibold text-green-700">
        ➕ Ajouter un trajet
      </h2>
      <input
        type="text"
        placeholder="Origine"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Distance (km)"
        value={distanceKm}
        onChange={(e) => setDistanceKm(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white rounded p-2 hover:bg-green-700 transition"
      >
        🚗 Ajouter le trajet
      </button>
    </form>
  );
}
