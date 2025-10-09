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
---

## 🧩 1.7 Maquettes, diagrammes UML et wireframes

Avant le développement, une phase de **conception visuelle et technique** a été réalisée pour garantir la cohérence et la fluidité du projet **Ecoride**.

### 🎨 Maquettes & Wireframes
Les premières maquettes ont été réalisées avec **Figma**, afin de visualiser la structure et le design général de l’application :

- 🏠 **Page d’accueil (Home)** : message d’introduction, bouton “Accéder au tableau de bord”.  
- 📊 **Dashboard** : affichage des utilisateurs, trajets et formulaires d’ajout.  
- ℹ️ **Page “À propos”** : présentation du projet et lien vers les ressources.  

Les maquettes suivent la **charte graphique verte Ecoride** :
- Couleur principale : `#2e7d32` (vert écoresponsable)
- Couleur secondaire : `#e8f5e9` (fond clair et écologique)
- Police : *Poppins* (lisible et moderne)

Les images des maquettes sont disponibles dans le dossier :
📂 `/docs/maquettes/`

### 📊 Diagrammes UML

#### 1️⃣ Diagramme de cas d’utilisation
Ce diagramme montre les interactions principales entre les utilisateurs et le système :
- Créer un compte utilisateur  
- Ajouter un trajet  
- Consulter la liste des trajets  
- Accumuler des écoPoints  

📁 Fichier : `/docs/UML/diagramme_cas_utilisation.png`

#### 2️⃣ Diagramme de séquence
Il illustre la communication entre le **Front-end**, le **Serveur Express**, et la **Base MongoDB** :
- L’utilisateur soumet un formulaire via React  
- Le front envoie une requête HTTP POST  
- Le back (Express) crée une entrée dans MongoDB  
- Une réponse JSON est renvoyée au front pour mise à jour de l’interface  

📁 Fichier : `/docs/UML/diagramme_sequence.png`

#### 3️⃣ Schéma de la base de données
La base MongoDB contient deux collections principales :
- **users** (nom, email, ecoPoints)
- **trips** (user_id, origin, destination, distanceKm, ecoPoints)

📁 Fichier : `/docs/UML/schema_bdd.png`

### 🗂️ Organisation du dossier `/docs/`
/docs/
├── maquettes/
│ ├── homepage.png
│ ├── dashboard.png
│ └── about.png
├── UML/
│ ├── diagramme_cas_utilisation.png
│ ├── diagramme_sequence.png
│ └── schema_bdd.png
└── Ecoride_Rapport_Jury_2025.pdf
Liste des diagrammes UML à générer
1️⃣ Diagramme de cas d’utilisation

🎯 Objectif : montrer ce que peut faire un utilisateur dans ton application.

Acteurs :

Utilisateur

Cas d’utilisation principaux :

Créer un compte

Se connecter

Ajouter un trajet

Consulter ses trajets

Gagner des écoPoints

Voir le tableau de bord

📁 Nom du fichier → /docs/UML/diagramme_cas_utilisation.png

2️⃣ Diagramme de séquence

🎯 Objectif : illustrer le déroulement technique d’un ajout de trajet (front → back → base de données).

Participants :

Utilisateur

Interface React (Front-end)

Serveur Express (Back-end)

MongoDB (Base de données)

Étapes principales :

L’utilisateur saisit un trajet et valide.

React envoie une requête POST vers /trips.

Express reçoit la requête, calcule les écoPoints.

Express enregistre le trajet dans MongoDB.

MongoDB confirme la sauvegarde.

Express renvoie une réponse JSON.

React met à jour l’interface (trajet + points).

📁 Nom du fichier → /docs/UML/diagramme_sequence.png

3️⃣ Schéma de la base de données

🎯 Objectif : montrer la structure MongoDB et les relations entre collections.

Collections :

users

_id

name

email

ecoPoints

trips

_id

user (référence à users._id)

origin

destination

distanceKm

ecoPoints

📁 Nom du fichier → /docs/UML/schema_bdd.png
Liste des diagrammes UML à générer
1️⃣ Diagramme de cas d’utilisation

🎯 Objectif : montrer ce que peut faire un utilisateur dans ton application.

Acteurs :

Utilisateur

Cas d’utilisation principaux :

Créer un compte

Se connecter

Ajouter un trajet

Consulter ses trajets

Gagner des écoPoints

Voir le tableau de bord

📁 Nom du fichier → /docs/UML/diagramme_cas_utilisation.png

2️⃣ Diagramme de séquence

🎯 Objectif : illustrer le déroulement technique d’un ajout de trajet (front → back → base de données).

Participants :

Utilisateur

Interface React (Front-end)

Serveur Express (Back-end)

MongoDB (Base de données)

Étapes principales :

L’utilisateur saisit un trajet et valide.

React envoie une requête POST vers /trips.

Express reçoit la requête, calcule les écoPoints.

Express enregistre le trajet dans MongoDB.

MongoDB confirme la sauvegarde.

Express renvoie une réponse JSON.

React met à jour l’interface (trajet + points).

📁 Nom du fichier → /docs/UML/diagramme_sequence.png

3️⃣ Schéma de la base de données

🎯 Objectif : montrer la structure MongoDB et les relations entre collections.

Collections :

users

_id

name

email

ecoPoints

trips

_id

user (référence à users._id)

origin

destination

distanceKm

ecoPoints

📁 Nom du fichier → /docs/UML/schema_bdd.png
🧩 F1.8 – Gestion de projet
🔧 Méthodologie utilisée : Agile / Kanban

