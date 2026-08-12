import React, { Component } from 'react';
import { fetchLatestPayouts } from '../services/api.js';

class LatestPayoutsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payouts: [],
      filteredPayouts: [],
      loading: true,
      currencyFilter: '',
      searchTerm: ''
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchLatestPayouts();
      this.setState({ payouts: data, filteredPayouts: data, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  }

  handleFilterChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.applyFilters);
  };

  applyFilters = () => {
    const { payouts, currencyFilter, searchTerm } = this.state;
    let list = [...payouts];

    if (currencyFilter) {
      list = list.filter(p => p.currency === currencyFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(p =>
        (p.projectName && p.projectName.toLowerCase().includes(term)) ||
        (p.wallet && p.wallet.toLowerCase().includes(term)) ||
        (p.txHash && p.txHash.toLowerCase().includes(term))
      );
    }

    this.setState({ filteredPayouts: list });
  };

  render() {
    const { onNavigate } = this.props;
    const { filteredPayouts, loading, currencyFilter, searchTerm } = this.state;

    return (
      <div className="container-fluid px-3 px-md-4 py-4">
        {/* Header */}
        <div className="glass-panel p-3 p-md-4 mb-4 border-start border-4 border-success">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h3 className="fw-extrabold text-white mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-cash-stack text-success fs-2"></i> Verified Latest Payouts
              </h3>
              <p className="text-muted small mb-0">
                Live automated batch logs verified directly from our deposit monitoring wallets 24/7.
              </p>
            </div>
            <span className="badge bg-success fs-6 p-2 fw-bold">
              Total Recorded Payouts: {filteredPayouts.length}
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="glass-panel p-3 mb-4">
          <div className="row g-2">
            <div className="col-md-6">
              <input
                type="text"
                name="searchTerm"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Search project name, wallet address, or TxHash..."
                value={searchTerm}
                onChange={this.handleFilterChange}
              />
            </div>
            <div className="col-md-6">
              <select
                name="currencyFilter"
                className="form-select bg-dark text-light border-secondary"
                value={currencyFilter}
                onChange={this.handleFilterChange}
              >
                <option value="">All Currencies</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="LTC">Litecoin (LTC)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card bg-slate-900 border-secondary shadow-lg">
          <div className="card-body p-0 table-responsive">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status"></div>
              </div>
            ) : (
              <table className="table table-hyip mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Project</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Recipient Wallet</th>
                    <th>TxHash / Batch ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((p, idx) => (
                    <tr key={idx}>
                      <td className="text-muted small font-monospace">{p.date}</td>
                      <td>
                        <button
                          className="btn btn-link p-0 text-info fw-bold text-decoration-none"
                          onClick={() => onNavigate('details', { id: p.projectId })}
                        >
                          {p.projectName}
                        </button>
                      </td>
                      <td className="fw-bold text-success">{p.amount}</td>
                      <td><span className="badge bg-secondary">{p.currency}</span></td>
                      <td className="font-monospace small text-slate-300">{p.wallet}</td>
                      <td className="font-monospace small text-info text-truncate" style={{ maxWidth: '220px' }}>
                        {p.txHash}
                      </td>
                      <td><span className="badge bg-success">{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default LatestPayoutsPage;
