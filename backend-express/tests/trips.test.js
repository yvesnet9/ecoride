// 🌿 tests/trips.test.js — Tests pour /api/trips/all
import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import app from "../src/app.js";
import User from "../src/models/User.js";
import Trip from "../src/models/Trip.js";

let mongoServer;
let adminToken, userToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
      await mongoose.connect(uri);

        // Création d’un admin et d’un user
          const admin = await User.create({
              name: "AdminTest",
                  email: "admin@test.com",
                      password: await bcrypt.hash("admin123", 10),
                          role: "admin",
                            });

                              const user = await User.create({
                                  name: "UserTest",
                                      email: "user@test.com",
                                          password: await bcrypt.hash("user123", 10),
                                              role: "user",
                                                });

                                                  // Tokens JWT
                                                    adminToken = jwt.sign(
                                                        { id: admin._id, role: "admin" },
                                                            process.env.JWT_SECRET || "secret",
                                                                { expiresIn: "1h" }
                                                                  );

                                                                    userToken = jwt.sign(
                                                                        { id: user._id, role: "user" },
                                                                            process.env.JWT_SECRET || "secret",
                                                                                { expiresIn: "1h" }
                                                                                  );

                                                                                    // Création de trajets de test
                                                                                      await Trip.create([
                                                                                          { origin: "Paris", destination: "Lyon", distanceKm: 450, user: user._id },
                                                                                              { origin: "Nice", destination: "Marseille", distanceKm: 200, user: user._id },
                                                                                                ]);
                                                                                                });

                                                                                                afterAll(async () => {
                                                                                                  await mongoose.disconnect();
                                                                                                    await mongoServer.stop();
                                                                                                    });

                                                                                                    describe("🧪 /api/trips/all", () => {
                                                                                                      it("❌ refuse un utilisateur non authentifié", async () => {
                                                                                                          const res = await request(app).get("/api/trips/all");
                                                                                                              expect(res.status).toBe(401);
                                                                                                                });

                                                                                                                  it("❌ refuse un utilisateur non admin", async () => {
                                                                                                                      const res = await request(app)
                                                                                                                            .get("/api/trips/all")
                                                                                                                                  .set("Authorization", `Bearer ${userToken}`);
                                                                                                                                      expect(res.status).toBe(403);
                                                                                                                                        });

                                                                                                                                          it("✅ retourne tous les trajets pour un admin", async () => {
                                                                                                                                              const res = await request(app)
                                                                                                                                                    .get("/api/trips/all")
                                                                                                                                                          .set("Authorization", `Bearer ${adminToken}`);
                                                                                                                                                              expect(res.status).toBe(200);
                                                                                                                                                                  expect(Array.isArray(res.body)).toBe(true);
                                                                                                                                                                      expect(res.body.length).toBe(2);
                                                                                                                                                                        });
                                                                                                                                                                        });
                                                                                                                                                                        
