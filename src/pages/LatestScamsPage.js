import React, { Component } from 'react';
import { fetchLatestScams, fetchReports } from '../services/api.js';

class LatestScamsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scamProjects: [],
      reports: [],
      loading: true
    };
  }

  async componentDidMount() {
    try {
      const scams = await fetchLatestScams();
      const reps = await fetchReports();
      this.setState({ scamProjects: scams, reports: reps, loading: false });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  }

  render() {
    const { onNavigate, onOpenReportModal } = this.props;
    const { scamProjects, reports, loading } = this.state;

    return (
      <div className="container-fluid px-3 px-md-4 py-4">
        {/* Banner */}
        <div className="glass-panel p-3 p-md-4 mb-4 border-start border-4 border-danger">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h3 className="fw-extrabold text-danger mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-shield-slash-fill fs-2"></i> Blacklisted & Scam Projects Directory
              </h3>
              <p className="text-slate-300 small mb-0">
                Programs on this list have stopped processing withdrawals or have selective payment issues. DO NOT INVEST!
              </p>
            </div>
            <span className="badge badge-scam p-2 fs-6">
              Total Blacklisted: {scamProjects.length}
            </span>
          </div>
        </div>

        {/* Scam Cards */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-danger" role="status"></div>
          </div>
        ) : (
          <div className="row g-3">
            {scamProjects.map((p) => (
              <div key={p.id} className="col-12">
                <div className="card bg-slate-900 border-danger shadow-lg">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                      <div className="d-flex align-items-center gap-3">
                        <img src={p.logo} alt={p.name} className="rounded" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                        <div>
                          <h5 className="fw-bold text-white mb-0">{p.name}</h5>
                          <span className="text-muted small font-monospace">{p.domain}</span>
                        </div>
                      </div>
                      <span className="badge badge-scam px-3 py-2 fs-6">{p.status}</span>
                    </div>

                    <p className="small text-slate-300 mb-2">{p.description}</p>

                    <div className="p-2 bg-dark rounded border border-danger border-opacity-25 mb-3">
                      <strong className="text-danger small"><i className="bi bi-exclamation-triangle me-1"></i> Warning Reason:</strong>
                      <span className="small text-light ms-1">Multiple withdrawal delays reported since {p.lastPayoutDate || 'recently'}. Admin accounts unresponsive.</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                      <div className="small text-muted">
                        Total negative votes: <strong className="text-danger">{(p.votes ? p.votes.veryBad + p.votes.bad : 10)}</strong>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onOpenReportModal(p)}
                        >
                          <i className="bi bi-shield-exclamation me-1"></i> Submit Evidence
                        </button>
                        <button
                          className="btn btn-sm btn-outline-light"
                          onClick={() => onNavigate('details', { id: p.id })}
                        >
                          View Scam Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default LatestScamsPage;
