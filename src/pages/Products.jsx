import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Products() {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stock: "",
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
      sku: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.sku ||
      !form.category ||
      !form.price ||
      !form.stock
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Backend will be connected here later.
    alert("Product cannot be added until backend is connected.");

    resetForm();
    setShowForm(false);
  };

  const handleCancel = () => {
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
            <h1>Products</h1>
            <p>Manage your products and inventory</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>

        </header>

        {/* PRODUCT CARD */}
        <section className="page-card">

          {/* TOOLBAR */}
          <div className="product-toolbar">

            <div>
              <h2>Product List</h2>
              <p>0 products available</p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                if (showForm) {
                  handleCancel();
                } else {
                  setShowForm(true);
                }
              }}
            >
              {showForm ? "✕ Close" : "＋ Add Product"}
            </button>

          </div>

          {/* ADD PRODUCT FORM */}
          {showForm && (
            <form
              className="product-form"
              onSubmit={handleSubmit}
            >

              <h3>Add New Product</h3>

              <div className="form-grid">

                {/* PRODUCT NAME */}
                <div className="input-group">
                  <label>Product Name *</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Laptop"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* SKU */}
                <div className="input-group">
                  <label>SKU *</label>

                  <input
                    type="text"
                    name="sku"
                    placeholder="e.g. LAP-001"
                    value={form.sku}
                    onChange={handleChange}
                  />
                </div>

                {/* CATEGORY */}
                <div className="input-group">
                  <label>Category *</label>

                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. Electronics"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>

                {/* PRICE */}
                <div className="input-group">
                  <label>Price (₹) *</label>

                  <input
                    type="number"
                    name="price"
                    min="0"
                    placeholder="e.g. 50000"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>

                {/* STOCK */}
                <div className="input-group">
                  <label>Stock *</label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    placeholder="e.g. 10"
                    value={form.stock}
                    onChange={handleChange}
                  />
                </div>

              </div>

              {/* FORM BUTTONS */}
              <div className="form-buttons">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  Add Product
                </button>

              </div>

            </form>
          )}

          {/* SEARCH */}
          <div className="search-container">

            <span className="search-icon">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search by product name, SKU or category..."
              disabled
            />

          </div>

          {/* PRODUCT TABLE */}
          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                <tr>

                  <td
                    colSpan="7"
                    className="empty-row"
                  >

                    <div className="empty-state">

                      <div className="empty-state-icon">
                        📦
                      </div>

                      <h3>
                        No products added yet
                      </h3>

                      <p>
                        Products will appear here.
                      </p>

                    </div>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Products;