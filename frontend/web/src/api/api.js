// 🌿 src/api/api.js — Gestion centralisée des appels API EcoRide
import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ⚙️ Crée une instance Axios avec le token JWT automatique
const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ====================================================
   🔐 AUTHENTIFICATION
   ==================================================== */

// Connexion utilisateur
export const loginUser = async (email, password) => {
  const { data } = await API.post("/users/login", { email, password });
  return data;
};

// Inscription utilisateur
export const registerUser = async (name, email, password) => {
  const { data } = await API.post("/users/register", { name, email, password });
  return data;
};

// Vérification de session
export const checkSession = async () => {
  const { data } = await API.get("/users/check");
  return data;
};

/* ====================================================
   👑 ADMINISTRATION
   ==================================================== */

// 📋 Liste de tous les utilisateurs
export const getUsers = async () => {
  const { data } = await API.get("/users");
  return data;
};

// 🗑️ Supprimer un utilisateur
export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/${id}`);
  return data;
};

// 📊 Statistiques globales (admin dashboard)
export const getGlobalStats = async () => {
  const { data } = await API.get("/users/stats/global");
  return data;
};

/* ====================================================
   🚗 TRAJETS (utilisateur + admin)
   ==================================================== */

// 🟢 Créer un trajet (utilisateur connecté)
export const createTrip = async (tripData) => {
  const { data } = await API.post("/trips", tripData);
  return data;
};

// 🟢 Récupérer les trajets (utilisateur ou admin)
export const getTrips = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  let endpoint = "/trips";

  // 👑 Si c’est un admin → utilise la route spéciale
  if (user?.role === "admin") {
    endpoint = "/trips/all";
  }

  const { data } = await API.get(endpoint);
  return data;
};

// 📈 Statistiques utilisateur
export const getUserStats = async (userId) => {
  const { data } = await API.get(`/trips/user/${userId}/stats`);
  return data;
};

export default API;
