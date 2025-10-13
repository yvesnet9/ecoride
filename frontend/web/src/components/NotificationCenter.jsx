// 🌿 NotificationCenter.jsx – Système de notifications EcoRide
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  // 🔄 Écoute des notifications via Socket.io
  useEffect(() => {
    socket.on("zoneAlertBroadcast", (data) => {
      addNotification(`🚨 ${data.message}`);
    });

    socket.on("ecoPointsUpdate", (data) => {
      addNotification(`🌱 +${data.points} ÉcoPoints gagnés !`);
    });

    socket.on("newTripAdded", (data) => {
      addNotification(
        `🚗 Nouveau trajet : ${data.origin} ➡️ ${data.destination}`
      );
    });

    return () => {
      socket.off("zoneAlertBroadcast");
      socket.off("ecoPointsUpdate");
      socket.off("newTripAdded");
    };
  }, []);

  const addNotification = (message) => {
    const newNotif = {
      id: Date.now(),
      message,
      date: new Date().toLocaleTimeString(),
    };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 10));
    setUnread((n) => n + 1);
  };

  const toggleOpen = () => {
    setOpen(!open);
    setUnread(0);
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="relative">
      {/* 🔔 Icône cloche */}
      <button
        onClick={toggleOpen}
        className="relative p-2 bg-white rounded-full shadow-md hover:bg-green-50 transition"
      >
        <Bell className="text-green-700 w-6 h-6" />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            {unread}
          </span>
        )}
      </button>

      {/* 🧾 Liste des notifications */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-xl border border-gray-200 z-50"
          >
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-semibold text-green-700">Notifications</h3>
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:underline"
              >
                Effacer tout
              </button>
            </div>

            {notifications.length === 0 ? (
              <p className="p-4 text-center text-gray-500">
                Aucune notification récente 🌿
              </p>
            ) : (
              <ul className="max-h-80 overflow-y-auto divide-y">
                {notifications.map((n) => (
                  <li key={n.id} className="p-3 hover:bg-green-50 transition">
                    <p className="text-gray-700 text-sm">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
