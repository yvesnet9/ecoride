// 🌐 EcoRadar.jsx – Mini radar des véhicules proches
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function EcoRadar({ currentUser }) {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // 🔄 Mise à jour de la liste des conducteurs
    socket.on("activeDrivers", (data) => {
      setDrivers(data);
    });

    return () => {
      socket.off("activeDrivers");
    };
  }, []);

  // 🚘 Position de l'utilisateur (fictive pour la démo si GPS non actif)
  const userLat = currentUser?.lat || 48.8566;
  const userLng = currentUser?.lng || 2.3522;

  // Calcul distance (mètres)
  const getDistance = (a, b) => {
    const R = 6371e3;
    const φ1 = (a.lat * Math.PI) / 180;
    const φ2 = (b.lat * Math.PI) / 180;
    const Δφ = ((b.lat - a.lat) * Math.PI) / 180;
    const Δλ = ((b.lng - a.lng) * Math.PI) / 180;

    const x =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const d = 2 * R * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    return d;
  };

  // Filtrer les véhicules proches (moins de 200m)
  const nearbyDrivers = drivers
    .filter((d) => d.name !== currentUser?.name)
    .map((d) => ({
      ...d,
      distance: getDistance(
        { lat: userLat, lng: userLng },
        { lat: d.lat, lng: d.lng }
      ),
    }))
    .filter((d) => d.distance < 200);

  return (
    <div className="relative bg-gray-900 text-white p-4 rounded-2xl w-80 h-80 shadow-xl overflow-hidden">
      <h3 className="text-center text-green-400 font-bold mb-2">
        🌐 Radar Éco – Véhicules proches
      </h3>

      {/* Cercle radar animé */}
      <motion.div
        className="absolute rounded-full border-2 border-green-500 opacity-40"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2], opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          transformOrigin: "center",
        }}
      />

      {/* Véhicule principal */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-green-400 text-black w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md">
          🚴
        </div>
      </div>

      {/* Autres véhicules */}
      {nearbyDrivers.map((d, i) => {
        const angle = (i / nearbyDrivers.length) * 2 * Math.PI;
        const radius = (d.distance / 200) * 100; // proportionnel à la distance
        const x = 120 + radius * Math.cos(angle);
        const y = 120 + radius * Math.sin(angle);
        const color =
          d.vehicleType === "bike"
            ? "bg-green-300"
            : d.vehicleType === "car"
            ? "bg-blue-400"
            : "bg-yellow-300";

        return (
          <motion.div
            key={d.id}
            className={`absolute w-5 h-5 rounded-full ${color} flex items-center justify-center`}
            style={{ top: y, left: x }}
            whileHover={{ scale: 1.4 }}
          >
            <span
              className="text-xs"
              title={`${d.name} (${d.distance.toFixed(0)}m)`}
            >
              🚗
            </span>
          </motion.div>
        );
      })}

      {/* Légende bas */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400">
        {nearbyDrivers.length === 0
          ? "Aucun véhicule à proximité"
          : `${nearbyDrivers.length} conducteur(s) dans un rayon de 200m`}
      </div>
    </div>
  );
}
