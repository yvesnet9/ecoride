// 🌿 backend/src/routes/testRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/protect", protect, (req, res) => {
  console.log("✅ Route /api/test/protect atteinte !");
  res.json({
    message: "Middleware protect fonctionne ✅",
    user: req.user,
  });
});

export default router;
