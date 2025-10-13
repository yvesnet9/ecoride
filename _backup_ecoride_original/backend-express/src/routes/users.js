import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * 📋 Lister tous les utilisateurs
 * GET /api/users
 */
router.get("/", async (req, res) => {
  console.log("➡️  Requête GET /api/users reçue !");
  try {
    const users = await User.find();
    console.log("✅ Utilisateurs récupérés :", users.length);
    res.json(users);
  } catch (err) {
    console.error("❌ Erreur GET /users :", err.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs" });
  }
});

/**
 * ➕ Ajouter un utilisateur
 * POST /api/users
 */
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res
      .status(201)
      .json({ message: "✅ Utilisateur ajouté avec succès", user });
  } catch (err) {
    console.error("❌ Erreur lors de l’ajout utilisateur :", err.message);
    res.status(400).json({ error: err.message });
  }
});

/**
 * ❌ Supprimer un utilisateur
 * DELETE /api/users/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "⚠️ Utilisateur non trouvé" });
    }
    res.json({ message: "🗑️ Utilisateur supprimé avec succès ✅" });
  } catch (err) {
    console.error("❌ Erreur suppression utilisateur :", err.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'utilisateur" });
  }
});

export default router;
