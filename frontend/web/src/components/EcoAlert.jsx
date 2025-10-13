// 🚨 EcoAlert.jsx – Bandeau d’alerte pollution dynamique
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function EcoAlert() {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // 🛰️ Écoute les mises à jour des zones écologiques
    socket.on("ecoZonesUpdate", (zones) => {
      const redZones = zones.filter((z) => z.type === "red");
      if (redZones.length > 0) {
        setAlert({
          title: "⚠️ Alerte pollution active",
          message: `Une ou plusieurs zones rouges détectées (${redZones.length})`,
          color: "bg-red-600",
        });
      } else {
        setAlert(null);
      }
    });

    // 🛑 Alerte directe si un conducteur entre dans une zone rouge
    socket.on("zoneAlertBroadcast", (data) => {
      setAlert({
        title: "🚨 Entrée dans une zone rouge",
        message: data.message,
        color: "bg-red-700",
      });

      // Disparition automatique au bout de 10s
      setTimeout(() => setAlert(null), 10000);
    });

    return () => {
      socket.off("ecoZonesUpdate");
      socket.off("zoneAlertBroadcast");
    };
  }, []);

  return (
    <AnimatePresence>
      {alert && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className={`${alert.color} text-white text-center py-3 shadow-lg fixed top-0 left-0 w-full z-50`}
        >
          <h2 className="text-lg font-bold">{alert.title}</h2>
          <p className="text-sm">{alert.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
