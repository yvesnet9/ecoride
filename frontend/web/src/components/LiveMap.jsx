// 🚗 LiveMap.jsx — Carte GPS en temps réel avec mode simulation amélioré
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:5000");

// 🧭 Icônes des véhicules
const icons = {
  user: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
  others: new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
};

export default function LiveMap() {
  const [activeDrivers, setActiveDrivers] = useState([]);
  const [simulate, setSimulate] = useState(true); // 🧪 Simulation activée par défaut
  const [position, setPosition] = useState({
    lat: 48.8566,
    lng: 2.3522,
    name: "Yves",
    vehicleType: "🚴",
  });

  // ✅ Vérification de connexion Socket.io
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connecté à Socket.io :", socket.id);
    });
    return () => socket.off("connect");
  }, []);

  // 🌍 Suivi GPS réel (si dispo)
  useEffect(() => {
    if (!simulate && navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition((p) => ({ ...p, lat: latitude, lng: longitude }));

        socket.emit("updateLocation", {
          name: position.name,
          lat: latitude,
          lng: longitude,
          vehicleType: position.vehicleType,
        });
      });
    }
  }, [simulate, position]);

  // 🧪 Simulation automatique multi-véhicules
  useEffect(() => {
    if (simulate) {
      const simulatedDrivers = [
        { name: "Yves", vehicleType: "🚴", lat: 48.8566, lng: 2.3522 },
        { name: "Léo", vehicleType: "🚗", lat: 48.8575, lng: 2.3422 },
        { name: "Clara", vehicleType: "🛵", lat: 48.8526, lng: 2.3622 },
      ];

      let tick = 0;
      const interval = setInterval(() => {
        const updated = simulatedDrivers.map((d, i) => ({
          ...d,
          lat: d.lat + Math.sin((tick + i * 20) / 50) * 0.0005,
          lng: d.lng + Math.cos((tick + i * 20) / 50) * 0.0005,
        }));
        tick++;

        // 🛰️ Envoi au serveur
        updated.forEach((d) => {
          socket.emit("updateLocation", {
            name: d.name,
            lat: d.lat,
            lng: d.lng,
            vehicleType: d.vehicleType,
          });
        });

        // 🖥️ Affichage direct même sans retour du serveur
        setActiveDrivers(updated);
        console.log("📡 Positions simulées envoyées :", updated);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [simulate]);

  // 🔄 Réception des conducteurs actifs
  useEffect(() => {
    socket.on("activeDrivers", (drivers) => {
      console.log("🚗 Conducteurs reçus :", drivers);
      setActiveDrivers(drivers);
    });

    return () => socket.off("activeDrivers");
  }, []);

  return (
    <div className="mt-10 bg-green-50 rounded-xl shadow-inner p-4">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-green-700">
          🚘 Carte GPS en temps réel {simulate && "(simulation active)"}
        </h3>
        <button
          onClick={() => setSimulate(!simulate)}
          className={`px-4 py-1 rounded-full text-white ${
            simulate ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {simulate ? "Désactiver" : "Activer"} la simulation
        </button>
      </div>

      {/* Carte */}
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={14}
        style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {activeDrivers.map((d, idx) => (
          <Marker
            key={idx}
            position={[d.lat, d.lng]}
            icon={d.name === "Yves" ? icons.user : icons.others}
          >
            <Popup>
              <b>
                {d.vehicleType} {d.name}
              </b>
              <br />
              Lat: {d.lat.toFixed(5)}, Lng: {d.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
