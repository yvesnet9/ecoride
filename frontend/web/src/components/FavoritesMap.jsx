// 🌿 src/components/FavoritesMap.jsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import TripSimulation from "./TripSimulation";

// 🟢 Icônes de départ / arrivée
const startIcon = L.divIcon({
  html: "🟢",
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

const endIcon = L.divIcon({
  html: "🔴",
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function FavoritesMap({
  favorites,
  selectedFavorite,
  simulation,
}) {
  useEffect(() => {
    if (selectedFavorite?.coordinates?.length) {
      const [start, end] = selectedFavorite.coordinates;
      console.log("📍 Zoom sur :", start, end);
    }
  }, [selectedFavorite]);

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={11}
      style={{ height: "600px", borderRadius: "16px" }}
      className="shadow-md border border-gray-100"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {favorites.map((fav) => (
        <Polyline
          key={fav._id}
          positions={fav.coordinates}
          color={selectedFavorite?._id === fav._id ? "orange" : "gray"}
          weight={4}
        />
      ))}

      {selectedFavorite && selectedFavorite.coordinates.length > 0 && (
        <>
          <Marker position={selectedFavorite.coordinates[0]} icon={startIcon}>
            <Popup>Départ : {selectedFavorite.from}</Popup>
          </Marker>
          <Marker
            position={
              selectedFavorite.coordinates[
                selectedFavorite.coordinates.length - 1
              ]
            }
            icon={endIcon}
          >
            <Popup>Arrivée : {selectedFavorite.to}</Popup>
          </Marker>
        </>
      )}

      {/* 🚗 Simulation du trajet en direct */}
      {simulation && (
        <TripSimulation
          coordinates={simulation.coordinates}
          onProgress={simulation.onProgress}
          onComplete={simulation.onComplete}
        />
      )}
    </MapContainer>
  );
}
