import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import CreateBill from "./pages/CreateBill";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/create-bill" element={<CreateBill />} />
      <Route path="/history" element={<History />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;