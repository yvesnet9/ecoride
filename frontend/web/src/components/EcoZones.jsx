// 🌍 EcoZones.jsx – Zones écologiques dynamiques pour EcoRide
import { useEffect, useState } from "react";
import { Polygon, useMap } from "react-leaflet";
import { motion } from "framer-motion";

export default function EcoZones({ socket, currentPosition }) {
  const map = useMap();
  const [alert, setAlert] = useState(null);

  // 🟩 Zones écologiques (coordonnées d’exemple)
  const ecoZones = [
    {
      id: "zone_green_1",
      type: "green",
      name: "Parc Éco Citoyen",
      color: "green",
      coords: [
        [48.8566, 2.3522],
        [48.8572, 2.3602],
        [48.8536, 2.3615],
        [48.8529, 2.3539],
      ],
    },
    {
      id: "zone_red_1",
      type: "red",
      name: "Axe CO₂ élevé",
      color: "red",
      coords: [
        [48.8616, 2.3452],
        [48.8611, 2.3512],
        [48.8571, 2.3515],
        [48.8576, 2.3442],
      ],
    },
  ];

  // 🔁 Détection de l’entrée dans une zone rouge
  useEffect(() => {
    if (!currentPosition) return;

    ecoZones.forEach((zone) => {
      const inside = isInsidePolygon(currentPosition, zone.coords);

      if (inside && zone.type === "red") {
        // ⚠️ Déclenche alerte locale
        setAlert(`🚫 Zone rouge détectée : ${zone.name}`);
        setTimeout(() => setAlert(null), 5000);

        // 🔊 Émet une alerte globale via Socket.io
        if (socket) {
          socket.emit("zoneAlert", {
            zoneId: zone.id,
            type: "red",
            user: localStorage.getItem("userName") || "Conducteur inconnu",
            position: currentPosition,
          });
        }
      }
    });
  }, [currentPosition]);

  return (
    <>
      {/* 🛑 Alerte visuelle */}
      {alert && (
        <motion.div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg font-semibold z-[1000]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {alert}
        </motion.div>
      )}

      {/* 🟩 Affichage des zones sur la carte */}
      {ecoZones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.coords}
          pathOptions={{
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: zone.type === "red" ? 0.3 : 0.2,
          }}
        />
      ))}
    </>
  );
}

// 🧮 Fonction utilitaire : test si un point est dans un polygone
function isInsidePolygon(point, vs) {
  const x = point.lat,
    y = point.lng;
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    const xi = vs[i][0],
      yi = vs[i][1];
    const xj = vs[j][0],
      yj = vs[j][1];
    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
