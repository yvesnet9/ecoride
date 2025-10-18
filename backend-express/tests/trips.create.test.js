// 🌿 tests/trips.create.test.js — Création d’un trajet + écoPoints
import { jest } from "@jest/globals"; // ✅ ajout nécessaire en ESM
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import app from "../src/app.js";
import User from "../src/models/User.js";
import Trip from "../src/models/Trip.js";

// 🧠 on “mock” socket.io pour éviter d’ouvrir un vrai serveur
jest.mock("socket.io", () => {
  return {
      Server: jest.fn().mockImplementation(() => ({
            emit: jest.fn(),
                  on: jest.fn(),
                      })),
                        };
                        });

                        let mongoServer;
                        let userToken, userId;

                        beforeAll(async () => {
                          mongoServer = await MongoMemoryServer.create();
                            const uri = mongoServer.getUri();
                              await mongoose.connect(uri);

                                const user = await User.create({
                                    name: "Yves",
                                        email: "yves@test.com",
                                            password: await bcrypt.hash("pass123", 10),
                                                role: "user",
                                                    ecoPoints: 0,
                                                      });
                                                        userId = user._id;

                                                          userToken = jwt.sign(
                                                              { id: user._id, role: "user" },
                                                                  process.env.JWT_SECRET || "secret",
                                                                      { expiresIn: "1h" }
                                                                        );
                                                                        });

                                                                        afterAll(async () => {
                                                                          await mongoose.disconnect();
                                                                            await mongoServer.stop();
                                                                            });

                                                                            describe("🚗 POST /api/trips — création d’un trajet", () => {
                                                                              it("✅ crée un trajet et met à jour les écoPoints du user", async () => {
                                                                                  const tripData = {
                                                                                        origin: "Toulouse",
                                                                                              destination: "Bordeaux",
                                                                                                    distanceKm: 240,
                                                                                                        };

                                                                                                            const res = await request(app)
                                                                                                                  .post("/api/trips")
                                                                                                                        .set("Authorization", `Bearer ${userToken}`)
                                                                                                                              .send(tripData);

                                                                                                                                  // ✅ Vérifie la création
                                                                                                                                      expect(res.status).toBe(201);
                                                                                                                                          expect(res.body).toHaveProperty("_id");
                                                                                                                                              expect(res.body.origin).toBe(tripData.origin);

                                                                                                                                                  // ✅ Vérifie que le trajet existe en base
                                                                                                                                                      const trips = await Trip.find({ user: userId });
                                                                                                                                                          expect(trips.length).toBe(1);
                                                                                                                                                              expect(trips[0].destination).toBe(tripData.destination);

                                                                                                                                                                  // ✅ Vérifie la mise à jour des écoPoints
                                                                                                                                                                      const updatedUser = await User.findById(userId);
                                                                                                                                                                          expect(updatedUser.ecoPoints).toBeGreaterThanOrEqual(10);
                                                                                                                                                                            });

                                                                                                                                                                              it("❌ refuse la création sans token", async () => {
                                                                                                                                                                                  const res = await request(app).post("/api/trips").send({
                                                                                                                                                                                        origin: "Paris",
                                                                                                                                                                                              destination: "Lille",
                                                                                                                                                                                                    distanceKm: 220,
                                                                                                                                                                                                        });
                                                                                                                                                                                                            expect(res.status).toBe(401);
                                                                                                                                                                                                              });
                                                                                                                                                                                                              });
                                                                                                                                                                                                              
