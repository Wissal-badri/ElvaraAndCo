# 👑 ELVARA & CO. — Site E-Commerce de Luxe

> Une plateforme de commerce électronique fullstack pour marque de vêtements de luxe, construite avec **React.js**, **Express.js** et **MySQL**.

---

## ✨ Aperçu

**ELVARA & CO.** est un site e-commerce de mode premium conçu avec une esthétique royale et élégante — mettant en vedette une palette de couleurs noire, or et ivoire, des animations fluides et une expérience d'achat fluide.

---

## 🌟 Fonctionnalités Principales

### 🛍️ Pour les Clients (Acheteurs)
- **Parcourir le Catalogue Premium :** Explorez une collection soigneusement sélectionnée de vêtements de luxe avec des images de haute qualité et des descriptions détaillées.
- **Filtrage et Recherche Avancés :** Trouvez facilement des produits à l'aide de catégories et de filtres.
- **Panier d'Achat Interactif :** Ajoutez des produits au panier, ajustez les quantités et consultez le calcul des prix en temps réel.
- **Paiement Fluide :** Passez des commandes rapidement avec un système de Paiement à la Livraison (COD) — aucune carte de crédit requise à l'avance.
- **Design Réactif :** Profitez d'une expérience d'achat impeccable et magnifiquement animée sur ordinateur, tablette et appareils mobiles.

### 🛡️ Pour les Administrateurs (Propriétaires de Boutique)
- **Authentification Sécurisée :** Système de connexion sécurisé basé sur JWT pour protéger les données sensibles de la boutique.
- **Gestion des Produits :** Capacités complètes de CRUD (Créer, Lire, Mettre à jour, Supprimer) pour gérer l'inventaire de la boutique, mettre à jour les prix et télécharger de nouvelles images de produits.
- **Suivi des Commandes :** Consultez toutes les commandes clients au même endroit et mettez à jour leur statut d'exécution (ex : En attente, Expédiée, Livrée).
- **Tableau de Bord Analytique :** Aperçu des performances de la boutique et de l'activité récente.

---

## 🖥️ Pile Technologique (Tech Stack)

| Couche     | Technologie                         |
|------------|-------------------------------------|
| Frontend   | React.js + Vite, Framer Motion      |
| Backend    | Node.js + Express.js                |
| Base de Données | MySQL + Sequelize ORM          |
| Auth       | JWT (JSON Web Tokens) + bcryptjs    |
| Style      | Vanilla CSS (système de design personnalisé) |

---

## 📁 Structure du Projet

```
ELVARA & CO/
├── Backend/
│   ├── config/          # Connexion à la base de données (Sequelize)
│   ├── controllers/     # Logique Auth, Produit, Commande
│   ├── middleware/      # Middleware auth JWT
│   ├── models/          # Utilisateur, Produit, Commande, Article de Commande
│   ├── routes/          # Routes API
│   ├── .env             # Variables d'environnement (non commitées)
│   ├── server.js        # Point d'entrée de l'application Express
│   ├── seed.js          # Crée l'utilisateur administrateur
│   └── create_db.js     # Crée la base de données MySQL
│
└── Frontend/
    └── src/
        ├── components/  # Barre de navigation (Navbar)
        ├── context/     # AuthContext, CartContext
        ├── pages/       # Toutes les pages (Accueil, Boutique, Panier, etc.)
        └── services/    # Instance d'API Axios
```

---

## 🚀 Commencer

### Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) en cours d'exécution localement (ex : via XAMPP)
- Git

---

### 1. Cloner le Dépôt

```bash
git clone https://github.com/Wissal-badri/ElvaraAndCo..git
cd "ElvaraAndCo."
```

---

### 2. Configuration du Backend

```bash
cd Backend
npm install
```

Créez un fichier `.env` dans le dossier `Backend/` :

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=elvara_db
JWT_SECRET=elvara_secret_key_123
JWT_EXPIRES_IN=1d
```

Créez la base de données :

```bash
node create_db.js
```

Insérez l'utilisateur administrateur :

```bash
node seed.js
```

Démarrez le serveur backend :

```bash
node server.js
```

> ✅ Le backend s'exécute sur `http://localhost:5000`

