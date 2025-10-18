// 🌿 src/utils/socket.ts – Instance client Socket.io pour EcoRide
import { io, Socket } from "socket.io-client";

// 🖥️ Adresse du backend (modifiable via .env)
const SOCKET_URL: string = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Définition des types d’événements envoyés/reçus
interface ServerToClientEvents {
  ecoPointsUpdated: (data: { userId: string; newEcoPoints: number }) => void;
  connect: () => void;
  disconnect: (reason: string) => void;
}

interface ClientToServerEvents {
  simulateEcoPoints: (data: { userId: string; newEcoPoints: number }) => void;
}

// ✅ Création du socket typé
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"], // connexion stable
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 2000,
});

// 💬 Log utile pour le debug
socket.on("connect", () => {
  console.log("✅ Connecté au serveur Socket.io :", socket.id);
});

socket.on("disconnect", (reason) => {
  console.warn("⚠️ Déconnecté du serveur Socket.io :", reason);
});

export default socket;
