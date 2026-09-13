# 🧾 Billing Software Management

A full-stack Billing Management System built with **React.js**, **Node.js/Express.js**, and **MySQL**. Handles product & customer management, bill generation with tax/discount calculation, billing history, and real-time stock management — secured with JWT authentication.

---

## 📌 Overview

This app lets a store/business owner manage products and customers, generate bills, view billing history, and automatically track stock — with a modern, responsive UI and a clean REST API backend.

Built to demonstrate: clean project structure, proper relational DB design, RESTful APIs, validation & error handling, and a usable UI — not a production ERP.

---

## 🏗️ Project Structure

```
Billing-Software-Management/
├── Frontend/            # React (Vite) app
│   └── src/
│       ├── components/  # Reusable UI (tables, modals, forms)
│       ├── pages/        # Landing, Auth, Products, Customers, Billing
│       ├── context/      # Auth context (global state)
│       ├── services/     # Axios API calls
│       └── utils/        # Helpers & validators
├── Backend/             # Node + Express app
│   └── src/
│       ├── config/       # DB config
│       ├── controllers/  # Business logic
│       ├── models/       # Sequelize models
│       ├── routes/       # API routes
│       ├── middlewares/  # Auth, validation, error handling
│       └── validators/   # express-validator schemas
├── database/
│   └── billing_db_schema.sql
└── README.md
```

**Flow:** `Route → Auth/Validation Middleware → Controller → Model (Sequelize) → MySQL`

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), React Router, Axios, Tailwind CSS, React Hook Form + Yup, React Toastify, Recharts, Lucide Icons

**Backend:** Node.js, Express.js, Sequelize (MySQL2), JWT, bcrypt, express-validator, cors, dotenv

**Database:** MySQL (normalized relational schema)

**Auth:** Custom JWT-based login (access + refresh tokens) with bcrypt password hashing — chosen over Clerk to demonstrate hands-on session/token handling and middleware design.

---

## ✨ Features Implemented

- **Auth:** Register/Login, JWT access + refresh tokens, protected routes
- **Landing Page:** Modern responsive intro page
- **Products:** Add / edit / delete / view, with Name, SKU, Price, Quantity (unique SKU validation)
- **Customers:** Add / edit / delete / view, with Name, Phone, Address
- **Billing:**
  - Create Bill: select customer, add multiple products + quantities, auto item/subtotal calculation, discount & tax/GST input, final total
  - Billing History: list all bills, view full itemized invoice detail
- **Stock Management:** Stock auto-decreases after a bill; blocks billing if quantity exceeds available stock (handled via DB transaction to prevent overselling)
- **Validation:** Frontend (React Hook Form + Yup) and backend (express-validator) — required fields, valid price/quantity, phone format, empty selection handling
- **Error Handling:** Centralized error middleware with consistent JSON error responses
- **Dashboard (extra):** Summary cards + basic sales chart

---

## 🗄️ Database Setup

**Tables:** `Users`, `Products`, `Customers`, `Bills`, `Bill_Items`

**Relationships:**
- `Bills.customer_id → Customers.id`
- `Bill_Items.bill_id → Bills.id`, `Bill_Items.product_id → Products.id`
- `Bills.created_by → Users.id`

**Steps:**
```bash
# 1. Create database
mysql -u root -p -e "CREATE DATABASE billing_db;"

# 2. Run schema
mysql -u root -p billing_db < database/billing_db_schema.sql
```

---

## ⚙️ Setup Instructions

### Backend
```bash
cd Backend
npm install
```
`.env`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=billing_db
JWT_ACCESS_SECRET=your_secret
JWT_REFRESH_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```
```bash
npm run dev   # runs on http://localhost:5000
```

### Frontend
```bash
cd Frontend
npm install
```
`.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```
```bash
npm run dev   # runs on http://localhost:5173
```

---

## 🔌 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, get tokens |
| GET/POST/PUT/DELETE | `/api/products` | Product CRUD |
| GET/POST/PUT/DELETE | `/api/customers` | Customer CRUD |
| POST | `/api/bills` | Create bill (deducts stock) |
| GET | `/api/bills` / `/api/bills/:id` | Billing history & detail |

Protected routes require `Authorization: Bearer <token>`.

---

## ✅ Assumptions & Extra Features

**Assumptions:**
- Discount can be flat or percentage, applied before tax/GST
- SKU is a unique identifier — no duplicates allowed
- Single user role (admin/staff) — no complex role hierarchy needed
- Bills are immutable once created (real-world invoicing behavior)

**Extras added beyond core scope:**
- JWT auth (access + refresh tokens)
- Dashboard with summary cards & sales chart
- Search + pagination on product/customer lists
- Printable/downloadable invoice view
- Transaction-safe stock deduction to prevent overselling under concurrent bills

---

### 👤 Author
Intern Team Nexsaple.
