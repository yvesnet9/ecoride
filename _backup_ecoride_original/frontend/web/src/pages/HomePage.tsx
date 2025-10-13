import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[80vh] bg-gray-50 px-6">
      <h1 className="text-5xl font-extrabold text-emerald-700 mb-4">
        🌿 Bienvenue sur <span className="text-emerald-500">EcoRide</span>
      </h1>

      <p className="text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Simplifiez vos trajets, partagez vos voitures et cumulez des écoPoints
        pour un avenir plus vert 🌍💚
      </p>

      <Link
        to="/dashboard"
        className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition"
      >
        🚗 Accéder au tableau de bord
      </Link>
    </div>
  );
}
