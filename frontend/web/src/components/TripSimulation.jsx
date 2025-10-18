// 🌿 src/components/TripSimulation.jsx
import { useEffect, useRef, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L from "leaflet";
import toast from "react-hot-toast";

// 🚗 Icône voiture stylisée
const carIcon = L.divIcon({
  html: "🚗",
  className: "car-marker",
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function TripSimulation({
  coordinates = [],
  onComplete,
  onProgress,
  autoPan = true,
  paused = false, // 🆕 état externe : simulation en pause ?
}) {
  const map = useMap();
  const markerRef = useRef(null);
  const animRef = useRef(null);
  const isFinishedRef = useRef(false);

  const [position, setPosition] = useState(coordinates[0] ?? null);
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState({ i: 0, t: 0, frame: 0 }); // 🆕 état interne persistant

  // 🔄 interpolation linéaire
  const interpolate = (p1, p2, t) => [
    p1[0] + (p2[0] - p1[0]) * t,
    p1[1] + (p2[1] - p1[1]) * t,
  ];

  useEffect(() => {
    if (!coordinates?.length || coordinates.length < 2) return;
    if (paused) {
      // 🧊 Met en pause la boucle d'animation
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    isFinishedRef.current = false;
    const baseSpeed = 0.02;
    const rotationSmoothness = 0.15;

    const animate = () => {
      const { i, t, frame } = state;

      // 🔚 Fin du trajet
      if (i >= coordinates.length - 1) {
        if (!isFinishedRef.current) {
          isFinishedRef.current = true;
          toast.success("🎉 Trajet terminé !");
          onComplete?.();
        }
        return;
      }

      const [current, next] = [coordinates[i], coordinates[i + 1]];
      const newPos = interpolate(current, next, t);
      setPosition(newPos);

      // 🧭 Calcul de la direction
      const dx = next[1] - current[1];
      const dy = next[0] - current[0];
      const angle = (Math.atan2(dx, dy) * 180) / Math.PI;

      // 🚗 Appliquer rotation fluide
      if (markerRef.current?._icon) {
        const el = markerRef.current._icon;
        el.style.transition = `transform ${rotationSmoothness}s linear`;
        el.style.transform = `rotate(${angle}deg)`;
      }

      // 🗺️ Centrage occasionnel
      if (autoPan && frame % 10 === 0) {
        map.panTo(newPos, { animate: true, duration: 0.25 });
      }

      // 📊 Progression
      const newProgress = ((i + t) / (coordinates.length - 1)) * 100;
      setProgress(newProgress);
      onProgress?.(newProgress);

      // ⏱️ Vitesse
      const distance = map.distance(current, next);
      const step = Math.min(baseSpeed + distance / 100000, 0.05);

      // ➕ Avancement
      let newI = i;
      let newT = t + step;
      if (newT >= 1) {
        newT = 0;
        newI++;
      }

      const newState = { i: newI, t: newT, frame: frame + 1 };
      setState(newState);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    // 🧹 Nettoyage
    return () => cancelAnimationFrame(animRef.current);
  }, [coordinates, paused, map, onComplete, onProgress, autoPan, state]);

  if (!position) return null;
  return <Marker ref={markerRef} position={position} icon={carIcon} />;
}
