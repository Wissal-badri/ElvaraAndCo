# 👑 ELVARA & CO. — Luxury E-Commerce Website

> A fullstack luxury clothing brand e-commerce platform built with **React.js**, **Express.js**, and **MySQL**.

---

## ✨ Overview

**ELVARA & CO.** is a premium fashion e-commerce website designed with a royal, elegant aesthetic — featuring a black, gold, and ivory color palette, smooth animations, and a seamless shopping experience.

---

## 🖥️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js + Vite, Framer Motion      |
| Backend    | Node.js + Express.js                |
| Database   | MySQL + Sequelize ORM               |
| Auth       | JWT (JSON Web Tokens) + bcryptjs    |
| Styling    | Vanilla CSS (custom design system)  |

---

## 📁 Project Structure

```
ELVARA & CO/
├── Backend/
│   ├── config/          # Database connection (Sequelize)
│   ├── controllers/     # Auth, Product, Order logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # User, Product, Order, OrderItem
│   ├── routes/          # API routes
│   ├── .env             # Environment variables (not committed)
│   ├── server.js        # Express app entry point
│   ├── seed.js          # Creates the admin user
│   └── create_db.js     # Creates the MySQL database
│
└── Frontend/
    └── src/
        ├── components/  # Navbar
        ├── context/     # AuthContext, CartContext
        ├── pages/       # All pages (Home, Shop, Cart, etc.)
        └── services/    # Axios API instance
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) running locally (e.g. via XAMPP)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/Wissal-badri/ElvaraAndCo..git
cd "ElvaraAndCo."
```

---

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=elvara_db
JWT_SECRET=elvara_secret_key_123
JWT_EXPIRES_IN=1d
```

Create the database:

```bash
node create_db.js
```

Seed the admin user:

```bash
node seed.js
```

Start the backend server:

```bash
node server.js
```

> ✅ Backend runs at `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

> ✅ Frontend runs at `http://localhost:5173`

---

## 🌐 Pages

| Page             | URL                          | Description                          |
|------------------|------------------------------|--------------------------------------|
| 🏠 Home          | `/`                          | Hero, featured products, brand values |
| 🛍️ Shop          | `/shop`                      | Full product catalog with filters    |
| 👗 Product Detail | `/product/:id`              | Product info + Add to Cart           |
| 🛒 Cart          | `/cart`                      | Cart with quantity controls          |
| 📦 Checkout      | `/checkout`                  | Order form (Cash on Delivery)        |
| ℹ️ About         | `/about`                     | Brand story and values               |
| 🔐 Admin Login   | `/login`                     | Admin authentication                 |
| ⚙️ Admin Dashboard | `/admin`                   | Product CRUD + Order management      |

---

## 🔐 Admin Access

| Field    | Value        |
|----------|--------------|
| Username | `admin`      |
| Password | `elvara2026` |

> ⚠️ Change the password after first login in production.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint            | Access  | Description        |
|--------|---------------------|---------|--------------------|
| POST   | `/api/auth/register`| Public  | Register admin     |
| POST   | `/api/auth/login`   | Public  | Login & get token  |

### Products
| Method | Endpoint              | Access  | Description        |
|--------|-----------------------|---------|--------------------|
| GET    | `/api/products`       | Public  | Get all products   |
| GET    | `/api/products/:id`   | Public  | Get single product |
| POST   | `/api/products`       | Admin   | Create product     |
| PUT    | `/api/products/:id`   | Admin   | Update product     |
| DELETE | `/api/products/:id`   | Admin   | Delete product     |

### Orders
| Method | Endpoint                    | Access  | Description         |
|--------|-----------------------------|---------|---------------------|
| POST   | `/api/orders`               | Public  | Place an order      |
| GET    | `/api/orders`               | Admin   | Get all orders      |
| PUT    | `/api/orders/:id/status`    | Admin   | Update order status |

---

## 🛡️ Security Features

- ✅ Passwords hashed with **bcryptjs**
- ✅ **JWT** authentication for admin routes
- ✅ **Helmet.js** for secure HTTP headers
- ✅ **Rate limiting** on API and order endpoints
- ✅ **CORS** restricted to frontend origin
- ✅ Input validation on all forms
- ✅ SQL injection protection via **Sequelize ORM**
- ✅ Sensitive data stored in `.env` (never committed)

---

## 🎨 Brand Design System

| Token              | Value     |
|--------------------|-----------|
| Royal Black        | `#0A0A0A` |
| Royal Gold         | `#C9A646` |
| Champagne Gold     | `#E5C97A` |
| Deep Burgundy      | `#5A0F1C` |
| Ivory White        | `#F8F5F0` |
| Heading Font       | Playfair Display |
| Body Font          | Montserrat |

---

## 📄 License

This project is private and proprietary to **ELVARA & CO.**  
© 2026 ELVARA & CO. All Rights Reserved.
