# 🌿 Ecoride – Plateforme innovante de mobilité partagée et écoresponsable

## 👤 Auteur
**Yves Mukuna Jamesy**  
📧 [yvesnet9@gmail.com](mailto:yvesnet9@gmail.com)  
🎓 Formation **Développeur Web & Web Mobile – Studi 2025**

---

## 🧭 1. Présentation du projet
**Ecoride** est une plateforme web collaborative de mobilité durable, permettant aux utilisateurs de partager leurs trajets, économiser du carburant et cumuler des écoPoints 🌱.
---

## 🎯 1.2 Objectifs du projet

Le projet **Ecoride** vise à :
- 🌍 Promouvoir une **mobilité durable et partagée**, en réduisant le nombre de véhicules sur les routes.  
- 💨 Diminuer les **émissions de CO₂** grâce au covoiturage et à l’optimisation des trajets.  
- 💚 Encourager les comportements écoresponsables via un **système d’écoPoints** récompensant les utilisateurs.  
- 🧭 Offrir une plateforme **simple, intuitive et interactive**, accessible sur ordinateur et mobile.  

En résumé, Ecoride permet de **voyager ensemble, plus vert et plus malin.**
---

## 💡 1.3 Contexte et motivation

Aujourd’hui, la mobilité urbaine fait face à plusieurs défis :
- 🚗 Une circulation toujours plus dense et une pollution croissante.  
- ⛽ Une dépendance forte aux carburants fossiles.  
- 🕐 Une perte de temps quotidienne pour les trajets domicile-travail.

Face à ce constat, **Ecoride** a été imaginée comme une **plateforme moderne et écoresponsable** permettant :
- Aux citoyens de **partager leurs trajets** et de réduire leurs coûts de transport.  
- Aux entreprises et collectivités de **promouvoir des pratiques durables**.  
- Aux développeurs et designers d’explorer une approche **technologique innovante** du covoiturage.

💚 Ce projet s’inscrit dans une démarche de **transition écologique**, alliant technologie, mobilité et responsabilité environnementale.
---

## 👥 1.4 Public cible et utilisateurs visés

La plateforme **Ecoride** s’adresse à un large public, composé de plusieurs profils complémentaires :

- 👨‍💼 **Les particuliers actifs** : souhaitant partager leurs trajets quotidiens (domicile ↔ travail) pour réduire les coûts et leur empreinte carbone.  
- 🏫 **Les étudiants** : en recherche de solutions économiques et conviviales pour se déplacer entre le campus et leur logement.  
- 🏢 **Les entreprises et collectivités locales** : désireuses d’encourager la mobilité verte auprès de leurs employés.  
- 🌍 **Les associations écologiques** : qui peuvent utiliser la plateforme pour promouvoir des initiatives de covoiturage responsable.  

L’objectif est de **rassembler ces utilisateurs autour d’une même vision : se déplacer autrement, ensemble, et durablement.**
---

## ⚙️ 1.5 Stack technique et outils utilisés

Le projet **Ecoride** repose sur une architecture **Full-Stack JavaScript moderne**, combinant performance, modularité et maintenabilité.

### 🧠 Front-end
- **Framework :** React (avec Vite pour un démarrage rapide)
- **Langage :** TypeScript (sécurité et clarté du code)
- **Animations :** Framer Motion pour des transitions fluides
- **Routing :** React Router DOM
- **Gestion de l’état :** Hooks (`useState`, `useEffect`)
- **UI :** TailwindCSS (pour un design sobre et responsive)

### ⚙️ Back-end
- **Serveur :** Express.js  
- **Langage :** Node.js  
- **Base de données :** MongoDB Atlas (connexion cloud sécurisée)  
- **ORM / ODM :** Mongoose  
- **Middleware :** CORS, JSON, dotenv (gestion des variables d’environnement)  
- **Architecture :** API REST structurée (routes, contrôleurs, modèles)

