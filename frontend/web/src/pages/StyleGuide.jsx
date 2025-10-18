// 🌈 src/pages/StyleGuide.jsx — Charte Graphique interactive EcoRide
export default function StyleGuide() {
  const colors = [
    {
      name: "Vert EcoRide",
      var: "eco-green",
      hex: "#16A34A",
      usage: "Boutons, accents, validations",
    },
    {
      name: "Vert Foncé",
      var: "eco-dark",
      hex: "#14532D",
      usage: "Navbar, titres, contrastes",
    },
    {
      name: "Vert Clair",
      var: "eco-light",
      hex: "#DCFCE7",
      usage: "Fonds secondaires, survols",
    },
    {
      name: "Gris Clair",
      var: "gray-50",
      hex: "#F9FAFB",
      usage: "Fond général",
    },
    {
      name: "Gris Moyen",
      var: "gray-400",
      hex: "#9CA3AF",
      usage: "Texte secondaire, bordures",
    },
    {
      name: "Gris Foncé",
      var: "gray-700",
      hex: "#374151",
      usage: "Texte principal, titres",
    },
  ];

  const fonts = [
    {
      element: "Texte principal",
      font: "Inter Regular",
      style: "text-gray-700",
      example: "Mobilité verte et durable.",
    },
    {
      element: "Titre",
      font: "Inter Bold",
      style: "text-2xl font-bold text-eco-green",
      example: "EcoRide – Voyagez autrement 🌿",
    },
    {
      element: "Bouton",
      font: "Inter Medium",
      style:
        "bg-eco-green text-white px-4 py-2 rounded-lg hover:bg-eco-dark transition",
      example: "Réserver un trajet",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-eco-green mb-6">
        🌈 Charte Graphique — EcoRide
      </h1>

      {/* 🎨 Palette de couleurs */}
      <section>
        <h2 className="text-2xl font-semibold text-eco-dark mb-4">
          🎨 Palette de couleurs
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {colors.map((c) => (
            <div
              key={c.name}
              className="border rounded-xl shadow-soft overflow-hidden bg-white"
            >
              <div className="h-24" style={{ backgroundColor: c.hex }}></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.usage}</p>
                <p className="mt-1 font-mono text-gray-600">{c.hex}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔤 Polices et styles */}
      <section>
        <h2 className="text-2xl font-semibold text-eco-dark mb-4">
          🔤 Polices et styles
        </h2>
        <div className="space-y-6">
          {fonts.map((f) => (
            <div
              key={f.element}
              className="bg-white p-4 rounded-xl shadow-soft"
            >
              <h3 className="text-lg font-semibold text-gray-700">
                {f.element} –{" "}
                <span className="text-sm text-gray-500">{f.font}</span>
              </h3>
              <p className={`mt-2 ${f.style}`}>{f.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧩 Composants UI */}
      <section>
        <h2 className="text-2xl font-semibold text-eco-dark mb-4">
          🧩 Composants UI
        </h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-eco-green text-white px-4 py-2 rounded-xl shadow-soft hover:bg-eco-dark transition">
            Bouton principal
          </button>
          <button className="bg-eco-light text-eco-dark px-4 py-2 rounded-xl border border-eco-green hover:bg-eco-green hover:text-white transition">
            Bouton secondaire
          </button>
          <div className="p-4 bg-gray-50 rounded-xl shadow-soft text-gray-700">
            Exemple de carte avec fond clair 🌱
          </div>
        </div>
      </section>
    </div>
  );
}