Le projet Ecoride a été mené selon une approche Agile, centrée sur des itérations courtes et des objectifs précis à chaque étape.
Un tableau Trello a été utilisé pour planifier et suivre les tâches, réparties selon les colonnes suivantes :

📋 À faire (Backlog) : fonctionnalités prévues (authentification, ajout trajet, etc.)

⚙️ En cours : tâches en développement

✅ Terminées : fonctionnalités validées et testées

📌 Lien Trello : https://trello.com/b/zyLTb7rW/mon-tableau-trello

💻 Gestion de version : Git & GitHub

Le code source complet est hébergé sur GitHub, avec un système de branches fonctionnelles pour faciliter la collaboration et la lisibilité du travail.

📂 Lien GitHub : https://github.com/yvesnet9/ecoride

🔀 Convention des branches :
Branche	Description
main	Code stable, version finale validée
dev	Intégration des fonctionnalités avant merge
feature/homepage	Développement de la page d’accueil
feature/dashboard	Gestion du tableau de bord
feature/api-users	API des utilisateurs
feature/api-trips	API des trajets
🧩 Convention des commits :

Chaque sauvegarde Git est associée à une étape du livrable :

F1.1 – Titre et présentation du projet 🌱

F1.2 – Objectifs du projet

F1.3 – Contexte et motivation

F1.4 – Public cible

F1.5 – Stack technique

F1.6 – Fonctionnalités principales

F1.7 – Maquettes & diagrammes UML

🧭 Historique des merges

Chaque fonctionnalité développée dans une branche feature/... a été testée puis fusionnée dans la branche main après validation :

✅ feature/homepage → main

✅ feature/dashboard → main

✅ feature/api-users → main

✅ feature/api-trips → main

🧠 Avantages de cette approche

Suivi clair de la progression

Historique Git propre et documenté

Tests fonctionnels par bloc avant intégration finale

Organisation conforme à une méthode de travail professionnelle

🧪 1️⃣ Tests

Pour ce projet, les tests manuels ont été réalisés sur chaque fonctionnalité principale :

✅ Ajout d’un utilisateur

✅ Ajout d’un trajet et calcul automatique des écoPoints

✅ Vérification de la persistance des données dans MongoDB

✅ Navigation entre les pages et animations Framer Motion

✅ Vérification du chargement API (status ✅ / ❌ affiché à l’écran)

🧰 Outils utilisés :

Console navigateur (pour inspecter les requêtes API)

Postman (pour tester les routes GET, POST, DELETE)

MongoDB Atlas (pour valider les enregistrements en base)

🔐 2️⃣ Sécurité

Les variables sensibles (URL MongoDB, PORT) sont stockées dans un fichier .env

Les requêtes CORS sont autorisées uniquement depuis le frontend (localhost:5173)

Les mots de passe MongoDB ne sont jamais exposés dans le code

Les dépendances sont maintenues à jour (npm audit fix)

🧹 3️⃣ Bonnes pratiques

Architecture claire : frontend/ + backend-express/

Code commenté et indenté (normes ESLint / Prettier)

Nommage cohérent : composants React en PascalCase

Respect de la séparation des responsabilités (Front ↔ API ↔ DB)

Commit Git descriptifs et horodatés (ex: F1.6 – Fonctionnalités principales)

💬 4️⃣ Exemple de vérification API (Postman)

Route : POST /trips
Corps :

{
  "user": "65a2dce4a9c1f9f5bfa1d234",
  "origin": "Paris",
  "destination": "Lyon",
  "distanceKm": 465
}


Réponse attendue :

{
  "message": "✅ Trajet ajouté avec succès",
  "trip": {
    "_id": "...",
    "ecoPoints": 930
  }
}
🧩 F1.10 – Conclusion & perspectives
🌿 Conclusion

Le projet Ecoride illustre pleinement les enjeux actuels de la mobilité partagée et écoresponsable.
Grâce à son architecture claire (React + Node.js + MongoDB), cette application démontre une compréhension solide du développement full-stack moderne, de la gestion de données en temps réel et des interactions API REST.

L’application offre déjà une expérience fluide et intuitive :

gestion complète des utilisateurs et de leurs trajets,

calcul automatique des écoPoints,

transitions animées et interface moderne,

et connexion fiable avec une base MongoDB sécurisée.

Ce projet marque une étape importante dans la montée en compétences de l’apprenant, combinant rigueur technique, sens du design et vision durable.

🚀 Perspectives d’évolution

Pour enrichir et professionnaliser encore davantage Ecoride, plusieurs pistes d’amélioration sont envisageables :

Authentification sécurisée (JWT)
Permettre aux utilisateurs de se connecter via un compte personnel pour protéger leurs données.

Gestion des trajets en temps réel (socket.io)
Afficher les trajets partagés disponibles et permettre aux utilisateurs de rejoindre un trajet actif.

Tableau de bord analytique
Ajouter des graphiques de suivi : km parcourus, CO₂ économisé, points cumulés.

Application mobile React Native
Étendre la plateforme pour un usage sur smartphones, avec géolocalisation intégrée.

Système de récompenses écologiques
Offrir des bonus ou réductions partenaires selon le nombre d’écoPoints accumulés.

💬 Bilan personnel

“Ecoride m’a permis de mettre en pratique l’ensemble des compétences acquises pendant ma formation — de la conception à la mise en production, en passant par la logique métier, la structuration du code et la gestion de projet.
Cette expérience m’a aussi sensibilisé à la place du numérique dans la transition écologique.”

— Yves Mukuna Jamesy 🌱