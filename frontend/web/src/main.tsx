// 🌿 main.tsx – Point d’entrée principal EcoRide
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🧁 Notifications globales (react-hot-toast)
import { Toaster } from "react-hot-toast";

// 🔄 Remontée automatique en haut de page sur changement de route
import { useEffect } from "react";
import { useLocation, BrowserRouter } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 🌍 Application EcoRide */}
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>

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
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
