// 🌿 src/pages/Dashboard.jsx – Tableau de bord utilisateur EcoRide
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import AddTripForm from "../components/AddTripForm";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [trips, setTrips] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 🔄 Charger les trajets utilisateur
  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setTrips(data);
        const total = data.reduce((sum, t) => sum + (t.ecoPoints || 0), 0);
        setEcoPoints(total);
      }
    } catch (error) {
      console.error("Erreur de chargement des trajets :", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // ⚡ WebSocket – mise à jour en temps réel
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on(`ecoPointsUpdated-${user._id}`, (data) => {
      toast.success(`${data.message} 🎉 (+${data.gained} pts)`);
      setEcoPoints(data.total);
    });

    socket.on("newTripAdded", (data) => {
      if (data.user === user.name) fetchTrips();
    });

    return () => socket.disconnect();
  }, [user._id]);

  // 📊 Données pour le graphe
  const chartData = trips.map((t, index) => ({
    name: `Trajet ${index + 1}`,
    points: t.ecoPoints,
  }));

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* 🌱 En-tête */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        🌱 Tableau de bord – {user?.name}
      </h1>

      <p className="text-lg mb-6">
        Total ÉcoPoints :{" "}
        <span className="font-semibold text-emerald-700">{ecoPoints}</span>
      </p>

      {/* ➕ Formulaire d’ajout de trajet */}
      <AddTripForm onTripAdded={fetchTrips} />

      {/* 📈 Évolution des ÉcoPoints */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          📊 Évolution de vos ÉcoPoints
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500">Aucun trajet pour le moment.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="points"
                stroke="#16a34a"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 🧾 Historique des trajets */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          🧾 Historique de vos trajets
        </h2>

        {trips.length === 0 ? (
          <p className="text-gray-500">Aucun trajet enregistré.</p>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-green-50 text-green-800">
                <th className="p-3 border-b">Origine</th>
                <th className="p-3 border-b">Destination</th>
                <th className="p-3 border-b">Distance (km)</th>
                <th className="p-3 border-b">ÉcoPoints</th>
                <th className="p-3 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} className="hover:bg-green-50">
                  <td className="p-3 border-b">{trip.origin}</td>
                  <td className="p-3 border-b">{trip.destination}</td>
                  <td className="p-3 border-b">{trip.distanceKm}</td>
                  <td className="p-3 border-b text-green-700 font-semibold">
                    +{trip.ecoPoints}
                  </td>
                  <td className="p-3 border-b">
                    {new Date(trip.date).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