---

### 3. Configuration du Frontend

```bash
cd Frontend
npm install
npm run dev
```

> ✅ Le frontend s'exécute sur `http://localhost:5173`

---

## 🌐 Pages

| Page             | URL                          | Description                          |
|------------------|------------------------------|--------------------------------------|
| 🏠 Accueil       | `/`                          | Héros, produits phares, valeurs de la marque |
| 🛍️ Boutique      | `/shop`                      | Catalogue complet des produits avec filtres |
| 👗 Détails du Produit | `/product/:id`        | Infos produit + Ajouter au panier    |
| 🛒 Panier        | `/cart`                      | Panier avec contrôles de quantité    |
| 📦 Paiement      | `/checkout`                  | Formulaire de commande (Paiement à la livraison) |
| ℹ️ À Propos      | `/about`                     | Histoire et valeurs de la marque     |
| 🔐 Connexion Admin | `/login`                   | Authentification administrateur      |
| ⚙️ Tableau de Bord Admin | `/admin`             | CRUD Produit + Gestion des commandes |

---

## 🔐 Accès Administrateur

| Champ    | Valeur       |
|----------|--------------|
| Nom d'utilisateur | `admin`      |
| Mot de passe      | `elvara2026` |

> ⚠️ Changez le mot de passe après la première connexion en production.

---

## 🔌 Points de Terminaison API (Endpoints)

### Authentification (Auth)
| Méthode | Endpoint            | Accès   | Description        |
|---------|---------------------|---------|--------------------|
| POST    | `/api/auth/register`| Public  | Enregistrer un admin |
| POST    | `/api/auth/login`   | Public  | Connexion & obtention de jeton |

### Produits
| Méthode | Endpoint              | Accès   | Description        |
|---------|-----------------------|---------|--------------------|
| GET     | `/api/products`       | Public  | Obtenir tous les produits |
| GET     | `/api/products/:id`   | Public  | Obtenir un seul produit |
| POST    | `/api/products`       | Admin   | Créer un produit     |
| PUT     | `/api/products/:id`   | Admin   | Mettre à jour un produit |
| DELETE  | `/api/products/:id`   | Admin   | Supprimer un produit     |

### Commandes
| Méthode | Endpoint                    | Accès   | Description         |
|---------|-----------------------------|---------|---------------------|
| POST    | `/api/orders`               | Public  | Passer une commande |
| GET     | `/api/orders`               | Admin   | Obtenir toutes les commandes |
| PUT     | `/api/orders/:id/status`    | Admin   | Mettre à jour le statut de commande |

---

## 🛡️ Fonctionnalités de Sécurité

- ✅ Mots de passe hachés avec **bcryptjs**
- ✅ Authentification **JWT** pour les routes admin
- ✅ **Helmet.js** pour des en-têtes HTTP sécurisés
- ✅ **Limitation de débit (Rate limiting)** sur l'API et les points de terminaison de commande
- ✅ **CORS** restreint à l'origine du frontend
- ✅ Validation des entrées sur tous les formulaires
- ✅ Protection contre l'injection SQL via **Sequelize ORM**
- ✅ Données sensibles stockées dans `.env` (jamais commitées)

---

## 🎨 Système de Design de Marque

| Jeton (Token)      | Valeur    |
|--------------------|-----------|
| Noir Royal         | `#0A0A0A` |
| Or Royal           | `#C9A646` |
| Or Champagne       | `#E5C97A` |
| Bordeaux Profond   | `#5A0F1C` |
| Blanc Ivoire       | `#F8F5F0` |
| Police de Titre    | Playfair Display |
| Police de Corps    | Montserrat |

---

## 📄 Licence

Ce projet est privé et exclusif à **ELVARA & CO.**  
© 2026 ELVARA & CO. Tous droits réservés.
