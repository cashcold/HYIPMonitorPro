import React, { Component } from 'react';
import { createProject, uploadImage } from '../services/api.js';

class AddProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: '',
      telegram: '',
      category: 'Class "B" (Trial)',
      status: 'PAYING',
      country: 'United States',
      company: 'Investment Corp',
      ourInvestment: 200,
      minDeposit: 10,
      maxDeposit: 10000,
      roi: 120,
      duration: '3% daily for 30 calendar days',
      withdrawalType: 'Manual',
      referralPercent: '5% - 2% - 1%',
      description: '',
      logo: '',
      banner: '',
      processors: ['Bitcoin', 'USDT', 'Ethereum'],
      adminPasscode: '',
      submitting: false,
      error: '',
      successMsg: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleProcessorToggle = (proc) => {
    this.setState((prevState) => {
      const exists = prevState.processors.includes(proc);
      const updated = exists
        ? prevState.processors.filter(p => p !== proc)
        : [...prevState.processors, proc];
      return { processors: updated };
    });
  };

  handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const url = await uploadImage(reader.result, file.name);
          this.setState({ logo: url });
        } catch (err) {
          this.setState({ error: 'Failed to upload logo' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, url, description } = this.state;

    if (!name.trim() || !url.trim() || !description.trim()) {
      this.setState({ error: 'Please fill in required fields (Name, URL, Description)' });
      return;
    }

    this.setState({ submitting: true, error: '' });

    try {
      let domain = url;
      try {
        domain = new URL(url.startsWith('http') ? url : `https://${url}`).hostname;
      } catch (err) {
        domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
      }

      const newProj = await createProject({
        ...this.state,
        domain,
        isAdmin: true,
        passcode: 'admin123'
      });

      this.setState({
        submitting: false,
        successMsg: '✅ Admin Authorization Verified! Project approved and published immediately.'
      });
      setTimeout(() => {
        if (this.props.onProjectAdded) this.props.onProjectAdded();
        this.props.onNavigate('details', { id: newProj.id });
      }, 1500);
    } catch (err) {
      this.setState({ submitting: false, error: err.message || 'Error submitting project' });
    }
  };

  render() {
    const { onNavigate, isAdminAuthenticated, onOpenAdminModal } = this.props;

    if (!isAdminAuthenticated) {
      return (
        <div className="container py-5">
          <div className="glass-panel p-5 text-center max-w-xl mx-auto border-top border-4 border-warning shadow-lg">
            <i className="bi bi-shield-lock-fill text-warning display-3 mb-3"></i>
            <h3 className="fw-bold text-white mb-2">Administrator Access Required</h3>
            <p className="text-slate-300 mb-4">
              Adding new investment projects to the portal listings is restricted exclusively to verified Administrators. Standard user project submissions are disabled.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-warning text-dark fw-bold px-4"
                onClick={() => onOpenAdminModal && onOpenAdminModal()}
              >
                <i className="bi bi-key-fill me-1"></i> Admin Login
              </button>
              <button
                className="btn btn-outline-secondary px-4"
                onClick={() => onNavigate('home')}
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    const {
      name,
      url,
      telegram,
      category,
      status,
      country,
      company,
      ourInvestment,
      minDeposit,
      maxDeposit,
      roi,
      duration,
      withdrawalType,
      referralPercent,
      description,
      logo,
      processors,
      submitting,
      error,
      successMsg
    } = this.state;

    const availableProcessors = ['Bitcoin', 'USDT', 'Ethereum', 'PerfectMoney', 'Payeer', 'Litecoin'];

    return (
      <div className="container py-4">
        <div className="glass-panel p-4 max-w-4xl mx-auto border-start border-4 border-success">
          <div className="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary pb-3">
            <div>
              <h3 className="fw-bold text-white mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-plus-circle-fill text-success fs-3"></i> Submit New HYIP Listing
              </h3>
              <p className="text-muted small mb-0">
                Add a new high-yield program to our 24/7 monitoring service.
              </p>
            </div>
            <button className="btn btn-outline-secondary" onClick={() => onNavigate('home')}>Cancel</button>
          </div>

          {error && <div className="alert alert-danger p-3 mb-3">{error}</div>}
          {successMsg && <div className="alert alert-success p-3 mb-3">{successMsg}</div>}

          <form onSubmit={this.handleSubmit}>
            <div className="row g-3">
              {/* Name & URL */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Project Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="e.g. Winvest, Optima"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Website URL *</label>
                <input
                  type="url"
                  name="url"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="https://winvest.com"
                  value={url}
                  onChange={this.handleChange}
                  required
                />
              </div>

              {/* Telegram & Category */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Telegram Group / Channel</label>
                <input
                  type="url"
                  name="telegram"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="https://t.me/winvest_official"
                  value={telegram}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Category</label>
                <select
                  name="category"
                  className="form-select bg-dark text-light border-secondary"
                  value={category}
                  onChange={this.handleChange}
                >
                  <option value='Class "Premium" (TOP Choices)'>Class "Premium" (TOP Choices)</option>
                  <option value='Class "A" (Top Performer)'>Class "A" (Top Performer)</option>
                  <option value='Class "B" (Trial)'>Class "B" (Trial)</option>
                  <option value='New Listing'>New Listing</option>
                </select>
              </div>

              {/* Status & Country */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Status</label>
                <select
                  name="status"
                  className="form-select bg-dark text-light border-secondary"
                  value={status}
                  onChange={this.handleChange}
                >
                  <option value="PAYING">PAYING</option>
                  <option value="WAITING">WAITING</option>
                  <option value="NOT PAYING">NOT PAYING</option>
                  <option value="NEW">NEW</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Country / Company</label>
                <input
                  type="text"
                  name="country"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="e.g. United States, Wealth Invest Corp"
                  value={country}
                  onChange={this.handleChange}
                />
              </div>

              {/* Min, Max Deposit, ROI */}
              <div className="col-md-4">
                <label className="form-label small fw-bold">Min Deposit ($)</label>
                <input
                  type="number"
                  name="minDeposit"
                  className="form-control bg-dark text-light border-secondary"
                  value={minDeposit}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold">Max Deposit ($)</label>
                <input
                  type="number"
                  name="maxDeposit"
                  className="form-control bg-dark text-light border-secondary"
                  value={maxDeposit}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-bold">ROI Yield (%)</label>
                <input
                  type="number"
                  name="roi"
                  className="form-control bg-dark text-light border-secondary"
                  value={roi}
                  onChange={this.handleChange}
                />
              </div>

              {/* Duration & Withdrawal Type */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Duration / Plan Text</label>
                <input
                  type="text"
                  name="duration"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="e.g. 3% daily for 60 calendar days"
                  value={duration}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Withdrawal Type</label>
                <select
                  name="withdrawalType"
                  className="form-select bg-dark text-light border-secondary"
                  value={withdrawalType}
                  onChange={this.handleChange}
                >
                  <option value="Instant">Instant</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              {/* Logo Upload */}
              <div className="col-md-6">
                <label className="form-label small fw-bold">Logo Upload</label>
                <input
                  type="file"
                  className="form-control bg-dark text-light border-secondary"
                  accept="image/*"
                  onChange={this.handleLogoUpload}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Referral Commission</label>
                <input
                  type="text"
                  name="referralPercent"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="e.g. 5% - 2% - 1%"
                  value={referralPercent}
                  onChange={this.handleChange}
                />
              </div>

              {/* Payment Processors */}
              <div className="col-12">
                <label className="form-label small fw-bold">Accepted Payment Processors</label>
                <div className="d-flex flex-wrap gap-2">
                  {availableProcessors.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`btn btn-sm ${processors.includes(p) ? 'btn-info' : 'btn-outline-secondary'}`}
                      onClick={() => this.handleProcessorToggle(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="col-12">
                <label className="form-label small fw-bold">Project Description *</label>
                <textarea
                  name="description"
                  rows="4"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Enter high-level details, regulatory compliance, trading strategy, or company history..."
                  value={description}
                  onChange={this.handleChange}
                  required
                ></textarea>
              </div>

              {/* Admin Mode Badge */}
              <div className="col-12 mt-3">
                <div className="bento-box-inner p-3 border border-success border-opacity-30 rounded-3 bg-success bg-opacity-10">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="small fw-bold text-success d-flex align-items-center gap-1">
                      <i className="bi bi-shield-check fs-5"></i> Verified Admin Session Active
                    </span>
                    <span className="badge bg-success">Direct Publishing</span>
                  </div>
                  <p className="text-slate-300 small mb-0 mt-1">
                    Your account has active administrator privileges. Submitting this project will instantly publish it live to public listings and category feeds.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top border-secondary d-flex align-items-center justify-content-between flex-wrap gap-2">
              <div className="text-muted small">
                <i className="bi bi-check-circle-fill me-1 text-success"></i>
                <span className="text-success fw-bold">Admin Privileges Active: Instant live listing</span>
              </div>
              <button type="submit" className="btn btn-success fw-bold px-4 py-2" disabled={submitting}>
                {submitting ? 'Publishing...' : 'Publish Project Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddProjectPage;
