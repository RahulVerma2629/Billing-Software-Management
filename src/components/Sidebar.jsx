import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">

      <div className="logo">
        💰
      </div>

      <h2>BillEase</h2>

      <p className="sidebar-subtitle">
        Billing System
      </p>

      <div className="menu-title">
        MAIN MENU
      </div>

      <Link
        to="/dashboard"
        className={`menu-item ${
          location.pathname === "/dashboard" ? "active" : ""
        }`}
      >
        📊 Dashboard
      </Link>

      <Link
        to="/products"
        className={`menu-item ${
          location.pathname === "/products" ? "active" : ""
        }`}
      >
        📦 Products
      </Link>

      <Link
        to="/customers"
        className={`menu-item ${
          location.pathname === "/customers" ? "active" : ""
        }`}
      >
        👥 Customers
      </Link>

      <Link
        to="/create-bill"
        className={`menu-item ${
          location.pathname === "/create-bill" ? "active" : ""
        }`}
      >
        🧾 Create Bill
      </Link>

      <Link
        to="/history"
        className={`menu-item ${
          location.pathname === "/history" ? "active" : ""
        }`}
      >
        📜 Billing History
      </Link>

      <Link to="/login" className="logout">
        🚪 Logout
      </Link>

    </aside>
  );
}

export default Sidebar;