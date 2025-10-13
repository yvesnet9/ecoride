// 🌱 src/pages/Dashboard.jsx – Tableau de bord utilisateur (Bob, etc.)
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import AddTripForm from "../components/AddTripForm";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function UserDashboard() {
  const [ecoPoints, setEcoPoints] = useState(0);
  const [trips, setTrips] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [evolution, setEvolution] = useState({
    trips: 0,
    distance: 0,
    ecoPoints: 0,
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // 📅 Calcul du numéro de semaine
  const getWeekNumber = (date) => {
    const d = new Date(date);
    const onejan = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  };

  // 🔁 Charger les trajets utilisateur
  const fetchTrips = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setTrips(data);

        const totalPts = data.reduce((sum, t) => sum + (t.ecoPoints || 0), 0);
        const totalKm = data.reduce((sum, t) => sum + (t.distanceKm || 0), 0);
        setEcoPoints(totalPts);
        setTotalDistance(totalKm);

        // 🧮 Statistiques hebdomadaires
        const currentWeek = getWeekNumber(new Date());
        const tripsThisWeek = data.filter(
          (t) => getWeekNumber(t.date) === currentWeek
        );
        const tripsLastWeek = data.filter(
          (t) => getWeekNumber(t.date) === currentWeek - 1
        );

        const currentStats = {
          trips: tripsThisWeek.length,
          distance: tripsThisWeek.reduce((s, t) => s + t.distanceKm, 0),
          ecoPoints: tripsThisWeek.reduce((s, t) => s + t.ecoPoints, 0),
        };
        const lastStats = {
          trips: tripsLastWeek.length,
          distance: tripsLastWeek.reduce((s, t) => s + t.distanceKm, 0),
          ecoPoints: tripsLastWeek.reduce((s, t) => s + t.ecoPoints, 0),
        };

        const calc = (curr, prev) =>
          prev === 0
            ? curr > 0
              ? 100
              : 0
            : Math.round(((curr - prev) / prev) * 100);

        setEvolution({
          trips: calc(currentStats.trips, lastStats.trips),
          distance: calc(currentStats.distance, lastStats.distance),
          ecoPoints: calc(currentStats.ecoPoints, lastStats.ecoPoints),
        });
      }
    } catch (error) {
      console.error("Erreur chargement trajets :", error);
    }
  };

  // ⚡ WebSocket – mise à jour temps réel
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on(`ecoPointsUpdated-${user._id}`, (data) => {
      toast.success(`${data.message} 🎉 (+${data.gained} pts)`);
      setEcoPoints(data.total);
      fetchTrips();
    });

    return () => socket.disconnect();
  }, [user._id]);

  useEffect(() => {
    fetchTrips();
  }, []);

  // 📈 Données pour le graphe
  const chartData = trips.map((t, i) => ({
    name: `Trajet ${i + 1}`,
    points: t.ecoPoints,
  }));

  // 🎨 Rendu des indicateurs (+ / -)
  const renderEvolution = (value) => {
    if (value > 0)
      return <span className="text-green-600 font-semibold">▲ +{value}%</span>;
    if (value < 0)
      return <span className="text-red-500 font-semibold">▼ {value}%</span>;
    return <span className="text-gray-400">–</span>;
  };

  // 🔥 Détecte une progression sur tous les plans
  const allPositive =
    evolution.trips > 0 && evolution.distance > 0 && evolution.ecoPoints > 0;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          🌱 Tableau de bord – {user.name}
        </h1>

        {/* 🔥 Badge de progression */}
        {allPositive && (
          <div className="bg-gradient-to-r from-green-400 to-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md animate-pulse">
            🔥 En progression cette semaine !
          </div>
        )}
      </div>

      {/* 🧾 Résumé chiffré avec évolution */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-100 text-green-800 rounded-xl py-4 text-center shadow-sm">
          <p className="text-sm uppercase font-semibold">Trajets totaux</p>
          <p className="text-2xl font-bold">{trips.length}</p>
          <p>{renderEvolution(evolution.trips)}</p>
        </div>

        <div className="bg-emerald-100 text-emerald-800 rounded-xl py-4 text-center shadow-sm">
          <p className="text-sm uppercase font-semibold">Distance parcourue</p>
          <p className="text-2xl font-bold">{totalDistance} km</p>
          <p>{renderEvolution(evolution.distance)}</p>
        </div>

        <div className="bg-teal-100 text-teal-800 rounded-xl py-4 text-center shadow-sm">
          <p className="text-sm uppercase font-semibold">ÉcoPoints cumulés</p>
          <p className="text-2xl font-bold">{ecoPoints}</p>
          <p>{renderEvolution(evolution.ecoPoints)}</p>
        </div>
      </div>

      {/* ➕ Formulaire d’ajout de trajet */}
      <AddTripForm onTripAdded={fetchTrips} />

      {/* 📊 Graphique d’évolution */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
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
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
