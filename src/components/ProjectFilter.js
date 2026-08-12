import React, { Component } from 'react';

class ProjectFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      q: props.initialParams?.q || '',
      status: props.initialParams?.status || '',
      category: props.initialParams?.category || '',
      processor: props.initialParams?.processor || '',
      withdrawalType: props.initialParams?.withdrawalType || '',
      sort: props.initialParams?.sort || 'newest'
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      if (this.props.onFilterChange) {
        this.props.onFilterChange(this.state);
      }
    });
  };

  handleReset = () => {
    const resetState = {
      q: '',
      status: '',
      category: '',
      processor: '',
      withdrawalType: '',
      sort: 'newest'
    };
    this.setState(resetState, () => {
      if (this.props.onFilterChange) {
        this.props.onFilterChange(this.state);
      }
    });
  };

  render() {
    const { q, status, category, processor, withdrawalType, sort } = this.state;

    return (
      <div className="glass-panel p-3 mb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h6 className="fw-bold text-info mb-0 d-flex align-items-center gap-2">
            <i className="bi bi-funnel-fill"></i> Filter & Search Projects
          </h6>
          <button onClick={this.handleReset} className="btn btn-sm btn-link text-muted text-decoration-none p-0">
            <i className="bi bi-arrow-counterclockwise"></i> Reset Filters
          </button>
        </div>

        <div className="row g-2">
          {/* Keyword Search */}
          <div className="col-md-3">
            <label className="form-label small text-muted mb-1">Search Name / URL</label>
            <input
              type="text"
              name="q"
              className="form-control form-control-sm bg-dark text-light border-secondary"
              placeholder="e.g. Winvest, Optima"
              value={q}
              onChange={this.handleChange}
            />
          </div>

          {/* Status Filter */}
          <div className="col-md-2 col-6">
            <label className="form-label small text-muted mb-1">Status</label>
            <select
              name="status"
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={status}
              onChange={this.handleChange}
            >
              <option value="">All Statuses</option>
              <option value="PAYING">PAYING</option>
              <option value="WAITING">WAITING</option>
              <option value="NOT PAYING">NOT PAYING</option>
              <option value="SCAM">SCAM</option>
              <option value="NEW">NEW LISTING</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="col-md-2 col-6">
            <label className="form-label small text-muted mb-1">Category</label>
            <select
              name="category"
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={category}
              onChange={this.handleChange}
            >
              <option value="">All Categories</option>
              <option value="Premium">Class "Premium"</option>
              <option value="Class A">Class "A"</option>
              <option value="Class B">Class "B"</option>
              <option value="Not Paying">Not Paying / Scam</option>
            </select>
          </div>

          {/* Processor Filter */}
          <div className="col-md-2 col-6">
            <label className="form-label small text-muted mb-1">Payment Processor</label>
            <select
              name="processor"
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={processor}
              onChange={this.handleChange}
            >
              <option value="">All Processors</option>
              <option value="Bitcoin">Bitcoin (BTC)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="Ethereum">Ethereum (ETH)</option>
              <option value="PerfectMoney">PerfectMoney</option>
              <option value="Payeer">Payeer</option>
              <option value="Litecoin">Litecoin (LTC)</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="col-md-3 col-6">
            <label className="form-label small text-muted mb-1">Sort By</label>
            <select
              name="sort"
              className="form-select form-select-sm bg-dark text-light border-secondary"
              value={sort}
              onChange={this.handleChange}
            >
              <option value="newest">Newest Listed</option>
              <option value="rating">Highest Rating</option>
              <option value="roi">Highest ROI %</option>
              <option value="min_deposit">Lowest Min Deposit</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFilter;
