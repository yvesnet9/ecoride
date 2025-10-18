// 🌿 src/app.js — point d'entrée Express (sans démarrage du serveur)
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/users.js";
import tripRoutesFactory from "./routes/tripRoutes.js";
import favoriteRoutes from "./routes/favorites.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import User from "./models/User.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Configuration CORS
const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
app.use(
  cors({
      origin: allowedOrigins,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
              credentials: true,
                })
                );

                // ✅ Création du serveur et du socket.io
                const server = http.createServer(app);
                const io = new Server(server, {
                  cors: {
                      origin: allowedOrigins,
                          methods: ["GET", "POST"],
                              credentials: true,
                                },
                                });

                                // ✅ Routes
                                app.use("/api/auth", authRoutes);
                                app.use("/api/users", userRoutes);
                                app.use("/api/favorites", favoriteRoutes);
                                app.use("/api/trips", tripRoutesFactory(io));

                                // ✅ WebSocket global
                                io.on("connection", (socket) => {
                                  console.log("🌐 Client connecté :", socket.id);
                                    socket.on("simulateEcoPoints", async ({ userId, newEcoPoints }) => {
                                        try {
                                              await User.findByIdAndUpdate(userId, { ecoPoints: newEcoPoints });
                                                    io.emit("ecoPointsUpdated", { userId, newEcoPoints });
                                                        } catch (err) {
                                                              console.error("Erreur mise à jour ÉcoPoints :", err);
                                                                  }
                                                                    });
                                                                      socket.on("disconnect", () => {
                                                                          console.log("❌ Client déconnecté :", socket.id);
                                                                            });
                                                                            });

                                                                            export { app, server, io }; // ✅ exports nommés pour tests
                                                                            export default app; // ✅ export par défaut pour server.js
                                                                            
