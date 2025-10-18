// 🌿 src/context/UserContext.tsx – Gestion globale de l’utilisateur (EcoRide)
import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ CORRIGÉ ICI

// 🎯 Type utilisateur (doit correspondre à ton modèle Mongo)
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  ecoPoints: number;
  createdAt?: string;
}

// 🎯 Interface du contexte
interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void;
  loading: boolean;
}

// 🌱 Création du contexte utilisateur
export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  logout: () => {},
  loading: true,
});

// 🌍 Provider global
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Vérifie la validité du token et restaure la session si possible
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        console.warn("⏳ Token expiré, suppression…");
        logout();
        return;
      }

      // Configure axios pour les requêtes suivantes
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Vérifie la session côté serveur
      axios
        .get("/api/users/me")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("currentUser", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("⚠️ Session invalide :", err.response?.status);
          logout();
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error("Erreur décodage token :", err);
      logout();
    }
  }, []);

  // 🚪 Déconnexion propre
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setLoading(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};
