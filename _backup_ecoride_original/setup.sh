#!/bin/bash
# 🌿 Script de réorganisation du projet ECORIDE (avec option --reset)

ROOT_DIR=$(pwd)
BACKUP_DIR="$ROOT_DIR/_backup_ecoride_original"

backup_project() {
  echo "🗂️ Sauvegarde du projet original..."
  mkdir -p "$BACKUP_DIR"
  cp -r * "$BACKUP_DIR"/ 2>/dev/null
  echo "✅ Sauvegarde effectuée dans : $BACKUP_DIR"
}

restore_project() {
  if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Aucune sauvegarde trouvée. Lance d'abord './setup.sh' pour en créer une."
    exit 1
  fi
  echo "♻️ Restauration du projet depuis la sauvegarde..."
  rm -rf "$ROOT_DIR"/* "$ROOT_DIR"/.[!.]* "$ROOT_DIR"/..?*
  cp -r "$BACKUP_DIR"/* "$ROOT_DIR"/ 2>/dev/null
  echo "✅ Projet restauré comme à l’origine."
  exit 0
}

# Mode reset
if [ "$1" == "--reset" ]; then
  restore_project
fi

if [ ! -d "./docs" ]; then
  echo "❌ Erreur : Ce script doit être exécuté depuis la racine du projet ecoride."
  exit 1
fi

backup_project

echo "📁 Création des nouveaux dossiers..."
mkdir -p frontend/src/{components,pages,assets,styles}
mkdir -p backend/{express/{src,models,routes,controllers},python}
mkdir -p assets scripts tests/{backend,frontend} archive

echo "📦 Réorganisation des fichiers..."
mv -n Ecoride_logo.png assets/ 2>/dev/null
mv -n pdf-style.css assets/ 2>/dev/null
if [ -d "backend-express" ]; then
  mv -n backend-express/src backend/express/ 2>/dev/null
  mv -n backend-express/package*.json backend/express/ 2>/dev/null
fi
mv -n docs/generer_ecoride_pdf.py backend/python/ 2>/dev/null
mv -n docs/generer_plan_developpement.py backend/python/ 2>/dev/null
if [ -d "venv" ]; then
  mv -n venv backend/python/ 2>/dev/null
fi
mv -n "README copy.md" archive/ 2>/dev/null
mv -n "README future.md" archive/ 2>/dev/null
mv -n README.pdf docs/ 2>/dev/null

echo "✅ Réorganisation terminée !"
echo ""
echo "🧠 Étapes suivantes :"
echo " - Vérifie la structure : tree -L 2"
echo " - Lancer le front : cd frontend && npm install && npm run dev"
echo " - Lancer le back : cd backend/express && npm install && npm start"
echo ""
echo "♻️ Pour restaurer la version d’origine : ./setup.sh --reset"
echo ""

