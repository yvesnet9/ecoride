import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * ➕ Ajouter un utilisateur
 */
router.post("/", async (req, res) => {
  try {
    console.log("📩 Nouvelle requête POST /users reçue :", req.body);

    const user = new User(req.body);
    await user.save();

    console.log("✅ Utilisateur ajouté :", user);
    res.json({ message: "Utilisateur ajouté ✅", user });
  } catch (err) {
    console.error("❌ Erreur lors de l’ajout :", err.message);
    res.status(400).json({ error: err.message });
  }
});

/**
 * 📋 Lister tous les utilisateurs
 */
router.get("/", async (req, res) => {
  try {
    console.log("📜 Requête GET /users");
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("❌ Erreur lors du GET /users :", err.message);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

/**
 * ❌ Supprimer un utilisateur
 */
router.delete("/:id", async (req, res) => {
  try {
    console.log("🗑️ Requête DELETE /users :", req.params.id);
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé ❌" });
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
