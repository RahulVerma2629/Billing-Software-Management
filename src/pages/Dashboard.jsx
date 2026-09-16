import React from "react";

export default function Dashboard({ stats, bills }) {
  const recent = [...bills].slice(-5).reverse();

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin 👋</p>
        </div>
        <Link className="primary-btn" to="/create-bill">＋ Create New Bill</Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card purple">
          <div className="stat-icon">📦</div>
          <div><span>Total Products</span><strong>{stats.products}</strong><small>Products added</small></div>
        </div>
        <div className="stat-card pink">
          <div className="stat-icon">👥</div>
          <div><span>Total Customers</span><strong>{stats.customers}</strong><small>Customers registered</small></div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">🧾</div>
          <div><span>Total Bills</span><strong>{stats.bills}</strong><small>Bills generated</small></div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">💵</div>
          <div><span>Total Revenue</span><strong>₹{stats.revenue.toLocaleString()}</strong><small>From generated bills</small></div>
        </div>
      </div>

      <div className="quick-grid">
        <Link to="/products" className="quick-card"><span>📦</span><div><b>Manage Products</b><small>Add, edit or delete products</small></div>→</Link>
        <Link to="/customers" className="quick-card"><span>👥</span><div><b>Manage Customers</b><small>Add and manage customers</small></div>→</Link>
        <Link to="/create-bill" className="quick-card"><span>🧾</span><div><b>Create Invoice</b><small>Generate a new customer bill</small></div>→</Link>
      </div>

      <section className="panel">
        <div className="panel-header"><div><h2>Recent Bills</h2><p>Your latest generated bills</p></div><Link to="/history" className="text-link">View all →</Link></div>
        {recent.length === 0 ? (
          <div className="empty-state"><div>🧾</div><h3>No bills yet</h3><p>Create your first bill to see it here.</p></div>
        ) : (
          <div className="table-wrap"><table><thead><tr><th>Bill No.</th><th>Customer</th><th>Date</th><th>Total</th></tr></thead><tbody>
            {recent.map(b => <tr key={b.id}><td><b>{b.number}</b></td><td>{b.customerName}</td><td>{b.date}</td><td><b>₹{Number(b.total).toLocaleString()}</b></td></tr>)}
          </tbody></table></div>
        )}
      </section>
    </div>
  );
}
