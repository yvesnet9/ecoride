const API_URL = "http://localhost:3000";

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error("Erreur de récupération des utilisateurs");
    return await response.json();
  } catch (err) {
    console.error("Erreur API:", err);
    return [];
  }
}

export async function addUser(newUser) {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return await response.json();
  } catch (err) {
    console.error("Erreur API (ajout utilisateur):", err);
    return null;
  }
}

export async function deleteUser(id) {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
    return await response.json();
  } catch (err) {
    console.error("Erreur API (suppression utilisateur):", err);
    return null;
  }
}
