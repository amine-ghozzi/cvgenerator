# CV Generator

Application web intelligente de génération et d'adaptation de CV basée sur OpenAI.

## Fonctionnalités

- Extraction d'offres d'emploi depuis une URL
- Analyse et adaptation automatique du CV avec OpenAI
- Saisie manuelle des informations via formulaire
- Sélection de templates et styles de CV
- Gestion des outils et compétences
- Export en différents formats (PDF, DOCX)

## Prérequis

- Node.js 20 LTS
- npm ou yarn
- Une clé API OpenAI

## Installation

1. Cloner le repository
```bash
git clone [URL_DU_REPO]
cd cv-generator
```

2. Installer les dépendances
```bash
npm install
cd client
npm install
cd ..
```

3. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet avec les variables suivantes :
```
OPENAI_API_KEY=votre_clé_api
PORT=3000
```

4. Lancer l'application en mode développement
```bash
npm run dev:full
```

## Structure du Projet

```
cv-generator/
├── client/                 # Frontend React
├── src/                    # Backend Node.js
│   ├── controllers/       # Contrôleurs
│   ├── routes/           # Routes API
│   ├── services/         # Services (OpenAI, etc.)
│   ├── utils/            # Utilitaires
│   └── server.js         # Point d'entrée
├── .env                   # Variables d'environnement
└── package.json          # Dépendances
```

## Déploiement

L'application est configurée pour être déployée sur Azure Web App avec Node.js 20 LTS.

## Licence

MIT 