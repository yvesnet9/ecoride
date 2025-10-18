// 🌿 src/api/api.ts – Gestion centralisée des appels API EcoRide
import axios from "axios";

// ✅ Base du backend
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ⚙️ Configuration d’Axios
console.log("🌍 API_BASE_URL utilisé :", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Intercepteur pour ajouter automatiquement le token EcoRide
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("ecoride_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------------
// 🌱 Authentification
// -------------------------

// ✅ Connexion utilisateur
export const loginUser = async (email: string, password: string) => {
  const { data } = await api.post("/api/users/login", { email, password });
  return data; // { user, token, message }
};

// ✅ Récupération de l’utilisateur courant
export const getCurrentUser = async () => {
  const { data } = await api.get("/api/users/me");
  return data; // { _id, name, email, role, ecoPoints }
};

// ✅ Déconnexion (client-side)
export const logoutUser = () => {
  localStorage.removeItem("ecoride_token");
  localStorage.removeItem("ecoride_user");
  delete api.defaults.headers.common["Authorization"];
};

// -------------------------
// 🚴‍♂️ Gestion des trajets
// -------------------------

export const createTrip = async (tripData: any) => {
  const { data } = await api.post("/api/trips", tripData);
  return data;
};

export const simulateTrip = async (userId: string) => {
  const { data } = await api.post("/api/trips/simulate", { userId });
  return data;
};

export const getUserTrips = async (userId: string) => {
  const { data } = await api.get(`/api/trips/user/${userId}`);
  return data;
};
