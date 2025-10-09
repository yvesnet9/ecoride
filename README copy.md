# 🌿 Ecoride – Plateforme innovante de mobilité partagée et écoresponsable

## 👤 Auteur
**Yves Mukuna Jamesy**  
📧 [yvesnet9@gmail.com](mailto:yvesnet9@gmail.com)  
🎓 Formation **Développeur Web & Web Mobile – Studi 2025**

---

## 🧭 1. Présentation du projet

**Ecoride** est une plateforme web de **mobilité partagée et écoresponsable**.  
Elle permet aux utilisateurs de :
- Partager leurs trajets pour réduire leur empreinte carbone 🌍  
- Cumuler des **écoPoints** selon les kilomètres parcourus  
- Visualiser leurs trajets et leurs performances écologiques  

> L’objectif est de promouvoir des trajets durables et une mobilité plus verte grâce à une interface intuitive et un backend solide.

---

## ⚙️ 2. Stack technique

### 🧩 Frontend
- **React 18 + TypeScript**
- **Vite** (pour le build rapide)
- **Framer Motion** (animations fluides)
- **React Router DOM** (navigation multi-pages)
- **CSS / inline styling moderne**

### 🔧 Backend
- **Node.js + Express**
- **MongoDB (Mongoose)** – stockage des utilisateurs et trajets
- **CORS** pour la communication front/back
- **Nodemon** pour le développement

### 💾 Autres outils
- **Trello** → gestion du projet en méthode Agile  
- **Git & GitHub** → versioning et déploiement  
- **VS Code + WSL Ubuntu** → environnement de développement  

---

## 🚀 3. Installation et lancement

### 📁 Cloner le projet
```bash
git clone https://github.com/yvesnet9/ecoride.git
cd ecoride
⚙️ Backend
bash
Copier le code
cd backend-express
npm install
npm run dev
Le backend tourne sur le port 3000 → http://localhost:3000

💻 Frontend
bash
Copier le code
cd ../frontend/web
npm install
npm run dev
Le frontend tourne sur le port 5173 → http://localhost:5173

🌍 4. Fonctionnalités principales
👤 Utilisateurs
Création d’un nouvel utilisateur avec nom, email et écoPoints

Suppression d’un utilisateur

Liste dynamique des utilisateurs depuis MongoDB

🚗 Trajets
Ajout d’un trajet (origine, destination, distance)

Calcul automatique des écoPoints (2 pts/km)

Association d’un trajet à un utilisateur

Liste dynamique des trajets

💡 UI/UX
Page d’accueil animée avec Framer Motion

Dashboard complet avec cartes interactives

Animations : fade-in, slide-up et hover glow

Responsive Design (desktop/tablette/mobile)

🧠 5. Architecture et diagrammes (📂 /docs/)
Le dossier /docs/ contient :

Wireframes (maquettes Figma)

Diagramme UML (cas d’utilisation, séquence, BDD)

Ecoride_Rapport_Jury_2025.pdf → rapport final complet

Ecoride_logo.png → logo officiel du projet

📊 6. Gestion de projet
📌 Outil de suivi : Trello Ecoride
Méthode Agile Kanban, avec colonnes :

Backlog → idées et tâches à venir

En cours → développement actif

Test / Validation

Terminé → livré et merge sur la branche principale

🧭 Organisation GitHub
main → version stable (livrable)

dev → développement actif

feature/ → sous-branches fonctionnelles fusionnées via PR

Lien du dépôt :
🔗 https://github.com/yvesnet9/ecoride

🔐 7. Tests & sécurité
Vérification des routes API (GET, POST, DELETE) via Postman

Validation des entrées (nom, email, distance)

Gestion des erreurs serveur (try/catch)

Protection des requêtes grâce à CORS

Respect du modèle MVC allégé

🧩 8. Annexes
📸 Captures d’écran
1️⃣ Page d’accueil (Home)

“Bienvenue sur Ecoride 🌿” – avec animation du logo et bouton d’accès au dashboard.

2️⃣ Dashboard (Tableau de bord)

Liste des utilisateurs et trajets avec calcul dynamique des écoPoints.

🔗 Liens
GitHub : https://github.com/yvesnet9/ecoride

Trello : https://trello.com/b/zyLTb7rW/mon-tableau-trello

🏁 9. Conclusion & perspectives
Ecoride démontre la mise en œuvre complète d’une plateforme de mobilité durable avec :

Un backend robuste (Node.js / MongoDB)

Un frontend réactif et esthétique (React + Vite)

Une logique écologique concrète (écoPoints par km)

🔮 Évolutions futures
Authentification JWT sécurisée 🔐

Profil utilisateur détaillé

Système de classement des meilleurs conducteurs écoresponsables

Application mobile React Native 📱

✍️ 10. Signature
Validé par :
Yves Mukuna Jamesy
Étudiant DWWM – Studi 2025
"Je certifie que ce projet a été réalisé personnellement dans le cadre de la formation DWWM – Studi."