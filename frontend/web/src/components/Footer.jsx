import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F2A44] text-gray-200 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* 🌿 Logo & description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="text-emerald-500 w-6 h-6" />
            <span className="text-xl font-semibold text-white">EcoRide</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Plateforme de covoiturage éco-responsable. Ensemble, réduisons nos
            émissions et partageons la route 🌱
          </p>
        </div>

        {/* 🔗 Liens rapides */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                À propos
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link
                to="/style-guide"
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                Style Guide
              </Link>
            </li>
          </ul>
        </div>

        {/* 💬 Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-500" />
              <a
                href="mailto:contact@ecoride.io"
                className="hover:text-emerald-400 transition-colors"
              >
                contact@ecoride.io
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-500" />
              <a
                href="tel:+33123456789"
                className="hover:text-emerald-400 transition-colors"
              >
                +33 1 23 45 67 89
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span>Paris, France</span>
            </li>
          </ul>
        </div>

        {/* 🌍 Réseaux sociaux */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Suivez-nous</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-emerald-400 transition-colors"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Ligne de séparation + mention */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} EcoRide — Tous droits réservés.
        <br className="md:hidden" />
        Design et développement 🌱 by l’équipe EcoRide.
      </div>
    </footer>
  );
}
