import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Mini composants locaux : Card et CardContent
function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow ${className}`}>{children}</div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// 🌿 Tableau de bord EcoRide
export default function DashboardEcoRide({ userId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Charger les statistiques depuis le backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/trips/user/${userId}/stats`
        );
        setStats(res.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des stats :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [userId]);

  // 💬 États d’attente et d’erreur
  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500">
        Chargement des statistiques...
      </p>
    );

  if (!stats)
    return (
      <p className="text-center mt-10 text-red-500">
        Erreur lors du chargement des données.
      </p>
    );

  // 📊 Données pour le graphique
  const data = [
    { name: "Trajets", value: stats.totalTrips },
    { name: "Distance (km)", value: stats.totalDistance },
    { name: "ÉcoPoints", value: stats.totalEcoPoints },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-emerald-600">
        🌿 Tableau de bord EcoRide
      </h1>

      {/* 🧍 Informations utilisateur */}
      <Card className="shadow-lg rounded-2xl border border-emerald-200">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {stats.user.name}
          </h2>
          <p className="text-gray-500">📧 {stats.user.email}</p>
          <p className="text-gray-700 mt-2">
            <strong>ÉcoPoints :</strong> {stats.user.ecoPoints}
          </p>
        </CardContent>
      </Card>

      {/* 🧾 Statistiques principales */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-emerald-50 p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-600">Trajets</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {stats.totalTrips}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-600">Distance totale (km)</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {stats.totalDistance}
          </p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl shadow">
          <h3 className="text-sm text-gray-600">Moyenne par trajet (km)</h3>
          <p className="text-2xl font-bold text-emerald-700">
            {stats.averageDistance}
          </p>
        </div>
      </div>

      {/* 📈 Graphique de synthèse */}
      <Card className="shadow-lg rounded-2xl border border-emerald-200">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            📊 Visualisation rapide
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
