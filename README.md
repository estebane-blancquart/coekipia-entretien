# Coekipia — Exercice technique : Filtrage avancé

Application de filtrage et tri d'employés avec trois backends indépendants partageant une base de données commune, et un frontend unique.

## Architecture

- frontend/          → React + Vite + Tailwind (port 5173)
- backend-node/      → Node.js + TypeScript + Express (port 3001)
- backend-python/    → Python + FastAPI (port 3002)
- backend-java/      → Java + Spring Boot (port 3003)
- postgres/          → PostgreSQL 16 (port 5432)

## Choix techniques

- **Typage strict** : chaque backend garantit qu'on ne peut filtrer que sur une propriété existante de l'objet `Employee` — via `keyof Omit<T, 'id'>` en TypeScript, `Literal` en Python, et un `Set<String>` avec validation en Java.
- **Front unique** : le frontend consomme le même contrat d'API (routes, paramètres, JSON) sur les trois backends. Un toggle permet de switcher en live.
- **Docker Compose** : orchestre les 4 services en une commande, garantit la portabilité et élimine les dépendances d'environnement.
- **PostgreSQL** : base relationnelle partagée entre les trois backends, initialisée automatiquement via `init.sql`.

## Lancer le projet

### Démarrage

```bash
docker compose up --build
```

Puis dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173)

## API

Les trois backends exposent le même contrat :

| Endpoint | Paramètres | Description |
|---|---|---|
| `GET /employees` | `filterKey`, `filterValue`, `sortKey` | Retourne tous les employés, filtrés et triés si paramètres fournis |
| `GET /fields` | — | Retourne la liste des propriétés filtrables |

## Objet Employee

| Champ | Type | Description |
|---|---|---|
| `id` | number | Identifiant unique |
| `first_name` | string | Prénom |
| `last_name` | string | Nom |
| `department` | string | Département (Engineering, HR, Sales) |
| `role` | string | Rôle (Developer, Tech Lead, HR Manager...) |
| `salary` | number | Salaire annuel |
| `is_active` | boolean | Statut actif/inactif |
