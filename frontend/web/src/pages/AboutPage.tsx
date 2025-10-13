// 🌿 AboutPage.tsx — Page d'information EcoRide
export default function AboutPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🌍 À propos d’EcoRide</h1>

      <p className="text-gray-700 mb-4 leading-relaxed">
        EcoRide est une plateforme de mobilité partagée et écoresponsable conçue
        pour réduire l’empreinte carbone tout en simplifiant les trajets du quotidien.
      </p>

      <p className="text-gray-700 mb-4 leading-relaxed">
        Nous encourageons une mobilité durable grâce à un système d’écoPoints :
        plus vous partagez vos trajets, plus vous gagnez des points que vous pouvez
        échanger contre des récompenses vertes 🌱.
      </p>

      <p className="text-gray-700 leading-relaxed">
        Ensemble, construisons une communauté qui roule vers un futur plus propre 🌿.
      </p>

      <div className="mt-10 p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Notre mission</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Réduire les émissions de CO₂ grâce au covoiturage intelligent.</li>
          <li>Récompenser les comportements écoresponsables.</li>
          <li>Connecter les citoyens autour de la mobilité durable.</li>
        </ul>
      </div>
    </div>
  );
}

