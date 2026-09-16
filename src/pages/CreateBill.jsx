import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateBill({ products, customers, setBills }) {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [selected, setSelected] = useState([]);
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const total = useMemo(() => selected.reduce((sum, x) => sum + x.price * x.qty, 0), [selected]);

  const addItem = () => {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    const existing = selected.find(x => x.productId === p.id);
    if (existing) setSelected(selected.map(x => x.productId === p.id ? {...x, qty: x.qty + Number(qty)} : x));
    else setSelected([...selected, { productId: p.id, name: p.name, price: p.price, qty: Number(qty) }]);
    setProductId(""); setQty(1);
  };

  const create = (e) => {
    e.preventDefault();
    const customer = customers.find(x => x.id === customerId);
    if (!customer || selected.length === 0) {
      setMessage("Please select a customer and at least one product.");
      return;
    }
    const bill = {
      id: crypto.randomUUID(),
      number: `INV-${String(Date.now()).slice(-6)}`,
      customerName: customer.name,
      customerPhone: customer.phone,
      date: new Date().toLocaleDateString("en-IN"),
      items: selected,
      total
    };
    setBills(prev => [...prev, bill]);
    navigate("/history");
  };

  return (
    <div>
      <div className="page-heading"><div><span className="eyebrow">SALES</span><h1>Create Bill</h1><p>Create a new invoice for a customer</p></div></div>

      {message && <div className="error-box page-message">{message}</div>}

      {(customers.length === 0 || products.length === 0) && (
        <div className="info-box">
          {customers.length === 0 && <span>👥 No customers. <Link to="/customers">Add a customer</Link>.</span>}
          {products.length === 0 && <span>📦 No products. <Link to="/products">Add a product</Link>.</span>}
        </div>
      )}

      <section className="form-panel">
        <div className="section-title"><span>🧾</span><div><h2>Invoice Details</h2><p>Select the customer and products.</p></div></div>
        <form onSubmit={create}>
          <div className="form-grid two">
            <div><label>Customer</label><select value={customerId} onChange={e=>setCustomerId(e.target.value)}><option value="">Select customer</option>{customers.map(c=><option key={c.id} value={c.id}>{c.name} — {c.phone}</option>)}</select></div>
            <div><label>Product</label><select value={productId} onChange={e=>setProductId(e.target.value)}><option value="">Select product</option>{products.map(p=><option key={p.id} value={p.id}>{p.name} — ₹{p.price.toLocaleString()}</option>)}</select></div>
            <div><label>Quantity</label><input type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} /></div>
            <div className="form-actions"><button type="button" className="secondary-btn" onClick={addItem}>＋ Add Item</button></div>
          </div>

          <div className="bill-items">
            <h3>Invoice Items</h3>
            {selected.length === 0 ? <p className="muted">No items added yet.</p> : selected.map(item => <div className="bill-row" key={item.productId}><span>{item.name}</span><span>{item.qty} × ₹{item.price.toLocaleString()}</span><b>₹{(item.qty*item.price).toLocaleString()}</b><button type="button" onClick={()=>setSelected(selected.filter(x=>x.productId!==item.productId))}>×</button></div>)}
          </div>

          <div className="bill-total"><span>Grand Total</span><strong>₹{total.toLocaleString()}</strong></div>
          <button className="primary-btn wide-btn" disabled={!customerId || selected.length===0}>Generate Bill</button>
        </form>
      </section>
    </div>
  );
}