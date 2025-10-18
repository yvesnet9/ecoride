#!/bin/bash
# resetAdmin.sh — réinitialisation automatique du compte admin EcoRide

ADMIN_PASS=${1:-"admin123"}

echo "🔐 Lancement du reset admin (mot de passe: ${ADMIN_PASS})..."

# Lancer le script Node pour réinitialiser le compte admin
bash -c "node ./scripts/resetAdmin.js '${ADMIN_PASS}'" || {
  echo "❌ Le script Node a échoué (voir ci-dessus)."
  }

  echo "🏁 Fin du resetAdmin.sh"
  
