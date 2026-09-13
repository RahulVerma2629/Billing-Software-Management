import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Customers() {
  // FRONTEND ONLY — no customer data is stored
  const customers = [];

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  // Backend will be connected here later
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Backend is not connected yet. Customer was not added.");

    resetForm();
    setShowForm(false);
  };

  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* HEADER */}
        <header className="topbar">
          <div>
            <h1>Customers</h1>
            <p>Manage your customers</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">A</div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {/* CUSTOMER CARD */}
        <section className="page-card">

          {/* TOOLBAR */}
          <div className="product-toolbar">
            <div>
              <h2>Customer List</h2>

              <p>
                {customers.length} customers available
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => {
                resetForm();
                setShowForm(!showForm);
              }}
            >
              {showForm ? "✕ Close" : "＋ Add Customer"}
            </button>
          </div>

          {/* FORM */}
          {showForm && (
            <form
              className="product-form"
              onSubmit={handleSubmit}
            >
              <h3>Add New Customer</h3>

              <div className="form-grid">

                {/* NAME */}
                <div className="input-group">
                  <label>Customer Name *</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* EMAIL */}
                <div className="input-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. abc@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* PHONE */}
                <div className="input-group">
                  <label>Phone *</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* ADDRESS */}
                <div className="input-group">
                  <label>Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="e.g. Delhi, India"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* BUTTONS */}
              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Customer
                </button>

              </div>
            </form>
          )}

          {/* CUSTOMER TABLE */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {customers.length > 0 ? (

                  customers.map((customer, index) => (
                    <tr key={customer.id}>

                      <td>{index + 1}</td>

                      <td>
                        <strong>{customer.name}</strong>
                      </td>

                      <td>{customer.email}</td>

                      <td>{customer.phone}</td>

                      <td>
                        {customer.address || "—"}
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button className="edit-button">
                            ✏️
                          </button>

                          <button className="delete-button">
                            🗑️
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="6"
                      className="empty-row"
                    >
                      No customers added yet.
                    </td>
                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>
    </div>
  );
}

export default Customers;