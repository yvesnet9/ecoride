import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-emerald-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* 🌱 Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-emerald-100"
        >
          🌱 EcoRide
        </Link>

        {/* 🪟 Bouton hamburger (mobile) */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* 🔗 Liens */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:space-x-6 text-sm font-medium absolute md:static bg-emerald-600 md:bg-transparent top-14 left-0 w-full md:w-auto px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none`}
        >
          <Link
            to="/"
            className="block md:inline hover:text-emerald-200 transition py-2"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            to="/dashboard"
            className="block md:inline hover:text-emerald-200 transition py-2"
            onClick={() => setMenuOpen(false)}
          >
            Tableau de bord
          </Link>
          <Link
            to="/dashboard/ecoride"
            className="block md:inline hover:text-emerald-200 transition py-2"
            onClick={() => setMenuOpen(false)}
          >
            ÉcoRide
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block md:inline hover:text-emerald-200 transition py-2"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <Link
            to="/about"
            className="block md:inline hover:text-emerald-200 transition py-2"
            onClick={() => setMenuOpen(false)}
          >
            À propos
          </Link>

          {/* 🔒 Bouton déconnexion (affiché dans le menu sur mobile) */}
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="mt-2 md:mt-0 md:ml-4 bg-white text-emerald-600 px-4 py-1 rounded-full font-semibold hover:bg-emerald-50 transition w-full md:w-auto"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}
