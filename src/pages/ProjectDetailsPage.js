import React, { Component } from 'react';
import {
  fetchProjectById,
  fetchReviews,
  fetchComments,
  submitComment,
  submitVote
} from '../services/api.js';
import ScrollReveal from '../components/ScrollReveal.js';

class ProjectDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      reviews: [],
      comments: [],
      activeTab: props.initialTab || 'summary',
      loading: true,
      error: '',
      // Comment form state
      commentName: '',
      commentText: '',
      replyingToId: null,
      replyText: '',
      voted: false,
      voteSuccess: '',
      now: new Date()
    };
  }

  componentDidMount() {
    this.loadProjectData();
    this.timer = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  getFormattedLastPayoutDate = (project) => {
    if (!project) return '';
    if (project.status === 'PAYING' || !project.lastPayoutDate || project.lastPayoutDate.startsWith('2026-08-10') || project.lastPayoutDate.length <= 10) {
      const now = this.state.now || new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    return project.lastPayoutDate;
  };

  getMonitoredDays = (project) => {
    if (!project) return 1;
    if (project.startDate) {
      const parts = project.startDate.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1;
        const d = parseInt(parts[2], 10);
        const startUtc = Date.UTC(y, m, d);
        const now = this.state.now || new Date();
        const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
        const diffDays = Math.floor((nowUtc - startUtc) / (1000 * 60 * 60 * 24));
        return Math.max(1, diffDays);
      }
    }
    return project.monitoredDays || 1;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.projectId !== this.props.projectId) {
      this.loadProjectData();
    }
  }

  loadProjectData = async () => {
    this.setState({ loading: true, error: '' });
    try {
      const proj = await fetchProjectById(this.props.projectId);
      const revs = await fetchReviews(this.props.projectId);
      const comms = await fetchComments(this.props.projectId);
      this.setState({
        project: proj,
        reviews: revs,
        comments: comms,
        loading: false
      });
    } catch (err) {
      this.setState({ loading: false, error: err.message || 'Failed to load project details' });
    }
  };

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleVote = async (voteType) => {
    const { project } = this.state;
    if (!project) return;
    try {
      const newVotes = await submitVote(project.id, voteType);
      this.setState({
        project: { ...project, votes: newVotes },
        voted: true,
        voteSuccess: `Thank you! Your vote for ${voteType} has been recorded.`
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleCommentSubmit = async (e) => {
    e.preventDefault();
    const { project, commentName, commentText } = this.state;
    if (!commentText.trim()) return;

    try {
      const newComm = await submitComment({
        projectId: project.id,
        parentId: null,
        name: commentName || 'Investor',
        text: commentText
      });
      this.setState((prevState) => ({
        comments: [newComm, ...prevState.comments],
        commentText: '',
        commentName: ''
      }));
    } catch (err) {
      console.error(err);
    }
  };

  handleReplySubmit = async (parentId) => {
    const { project, commentName, replyText } = this.state;
    if (!replyText.trim()) return;

    try {
      await submitComment({
        projectId: project.id,
        parentId,
        name: commentName || 'Investor',
        text: replyText
      });
      this.setState({ replyingToId: null, replyText: '' });
      this.loadProjectData();
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { onNavigate, onOpenReviewModal, onOpenReportModal } = this.props;
    const {
      project,
      reviews,
      comments,
      activeTab,
      loading,
      error,
      commentName,
      commentText,
      replyingToId,
      replyText,
      voteSuccess
    } = this.state;

    if (loading) {
      return (
        <div className="container py-5 text-center">
          <div className="spinner-border text-info" role="status"></div>
          <p className="mt-2 text-muted">Loading project details...</p>
        </div>
      );
    }

    if (error || !project) {
      return (
        <div className="container py-5">
          <div className="alert alert-danger p-4 text-center">
            <h5>Project Not Found</h5>
            <p>{error || 'The requested investment program does not exist.'}</p>
            <button className="btn btn-primary" onClick={() => onNavigate('home')}>Back to Home</button>
          </div>
        </div>
      );
    }

    const isPaying = project.status === 'PAYING';

    return (
      <div className="container-fluid px-3 px-md-4 py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button className="btn btn-link p-0 text-muted text-decoration-none" onClick={() => onNavigate('home')}>
                Home
              </button>
            </li>
            <li className="breadcrumb-item text-muted">Projects</li>
            <li className="breadcrumb-item active text-info fw-bold">{project.name}</li>
          </ol>
        </nav>

        {/* Header Hero Banner */}
        <ScrollReveal animation="fade-down" duration={600}>
          <div className="glass-panel p-3 p-md-4 mb-4 border-start border-4 border-info">
            <div className="row align-items-center g-3">
              <div className="col-md-2 text-center">
                <img
                  src={project.logo}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                  className="img-fluid rounded border border-secondary shadow"
                  style={{ width: '96px', height: '96px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-7">
                <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                  <h2 className="fw-extrabold text-white mb-0">{project.name}</h2>
                  <span className={`badge px-3 py-2 ${isPaying ? 'badge-paying' : 'badge-notpaying'}`}>
                    {project.status}
                  </span>
                  <span className="badge bg-secondary">{project.category}</span>
                </div>

                <p className="text-info mb-2 small font-monospace d-flex align-items-center gap-2">
                  <i className="bi bi-globe"></i> {project.domain}
                  <span className="text-muted">• Monitored for <strong>{this.getMonitoredDays(project)} days</strong> (Since {project.startDate})</span>
                </p>

                <div className="d-flex gap-2 flex-wrap">
                  <a href={project.url} target="_blank" rel="noreferrer" className="btn btn-sm btn-success fw-bold btn-visit-website-pulse">
                    <i className="bi bi-box-arrow-up-right me-1"></i> Visit Official Site
                  </a>
                  {project.telegram && (
                    <a href={project.telegram} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info">
                      <i className="bi bi-telegram me-1"></i> Telegram Channel
                    </a>
                  )}
                  <button className="btn btn-sm btn-outline-warning" onClick={() => onOpenReviewModal(project)}>
                    <i className="bi bi-pencil-square me-1"></i> Write Review
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => onOpenReportModal(project)}>
                    <i className="bi bi-shield-exclamation me-1"></i> Report Scam
                  </button>
                </div>
              </div>

              <div className="col-md-3 text-center border-start-md border-secondary">
                <div className="d-inline-flex flex-column align-items-center justify-content-center bg-dark border border-success rounded-circle p-3" style={{ width: '80px', height: '80px' }}>
                  <span className="fw-bold fs-3 text-success">{project.rating}</span>
                  <span className="text-muted small" style={{ fontSize: '0.65rem' }}>RATING</span>
                </div>
                <div className="small text-muted mt-2">
                  Total Reviews: <strong className="text-white">{project.reviewsCount}</strong>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Detail Tabs */}
        <ul className="nav nav-tabs border-secondary mb-4 gap-1">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'summary' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.handleTabChange('summary')}
            >
              <i className="bi bi-file-text me-1"></i> Summary
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'reviews' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.handleTabChange('reviews')}
            >
              <i className="bi bi-star me-1"></i> Reviews ({reviews.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'discussion' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.handleTabChange('discussion')}
            >
              <i className="bi bi-chat-left-text me-1"></i> Discussion ({comments.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'whois' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.handleTabChange('whois')}
            >
              <i className="bi bi-shield-check me-1"></i> WHOIS & Traffic
            </button>
          </li>
        </ul>

        {/* TAB 1: SUMMARY */}
        {activeTab === 'summary' && (
          <div className="row g-4">
            <div className="col-lg-8">
              {/* Description card */}
              <div className="card bg-slate-900 border-secondary mb-4">
                <div className="card-header bg-slate-800 fw-bold text-info">
                  <i className="bi bi-info-circle me-2"></i> Program Description
                </div>
                <div className="card-body p-3 p-md-4">
                  <p className="text-slate-100 fs-6 lh-lg mb-0 fw-normal" style={{ letterSpacing: '0.2px' }}>{project.description}</p>
                </div>
              </div>

              {/* Investment Plans Table */}
              <div className="card bg-slate-900 border-secondary mb-4">
                <div className="card-header bg-slate-800 fw-bold text-success d-flex justify-content-between align-items-center">
                  <span><i className="bi bi-[#38bdf8] bi-graph-up-arrow me-2"></i> Investment Plans & Yield Structure</span>
                  <span className="badge badge-roi badge-roi-pulse px-3 py-1.5 fs-6">ROI: {project.roi}%</span>
                </div>
                <div className="card-body p-0 table-responsive">
                  <table className="table table-hyip mb-0 align-middle">
                    <thead>
                      <tr>
                        <th>Plan Name</th>
                        <th>Min Deposit</th>
                        <th>Max Deposit</th>
                        <th>ROI Yield</th>
                        <th>Duration</th>
                        <th>Compounding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.investmentPlans && project.investmentPlans.map((plan, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold text-info">{plan.name}</td>
                          <td className="text-success fw-bold">${plan.minDeposit}</td>
                          <td>${plan.maxDeposit ? plan.maxDeposit.toLocaleString() : 'Unlimited'}</td>
                          <td className="fw-bold text-warning">{plan.roi}</td>
                          <td>{plan.duration}</td>
                          <td>
                            <span className={`badge ${plan.compounding === 'Yes' ? 'bg-success' : 'bg-secondary'}`}>
                              {plan.compounding}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Voting Bar Widget */}
              <div className="card bg-slate-900 border-secondary mb-4">
                <div className="card-header bg-slate-800 fw-bold text-warning">
                  <i className="bi bi-hand-thumbs-up me-2"></i> Community Satisfaction Rating
                </div>
                <div className="card-body">
                  {voteSuccess && <div className="alert alert-success p-2 small mb-3">{voteSuccess}</div>}
                  <div className="d-flex flex-wrap gap-2 justify-content-between">
                    <button onClick={() => this.handleVote('excellent')} className="btn btn-outline-success btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-emoji-laughing"></i> Outstanding ({project.votes ? project.votes.excellent : 0})
                    </button>
                    <button onClick={() => this.handleVote('good')} className="btn btn-outline-info btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-emoji-smile"></i> Good ({project.votes ? project.votes.good : 0})
                    </button>
                    <button onClick={() => this.handleVote('average')} className="btn btn-outline-warning btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-emoji-neutral"></i> Average ({project.votes ? project.votes.average : 0})
                    </button>
                    <button onClick={() => this.handleVote('bad')} className="btn btn-outline-danger btn-sm flex-fill d-flex align-items-center justify-content-center gap-1">
                      <i className="bi bi-emoji-frown"></i> Bad ({project.votes ? project.votes.bad : 0})
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar info */}
            <div className="col-lg-4">
              <div className="card bg-slate-900 border-secondary mb-4">
                <div className="card-header bg-slate-800 fw-bold text-white">
                  Program Metadata
                </div>
                <div className="card-body p-3">
                  <ul className="list-group list-group-flush bg-transparent small text-slate-300">
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Our Investment:</span> <strong className="text-danger">${project.ourInvestment}</strong>
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Withdrawal Mode:</span> <strong className="text-info">{project.withdrawalType}</strong>
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Affiliate Program:</span> <strong className="blink-affiliate">{project.referralPercent}</strong>
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Last Payout Date:</span> <strong className="text-success">{this.getFormattedLastPayoutDate(project)}</strong>
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Company / Entity:</span> <span>{project.company}</span>
                    </li>
                    <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                      <span>Country:</span> <span>{project.country}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Supported Processors */}
              <div className="card bg-slate-900 border-secondary">
                <div className="card-header bg-slate-800 fw-bold text-white">
                  Accepted Processors
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    {project.processors && project.processors.map(p => (
                      <span key={p} className="badge bg-secondary p-2 fs-6">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 d-flex justify-content-between align-items-center py-3">
              <h5 className="fw-bold text-info mb-0">Verified Reviews & Payout Proofs</h5>
              <button className="btn btn-sm btn-info fw-bold" onClick={() => onOpenReviewModal(project)}>
                + Submit Review
              </button>
            </div>
            <div className="card-body">
              {reviews.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  No user reviews posted yet. Be the first to share your payment proof!
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-3 glass-card border border-secondary rounded">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-person-circle fs-4 text-info"></i>
                          <div>
                            <span className="fw-bold text-white">{r.name}</span>
                            <span className="text-muted small ms-2">({r.country})</span>
                          </div>
                        </div>
                        <span className="text-warning fw-bold">
                          {'★'.repeat(Math.min(5, Math.max(0, r.rating || 5)))}{'☆'.repeat(Math.max(0, 5 - (r.rating || 5)))}
                        </span>
                      </div>

                      <p className="text-slate-200 mb-2 font-monospace small" style={{ wordBreak: 'break-all' }}>
                        {r.reviewText}
                      </p>

                      <div className="d-flex justify-content-between align-items-center text-muted small border-top border-secondary pt-2">
                        <span>
                          Payment Amount: <strong className="text-success">${r.paymentAmount}</strong>
                          {r.wallet && <span className="ms-2">| Wallet: {r.wallet}</span>}
                        </span>
                        <span>{new Date(r.createdAt).toLocaleString()}</span>
                      </div>

                      {r.screenshot && (
                        <div className="mt-2">
                          <img src={r.screenshot} alt="Payment Proof" className="img-thumbnail bg-dark" style={{ maxHeight: '150px' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DISCUSSION */}
        {activeTab === 'discussion' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 fw-bold text-info">
              <i className="bi bi-chat-dots me-2"></i> Investor Community Discussion
            </div>
            <div className="card-body">
              {/* Post Comment Form */}
              <form onSubmit={this.handleCommentSubmit} className="mb-4 glass-card p-3">
                <h6 className="fw-bold text-white mb-2">Leave a Comment</h6>
                <div className="row g-2 mb-2">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      placeholder="Your Name / Handle"
                      value={commentName}
                      onChange={(e) => this.setState({ commentName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-8">
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      placeholder="Type your message or question..."
                      value={commentText}
                      onChange={(e) => this.setState({ commentText: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-sm btn-info fw-bold">Post Comment</button>
              </form>

              {/* Comments Tree */}
              <div className="d-flex flex-column gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 bg-slate-950 border border-secondary rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="fw-bold text-info">{c.name}</span>
                      <span className="text-muted small">{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-200 mb-2">{c.text}</p>

                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn btn-sm btn-link text-muted p-0 text-decoration-none"
                        onClick={() => this.setState({ replyingToId: c.id })}
                      >
                        <i className="bi bi-reply"></i> Reply
                      </button>
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === c.id && (
                      <div className="mt-2 p-2 bg-dark rounded">
                        <input
                          type="text"
                          className="form-control form-control-sm bg-slate-900 text-light border-secondary mb-2"
                          placeholder="Write reply..."
                          value={replyText}
                          onChange={(e) => this.setState({ replyText: e.target.value })}
                        />
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => this.handleReplySubmit(c.id)}
                        >
                          Submit Reply
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => this.setState({ replyingToId: null })}
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Nested Replies */}
                    {c.replies && c.replies.length > 0 && (
                      <div className="ms-4 mt-3 border-start border-secondary ps-3 d-flex flex-column gap-2">
                        {c.replies.map((reply) => (
                          <div key={reply.id} className="p-2 bg-slate-900 rounded">
                            <span className="fw-bold text-success small">{reply.name}</span>
                            <p className="small text-slate-300 mb-0">{reply.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TRAFFIC & WHOIS */}
        {activeTab === 'whois' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 fw-bold text-warning">
              <i className="bi bi-shield-check me-2"></i> Domain WHOIS & Infrastructure Data
            </div>
            <div className="card-body">
              {project.whois ? (
                <div className="row g-3">
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush bg-transparent small">
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">Domain Name:</span> <strong>{project.whois.domain}</strong>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">IP Address:</span> <strong>{project.whois.ip}</strong>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">Registrar:</span> <span>{project.whois.registrar}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="col-md-6">
                    <ul className="list-group list-group-flush bg-transparent small">
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">Creation Date:</span> <strong>{project.whois.created}</strong>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">Expiration Date:</span> <strong>{project.whois.expires}</strong>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between">
                        <span className="text-muted">Nameservers:</span> <span className="font-monospace small">{project.whois.nameservers}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted mb-0">No WHOIS records cached for this domain.</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProjectDetailsPage;
