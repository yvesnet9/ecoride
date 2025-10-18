// 🌟 src/components/FavoriteButton.jsx
import { useState } from "react";
import { Star } from "lucide-react";
import { addFavorite, deleteFavorite } from "../api/favorites";
import toast from "react-hot-toast";

export default function FavoriteButton({ trip, token }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favId, setFavId] = useState(null);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await deleteFavorite(favId, token);
        setIsFavorite(false);
        toast.success("Favori supprimé ❌");
      } else {
        const newFav = await addFavorite(
          {
            from: trip.origin,
            to: trip.destination,
            distance: trip.distanceKm,
            ecoPoints: trip.ecoPoints,
            coordinates: trip.coordinates,
          },
          token
        );
        setFavId(newFav._id);
        setIsFavorite(true);
        toast.success("Ajouté aux favoris ⭐");
      }
    } catch (err) {
      console.error("Erreur Favori:", err);
      toast.error("Erreur lors de la mise à jour du favori");
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition ${
        isFavorite
          ? "bg-yellow-400 text-white"
          : "bg-gray-200 hover:bg-yellow-100"
      }`}
    >
      <Star
        className={`w-4 h-4 ${
          isFavorite ? "fill-white stroke-white" : "stroke-yellow-500"
        }`}
      />
      {isFavorite ? "Favori" : "Ajouter"}
    </button>
  );
}
