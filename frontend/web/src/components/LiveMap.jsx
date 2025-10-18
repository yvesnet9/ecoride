// 🌿 src/components/FavoritesMap.jsx
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  useMap,
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

// 🌍 Sous-composant pour ajuster la vue quand un favori est sélectionné
function FitToFavorite({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates?.length > 1) {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coordinates, map]);

  return null;
}

export default function FavoritesMap({
  favorites = [],
  selectedFavorite,
  simulation,
}) {
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

      {/* 🗺️ Tracés des trajets favoris */}
      {favorites.map((fav) => (
        <Polyline
          key={fav._id}
          positions={fav.coordinates}
          color={selectedFavorite?._id === fav._id ? "orange" : "gray"}
          weight={4}
        />
      ))}

      {/* 📍 Marqueurs de départ / arrivée */}
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

          {/* Ajustement automatique du zoom sur le trajet */}
          <FitToFavorite coordinates={selectedFavorite.coordinates} />
        </>
      )}

      {/* 🚗 Simulation du trajet dynamique */}
      {simulation?.coordinates?.length > 1 && (
        <TripSimulation
          coordinates={simulation.coordinates}
          onProgress={simulation.onProgress}
          onComplete={simulation.onComplete}
          autoPan={true} // la carte suit la voiture
        />
      )}
    </MapContainer>
  );
}
