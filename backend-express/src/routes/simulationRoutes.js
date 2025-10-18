// 🌿 src/routes/simulationRoutes.js
import express from "express";
import Favorite from "../models/Favorite.js"; // ✅ Vérifie que ton modèle s'appelle bien Favorite

const router = express.Router();

/**
 * 📡 Simulation d'un trajet depuis un favori
  * GET /api/routes/:id/simulate
   */
   router.get("/:id/simulate", async (req, res) => {
     try {
         const { id } = req.params;

             // 🔍 Recherche du favori dans MongoDB
                 const favorite = await Favorite.findById(id);
                     if (!favorite) {
                           return res.status(404).json({ message: "Favori introuvable ❌" });
                               }

                                   // 🚗 Utilise les coordonnées stockées ou génère un trajet de démo
                                       let coordinates = favorite.coordinates;
                                           if (!coordinates || coordinates.length < 2) {
                                                 const start = [48.8566, 2.3522]; // Paris
                                                       coordinates = Array.from({ length: 25 }, (_, i) => [
                                                               start[0] + i * 0.001,
                                                                       start[1] + i * 0.0015,
                                                                             ]);
                                                                                 }

                                                                                     // 🔄 Interpolation pour un mouvement fluide
                                                                                         const smoothCoords = [];
                                                                                             for (let i = 0; i < coordinates.length - 1; i++) {
                                                                                                   const [lat1, lon1] = coordinates[i];
                                                                                                         const [lat2, lon2] = coordinates[i + 1];
                                                                                                               for (let t = 0; t <= 1; t += 0.25) {
                                                                                                                       smoothCoords.push([
                                                                                                                                 lat1 + (lat2 - lat1) * t,
                                                                                                                                           lon1 + (lon2 - lon1) * t,
                                                                                                                                                   ]);
                                                                                                                                                         }
                                                                                                                                                             }

                                                                                                                                                                 // ✅ Réponse au frontend
                                                                                                                                                                     res.json({ coordinates: smoothCoords });
                                                                                                                                                                       } catch (error) {
                                                                                                                                                                           console.error("❌ Erreur simulation :", error);
                                                                                                                                                                               res.status(500).json({ message: "Erreur lors de la simulation du trajet" });
                                                                                                                                                                                 }
                                                                                                                                                                                 });

                                                                                                                                                                                 export default router;
                                                                                                                                                                                 
