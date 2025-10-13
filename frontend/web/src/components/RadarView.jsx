// 🌐 RadarView.jsx – Mini radar EcoRide (vue sonar)
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function RadarView({ self, nearbyDrivers }) {
  const radarRef = useRef(null);

  // ⚙️ Dimensions du radar
  const size = 200;
  const radius = size / 2;

  // 🌍 Fonction utilitaire pour placer un point selon la distance et l'angle
  const getPosition = (driver, index) => {
    if (!self || !driver) return { x: radius, y: radius };

    const dx = driver.lat - self.lat;
    const dy = driver.lng - self.lng;

    // conversion simple (diff lat/lng * facteur)
    const distance = Math.sqrt(dx * dx + dy * dy) * 111000; // km -> m
    const angle = index * (360 / nearbyDrivers.length) * (Math.PI / 180);
    const scale = Math.min(distance / 100, 1); // max radar radius à 100m

    const x = radius + Math.cos(angle) * radius * scale;
    const y = radius + Math.sin(angle) * radius * scale;
    return { x, y };
  };

  return (
    <div className="relative flex justify-center mt-8">
      <div
        ref={radarRef}
        className="relative bg-green-900 rounded-full overflow-hidden shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* 🌊 Animation d'onde sonar */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-green-400 opacity-60"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeOut",
          }}
        />

        {/* 🟢 Ton véhicule */}
        <div
          className="absolute bg-green-300 border-2 border-white rounded-full"
          style={{
            width: 12,
            height: 12,
            top: radius - 6,
            left: radius - 6,
          }}
          title="Vous"
        />

        {/* 🚗 Autres véhicules */}
        {nearbyDrivers.map((d, i) => {
          const pos = getPosition(d, i);
          return (
            <motion.div
              key={i}
              className="absolute bg-yellow-400 rounded-full border border-white"
              style={{
                width: 10,
                height: 10,
                top: pos.y - 5,
                left: pos.x - 5,
              }}
              title={d.name}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
            />
          );
        })}
      </div>
    </div>
  );
}
