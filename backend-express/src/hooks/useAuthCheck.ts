import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function useAuthCheck() {
  const { user, setUser, logout } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        console.warn("⏳ Token expiré");
        logout();
        return;
      }

      // Vérification côté serveur (optionnelle mais recommandée)
      axios
        .get("/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          logout(); // Token invalide ou utilisateur supprimé
        });
    } catch (err) {
      console.error("Erreur de vérification token :", err);
      logout();
    }
  }, []);
}
