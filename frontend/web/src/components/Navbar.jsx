import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { UserContext } from "../context/UserContext";
import logo from "../assets/Ecoride_logo.png"; // ✅ ton logo importé ici

export default function Navbar() {
  const { user, logout, loading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm transition-all">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🌿 Logo EcoRide */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="EcoRide logo"
            className="w-10 h-10 object-contain drop-shadow-[0_0_6px_#10B981]"
          />
          <span className="font-bold text-xl text-[#1F2A44]">EcoRide</span>
        </Link>

        {/* 🌿 Menu desktop */}
        <ul className="hidden md:flex items-center gap-8 text-[#1F2A44] font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600 transition"
              }
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600 transition"
              }
            >
              À propos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "hover:text-emerald-600 transition"
              }
            >
              Tableau de bord
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-semibold"
                  : "hover:text-yellow-500 transition"
              }
            >
              ⭐ Favoris
            </NavLink>
          </li>
        </ul>

        {/* 🌿 Actions utilisateur */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <span className="text-gray-400 text-sm">Chargement...</span>
          ) : user ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Bonjour,{" "}
                  <span className="font-semibold text-[#1F2A44]">
                    {user.name}
                  </span>
                </span>
                {user.role === "admin" && (
                  <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Connexion
            </Link>
          )}
        </div>

        {/* 🌿 Bouton menu mobile */}
        <button
          className="md:hidden text-[#1F2A44]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* 🌿 Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <ul className="flex flex-col p-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-[#1F2A44] hover:text-emerald-600 transition"
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-[#1F2A44] hover:text-emerald-600 transition"
              }
            >
              À propos
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-[#1F2A44] hover:text-emerald-600 transition"
              }
            >
              Tableau de bord
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-semibold"
                  : "text-[#1F2A44] hover:text-yellow-500 transition"
              }
            >
              ⭐ Favoris
            </NavLink>

            <div className="border-t border-gray-100 pt-3">
              {loading ? (
                <span className="text-gray-400 text-sm">Chargement...</span>
              ) : user ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Déconnexion
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  Connexion
                </Link>
              )}
            </div>
          </ul>
        </div>
      )}
    </header>
  );
}
