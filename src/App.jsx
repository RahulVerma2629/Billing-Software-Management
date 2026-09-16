import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import CreateBill from "./pages/CreateBill";
import History from "./pages/History";
import Sidebar from "./components/Sidebar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [bills, setBills] = useState([]);

  const stats = {
    products: products.length,
    customers: customers.length,
    bills: bills.length,
    revenue: bills.reduce((sum, bill) => sum + Number(bill.total), 0),
  };

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="app-shell">
      <Sidebar onLogout={() => setLoggedIn(false)} />

      <main className="main-content">
        <Routes>
          <Route
            path="/dashboard"
            element={<Dashboard stats={stats} bills={bills} />}
          />

          <Route
            path="/products"
            element={
              <Products
                products={products}
                setProducts={setProducts}
              />
            }
          />

          <Route
            path="/customers"
            element={
              <Customers
                customers={customers}
                setCustomers={setCustomers}
              />
            }
          />

          <Route
            path="/create-bill"
            element={
              <CreateBill
                products={products}
                customers={customers}
                setBills={setBills}
              />
            }
          />

          <Route
            path="/history"
            element={<History bills={bills} />}
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
