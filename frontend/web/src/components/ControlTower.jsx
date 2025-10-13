// 🛰️ ControlTower.jsx – Panneau de contrôle EcoRide en temps réel
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ControlTower({ socket }) {
  const [drivers, setDrivers] = useState([]);

  // Stockage des anciennes positions pour calculer la vitesse
  const [previousPositions, setPreviousPositions] = useState({});

  useEffect(() => {
    if (!socket) return;

    socket.on("activeDrivers", (data) => {
      const updated = data.map((driver) => {
        const prev = previousPositions[driver.name];

        let speed = 0;
        let lastSeen = new Date(driver.timestamp || Date.now());

        if (prev) {
          const dist =
            Math.sqrt(
              Math.pow(driver.lat - prev.lat, 2) +
                Math.pow(driver.lng - prev.lng, 2)
            ) * 111000; // mètres
          const timeDiff = (Date.now() - prev.time) / 1000; // secondes
          speed = timeDiff > 0 ? (dist / timeDiff) * 3.6 : 0; // km/h
        }

        return {
          ...driver,
          speed: speed.toFixed(1),
          lastSeen,
        };
      });

      setDrivers(updated);

      // Met à jour les positions précédentes
      const newPrev = {};
      updated.forEach((d) => {
        newPrev[d.name] = { lat: d.lat, lng: d.lng, time: Date.now() };
      });
      setPreviousPositions(newPrev);
    });

    return () => socket.off("activeDrivers");
  }, [socket, previousPositions]);

  const getSpeedColor = (speed) => {
    if (speed < 5) return "bg-green-100 border-green-400";
    if (speed < 20) return "bg-yellow-100 border-yellow-400";
    return "bg-red-100 border-red-500";
  };

  const formatTimeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 5) return "à l’instant";
    if (diff < 60) return `il y a ${diff}s`;
    if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
    return `il y a ${Math.floor(diff / 3600)}h`;
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-xl p-4 border border-green-200 overflow-y-auto"
      style={{ height: "400px", width: "300px" }}
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      <h2 className="text-lg font-semibold text-green-700 mb-3">
        🛰️ Control Tower
      </h2>

      {drivers.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucun conducteur connecté.</p>
      ) : (
        <ul className="space-y-2">
          {drivers.map((d, i) => (
            <motion.li
              key={i}
              className={`border-l-4 p-3 rounded-md ${getSpeedColor(d.speed)}`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-green-700">
                  {d.name || "Anonyme"}
                </span>
                <span className="text-xs text-gray-500 italic">
                  {formatTimeAgo(d.lastSeen)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                🚗 {d.vehicleType || "véhicule"} —{" "}
                <span className="font-bold text-green-800">{d.speed} km/h</span>
              </p>
              <p className="text-xs text-gray-500">
                Lat: {d.lat?.toFixed(4)} | Lng: {d.lng?.toFixed(4)}
              </p>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
