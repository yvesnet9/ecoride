#!/bin/bash
# 🌿 EcoRide - Script pour récupérer automatiquement le token JWT
# Utilisation :
#   ./scripts/getToken.sh         → récupère le token de Charlie (user)
#   ./scripts/getToken.sh -a      → récupère le token de Admin
#   ./scripts/getToken.sh -s      → récupère + sauvegarde le token
#   ./scripts/getToken.sh -a -s   → token admin sauvegardé automatiquement

API_URL="http://localhost:5000/api/users/login"
SAVE=false

# Par défaut, Charlie
EMAIL="charlie@ecoride.io"
PASSWORD="test1234"
ROLE="Utilisateur"

# 🔧 Lecture des options
while [[ "$#" -gt 0 ]]; do
  case "$1" in
    -a|--admin)
      EMAIL="admin@ecoride.io"
      PASSWORD="admin123"
      ROLE="Administrateur"
      ;;
    -s|--save)
      SAVE=true
      ;;
  esac
  shift
done

echo "🔐 Connexion à l'API EcoRide en tant que $ROLE ($EMAIL)..."

# 🧠 Requête à l’API et extraction du token avec jq
TOKEN=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}" | jq -r '.token')

# ✅ Vérification et affichage du résultat
if [ "$TOKEN" != "null" ] && [ -n "$TOKEN" ]; then
  echo ""
  echo "✅ Token obtenu avec succès :"
  echo ""
  echo "$TOKEN"

  if [ "$SAVE" = true ]; then
    echo ""
    echo "💾 Sauvegarde du token dans .env.localtoken ..."
    echo "VITE_API_TOKEN=$TOKEN" > .env.localtoken
    echo "✅ Fichier créé : $(pwd)/.env.localtoken"
  fi

  echo ""
  echo "💡 Utilise-le ainsi :"
  echo "curl -H \"Authorization: Bearer $TOKEN\" http://localhost:5000/api/trips/all"
else
  echo "❌ Erreur : impossible d’obtenir le token. Vérifie ton backend ou les identifiants."
fi
