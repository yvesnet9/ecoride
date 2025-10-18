// 🌿 src/pages/AddTripPage.tsx — Création de trajet avec OpenRouteService + carte + favoris
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Navigation,
  Loader2,
  Map as MapIcon,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";
import { createTrip } from "../api/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// ✅ Correction ici : même nom que dans ton .env
const OPENROUTE_API_KEY = import.meta.env.VITE_OPENROUTESERVICE_KEY;

export default function AddTripPage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [ecoPoints, setEcoPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [savingFavorite, setSavingFavorite] = useState(false);

  // 🧮 Mise à jour automatique des ÉcoPoints
  useEffect(() => {
    if (distance) setEcoPoints(Math.round(distance / 5));
  }, [distance]);

  // 🌍 Calcul de distance via OpenRouteService
  const calculateDistance = async () => {
    if (!from || !to) return toast.error("Merci d’indiquer les deux villes 🌿");
    setCalculating(true);

    try {
      const coordinates = await getCoordinates([from, to]);
      if (coordinates.length !== 2) throw new Error("Coordonnées manquantes");

      const response = await fetch(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${OPENROUTE_API_KEY}`, // ✅ clé correcte
          },
          body: JSON.stringify({ coordinates }),
        }
      );

      const data = await response.json();

      if (data?.features?.[0]?.properties?.summary?.distance) {
        const distKm = data.features[0].properties.summary.distance / 1000;
        setDistance(Number(distKm.toFixed(1)));

        setRouteCoords(
          data.features[0].geometry.coordinates.map(([lon, lat]: [number, number]) => [
            lat,
            lon,
          ])
        );

        toast.success(`Distance calculée : ${distKm.toFixed(1)} km 🌍`);
      } else {
        throw new Error("Aucune distance trouvée");
      }
    } catch (err) {
      console.error("Erreur distance :", err);
      toast.error("Impossible de calculer la distance 😕");
    } finally {
      setCalculating(false);
    }
  };

  // 🔍 Géocodage : récupérer les coordonnées de chaque ville
  const getCoordinates = async (cities: string[]) => {
    const coords: [number, number][] = [];
    for (const city of cities) {
      const geoRes = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTE_API_KEY}&text=${encodeURIComponent(
          city
        )}`
      );
      const geoData = await geoRes.json();

      if (!geoData.features?.length)
        throw new Error(`Ville non trouvée : ${city}`);

      const [lon, lat] = geoData.features[0].geometry.coordinates;
      coords.push([lon, lat]);
    }
    return coords;
  };

  // 🚀 Soumission du trajet
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !date || !distance) {
      toast.error("Merci de remplir tous les champs 🌿");
      return;
    }

    setLoading(true);
    try {
      const tripData = { from, to, date, distance, ecoPoints };
      await createTrip(tripData);
      toast.success("Trajet ajouté avec succès 🎉");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Erreur création trajet :", err);
      toast.error("Erreur lors de l’ajout du trajet ❌");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Sauvegarde du trajet favori
  const saveAsFavorite = async () => {
    if (!from || !to || !distance) {
      toast.error("Veuillez calculer le trajet avant 🌱");
      return;
    }

    setSavingFavorite(true);
    try {
      const res = await fetch("http://localhost:5000/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ from, to, distance, ecoPoints }),
      });

      if (res.ok) toast.success("⭐ Trajet enregistré dans vos favoris !");
      else toast.error("Erreur lors de l’ajout en favori ❌");
    } catch (err) {
      console.error(err);
      toast.error("Erreur réseau ⚠️");
    } finally {
      setSavingFavorite(false);
    }
  };

  // 📍 Ajustement de la vue sur la carte
  function FitMapView({ coords }: { coords: [number, number][] }) {
    const map = useMap();
    useEffect(() => {
      if (coords.length > 1) map.fitBounds(coords);
    }, [coords, map]);
    return null;
  }

  const customMarker = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          🚗 Créer un nouveau trajet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Ville de départ */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Ville de départ
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400">
              <MapPin className="text-emerald-500 mr-2" />
              <input
                type="text"
                placeholder="Ex: Paris"
                className="w-full outline-none"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Indiquez la ville où commence votre trajet.
            </p>
          </div>

          {/* Ville d’arrivée */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Ville d’arrivée
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400">
              <Navigation className="text-emerald-500 mr-2" />
              <input
                type="text"
                placeholder="Ex: Lyon"
                className="w-full outline-none"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Indiquez la ville où se termine votre trajet.
            </p>
          </div>

          {/* Bouton calcul distance */}
          <button
            type="button"
            onClick={calculateDistance}
            disabled={calculating}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold py-2 rounded-xl shadow transition disabled:opacity-60 flex items-center justify-center"
          >
            {calculating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Calcul en cours...
              </>
            ) : (
              <>
                <MapIcon className="w-5 h-5 mr-2" /> Calculer la distance et afficher la carte
              </>
            )}
          </button>

          {/* Carte interactive */}
          {routeCoords.length > 0 && (
            <div className="h-64 rounded-xl overflow-hidden border mt-4">
              <MapContainer
                center={routeCoords[0]}
                zoom={6}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitMapView coords={routeCoords} />
                <Marker position={routeCoords[0]} icon={customMarker} />
                <Marker
                  position={routeCoords[routeCoords.length - 1]}
                  icon={customMarker}
                />
                <Polyline positions={routeCoords} color="green" />
              </MapContainer>
            </div>
          )}

          {/* Date et heure */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Date et heure de départ
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400">
              <Calendar className="text-emerald-500 mr-2" />
              <input
                type="datetime-local"
                className="w-full outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Utilisez les flèches pour naviguer dans le sélecteur de date.
            </p>
          </div>

          {/* Résumé distance + ÉcoPoints */}
          {distance && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <p className="text-emerald-700 font-semibold">
                Distance estimée : {distance} km
              </p>
              {ecoPoints !== null && (
                <p className="text-emerald-700 font-semibold mt-2">
                  Vous gagnerez environ {ecoPoints} ÉcoPoints 🌿
                </p>
              )}
            </div>
          )}

          {/* Boutons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-60"
            >
              {loading ? "Création du trajet..." : "Créer le trajet"}
            </button>

            <button
              type="button"
              onClick={saveAsFavorite}
              disabled={savingFavorite}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-60 flex items-center justify-center"
            >
              {savingFavorite ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Enregistrement...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" /> Sauvegarder ce trajet ⭐
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
