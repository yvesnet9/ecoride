// 🌿 EcoRide – Hook de gestion de session utilisateur (JWT)
import { useEffect } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";


interface JWTPayload {
  exp: number;
}

/**
 * 🕒 Gère la session utilisateur :
 * - Décode le JWT pour connaître la date d’expiration réelle
 * - Avertit 30 secondes avant la fin
 * - Déconnecte automatiquement à expiration
 */
export default function useSessionTimer() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { exp } = jwtDecode<JWTPayload>(token);
      const expirationTime = exp * 1000 - Date.now();

      if (expirationTime <= 0) {
        handleLogout("Votre session a expiré. Veuillez vous reconnecter.");
        return;
      }

      // ⏰ Timer d’avertissement (30 s avant expiration)
      const warnTimer = setTimeout(() => {
        toast.error("⚠️ Votre session expirera dans 30 secondes...", {
          duration: 30000,
          position: "top-center",
        });
      }, Math.max(0, expirationTime - 30000));

      // 💣 Timer de déconnexion automatique
      const logoutTimer = setTimeout(() => {
        handleLogout("⏰ Session expirée — veuillez vous reconnecter.");
      }, expirationTime);

      return () => {
        clearTimeout(warnTimer);
        clearTimeout(logoutTimer);
      };
    } catch (err) {
      console.error("Erreur décodage JWT :", err);
    }
  }, []);
}

function handleLogout(message: string) {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  toast.error(message);
  setTimeout(() => (window.location.href = "/login"), 1500);
}

