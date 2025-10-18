// 🌿 frontend/src/api/favorites.js
// ======================================================
// Ce module gère les appels API liés aux favoris EcoRide
// ======================================================

const API_URL = "http://localhost:5000/api/favorites";

/* ======================================================
   📋 Récupérer les favoris de l’utilisateur connecté
   ====================================================== */
export const getFavorites = async (token) => {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des favoris ❌");
  return res.json();
};

/* ======================================================
   ➕ Ajouter un nouveau favori
   ====================================================== */
export const addFavorite = async (favoriteData, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(favoriteData),
  });
  if (!res.ok) throw new Error("Erreur lors de l’ajout du favori ❌");
  return res.json();
};

/* ======================================================
   ♻️ Mettre à jour un favori existant
   ====================================================== */
export const updateFavorite = async (id, updatedData, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Erreur lors de la mise à jour du favori ❌");
  return res.json();
};

/* ======================================================
   ❌ Supprimer un favori
   ====================================================== */
export const deleteFavorite = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Erreur lors de la suppression du favori ❌");
  return res.json();
};
