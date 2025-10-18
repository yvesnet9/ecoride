/**
 * 🌿 tests/favorites.test.js — tests Jest + Supertest pour /api/favorites
  */
  import request from "supertest";
  import mongoose from "mongoose";
  import jwt from "jsonwebtoken";
  import { app, server } from "../src/server.js";
  import User from "../src/models/User.js";
  import Favorite from "../src/models/Favorite.js";

  const JWT_SECRET = process.env.JWT_SECRET || "testsecret123";

  // ======================================================
  // ⚙️ Setup / Teardown global
  // ======================================================
  beforeAll(async () => {
    if (!process.env.MONGO_URI_TEST) {
        process.env.MONGO_URI_TEST = "mongodb://127.0.0.1:27017/ecoride_test";
          }

            await mongoose.connect(process.env.MONGO_URI_TEST, {
                useNewUrlParser: true,
                    useUnifiedTopology: true,
                      });
                        await Favorite.deleteMany({});
                          await User.deleteMany({});
                          });

                          afterAll(async () => {
                            await Favorite.deleteMany({});
                              await User.deleteMany({});
                                await mongoose.connection.close();
                                  server.close();
                                  });

                                  // ======================================================
                                  // 🧪 Scénario principal
                                  // ======================================================
                                  describe("⭐ /api/favorites — CRUD complet", () => {
                                    let token;
                                      let user;

                                        beforeAll(async () => {
                                            user = await User.create({
                                                  name: "TestUser",
                                                        email: "testfav@example.com",
                                                              password: "hashed1234",
                                                                    role: "user",
                                                                        });

                                                                            token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
                                                                              });

                                                                                test("✅ Ajoute un favori", async () => {
                                                                                    const favData = {
                                                                                          from: "Paris",
                                                                                                to: "Lyon",
                                                                                                      distance: 465,
                                                                                                            ecoPoints: 25,
                                                                                                                  coordinates: [
                                                                                                                          [48.8566, 2.3522],
                                                                                                                                  [45.764, 4.8357],
                                                                                                                                        ],
                                                                                                                                            };

                                                                                                                                                const res = await request(app)
                                                                                                                                                      .post("/api/favorites")
                                                                                                                                                            .set("Authorization", `Bearer ${token}`)
                                                                                                                                                                  .send(favData);

                                                                                                                                                                      expect(res.statusCode).toBe(201);
                                                                                                                                                                          expect(res.body).toHaveProperty("_id");
                                                                                                                                                                              expect(res.body.from).toBe("Paris");
                                                                                                                                                                                  expect(res.body.to).toBe("Lyon");
                                                                                                                                                                                    });

                                                                                                                                                                                      test("✅ Récupère les favoris de l’utilisateur", async () => {
                                                                                                                                                                                          const res = await request(app)
                                                                                                                                                                                                .get("/api/favorites")
                                                                                                                                                                                                      .set("Authorization", `Bearer ${token}`);

                                                                                                                                                                                                          expect(res.statusCode).toBe(200);
                                                                                                                                                                                                              expect(res.body.length).toBeGreaterThanOrEqual(1);
                                                                                                                                                                                                                  expect(res.body[0]).toHaveProperty("from");
                                                                                                                                                                                                                      expect(res.body[0]).toHaveProperty("to");
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                          test("✅ Supprime un favori", async () => {
                                                                                                                                                                                                                              const fav = await Favorite.findOne({ user: user._id });
                                                                                                                                                                                                                                  const res = await request(app)
                                                                                                                                                                                                                                        .delete(`/api/favorites/${fav._id}`)
                                                                                                                                                                                                                                              .set("Authorization", `Bearer ${token}`);

                                                                                                                                                                                                                                                  expect(res.statusCode).toBe(200);
                                                                                                                                                                                                                                                      expect(res.body.message).toContain("Favori supprimé");
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                        
