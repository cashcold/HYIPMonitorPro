import React, { Component } from 'react';
import { submitReview, uploadImage } from '../services/api.js';

class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      country: 'United States',
      rating: 5,
      reviewText: '',
      paymentAmount: '',
      wallet: '',
      screenshot: '',
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
          this.setState({ screenshot: url });
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
    const { name, email, country, rating, reviewText, paymentAmount, wallet, screenshot } = this.state;

    if (!reviewText.trim()) {
      this.setState({ error: 'Please enter review comments' });
      return;
    }

    this.setState({ submitting: true, error: '' });

    try {
      const reviewData = {
        projectId: project.id,
        projectName: project.name,
        name: name || 'Anonymous Investor',
        email: email || 'anon@hyip.org',
        country,
        rating: parseInt(rating),
        reviewText,
        paymentAmount: parseFloat(paymentAmount) || 0,
        wallet,
        screenshot
      };

      await submitReview(reviewData);
      this.setState({ submitting: false, successMsg: 'Review posted successfully!' });
      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1200);
    } catch (err) {
      this.setState({ submitting: false, error: err.message || 'Error submitting review' });
    }
  };

  render() {
    const { project, onClose } = this.props;
    const { name, email, country, rating, reviewText, paymentAmount, wallet, screenshot, submitting, error, successMsg } = this.state;

    if (!project) return null;

    return (
      <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1060 }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-slate-900 border-secondary text-light">
            <div className="modal-header border-secondary">
              <h5 className="modal-title fw-bold text-info d-flex align-items-center gap-2">
                <i className="bi bi-pencil-square"></i> Write Review for {project.name}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            <form onSubmit={this.handleSubmit}>
              <div className="modal-body">
                {error && <div className="alert alert-danger p-2 small">{error}</div>}
                {successMsg && <div className="alert alert-success p-2 small">{successMsg}</div>}

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="e.g. SQMonitor"
                      value={name}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="e.g. investor@gmail.com"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Country</label>
                    <select
                      name="country"
                      className="form-select bg-dark text-light border-secondary"
                      value={country}
                      onChange={this.handleChange}
                    >
                      <option value="United States">United States 🇺🇸</option>
                      <option value="United Kingdom">United Kingdom 🇬🇧</option>
                      <option value="Germany">Germany 🇩🇪</option>
                      <option value="China">China 🇨🇳</option>
                      <option value="Brazil">Brazil 🇧🇷</option>
                      <option value="Nigeria">Nigeria 🇳🇬</option>
                      <option value="India">India 🇮🇳</option>
                      <option value="Other">Other International 🌐</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Rating (1 to 5 Stars)</label>
                    <select
                      name="rating"
                      className="form-select bg-dark text-light border-secondary text-warning fw-bold"
                      value={rating}
                      onChange={this.handleChange}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ Excellent (5 Stars)</option>
                      <option value="4">⭐⭐⭐⭐ Good (4 Stars)</option>
                      <option value="3">⭐⭐⭐ Average (3 Stars)</option>
                      <option value="2">⭐⭐ Bad (2 Stars)</option>
                      <option value="1">⭐ Very Bad / Scam (1 Star)</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Payment Received Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="paymentAmount"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="e.g. 50.00"
                      value={paymentAmount}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Payment / Wallet Reference (Optional)</label>
                    <input
                      type="text"
                      name="wallet"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="e.g. Wallet or ref ID..."
                      value={wallet}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Payment Proof Screenshot Upload</label>
                    <input
                      type="file"
                      className="form-control bg-dark text-light border-secondary"
                      accept="image/*"
                      onChange={this.handleFileChange}
                    />
                    {screenshot && (
                      <div className="mt-2">
                        <span className="text-success small"><i className="bi bi-check-circle me-1"></i> Screenshot attached:</span>
                        <img src={screenshot} alt="proof" className="img-thumbnail bg-dark d-block mt-1" style={{ maxHeight: '80px' }} />
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold">Review / Payment Comment *</label>
                    <textarea
                      name="reviewText"
                      rows="4"
                      className="form-control bg-dark text-light border-secondary"
                      placeholder="Share your payout experience, batch number, transaction speed, or support responsiveness..."
                      value={reviewText}
                      onChange={this.handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-info fw-bold" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Post Verified Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewModal;
