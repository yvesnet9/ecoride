// 🌿 tests/socket.ecopoints.value.test.js — Validation complète temps réel (ecoPoints +20)
import { io as Client } from "socket.io-client";
import { Server } from "socket.io";
import http from "http";
import app from "../src/app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

jest.setTimeout(20000); // assez de marge pour sockets et Mongo

let ioServer, httpServer, serverAddress;
let mongoServer, userToken, userId;

beforeAll(async () => {
  // 🧱 Démarrage MongoDB en mémoire
    mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
        await mongoose.connect(uri);

          // 🧱 Lancement d’un vrai serveur HTTP + WebSocket local
            httpServer = http.createServer(app);
              ioServer = new Server(httpServer, {
                  cors: { origin: "*", methods: ["GET", "POST"] },
                    });
                      httpServer.listen(0);
                        const { port } = httpServer.address();
                          serverAddress = `http://localhost:${port}`;

                            // 👤 Création d’un utilisateur de test
                              const user = await User.create({
                                  name: "YvesRealtime",
                                      email: "eco@yves.com",
                                          password: await bcrypt.hash("pass123", 10),
                                              role: "user",
                                                  ecoPoints: 0,
                                                    });
                                                      userId = user._id;

                                                        // 🔐 Génération d’un JWT
                                                          userToken = jwt.sign(
                                                              { id: user._id, role: "user" },
                                                                  process.env.JWT_SECRET || "secret",
                                                                      { expiresIn: "1h" }
                                                                        );
                                                                        });

                                                                        afterAll(async () => {
                                                                          await mongoose.disconnect();
                                                                            await mongoServer.stop();
                                                                              ioServer.close();
                                                                                httpServer.close();
                                                                                });

                                                                                describe("🌍 WebSocket — ecoPointsUpdated (valeur exacte)", () => {
                                                                                  it("✅ envoie bien l'événement avec +20 points", (done) => {
                                                                                      const clientSocket = new Client(serverAddress, {
                                                                                            transports: ["websocket"],
                                                                                                  reconnection: false,
                                                                                                      });

                                                                                                          clientSocket.on("connect", async () => {
                                                                                                                // 📤 Requête API simulant un trajet (comme dans ton serveur)
                                                                                                                      await axios.post(`${serverAddress}/api/trips/simulate`, { userId });

                                                                                                                            // 🎧 Attend l’événement côté client
                                                                                                                                  clientSocket.on("ecoPointsUpdated", async (payload) => {
                                                                                                                                          try {
                                                                                                                                                    // ✅ Vérifie les données envoyées
                                                                                                                                                              expect(payload).toHaveProperty("userId", userId.toString());
                                                                                                                                                                        expect(payload).toHaveProperty("newEcoPoints");
                                                                                                                                                                                  expect(payload.newEcoPoints).toBe(20);

                                                                                                                                                                                            // ✅ Vérifie en base que les points ont été mis à jour
                                                                                                                                                                                                      const updatedUser = await User.findById(userId);
                                                                                                                                                                                                                expect(updatedUser.ecoPoints).toBe(20);

                                                                                                                                                                                                                          clientSocket.close();
                                                                                                                                                                                                                                    done();
                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                      done(err);
                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                            clientSocket.on("connect_error", (err) => done(err));
                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                              });
                                                                                                                                                                                                                                                                              
