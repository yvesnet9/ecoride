// 🌿 EcoRide – Serveur principal
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import tripRoutesFactory from "./routes/tripRoutes.js"; // ✅ version avec factory

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/trips", tripRoutesFactory(io)); // ✅ ici

// WebSocket
io.on("connection", (socket) => {
  console.log("🌐 Client connecté :", socket.id);
  socket.on("disconnect", () =>
    console.log("❌ Client déconnecté :", socket.id)
  );
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Serveur EcoRide en ligne sur http://localhost:${PORT}`);
});
