# 🧾 Billing Software Management

A full-stack **Billing Management System** built using the **MERN-style stack** (React.js, Node.js, Express.js) with **MySQL** as the relational database. This project handles end-to-end billing operations — product management, customer management, bill generation, billing history, and real-time stock management — with secure authentication using JWT.

> Built as part of a technical evaluation task to demonstrate clean architecture, proper database design, validation, and full-stack development skills.

---

## 📌 Project Overview

Billing Software Management is a simple yet robust web application that allows a business/store owner to:

- Manage their **product inventory** (add, edit, delete, view)
- Manage **customer records**
- Generate **bills/invoices** by selecting a customer and products, with automatic tax, discount, and total calculations
- View **billing history** with detailed invoice breakdowns
- Automatically manage **stock levels**, preventing overselling
- Securely **log in/register** using JWT-based authentication

The goal of this project was not to build a production-grade ERP system, but to demonstrate:
- Clean code structure & separation of concerns
- Proper relational database design (normalized MySQL schema)
- RESTful API design
- Input validation & error handling
- A responsive, modern UI

---

## 🏗️ Project Architecture

```
Billing-Software-Management/
│
├── Frontend/                     # React.js Application
│   ├── public/
│   ├── src/
│   │   ├── assets/                # Images, icons, logos
│   │   ├── components/            # Reusable UI components (Navbar, Sidebar, Modal, Table, etc.)
│   │   ├── pages/
│   │   │   ├── Landing/           # Landing page
│   │   │   ├── Auth/              # Login / Register pages
│   │   │   ├── Dashboard/         # Dashboard overview
│   │   │   ├── Products/          # Product management pages
│   │   │   ├── Customers/         # Customer management pages
│   │   │   └── Billing/           # Bill creation + Billing history
│   │   ├── context/               # Auth context / global state (Context API)
│   │   ├── hooks/                 # Custom React hooks (useAuth, useFetch, etc.)
│   │   ├── services/              # Axios API service files (productService.js, billService.js, etc.)
│   │   ├── utils/                 # Helper functions (formatCurrency, calculateTotal, validators)
│   │   ├── routes/                # Protected route logic
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                       # Node.js + Express.js Application
│   ├── src/
│   │   ├── config/                 # DB config, env config
│   │   │   └── db.js
│   │   ├── controllers/            # Business logic (productController.js, billController.js, etc.)
│   │   ├── models/                 # Sequelize/MySQL models (Product, Customer, Bill, BillItem, User)
│   │   ├── routes/                 # Express route definitions
│   │   ├── middlewares/            # authMiddleware.js, errorHandler.js, validateRequest.js
│   │   ├── validators/             # express-validator schemas
│   │   ├── utils/                  # jwt.js, calculateBill.js, apiResponse.js
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── database/
│   └── billing_db_schema.sql       # Full MySQL schema with relationships
│
├── screenshots/                    # UI screenshots for documentation
│
└── README.md
```

### Architecture Pattern

The backend follows an **MVC + Service-Controller pattern**:

```
Request → Route → Middleware (Auth/Validation) → Controller → Model (Sequelize) → MySQL DB
                                                        ↓
Response ← JSON Formatter ← Controller ← Query Result
```

The frontend follows a **component-based, page-driven architecture**, with:
- A `services/` layer that isolates all Axios/API calls from UI components
- A `context/` layer (`AuthContext`) that manages authentication state application-wide
- Reusable components (tables, modals, buttons, form inputs) shared across Product, Customer, and Billing modules

---

## 🛠️ Technologies Used

### Frontend
| Technology | Purpose |
|---|---|
| **React.js (Vite)** | Core UI library |
| **React Router DOM** | Client-side routing |
| **Axios** | API communication |
| **Tailwind CSS** | Styling & responsive design |
| **React Context API** | Global auth/user state management |
| **React Hook Form + Yup** | Form handling & validation |
| **React Toastify** | Toast notifications for success/error feedback |
| **Recharts** | Dashboard graphs (sales overview, optional) |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | REST API framework |
| **MySQL2 / Sequelize ORM** | Database connection & modeling |
| **JWT (jsonwebtoken)** | Secure authentication & session tokens |
| **bcrypt.js** | Password hashing |
| **express-validator** | Backend input validation |
| **cors** | Cross-origin resource sharing |
| **dotenv** | Environment variable management |
| **morgan** | HTTP request logging |
| **express-async-handler** | Clean async error handling |

### Database
- **MySQL** (Relational Database)
- Normalized schema with foreign key relationships between Products, Customers, Bills, and BillItems

### Authentication
- **JWT-based authentication** (custom-built, using Access Token + Refresh Token flow)
- Passwords hashed with **bcrypt**
- Protected routes using auth middleware on the backend and route guards on the frontend

> **Note on Clerk:** Clerk was considered for authentication but this project implements **custom JWT-based authentication with MySQL** instead, to demonstrate a deeper understanding of session/token handling, password hashing, and middleware-based route protection — which is more aligned with the evaluation's focus on database & backend design skills. Clerk integration is mentioned as a possible future enhancement (see below).

---

## ✨ Features Implemented

### 1. Authentication & Authorization
- User Registration & Login
- Passwords hashed using bcrypt
- JWT Access Token (short-lived) + Refresh Token (long-lived) flow
- Protected API routes via middleware
- Protected frontend routes via route guards

### 2. Landing Page
- Modern, responsive landing page introducing the product
- Sections: Hero, Features overview, CTA to Login/Register

### 3. Product Management
- Add / Edit / Delete / View products
- Fields: Product Name, SKU/Product Code (unique), Price, Available Quantity
- Search & pagination on product list
- SKU uniqueness validation

