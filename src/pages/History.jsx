import Sidebar from "../components/Sidebar";

function History() {
  const bills = [];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        {/* HEADER */}
        <header className="topbar">
          <div>
            <h1>Billing History</h1>
            <p>View all your previous bills and transactions</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">A</div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        {/* HISTORY CARD */}
        <section className="page-card">
          <div className="product-toolbar">
            <div>
              <h2>Bill History</h2>
              <p>{bills.length} bills available</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bill ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bills.length > 0 ? (
                  bills.map((bill, index) => (
                    <tr key={bill.id}>
                      <td>{index + 1}</td>
                      <td>{bill.id}</td>
                      <td>{bill.customer}</td>
                      <td>{bill.date}</td>
                      <td>₹{bill.amount}</td>
                      <td>{bill.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No billing history available.
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

export default History;