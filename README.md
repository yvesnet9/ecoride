README.md (corrigé)

# 🚴 Ecoride - Documentation Projet

Application écoresponsable de covoiturage à vélo  
Projet présenté au jury Studi

![Ecoride Logo](./Ecoride_logo.png)

---

## 🌍 Ecoride – Monorepo (Frontend + Backend)

Projet de fin d’études – Studi Développeur Web & Web Mobile

Architecture monorepo avec :

- **Backend** → NestJS (API REST, port 3000)
- **Frontend** → React + Vite (port 5173)

---

## 🚀 Installation

### 1. Aller dans le dossier du projet

```bash
cd /mnt/c/Users/yves/Desktop/ecoride

2. Installer toutes les dépendances
pnpm install --recursive

▶️ Démarrage
Lancer le backend (NestJS)
cd backend/api
pnpm start:dev


👉 API accessible sur http://localhost:3000

👉 Vérification du statut santé : http://localhost:3000/health

Lancer le frontend (React + Vite)
cd frontend/web
pnpm dev


👉 Frontend accessible sur http://localhost:
Lancer les deux en parallèle (depuis la racine du projet)

bash
Copier le code
pnpm dev
👉 Cela démarre :

[backend] → NestJS sur port 3000

[frontend] → React/Vite sur port 5173

---

## 🌿 Base de données MongoDB

Le backend Ecoride utilise **MongoDB** pour la gestion des utilisateurs, trajets et points éco-responsables.

### 🚴 Cheatsheet MongoDB Ecoride

Ce document regroupe les principales commandes et bonnes pratiques liées à la base de données du projet.

📄 [Télécharger le Cheatsheet MongoDB (PDF)](../docs/ecoride-mongodb-cheatsheet.pdf)

---

🧠 **Bon à savoir :**
- Utilise `use ecoride` dans le shell MongoDB pour accéder à la base.
- Les modèles Mongoose sont définis dans le dossier [`src/users`](./src/users).
- Les tests d’intégration MongoDB se trouvent dans [`test/app.e2e-spec.ts`](./test/app.e2e-spec.ts).


📂 Arborescence
bash
Copier le code
ecoride/
 ├─ backend/
 │   └─ api/           # Projet NestJS (API)
 ├─ frontend/
 │   └─ web/           # Projet React + Vite
 ├─ package.json       # Scripts globaux (dev, export PDF…)
 └─ README.md          # Guide du projet
📦 Différence entre les 3 package.json
Racine (ecoride/package.json)
👉 Scripts globaux (pnpm dev, export:pdf). Sert de chef d’orchestre du monorepo.

Backend (backend/api/package.json)
👉 Spécifique à NestJS : start:dev, build, test.

Frontend (frontend/web/package.json)
👉 Spécifique à React/Vite : dev, build, preview.

⚡ En résumé : root = orchestration, backend = API, frontend = UI.

💻 Ouvrir le projet avec VS Code (WSL)
Vérifier que l’extension Remote - WSL est installée dans VS Code.
👉 Icône verte en bas à gauche = indicateur que WSL est actif.

Depuis le terminal WSL :

bash
Copier le code
cd /mnt/c/Users/yves/Desktop/ecoride
code .
✅ Vérification rapide
Backend : http://localhost:3000/health

Frontend : http://localhost:5173

Exemple de réponse côté frontend :

json
Copier le code
{
  "status": "ok",
  "timestamp": "2025-09-30T21:20:25.773Z"
}
🛠️ Commandes utiles
Nettoyer les dépendances

bash
Copier le code
rm -rf node_modules pnpm-lock.yaml
pnpm install --recursive
Tuer un processus qui bloque le port 3000

bash
Copier le code
lsof -i :3000
kill -9 <PID>
Vérifier le backend

bash
Copier le code
curl http://localhost:3000/health
Vérifier les versions

bash
Copier le code
node -v
pnpm -v
nest --version
📚 Documentation NestJS
Commandes classiques :

bash
Copier le code
pnpm run start:dev
pnpm run test
pnpm run test:e2e
🗺️ Roadmap Ecoride
📌 Semaine 1 → Users
CRUD simple + base de données (SQLite / PostgreSQL)
Endpoint /users + affichage côté frontend

📌 Semaine 2 → Authentification
Inscription / Connexion (JWT), protection des routes, formulaire Login/Register

📌 Semaine 3 → Rides
Module rides (trajets vélo), lien trajets ↔ utilisateurs

📌 Semaine 4 → UX/UI
TailwindCSS, React Router, améliorations visuelles

📌 Semaine 5 → Déploiement
Backend → Render / Railway
Frontend → Vercel / Netlify

🏗️ Architecture
Version Mermaid

mermaid
Copier le code
flowchart LR
    A[Frontend - React/Vite] -->|HTTP REST API| B[Backend - NestJS]
    B -->|SQL/Mongo Queries| C[(Database)]
    A -->|Fetch / Axios| B
Version ASCII

lua
Copier le code
Frontend (React/Vite)  --->  Backend (NestJS API)  --->  Database (MongoDB/Postgres)
       |                      ↑
       |  HTTP Requests       |
       -------------------------
🛡️ Validation des données (Backend)
NestJS utilise class-validator pour valider les DTOs.
Les règles sont définies dans create-user.dto.ts et update-user.dto.ts.

Exemple (create-user.dto.ts) :

ts
Copier le code
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
Activation dans main.ts :

ts
Copier le code
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
👉 Exemple de réponse d’erreur si tu POST sans email valide :

json
Copier le code
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```
