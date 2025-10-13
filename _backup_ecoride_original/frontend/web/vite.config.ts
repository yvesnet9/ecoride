import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Configuration compatible WSL et Node 20+
export default defineConfig({
  plugins: [react()],
  server: { host: "0.0.0.0", port: 5173 },
  build: {
    sourcemap: false, // ⚡️ accélère le chargement
  },
});
