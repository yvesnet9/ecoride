import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, MapPin, PlusCircle } from "lucide-react";
import { searchTrips } from "../api/api";

interface Trip {
  _id: string;
  from: string;
  to: string;
  date: string;
  distance: number;
  ecoPoints: number;
  user?: { name: string };
}

export default function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await searchTrips(from, to);
        setTrips(data);
      } catch (err: any) {
        console.error("Erreur recherche trajets :", err);
        setError(err.response?.data?.message || "Aucun trajet trouvé.");
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-emerald-600 text-center mb-6">
          🌍 Résultats pour {from || "?"} → {to || "?"}
        </h1>

        {/* --- État : Chargement --- */}
        {loading && (
          <div className="flex justify-center items-center py-10 text-gray-500">
            <Loader2 className="w-6 h-6 mr-2 animate-spin" /> Chargement des
            trajets...
          </div>
        )}

        {/* --- État : Aucun résultat --- */}
        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-gray-600 italic mb-4">{error}</p>
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition"
            >
              <PlusCircle className="w-4 h-4" /> Créer un trajet
            </button>
          </div>
        )}

        {/* --- État : Résultats trouvés --- */}
        {!loading && !error && trips.length > 0 && (
          <div className="grid gap-4">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="border rounded-xl p-4 hover:shadow-md transition bg-white flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg text-emerald-700">
                    <MapPin className="inline-block w-4 h-4 mr-1 text-emerald-500" />
                    {trip.from} → {trip.to}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(trip.date).toLocaleString("fr-FR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">
                    Conducteur : {trip.user?.name || "Inconnu"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-700">{trip.distance} km</p>
                  <p className="text-emerald-600 font-semibold">
                    +{trip.ecoPoints} ÉcoPoints
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Bouton retour --- */}
        <div className="text-center mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
