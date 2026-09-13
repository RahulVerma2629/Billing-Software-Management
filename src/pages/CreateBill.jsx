import { useState } from "react";
import Sidebar from "../components/Sidebar";

function CreateBill() {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  // Add product to bill
  const addItem = () => {
    if (!product.trim() || !price || Number(quantity) <= 0) {
      alert("Please enter product, price and quantity");
      return;
    }

    const newItem = {
      id: Date.now(),
      product: product.trim(),
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price),
    };

    setItems([...items, newItem]);

    setProduct("");
    setQuantity(1);
    setPrice("");
  };

  // Remove product from bill
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Calculate bill totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const gst = subtotal * 0.18;

  const grandTotal = subtotal + gst;

  // Create bill
  const createBill = () => {
    if (!customer) {
      alert("Please select a customer");
      return;
    }

    if (items.length === 0) {
      alert("Please add at least one product");
      return;
    }

    alert(
      `Bill created successfully!
Customer: ${customer}
Total: ₹${grandTotal.toFixed(2)}`
    );
  };

  return (
    <div className="app-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="create-bill-page">

        {/* Header */}
        <header className="bill-header">
          <div className="bill-title-row">

            <div className="bill-icon">
              🧾
            </div>

            <div>
              <h1>Create New Bill</h1>
              <p>
                Create and generate a customer invoice
              </p>
            </div>

          </div>
        </header>


        {/* Customer Details */}
        <section className="bill-card">

          <div className="card-heading">

            <div className="heading-icon purple">
              👤
            </div>

            <div>
              <h2>Customer Details</h2>
              <p>
                Select the customer for this bill
              </p>
            </div>

          </div>

          <div className="bill-input-group">

            <label>Customer</label>

            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            >
              <option value="">
                Select Customer
              </option>
            </select>

          </div>

        </section>


        {/* Add Products */}
        <section className="bill-card">

          <div className="card-heading">

            <div className="heading-icon blue">
              📦
            </div>

            <div>
              <h2>Add Products</h2>
              <p>
                Add products to this invoice
              </p>
            </div>

          </div>


          <div className="product-input-grid">

            {/* Product Name */}
            <div className="bill-input-group">

              <label>Product Name</label>

              <input
                type="text"
                placeholder="Enter product name"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />

            </div>


            {/* Quantity */}
            <div className="bill-input-group">

              <label>Quantity</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

            </div>


            {/* Price */}
            <div className="bill-input-group">

              <label>Price (₹)</label>

              <input
                type="number"
                min="0"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>


            {/* Add Item Button */}
            <div className="add-item-container">

              <button
                type="button"
                className="add-item-btn"
                onClick={addItem}
              >
                ➕ Add Item
              </button>

            </div>

          </div>

        </section>


        {/* Bill Items */}
        <section className="bill-card">

          <div className="card-heading">

            <div className="heading-icon green">
              🛒
            </div>

            <div>
              <h2>Bill Items</h2>
              <p>
                Products added to this invoice
              </p>
            </div>

          </div>


          {items.length === 0 ? (

            /* Empty State */
            <div className="empty-items">

              <div className="empty-icon">
                🛒
              </div>

              <h3>
                No products added
              </h3>

              <p>
                Add products using the form above
              </p>

            </div>

          ) : (

            /* Bill Table */
            <div className="bill-table-wrapper">

              <table className="bill-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {items.map((item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {item.product}
                        </strong>
                      </td>

                      <td>
                        <span className="quantity-badge">
                          {item.quantity}
                        </span>
                      </td>

                      <td>
                        ₹{item.price.toFixed(2)}
                      </td>

                      <td>
                        <strong>
                          ₹{item.total.toFixed(2)}
                        </strong>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* Bill Summary */}
        <section className="bill-summary-card">

          <div className="summary-left">

            <div className="summary-icon">
              💰
            </div>

            <div>
              <h2>Bill Summary</h2>
              <p>
                Review the total before creating the bill
              </p>
            </div>

          </div>


          <div className="summary-right">

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{subtotal.toFixed(2)}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                GST (18%)
              </span>

              <strong>
                ₹{gst.toFixed(2)}
              </strong>

            </div>


            <div className="summary-total">

              <span>
                Grand Total
              </span>

              <strong>
                ₹{grandTotal.toFixed(2)}
              </strong>

            </div>

          </div>

        </section>


        {/* Create Bill Button */}
        <div className="create-bill-actions">

          <button
            type="button"
            className="create-bill-btn"
            onClick={createBill}
          >
            🧾 Create Bill
          </button>

        </div>

      </main>

    </div>
  );
}

export default CreateBill;