### 🗄️ Base de données
- Hébergée sur **MongoDB Atlas**
- Collections :
  - `users` : nom, email, écoPoints
  - `trips` : utilisateur, origine, destination, distance, écoPoints associés

### 🧰 Outils de développement
- **IDE :** Visual Studio Code  
- **Contrôle de version :** Git & GitHub  
- **Gestion de projet :** Trello (suivi des tâches et sprints Agile)  
- **Terminal :** WSL2 (Ubuntu)  
- **Documentation :** Markdown (`README.md`) et export PDF pour le jury

💡 Cette stack garantit une application **rapide, évolutive et écologique** dans son approche technique.
---

## 🚀 1.6 Fonctionnalités principales

### 🧩 Présentation générale
**Ecoride** est une application web complète permettant :
- aux utilisateurs de s’inscrire et de gérer leurs informations,
- d’ajouter et consulter des trajets partagés,
- et de cumuler automatiquement des **écoPoints** proportionnels à la distance parcourue 🌱.

---

### 💻 Front-end (React + Framer Motion)
L’interface utilisateur a été pensée pour être **fluide, responsive et moderne**, grâce à React et à des animations douces avec **Framer Motion**.

#### ✅ Pages principales :
1. **HomePage** – Page d’accueil  
   - Présentation du concept et bouton d’accès au tableau de bord  
   - Animation d’apparition du titre et du bouton (fade-in + slide)  
   - Couleurs douces (#2e7d32 – vert Ecoride)

2. **Dashboard** – Tableau de bord principal  
   - Affiche la liste des utilisateurs et des trajets  
   - Permet d’ajouter un **nouvel utilisateur** via un formulaire (nom + email)  
   - Permet d’ajouter un **nouveau trajet** (origine, destination, distance)  
   - Calcule automatiquement les **écoPoints** :  
     🧮 `écoPoints = distanceKm × 2`  
   - Animation des cartes, boutons et transitions (Framer Motion)

3. **AboutPage** – Page “À propos”  
   - Présentation du projet, de sa mission écologique et des technologies utilisées  
   - Navigation fluide et cohérente avec le reste du site

4. **Navbar (commune)**  
   - Navigation fluide entre les pages  
   - Animation “soulignement vert” au survol  
   - Logo Ecoride animé (fade-in léger à l’arrivée sur chaque page)

5. **Loader** (animation de chargement)  
   - Affiche une petite **feuille tournante 🌿** ou le logo Ecoride animé  
   - Apparition lors du lancement initial de l’app

---

### 🛠️ Back-end (Express + MongoDB)
Le serveur Express constitue le cœur de la logique métier de l’application.

#### ⚙️ Routes principales :
- **GET `/users`** → Récupère la liste des utilisateurs  
- **POST `/users`** → Ajoute un nouvel utilisateur (nom, email, ecoPoints=0)  
- **GET `/trips`** → Récupère la liste des trajets  
- **POST `/trips`** → Ajoute un trajet et calcule les écoPoints correspondants

#### 🧮 Exemple d’ajout de trajet :
```json
POST /trips
{
  "user": "64e0b1b6c5e9a6c85f123456",
  "origin": "Paris",
  "destination": "Versailles",
  "distanceKm": 25
}
➡️ Le serveur calcule : ecoPoints = 25 × 2 = 50 pts
➡️ Les points sont ajoutés à l’utilisateur concerné.

🔐 Sécurité :

CORS activé pour permettre la communication front ↔ back

Variables sensibles (URI MongoDB, PORT) stockées dans .env

Gestion des erreurs côté API (try/catch, statuts HTTP)

🌍 Résumé technique global
Élément	Description
Front-end	React + TypeScript + Framer Motion
Back-end	Node.js + Express
Base de données	MongoDB Atlas
Animations	Framer Motion
Connexion API	Fetch (HTTP) entre localhost:5173 ↔ localhost:3000
Design Vert écoresponsable (#2e7d32), sobre et moderne