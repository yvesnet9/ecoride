import { useState } from "react";
import { MapPin, Calendar, Search, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
      navigate(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 relative overflow-hidden">
      {/* ✅ Barre verte animée */}
      {showConfirm && (
        <div className="absolute top-0 left-0 w-full bg-emerald-500 text-white py-3 flex justify-center items-center animate-slideDown z-50 pointer-events-none">
          <Check className="w-5 h-5 mr-2" />
          <span>Recherche lancée avec succès 🌿</span>
        </div>
      )}

      {/* ✅ Hero Section */}
      <section className="relative bg-[#1F2A44] text-white py-20 flex flex-col items-center justify-center overflow-visible z-0">
        {/* ✅ Image de fond non interactive */}
        <div
          className="absolute inset-0 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center opacity-10 pointer-events-none -z-10"
        ></div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Voyagez mieux, ensemble 🌍
        </h1>
        <p className="text-center text-lg text-gray-200 max-w-2xl">
          Partagez vos trajets, réduisez vos coûts et votre empreinte carbone.
          Rejoignez la communauté des conducteurs éco-responsables.
        </p>

        {/* ✅ Formulaire de recherche */}
        <form
          onSubmit={handleSearch}
          className="relative bg-white rounded-2xl shadow-xl p-6 mt-12 flex flex-col md:flex-row gap-4 items-start md:items-center max-w-3xl w-[90%] z-20"
        >
          {/* Ville de départ */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Ville de départ
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400 bg-white">
              <MapPin className="text-emerald-500 mr-2" />
              <input
                type="text"
                placeholder="Ex: Paris"
                className="outline-none w-full bg-white text-gray-800 placeholder-gray-400"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <small className="text-gray-400">Indiquez la ville où commence votre trajet.</small>
          </div>

          {/* Ville d’arrivée */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Ville d’arrivée
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400 bg-white">
              <MapPin className="text-emerald-500 mr-2" />
              <input
                type="text"
                placeholder="Ex: Lyon"
                className="outline-none w-full bg-white text-gray-800 placeholder-gray-400"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <small className="text-gray-400">Indiquez la ville où se termine votre trajet.</small>
          </div>

          {/* Date de départ */}
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Date de départ
            </label>
            <div className="flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-emerald-400 bg-white">
              <Calendar className="text-emerald-500 mr-2" />
              <input
                type="datetime-local"
                className="outline-none w-full bg-white text-gray-800 placeholder-gray-400"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <small className="text-gray-400">
              Utilisez les flèches pour naviguer dans le sélecteur de date.
            </small>
          </div>

          {/* Bouton Rechercher */}
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-3 flex items-center justify-center transition w-full md:w-auto mt-4 md:mt-6"
          >
            <Search className="mr-2 w-5 h-5" /> Rechercher
          </button>
        </form>
      </section>

      {/* ✅ Section Valeurs */}
      <section className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto py-20 px-6">
        <div className="bg-[#1F2A44] text-white rounded-2xl p-8 shadow-md hover:-translate-y-2 transition-transform">
          <img src="/assets/save-money.svg" alt="Économie" className="w-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Économisez sur vos trajets</h3>
          <p>Réduisez vos frais en partageant vos trajets. Jusqu’à 75 % d’économie !</p>
        </div>

        <div className="bg-emerald-500 text-white rounded-2xl p-8 shadow-md hover:-translate-y-2 transition-transform">
          <img src="/assets/eco-planet.svg" alt="Écologie" className="w-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Agissez pour la planète</h3>
          <p>Chaque trajet partagé évite 2,2 kg de CO₂. Ensemble, faisons la différence.</p>
        </div>

        <div className="bg-emerald-700 text-white rounded-2xl p-8 shadow-md hover:-translate-y-2 transition-transform">
          <img src="/assets/community.svg" alt="Communauté" className="w-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Créez du lien</h3>
          <p>Rencontrez d’autres conducteurs responsables dans une ambiance conviviale.</p>
        </div>
      </section>

      {/* ✅ Section Impact */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1F2A44] mb-6">
            Ensemble, nous avons déjà accompli beaucoup 🌿
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold text-emerald-600">+3 200 kg</p>
              <p className="text-gray-600">de CO₂ économisés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">850</p>
              <p className="text-gray-600">trajets partagés</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-600">400</p>
              <p className="text-gray-600">membres actifs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Call-to-Action */}
      <section className="py-16 text-center bg-white">
        <h2 className="text-3xl font-bold text-[#1F2A44] mb-6">
          Rejoignez l’aventure EcoRide 💚
        </h2>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-full font-semibold text-lg shadow-md">
          Devenez conducteur
        </button>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-[#1F2A44] text-gray-200 py-8 text-center">
        <p>© {new Date().getFullYear()} EcoRide — Mobilité partagée et responsable.</p>
      </footer>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
