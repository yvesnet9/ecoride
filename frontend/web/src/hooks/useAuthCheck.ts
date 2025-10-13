// 🌿 useAuthCheck.ts — Vérifie la validité du token JWT et gère la déconnexion automatique
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  exp: number;
}

export default function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const now = Date.now() / 1000;

      // ⏳ Si expiré → déconnexion + redirection
      if (decoded.exp < now) {
        alert("⏳ Votre session a expiré. Veuillez vous reconnecter.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      } else {
        // 🕒 Vérifie jusqu’à expiration
        const timeLeft = (decoded.exp - now) * 1000;
        const timer = setTimeout(() => {
          alert("⏳ Votre session a expiré. Veuillez vous reconnecter.");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
        }, timeLeft);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error("Erreur de décodage JWT :", err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, [navigate]);
}

