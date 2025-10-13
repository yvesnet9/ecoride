import axios from "axios";

const API_URL = "http://localhost:5000/api"; // ✅ déclaration unique

// 🔹 Connexion d'un utilisateur
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, { email, password });
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors de la connexion :", err);
    throw err;
  }
};

// 🔹 Création d'un trajet
export const createTrip = async (tripData) => {
  try {
    const res = await axios.post(`${API_URL}/trips`, tripData);
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors de la création du trajet :", err);
    throw err;
  }
};

// 🔹 Récupérer tous les utilisateurs
export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors du chargement des utilisateurs :", err);
    throw err;
  }
};

// 🔹 Récupérer tous les trajets
export const getTrips = async () => {
  try {
    const res = await axios.get(`${API_URL}/trips`);
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors du chargement des trajets :", err);
    throw err;
  }
};

// 🔹 Récupérer les statistiques d’un utilisateur
export const getUserStats = async (userId) => {
  try {
    const res = await axios.get(`${API_URL}/trips/user/${userId}/stats`);
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors du chargement des stats :", err);
    throw err;
  }
};
// 🔹 Récupérer les statistiques globales (admin)
export const getGlobalStats = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/users/stats/global`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Erreur lors du chargement des stats globales :", err);
    throw err;
  }
};
