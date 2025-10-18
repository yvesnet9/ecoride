// 🌿 src/api/api.ts – Gestion centralisée des appels API EcoRide

import axios from "axios";

// 🌍 Base de l’API – configurable via .env
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("🌍 API_BASE_URL utilisé :", API_BASE_URL);

// ⚙️ Création de l’instance Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Intercepteur : ajoute automatiquement le token JWT si présent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================================================
// 🌱 AUTHENTIFICATION
// =====================================================

// ✅ Connexion utilisateur
export const loginUser = async (email: string, password: string) => {
  console.log("🔍 Envoi login avec :", email); // debug utile
  const { data } = await api.post("/api/users/login", {
    email: email.trim(),
    password: password.trim(),
  });
  return data; // { user, token, message }
};

// ✅ Inscription utilisateur
export const registerUser = async (name: string, email: string, password: string) => {
  const { data } = await api.post("/api/users/register", {
    name,
    email: email.trim(),
    password: password.trim(),
  });
  return data; // { user, message }
};

// ✅ Récupération du profil utilisateur connecté
export const getCurrentUser = async () => {
  const { data } = await api.get("/api/users/me");
  return data; // { _id, name, email, role, ecoPoints }
};

// ✅ Déconnexion (client-side)
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("currentUser");
  delete api.defaults.headers.common["Authorization"];
};

// =====================================================
// 🚴‍♂️ TRAJETS
// =====================================================

// ✅ Création d’un trajet
export const createTrip = async (tripData: any) => {
  const { data } = await api.post("/api/trips", tripData);
  return data;
};

// ✅ Récupération des trajets d’un utilisateur
export const getUserTrips = async (userId: string) => {
  const { data } = await api.get(`/api/trips/user/${userId}`);
  return data;
};

// ✅ Simulation de trajet (bonus/test)
export const simulateTrip = async (userId: string) => {
  const { data } = await api.post("/api/trips/simulate", { userId });
  return data;
};

// 🔍 Recherche de trajets disponibles

// ✅ Recherche de trajets (pour la page SearchResultsPage)
export const searchTrips = async (from: string, to: string) => {
  try {
    const { data } = await api.get("/api/trips/search", {
      params: { from, to },
    });
    return data; // tableau de trajets correspondants
  } catch (err: any) {
    console.error("Erreur recherche trajets :", err);
    throw err;
  }
};

