// 🌿 src/components/Navbar.jsx – Barre de navigation principale
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react"; // ✅ Icône élégante
import logo from "/Ecoride_logo.png"; // ✅ Logo depuis /public

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔁 Charger l’utilisateur connecté
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🚪 Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🌿 Logo + nom */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="EcoRide Logo" className="h-8 w-8 rounded-full" />
          <span className="text-xl font-semibold">EcoRide</span>
        </Link>

        {/* 🧭 Liens de navigation */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200 transition">Accueil</Link>
          <Link to="/about" className="hover:text-green-200 transition">À propos</Link>

          {user ? (
            <>
              {/* 🌱 Tableau de bord selon rôle */}
              {user.role === "admin" ? (
                <Link to="/admin/dashboard" className="hover:text-green-200 transition">
                  Tableau de bord
                </Link>
              ) : (
                <Link to="/dashboard" className="hover:text-green-200 transition">
                  Tableau de bord
                </Link>
              )}

              {/* ✅ Bouton vert unique de déconnexion */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-200 transition">
                Connexion
              </Link>
              <Link to="/register" className="hover:text-green-200 transition">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
