# Blablabook

Blablabook est une application web de gestion de bibliothèque personnelle. Elle permet de rechercher des livres parmi des milliers de titres, de les ajouter à sa bibliothèque, de suivre l'état de ses lectures et de partager ses avis.

Conçue pour les amoureux des livres, Blablabook répond à un besoin simple : savoir ce qu'on a lu, ce qu'on est en train de lire, et avoir accès aux avis d'autres lecteurs pour guider ses prochaines lectures.

---

## Technologies

**Frontend**
- React (react-router, react-helmet, react-dom) : SPA réactive et fluide
- Parcel : bundler léger, zéro configuration

**Backend**
- Node.js / Express : développement fullstack en JavaScript
- PostgreSQL : base de données relationnelle, adaptée aux relations entre utilisateurs, livres et bibliothèques

**Outils**
- Axios : gestion de la communication frontend/backend
- Vitest : tests unitaires et d'intégration
- node-cache : mise en cache des résultats de recherche OpenLibrary
- Docker : conteneurisation et environnement de développement reproductible
- bcrypt, jsonwebtoken, cookie-parser, cors, validator : sécurisation de l'authentification et des échanges

**API externe**
- OpenLibrary : catalogue de livres open source, utilisé pour la recherche et l'enrichissement des données

> Ce projet a été initié dans un contexte de formation. Les choix technologiques reflètent à la fois les contraintes pédagogiques de l'époque et les évolutions apportées lors de la refonte.

---

## Fonctionnalités

- **Bibliothèque publique** : consultation et recherche parmi des milliers de livres via OpenLibrary
- **Détail d'un livre** : informations complètes, note moyenne et avis des utilisateurs
- **Bibliothèque personnelle** : ajout et suppression de livres, recherche dans sa propre collection
- **Notes et commentaires** : notation sur 5 étoiles et commentaire libre sur les livres possédés
- **Gestion du compte** : modification des informations personnelles (email, pseudonyme, mot de passe) et suppression du compte

---

## Architecture

Le projet est structuré en monorepo avec deux dossiers indépendants `frontend` et `backend` chacun avec son propre `package.json`. Cette organisation permet de travailler sur les deux couches sans gérer deux dépôts séparés, tout en maintenant une séparation claire des responsabilités.

**Backend** suit une architecture en couches : routeurs → middlewares → controllers → services. Les appels à l'API OpenLibrary sont isolés dans un service dédié, indépendant des controllers.

**Sécurité**
- Principe zero-trust : toutes les validations frontend sont refaites indépendamment en backend
- Tokens JWT stockés en cookie `httpOnly` : inaccessibles au JavaScript, protégés contre les attaques XSS
- Requêtes SQL paramétrées et whitelist sur les noms de colonnes dynamiques : protection contre les injections SQL
- Mots de passe hachés avec bcrypt, jamais stockés en clair
- CORS restreint au domaine frontend autorisé
- Secrets et variables d'environnement stockés hors du dépôt

**Cache** — les résultats de recherche OpenLibrary sont mis en cache côté backend (`node-cache`) pour limiter les appels à l'API externe et améliorer les temps de réponse.

---

## Installation et lancement

**Prérequis**
- Docker et Docker Compose

**Lancement**

1. Cloner le dépôt :
```bash
git clone <url-du-repo>
cd blablabook
```

2. Créer les fichiers d'environnement à partir des exemples fournis :
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Compléter les variables d'environnement dans chaque fichier `.env`

4. Lancer les conteneurs :
```bash
docker compose up
```

L'application est accessible sur :
- Frontend : `http://localhost:1234`
- Backend : `http://localhost:3000`

La base de données est initialisée automatiquement au premier lancement à partir des scripts `migration.sql` et `seeding.sql`.

---

## Variables d'environnement

**Backend** (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `PORT` | Port d'écoute du serveur Express (défaut : 3000) |
| `DB_HOST` | Hôte de la base de données (utiliser `db` avec Docker) |
| `DB_PORT` | Port PostgreSQL (défaut : 5432) |
| `DB_NAME` | Nom de la base de données |
| `DB_USER` | Utilisateur PostgreSQL |
| `DB_PASSWORD` | Mot de passe PostgreSQL |
| `JWT_SECRET` | Secret de signature des tokens JWT (chaîne aléatoire longue) |
| `FRONTEND_URL` | URL du frontend autorisée par CORS (ex: `http://localhost:1234`) |

**Frontend** (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `API_URL` | URL de l'API backend (ex: `http://localhost:3000/api`) |

---

## Tests

Les tests sont lancés avec la même commande dans les deux dossiers :

```bash
cd backend && npm run test
cd frontend && npm run test
```

**Backend** (Vitest)
- `generateToken` : génération et validation des tokens JWT (4 tests unitaires)
- `checkPassword` : vérification du mot de passe utilisateur avec mock BDD (4 tests unitaires)
- `checkJWT` : middleware d'authentification avec mock BDD (5 tests unitaires)
- Routes `register` et `login` : validation des entrées et comportement HTTP (9 tests d'intégration)

**Frontend** (Vitest + React Testing Library)
- `RatingInput` — rendu des étoiles, interactions hover et clic, appels API (6 tests comportementaux)

---

## Choix techniques notables

**Architecture frontend/backend séparée**

L'architecture initiale prévoyait un backend Node.js avec projections de vue dans lesquelles React était injecté pour la dynamisation, une approche qui aurait centralisé la sécurité côté serveur. Face aux difficultés de mise en place et aux risques de retard pour une équipe de cinq développeurs débutants, le choix d'une architecture SPA React / API REST Express a été fait. Ce compromis a permis de livrer dans les délais tout en maintenant un niveau de sécurité satisfaisant grâce à une validation systématique côté backend.

**Structure des composants React**

Chaque composant ou page vit dans son propre dossier contenant le JSX et le SCSS associé. Cette organisation a permis à l'équipe de travailler en parallèle avec très peu de conflits. Limite identifiée : avec la croissance du projet, une organisation par domaine fonctionnel (`auth/`, `library/`, `account/`) contenant chacun ses `pages/` et `components/` serait plus lisible.

**Abandon de Sequelize au profit de requêtes SQL brutes**

Sequelize a été retiré en cours de projet suite à des difficultés de configuration. Ce retrait s'est avéré bénéfique : l'architecture en couches déjà en place a rendu le switch transparent, et l'équipe a progressé significativement en SQL. Les requêtes paramétrées et les whitelists sur les noms de colonnes dynamiques ont été implémentées manuellement, renforçant la compréhension des enjeux de sécurité.