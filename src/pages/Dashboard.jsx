import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">💰</div>

        <h2>BillEase</h2>
        <p className="sidebar-subtitle">Billing System</p>

        <div className="menu-title">MAIN MENU</div>

        <Link to="/dashboard" className="menu-item active">
          📊 Dashboard
        </Link>

        <Link to="/products" className="menu-item">
          📦 Products
        </Link>

        <Link to="/customers" className="menu-item">
          👥 Customers
        </Link>

        <Link to="/create-bill" className="menu-item">
          🧾 Create Bill
        </Link>

        <Link to="/history" className="menu-item">
          📜 Billing History
        </Link>

        <Link to="/login" className="logout">
          🚪 Logout
        </Link>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">

        <div className="top-section">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin 👋</p>
          </div>

          <div className="admin-box">
            <span>👤</span>
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-grid">

          <div className="stat-card purple">
            <div className="stat-icon">📦</div>
            <div>
              <p>Total Products</p>
              <h2>0</h2>
              <span>Products available</span>
            </div>
          </div>

          <div className="stat-card blue">
            <div className="stat-icon">👥</div>
            <div>
              <p>Total Customers</p>
              <h2>0</h2>
              <span>Registered customers</span>
            </div>
          </div>

          <div className="stat-card orange">
            <div className="stat-icon">🧾</div>
            <div>
              <p>Total Bills</p>
              <h2>0</h2>
              <span>Bills generated</span>
            </div>
          </div>

          <div className="stat-card green">
            <div className="stat-icon">💰</div>
            <div>
              <p>Total Revenue</p>
              <h2>₹0</h2>
              <span>Total sales revenue</span>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <section className="quick-section">
          <h2>Quick Actions</h2>
          <p>Manage your billing system easily</p>

          <div className="quick-grid">

            <Link to="/products" className="quick-card">
              <div className="quick-icon purple-bg">📦</div>
              <h3>Manage Products</h3>
              <p>Add, edit or delete products</p>
              <span>→</span>
            </Link>

            <Link to="/customers" className="quick-card">
              <div className="quick-icon blue-bg">👥</div>
              <h3>Manage Customers</h3>
              <p>Add and manage customers</p>
              <span>→</span>
            </Link>

            <Link to="/create-bill" className="quick-card">
              <div className="quick-icon orange-bg">🧾</div>
              <h3>Create New Bill</h3>
              <p>Generate a customer bill</p>
              <span>→</span>
            </Link>

            <Link to="/history" className="quick-card">
              <div className="quick-icon green-bg">📜</div>
              <h3>Billing History</h3>
              <p>View previous bills</p>
              <span>→</span>
            </Link>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;