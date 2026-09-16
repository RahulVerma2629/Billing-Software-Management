import { NavLink } from "react-router-dom";

export default function Sidebar({ onLogout }) {
  const links = [
    ["📊", "Dashboard", "/dashboard"],
    ["📦", "Products", "/products"],
    ["👥", "Customers", "/customers"],
    ["🧾", "Create Bill", "/create-bill"],
    ["📚", "Billing History", "/history"]
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brand-icon">💰</div>
        <div className="brand">BillEase</div>
        <div className="brand-subtitle">Billing System</div>

        <div className="menu-title">MAIN MENU</div>
        <nav className="nav-menu">
          {links.map(([icon, label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
    </aside>
  );
}