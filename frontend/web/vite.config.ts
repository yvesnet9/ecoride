import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 🌿 Vite + React + Proxy API EcoRide
export default defineConfig({
  plugins: [react()],
    server: {
        port: 5173,
            host: true,
                proxy: {
                      // 🔁 redirige toutes les requêtes /api vers le backend Express
                            "/api": {
                                    target: "http://localhost:5000",
                                            changeOrigin: true,
                                                    secure: false,
                                                          },
                                                              },
                                                                },
                                                                  resolve: {
                                                                      alias: {
                                                                            "@": "/src",
                                                                                },
                                                                                  },
                                                                                  });
                                                                                  
