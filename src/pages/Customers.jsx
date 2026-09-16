import React, { useState } from "react";

export default function Customers({ customers, setCustomers }) {
  const empty = { name: "", phone: "", email: "", address: "" };
  const [form, setForm] = useState(empty);
  const [open, setOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setCustomers([...customers, { id: crypto.randomUUID(), ...form }]);
    setForm(empty);
    setOpen(false);
  };

  return (
    <div>
      <div className="page-heading"><div><span className="eyebrow">CUSTOMERS</span><h1>Customers</h1><p>Manage your customers</p></div><button className="primary-btn" onClick={() => setOpen(!open)}>＋ Add Customer</button></div>

      {open && <section className="form-panel">
        <div className="section-title"><span>👤</span><div><h2>Add New Customer</h2><p>Enter customer details.</p></div></div>
        <form onSubmit={submit} className="form-grid two">
          <div><label>Full Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Customer name" /></div>
          <div><label>Phone</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="Phone number" /></div>
          <div><label>Email</label><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="customer@email.com" /></div>
          <div><label>Address</label><input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Customer address" /></div>
          <div className="form-actions"><button className="primary-btn">Save Customer</button><button type="button" className="secondary-btn" onClick={()=>setOpen(false)}>Cancel</button></div>
        </form>
      </section>}

      <section className="panel">
        <div className="panel-header"><div><h2>Customer List</h2><p>{customers.length} customer{customers.length !== 1 ? "s" : ""} registered</p></div></div>
        {customers.length === 0 ? <div className="empty-state"><div>👥</div><h3>No customers yet</h3><p>Click “Add Customer” to add your first customer.</p></div> :
        <div className="table-wrap"><table><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Action</th></tr></thead><tbody>
          {customers.map((c,i)=><tr key={c.id}><td>{i+1}</td><td><b>{c.name}</b></td><td>{c.phone}</td><td>{c.email || "—"}</td><td>{c.address || "—"}</td><td><button className="table-btn delete" onClick={()=>setCustomers(customers.filter(x=>x.id!==c.id))}>Delete</button></td></tr>)}
        </tbody></table></div>}
      </section>
    </div>
  );
}
