export default function History({ bills }) {
  return (
    <div>
      <div className="page-heading"><div><span className="eyebrow">RECORDS</span><h1>Billing History</h1><p>View all bills generated in this session</p></div></div>

      <section className="panel">
        <div className="panel-header"><div><h2>All Bills</h2><p>{bills.length} bill{bills.length !== 1 ? "s" : ""} found</p></div></div>
        {bills.length === 0 ? <div className="empty-state"><div>📚</div><h3>No billing history</h3><p>Generated bills will appear here.</p></div> :
        <div className="table-wrap"><table><thead><tr><th>Bill No.</th><th>Customer</th><th>Phone</th><th>Date</th><th>Items</th><th>Total</th></tr></thead><tbody>
          {[...bills].reverse().map(b=><tr key={b.id}><td><span className="bill-number">{b.number}</span></td><td><b>{b.customerName}</b></td><td>{b.customerPhone}</td><td>{b.date}</td><td>{b.items.length}</td><td><b>₹{Number(b.total).toLocaleString()}</b></td></tr>)}
        </tbody></table></div>}
      </section>
    </div>
  );
}