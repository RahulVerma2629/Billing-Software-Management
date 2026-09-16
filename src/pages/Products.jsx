import React, { useState } from "react";

export default function Products({ products, setProducts }) {
  const empty = { name: "", sku: "", price: "" };
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.sku.trim() || !form.price) return;
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...form, price: Number(form.price) } : p));
    } else {
      setProducts([...products, { id: crypto.randomUUID(), ...form, price: Number(form.price) }]);
    }
    setForm(empty);
    setEditingId(null);
  };

  const edit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, sku: p.sku, price: p.price });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="page-heading"><div><span className="eyebrow">INVENTORY</span><h1>Products</h1><p>Manage products and pricing</p></div></div>

      <section className="form-panel">
        <div className="section-title"><span>📦</span><div><h2>{editingId ? "Edit Product" : "Add New Product"}</h2><p>Enter product information below.</p></div></div>
        <form onSubmit={submit} className="form-grid">
          <div><label>Product Name</label><input value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="e.g. Laptop" /></div>
          <div><label>SKU</label><input value={form.sku} onChange={e => setForm({...form,sku:e.target.value})} placeholder="e.g. LAP-001" /></div>
          <div><label>Price (₹)</label><input type="number" min="0" value={form.price} onChange={e => setForm({...form,price:e.target.value})} placeholder="e.g. 85000" /></div>
          <div className="form-actions"><button className="primary-btn">{editingId ? "Update Product" : "Add Product"}</button>{editingId && <button type="button" className="secondary-btn" onClick={() => {setEditingId(null);setForm(empty)}}>Cancel</button>}</div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-header"><div><h2>Product List</h2><p>{products.length} product{products.length !== 1 ? "s" : ""} added</p></div></div>
        {products.length === 0 ? <div className="empty-state"><div>📦</div><h3>No products yet</h3><p>Add a product above. Data is currently frontend-only.</p></div> :
        <div className="table-wrap"><table><thead><tr><th>#</th><th>Product</th><th>SKU</th><th>Price</th><th>Action</th></tr></thead><tbody>
          {products.map((p,i) => <tr key={p.id}><td>{i+1}</td><td><b>{p.name}</b></td><td><span className="badge">{p.sku}</span></td><td>₹{p.price.toLocaleString()}</td><td><button className="table-btn edit" onClick={() => edit(p)}>Edit</button><button className="table-btn delete" onClick={() => setProducts(products.filter(x => x.id !== p.id))}>Delete</button></td></tr>)}
        </tbody></table></div>}
      </section>
    </div>
  );
}
