import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleRegister = async (e) => {

    e.preventDefault();
    try {
      const res = await registerUser(name, email, password);
      alert(res.message || "Inscription réussie !");
      navigate("/dashboard");
   } catch (err) {

      setError(err.response?.data?.message || "Erreur d’inscription");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-semibold mb-4">Inscription</h1>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-80">
        <input
          type="text"
          placeholder="Nom complet"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white rounded p-2 hover:bg-green-700"
        >
          S’inscrire
        </button>
      </form>
    </div>
  );
}
