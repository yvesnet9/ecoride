// scripts/resetAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../src/models/User.js"; // Chemin à vérifier selon ton projet

dotenv.config();

const adminPassword = process.argv[2];
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  try {
      if (!MONGO_URI) {
            console.error("❌ MONGO_URI manquant dans le fichier .env");
                  process.exit(1);
                      }

                          await mongoose.connect(MONGO_URI);
                              console.log("✅ Connecté à MongoDB");

                                  const hashedPassword = await bcrypt.hash(adminPassword, 10);

                                      const adminEmail = "admin@ecoride.com";

                                          const result = await User.findOneAndUpdate(
                                                { email: adminEmail },
                                                      {
                                                              email: adminEmail,
                                                                      password: hashedPassword,
                                                                              role: "admin",
                                                                                    },
                                                                                          { upsert: true, new: true }
                                                                                              );

                                                                                                  console.log(`🔁 Compte admin mis à jour : ${result.email}`);
                                                                                                      console.log("🔒 Nouveau hash sauvegardé dans la base.");

                                                                                                          await mongoose.connection.close();
                                                                                                              process.exit(0);
                                                                                                                } catch (err) {
                                                                                                                    console.error("❌ Erreur lors du reset admin :", err);
                                                                                                                        process.exit(1);
                                                                                                                          }
                                                                                                                          })();
                                                                                                                          
