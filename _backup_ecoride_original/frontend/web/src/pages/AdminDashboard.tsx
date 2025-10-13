import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { getUsers, createTrip, getTrips } from "../api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [trip, setTrip] = useState({ departure: "", destination: "", date: "", seats: 0 });
  const [loading, setLoading] = useState(true);
  const [tripCount, setTripCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [progress, setProgress] = useState(0); // 🟩 barre de progression
  const [ref, inView] = useInView({ once: true });

  const MAX_TRIPS = 20; // 🎯 Objectif visuel de trajets

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsed = JSON.parse(storedUser);
      setAdmin(parsed);
      loadUsers();
      loadTrips();
    }
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Erreur chargement utilisateurs :", err);
    } finally {
      setLoading(false);
    }
  };

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
      setTripCount(data.length || 0);
      setProgress(Math.min((data.length / MAX_TRIPS) * 100, 100)); // mise à jour de la barre
    } catch (err) {
      console.error("Erreur chargement trajets :", err);
    }
  };

  // 🚀 Animation du compteur de trajets
  useEffect(() => {
    if (tripCount > 0) {
      let start = 0;
      const duration = 1000;
      const increment = Math.ceil(tripCount / 30);
      const interval = setInterval(() => {
        start += increment;
        if (start >= tripCount) {
          setDisplayCount(tripCount);
          clearInterval(interval);
        } else {
          setDisplayCount(start);
        }
      }, duration / 30);
      return () => clearInterval(interval);
    }
  }, [tripCount]);

  const handleCreateTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await createTrip(trip);
      alert("🚗 Trajet créé avec succès !");
      setTrip({ departure: "", destination: "", date: "", seats: 0 });
      loadTrips();
    } catch (err) {
      alert("Erreur lors de la création du trajet.");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!admin) return null;

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-green-50 to-white py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 💬 Message de bienvenue */}
      <motion.h1
        className="text-4xl font-bold text-green-700 mb-4"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        Bonjour {admin.name || "Admin"} 👋
      </motion.h1>

      {/* 🚘 Compteur animé */}
      <motion.p
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-lg text-green-600 mb-3"
      >
        🚘 Tu as déjà ajouté{" "}
        <motion.span
          key={displayCount}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="font-bold text-green-800 text-2xl"
        >
          {displayCount}
        </motion.span>{" "}
        trajet{displayCount > 1 ? "s" : ""} sur EcoRide 🌿
      </motion.p>

      {/* 📊 Barre de progression */}
      <div className="w-[90%] md:w-[400px] bg-green-100 rounded-full h-4 mb-8 overflow-hidden">
        <motion.div
          className="bg-green-600 h-4 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        ></motion.div>
      </div>

      <p className="text-sm text-gray-600 mb-8">
        Progression : {Math.round(progress)}% ({tripCount}/{MAX_TRIPS} trajets)
      </p>

      {/* 🚗 Formulaire de création de trajet */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-[90%] md:w-[600px] mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          🚗 Ajouter un trajet
        </h2>
        <form onSubmit={handleCreateTrip} className="space-y-3">
          <input
            type="text"
            placeholder="Départ"
            value={trip.departure}
            onChange={(e) => setTrip({ ...trip, departure: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-green-500"
            required
          />
          <input
            type="text"
            placeholder="Destination"
            value={trip.destination}
            onChange={(e) => setTrip({ ...trip, destination: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-green-500"
            required
          />
          <input
            type="date"
            value={trip.date}
            onChange={(e) => setTrip({ ...trip, date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-green-500"
            required
          />
          <input
            type="number"
            placeholder="Nombre de places"
            value={trip.seats}
            onChange={(e) => setTrip({ ...trip, seats: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-green-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Ajouter le trajet
          </button>
        </form>
      </div>

      {/* 👥 Liste des utilisateurs */}
      <div className="bg-white p-6 rounded-2xl shadow-md w-[90%] md:w-[600px]">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          👥 Liste des utilisateurs
        </h2>
        {loading ? (
          <p className="text-gray-500">Chargement...</p>
        ) : (
          <ul className="space-y-2 text-left">
            {users.map((u) => (
              <li
                key={u._id}
                className="border border-green-100 p-2 rounded-md hover:bg-green-50 transition"
              >
                <strong>{u.name}</strong> — {u.email}{" "}
                <span className="text-sm text-gray-500">
                  ({u.role || "user"})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔘 Déconnexion */}
      <button
        onClick={handleLogout}
        className="mt-10 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
      >
        Se déconnecter
      </button>
    </motion.div>
  );
}
