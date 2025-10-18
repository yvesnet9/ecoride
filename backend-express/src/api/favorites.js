import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  console.log("📡 Route /api/favorites atteinte !");
  res.json({
    message: "Route favorites accessible ✅",
    user: req.user.email,
  });
});

export default router;
