import React, { Component } from 'react';
import { submitReport, uploadImage } from '../services/api.js';

class ReportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      wallet: '',
      proof: '',
      reporterEmail: '',
      submitting: false,
      error: '',
      successMsg: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const url = await uploadImage(reader.result, file.name);
          this.setState({ proof: url });
        } catch (err) {
          this.setState({ error: 'Failed to upload screenshot' });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { project, onClose, onSuccess } = this.props;
    const { reason, wallet, proof, reporterEmail } = this.state;

    if (!reason.trim()) {
      this.setState({ error: 'Please describe the scam/withdrawal issue' });
      return;
    }

    this.setState({ submitting: true, error: '' });

    try {
      await submitReport({
        projectId: project.id,
        projectName: project.name,
        reason,
        wallet,
        proof,
        reporterEmail
      });

      this.setState({ submitting: false, successMsg: 'Scam report submitted to administrators for investigation.' });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    } catch (err) {
      this.setState({ submitting: false, error: err.message || 'Error submitting report' });
    }
  };

  render() {
    const { project, onClose } = this.props;
    const { reason, wallet, proof, reporterEmail, submitting, error, successMsg } = this.state;

    if (!project) return null;

    return (
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1060 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-slate-900 border-danger text-light">
            <div className="modal-header border-danger bg-danger bg-opacity-10">
              <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                <i className="bi bi-shield-exclamation"></i> Report Scam - {project.name}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                {error && <div className="alert alert-danger p-2 small">{error}</div>}
                {successMsg && <div className="alert alert-success p-2 small">{successMsg}</div>}

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Your Email</label>
                  <input
                    type="email"
                    name="reporterEmail"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="e.g. investor@gmail.com"
                    value={reporterEmail}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Unpaid Wallet Address / Batch</label>
                  <input
                    type="text"
                    name="wallet"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="e.g. bc1q... or Pending Tx ID"
                    value={wallet}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Upload Proof Screenshot</label>
                  <input
                    type="file"
                    className="form-control bg-dark text-light border-secondary"
                    accept="image/*"
                    onChange={this.handleFileChange}
                  />
                  {proof && (
                    <div className="mt-2">
                      <span className="text-success small"><i className="bi bi-check-circle me-1"></i> Screenshot attached</span>
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold">Detailed Reason / Problem *</label>
                  <textarea
                    name="reason"
                    rows="4"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Describe the payment delay duration, support response, or selective payout behavior..."
                    value={reason}
                    onChange={this.handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-danger fw-bold" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Scam Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReportModal;
