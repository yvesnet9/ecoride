import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-emerald-700 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* 🌱 Logo + texte */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">🌱 EcoRide</h2>
          <p className="text-sm text-emerald-100">
            Ensemble pour une mobilité durable 🚗🌿
          </p>
        </div>

        {/* 🔗 Liens rapides */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-emerald-200 transition">
            Accueil
          </Link>
          <Link to="/dashboard" className="hover:text-emerald-200 transition">
            Tableau de bord
          </Link>
          <Link
            to="/dashboard/ecoride"
            className="hover:text-emerald-200 transition"
          >
            ÉcoRide
          </Link>
          <Link to="/about" className="hover:text-emerald-200 transition">
            À propos
          </Link>
        </div>

        {/* 📅 Copyright */}
        <p className="text-xs text-emerald-100">
          © {new Date().getFullYear()} EcoRide – Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