### 4. Customer Management
- Add / Edit / Delete / View customers
- Fields: Name, Phone Number (validated format), Address
- Search customer by name/phone

### 5. Billing Section (Bill Creation + Billing History)
**Bill Creation:**
- Select customer (dropdown search)
- Add multiple products with quantity
- Real-time item total calculation (Price × Qty)
- Subtotal calculation
- Discount input (flat or %)
- Tax/GST input (%)
- Final payable amount auto-calculated
- Stock check before bill confirmation

**Billing History:**
- List of all previously generated bills (date, customer, total)
- Click to view full invoice detail (itemized breakdown)
- Filter by date range / customer

### 6. Stock Management
- Product stock automatically decreases after successful bill generation
- Prevents billing if requested quantity > available stock
- Stock updates handled inside a **DB transaction** to prevent race conditions/overselling

### 7. Validation & Error Handling
- Frontend validation using React Hook Form + Yup (required fields, number formats, phone number pattern)
- Backend validation using express-validator (SKU uniqueness, price > 0, quantity > 0)
- Centralized error-handling middleware on backend (consistent JSON error responses)
- Graceful handling of: empty product/customer selection, insufficient stock, duplicate SKU, invalid login credentials

### 8. Dashboard (Extra Feature)
- Quick overview cards: Total Products, Total Customers, Total Bills, Total Revenue
- Simple sales chart (Recharts)

---

## 🗄️ Database Setup

### Schema Overview

```
Users (id, name, email, password_hash, role, created_at)

Products (id, name, sku, price, quantity, created_at, updated_at)

Customers (id, name, phone, address, created_at, updated_at)

Bills (id, customer_id [FK], subtotal, discount, tax, total_amount, created_by [FK -> Users], created_at)

Bill_Items (id, bill_id [FK], product_id [FK], quantity, unit_price, item_total)
```

### Relationships
- `Bills.customer_id` → `Customers.id` (Many Bills → One Customer)
- `Bill_Items.bill_id` → `Bills.id` (Many Items → One Bill)
- `Bill_Items.product_id` → `Products.id` (Many Items → One Product)
- `Bills.created_by` → `Users.id` (tracks which logged-in user generated the bill)

### Setup Steps

1. Install MySQL locally or use a cloud MySQL instance (e.g., PlanetScale, Railway, AWS RDS).
2. Create the database:
   ```sql
   CREATE DATABASE billing_db;
   ```
3. Run the schema file to create all tables:
   ```bash
   mysql -u root -p billing_db < database/billing_db_schema.sql
   ```
4. Update your `Backend/.env` file with your MySQL credentials (see below).

> The full schema (`billing_db_schema.sql`) includes table creation scripts, primary/foreign keys, and indexes on `sku` and `phone` for faster lookups.

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm or yarn
- MySQL Server (v8+)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/Billing-Software-Management.git
cd Billing-Software-Management
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=billing_db
DB_PORT=3306

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

CLIENT_URL=http://localhost:5173
```

Run the backend server:
```bash
npm run dev
```
Server will start at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create a `.env` file inside `Frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```
App will start at: `http://localhost:5173`

### 4. Login Credentials (for testing)
You can register a new account from the app's Register page, or seed a default admin via the schema/seed script (if included in `database/`).

---

## 🔌 API Structure (Sample Endpoints)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & receive JWT tokens |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| GET | `/api/customers` | Get all customers |
| POST | `/api/customers` | Add new customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| POST | `/api/bills` | Create new bill (deducts stock in a transaction) |
| GET | `/api/bills` | Get billing history |
| GET | `/api/bills/:id` | Get single bill detail |

All protected routes require:
```
Authorization: Bearer <access_token>
```

---

## ✅ Assumptions & Extra Features

Since the task allowed flexibility, the following assumptions and additions were made:

**Assumptions:**
- Discount is assumed to be either a flat amount or a percentage (configurable per bill).
- Tax/GST is applied on the (Subtotal − Discount) amount, not on the raw subtotal.
- One "User" (admin/staff) account type is used for login — no complex role hierarchy was required per the task scope.
- SKU/Product Code is treated as a unique identifier and cannot be duplicated.
- Bills cannot be edited or deleted once created (to preserve billing history integrity), matching real-world invoicing behavior.

**Extra Features Added (Beyond Core Requirements):**
- 🔐 JWT-based authentication (Login/Register) with access + refresh token flow
- 📊 A basic dashboard with summary cards and a sales chart
- 🎨 A modern, responsive landing page
- 🔍 Search and pagination on product/customer lists
- 🧾 Downloadable/printable invoice view on billing history detail page
- ⚛️ Transaction-safe stock deduction logic to prevent race conditions during concurrent billing

---

## 📸 Screenshots / Demo

> Screenshots and a short demo video are included in the `/screenshots` folder and linked here:

- Landing Page
- Login/Register Page
- Product Management
- Customer Management
- Bill Creation
- Billing History & Invoice Detail
- Dashboard

*(Add actual image links or a demo video link here before submission.)*

---

## 🧠 Understanding & Explainability

Every module in this project (auth flow, stock-transaction logic, bill calculation logic, validation layers) was built with an understanding of *why* each design decision was made — e.g., using DB transactions for stock updates to avoid overselling under concurrent requests, or separating the `services/` layer on the frontend to keep API logic out of UI components. This project is fully explainable part-by-part during review.

---

## 📄 License

This project was built for evaluation/educational purposes.

---

### 👤 Author
Team Nexsaple
