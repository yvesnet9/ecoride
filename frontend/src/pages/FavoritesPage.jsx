// 🌿 src/pages/FavoritesPage.jsx
import { useEffect, useState } from "react";
import { getFavorites, deleteFavorite } from "../api/favorites";
import { Trash2, Star, Map, Pause, Play } from "lucide-react";
import toast from "react-hot-toast";
import FavoritesMap from "../components/FavoritesMap";
import FavoriteDetailsPanel from "../components/FavoriteDetailsPanel";
import TripSimulation from "../components/TripSimulation";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedFavorite, setSelectedFavorite] = useState(null);
  const [ecoProgress, setEcoProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [simulation, setSimulation] = useState(null);
  const token = localStorage.getItem("token");

  // 🟢 Charger les favoris
  useEffect(() => {
    if (token) {
      getFavorites(token)
        .then(setFavorites)
        .catch(() => toast.error("Erreur de chargement des favoris"));
    }
  }, [token]);

  // ❌ Supprimer un favori
  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id, token);
      setFavorites((prev) => prev.filter((f) => f._id !== id));
      if (selectedFavorite?._id === id) setSelectedFavorite(null);
      toast.success("Favori supprimé ❌");
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  // 🚀 Démarrer la simulation
  const handleStartTrip = async (favorite) => {
    if (!favorite.coordinates?.length) {
      toast.error("Aucune coordonnée disponible pour ce trajet 🗺️");
      return;
    }

    setIsSimulating(true);
    setEcoProgress(0);
    setPaused(false);
    toast.success(`🚗 Trajet ${favorite.from} → ${favorite.to} lancé !`);

    setSelectedFavorite({ ...favorite, isSimulating: true });

    try {
      const res = await fetch(`/api/routes/${favorite._id}/simulate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.coordinates?.length) {
        toast.error("Aucune donnée de simulation reçue ❌");
        setIsSimulating(false);
        return;
      }

      setSimulation({
        coordinates: data.coordinates,
        onProgress: (p) => setEcoProgress(p),
        onComplete: handleSimulationComplete,
      });
    } catch (err) {
      console.error("Erreur de simulation :", err);
      toast.error("Erreur lors de la simulation du trajet ❌");
      setIsSimulating(false);
    }
  };

  // ⏸️ / ▶️ Pause / Reprise
  const togglePause = () => {
    if (!isSimulating) return;
    setPaused((prev) => {
      const newState = !prev;
      toast(newState ? "⏸️ Trajet en pause" : "▶️ Reprise du trajet");
      return newState;
    });
  };

  // 🎉 Fin du trajet
  const handleSimulationComplete = () => {
    toast.success("🎉 Trajet terminé !");
    setIsSimulating(false);
    setPaused(false);
    setSimulation(null);
    setSelectedFavorite((prev) => ({ ...prev, isSimulating: false }));
  };

  // 🌿 Calcul écoPoints actuels
  const ecoPointsGagnes =
    selectedFavorite?.ecoPoints && ecoProgress
      ? Math.round((ecoProgress / 100) * selectedFavorite.ecoPoints)
      : 0;

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1F2A44] mb-6 flex items-center gap-2">
          <Star className="text-yellow-400 w-6 h-6" /> Mes Favoris
        </h1>

        {favorites.length === 0 ? (
          <p className="text-gray-500">Aucun favori pour le moment 🌱</p>
        ) : (
          <>
            {/* 🗂️ Liste des favoris */}
            <ul className="space-y-4 mb-10">
              {favorites.map((fav) => (
                <li
                  key={fav._id}
                  className={`flex items-center justify-between p-4 bg-white shadow rounded-2xl border transition ${
                    selectedFavorite?._id === fav._id
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-100"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-[#1F2A44]">
                      {fav.from} → {fav.to}
                    </p>
                    <p className="text-sm text-gray-500">
                      {fav.distance} km — {fav.ecoPoints} écoPoints
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setSelectedFavorite(
                          selectedFavorite?._id === fav._id ? null : fav
                        )
                      }
                      className={`flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium transition ${
                        selectedFavorite?._id === fav._id
                          ? "bg-yellow-400 text-white"
                          : "bg-gray-200 hover:bg-yellow-100"
                      }`}
                    >
                      <Map className="w-4 h-4" />
                      Voir sur la carte
                    </button>
                    <button
                      onClick={() => handleDelete(fav._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* 🌿 Barre d’état textuelle */}
            {isSimulating && (
              <div className="mb-3 flex justify-between items-center bg-eco-light px-4 py-2 rounded-xl text-sm font-medium text-eco-dark shadow">
                <span>
                  {paused
                    ? "⏸️ Simulation en pause"
                    : `🚗 Simulation en cours — ${ecoProgress.toFixed(0)}%`}
                </span>
                <span>
                  {ecoPointsGagnes} / {selectedFavorite?.ecoPoints} écoPoints 🌿
                </span>
              </div>
            )}

            {/* 🗺️ Carte + Simulation */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <FavoritesMap
                favorites={favorites}
                selectedFavorite={selectedFavorite}
                simulation={simulation}
              />

              {isSimulating && selectedFavorite && (
                <>
                  <TripSimulation
                    coordinates={
                      simulation?.coordinates || selectedFavorite.coordinates
                    }
                    onProgress={setEcoProgress}
                    onComplete={handleSimulationComplete}
                    paused={paused}
                  />

                  {/* 🎮 Boutons Pause / Reprise */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={togglePause}
                      className={`px-3 py-2 rounded-lg text-white shadow transition ${
                        paused
                          ? "bg-eco-green hover:bg-eco-dark"
                          : "bg-yellow-400 hover:bg-yellow-500"
                      }`}
                    >
                      {paused ? (
                        <Play className="w-5 h-5 inline-block mr-1" />
                      ) : (
                        <Pause className="w-5 h-5 inline-block mr-1" />
                      )}
                      {paused ? "Reprendre" : "Pause"}
                    </button>
                  </div>
                </>
              )}

              {/* 🧭 Barre de progression écoPoints */}
              {isSimulating && (
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-full shadow overflow-hidden h-4">
                  <div
                    className="bg-eco-green h-4 transition-all duration-200"
                    style={{ width: `${ecoProgress}%` }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* 🌟 Panneau latéral */}
      <div className="h-[600px] rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
        <FavoriteDetailsPanel
          favorite={selectedFavorite}
          onDelete={handleDelete}
          onStart={handleStartTrip}
          ecoProgress={ecoProgress}
          isSimulating={isSimulating}
        />
      </div>
    </div>
  );
}
