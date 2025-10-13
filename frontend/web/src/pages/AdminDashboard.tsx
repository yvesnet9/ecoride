// 👑 src/pages/AdminDashboard.jsx – Tableau de bord administrateur EcoRide
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrips: 0,
    totalEcoPoints: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // 🔁 Récupère les stats globales
  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/stats/global", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Erreur fetchStats:", err);
    }
  }, [token]);

  // 🔁 Charge les données principales admin
  const fetchAdminData = useCallback(async () => {
    try {
      const [usersRes, tripsRes, statsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/trips/all", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/users/stats/global", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setUsers(usersRes.data);
      setTrips(tripsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("❌ Erreur admin dashboard :", err);
      setError("Impossible de charger les données administrateur");
    } finally {
      setLoading(false);
    }
  }, [token]);

  // 🗑️ Supprimer un utilisateur
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?"))
      return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("✅ Utilisateur supprimé !");
      fetchStats();
    } catch (err) {
      console.error("Erreur suppression utilisateur :", err);
      toast.error("❌ Erreur lors de la suppression.");
    }
  };

  // 🗑️ Supprimer un trajet
  const handleDeleteTrip = async (tripId) => {
    if (!window.confirm("Supprimer ce trajet ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/trips/${tripId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips((prev) => prev.filter((t) => t._id !== tripId));
      toast.success("🗑️ Trajet supprimé !");
      fetchStats();
    } catch (err) {
      console.error("Erreur suppression trajet :", err);
      toast.error("❌ Erreur lors de la suppression du trajet.");
    }
  };

  // 🌐 WebSocket temps réel
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("newTripAdded", (data) => {
      toast.success(
        `🆕 Nouveau trajet ajouté par ${data.user}: ${data.origin} → ${data.destination} (+${data.ecoPoints} pts)`
      );
      fetchAdminData(); // 🔁 met à jour stats + trajets
    });

    socket.on("tripDeleted", (data) => {
      toast(`🚮 Trajet supprimé (id: ${data.id})`);
      fetchAdminData();
    });

    return () => socket.disconnect();
  }, [fetchAdminData]);

  // 🔹 Chargement initial
  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) return <p className="text-center mt-10">Chargement des données...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        👑 Tableau de bord Administrateur
      </h1>

      {/* === Statistiques globales === */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl font-semibold">
          👥 Utilisateurs : {stats.totalUsers}
        </div>
        <div className="bg-emerald-100 text-emerald-800 px-6 py-3 rounded-xl font-semibold">
          🛣️ Trajets : {stats.totalTrips}
        </div>
        <div className="bg-teal-100 text-teal-800 px-6 py-3 rounded-xl font-semibold">
          🌱 ÉcoPoints cumulés : {stats.totalEcoPoints}
        </div>
      </div>

      {/* === Liste des utilisateurs === */}
      <h2 className="text-xl font-semibold mb-3">👥 Liste des utilisateurs</h2>
      <table className="w-full border-collapse text-left mb-8">
        <thead>
          <tr className="bg-green-50 text-green-800">
            <th className="p-3 border-b">Nom</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Rôle</th>
            <th className="p-3 border-b">ÉcoPoints</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-green-50">
              <td className="p-3 border-b">{u.name}</td>
              <td className="p-3 border-b">{u.email}</td>
              <td className="p-3 border-b">{u.role}</td>
              <td className="p-3 border-b text-green-700 font-semibold">
                {u.ecoPoints}
              </td>
              <td className="p-3 border-b text-center">
                <button
                  onClick={() => handleDeleteUser(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* === Liste des trajets === */}
      <h2 className="text-xl font-semibold mb-3">🛣️ Liste des trajets</h2>
      {trips.length === 0 ? (
        <p className="text-gray-500">Aucun trajet enregistré.</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-green-50 text-green-800">
              <th className="p-3 border-b">Utilisateur</th>
              <th className="p-3 border-b">Origine</th>
              <th className="p-3 border-b">Destination</th>
              <th className="p-3 border-b">Distance (km)</th>
              <th className="p-3 border-b">ÉcoPoints</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id} className="hover:bg-green-50">
                <td className="p-3 border-b">{trip.user?.name || "Inconnu"}</td>
                <td className="p-3 border-b">{trip.origin}</td>
                <td className="p-3 border-b">{trip.destination}</td>
                <td className="p-3 border-b">{trip.distanceKm}</td>
                <td className="p-3 border-b text-green-700 font-semibold">
                  +{trip.ecoPoints}
                </td>
                <td className="p-3 border-b">
                  {new Date(trip.date).toLocaleDateString("fr-FR")}
                </td>
                <td className="p-3 border-b text-center">
                  <button
                    onClick={() => handleDeleteTrip(trip._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
