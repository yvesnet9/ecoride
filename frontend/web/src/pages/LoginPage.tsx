import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; // ✅ Corrigé si ton service se trouve dans src/api/api.js
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(email, password);

      // ✅ Sauvegarde dans le stockage local
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // ✅ Message de confirmation
      toast.success(res.message || "Connexion réussie !");

      // ✅ Redirection selon le rôle
      if (res.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Erreur connexion :", err);
      setError(err.response?.data?.message || "❌ Erreur lors de la connexion");
      toast.error("Identifiants incorrects ou serveur indisponible.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-semibold mb-4 text-green-700">🔐 Connexion</h1>

      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 w-80 bg-white shadow-md rounded-2xl p-6"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white rounded p-2 hover:bg-green-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
