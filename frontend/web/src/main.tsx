// 🌿 main.tsx – Point d’entrée principal EcoRide
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🧁 Notifications globales (react-hot-toast)
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 🚀 Application principale */}
    <App />

    {/* 🍃 Notifications EcoRide */}
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#f0fdf4", // vert très clair
          color: "#166534", // texte vert foncé
          border: "1px solid #4ade80", // vert moyen
          borderRadius: "12px",
          padding: "10px 14px",
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: "#16a34a",
            secondary: "#f0fdf4",
          },
        },
        error: {
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #ef4444",
          },
          iconTheme: {
            primary: "#dc2626",
            secondary: "#fef2f2",
          },
        },
      }}
    />
  </React.StrictMode>
);
