import React, { Component } from 'react';

class ProjectCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date()
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  getFormattedLastPayoutDate(project) {
    if (!project) return '';
    if (project.status === 'PAYING' || !project.lastPayoutDate || project.lastPayoutDate.startsWith('2026-08-10') || project.lastPayoutDate.length <= 10) {
      const now = this.state.now || new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
    return project.lastPayoutDate;
  }

  getStatusBadgeClass(status) {
    switch (status) {
      case 'PAYING':
        return 'badge-paying';
      case 'WAITING':
        return 'badge-waiting';
      case 'NOT PAYING':
        return 'badge-notpaying';
      case 'SCAM':
        return 'badge-scam';
      case 'NEW':
        return 'badge-new';
      case 'FEATURED':
        return 'badge-featured';
      default:
        return 'bg-secondary';
    }
  }

  renderProcessorIcon(proc) {
    const p = proc.toLowerCase();
    if (p.includes('bitcoin') || p.includes('btc')) return <i key={proc} className="bi bi-currency-bitcoin text-warning fs-5 me-1" title="Bitcoin"></i>;
    if (p.includes('usdt') || p.includes('tether')) return <i key={proc} className="bi bi-coin text-info fs-5 me-1" title="USDT"></i>;
    if (p.includes('ethereum') || p.includes('eth')) return <i key={proc} className="bi bi-currency-ethereum text-primary fs-5 me-1" title="Ethereum"></i>;
    if (p.includes('perfect') || p.includes('pm')) return <i key={proc} className="bi bi-bank text-success fs-5 me-1" title="PerfectMoney"></i>;
    if (p.includes('payeer')) return <i key={proc} className="bi bi-wallet2 text-danger fs-5 me-1" title="Payeer"></i>;
    if (p.includes('litecoin') || p.includes('ltc')) return <i key={proc} className="bi bi-lightning-fill text-warning fs-5 me-1" title="Litecoin"></i>;
    return <span key={proc} className="badge bg-secondary me-1">{proc}</span>;
  }

  render() {
    const { project, onNavigate, onOpenReviewModal, onOpenReportModal } = this.props;

    if (!project) return null;

    const isNotPaying = project.status === 'NOT PAYING' || project.status === 'SCAM';

    if (isNotPaying) {
      return (
        <div className="bento-card mb-2 p-3 border-danger border-opacity-40">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="badge badge-scam px-3 py-1">{project.status}</span>
              <button
                className="btn btn-link p-0 text-white fw-bold text-decoration-none fs-6 text-start"
                onClick={() => onNavigate('details', { id: project.id })}
              >
                {project.name}
              </button>
              <span className="text-muted small">({project.domain})</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-danger bg-opacity-20 text-danger border border-danger border-opacity-30 px-2 py-1">
                <i className="bi bi-chat-left-text me-1"></i> Reviews ({project.reviewsCount || 0})
              </span>
              <button
                className="btn btn-sm btn-outline-danger btn-bento fw-bold"
                onClick={() => onOpenReportModal(project)}
              >
                <i className="bi bi-shield-exclamation me-1"></i> Report Scam
              </button>
              <button
                className="btn btn-sm btn-outline-light btn-bento"
                onClick={() => onNavigate('details', { id: project.id })}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bento-card mb-3 overflow-hidden">
        {/* Bento Header Row */}
        <div className="p-3 bg-slate-900 border-bottom border-slate-800 d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-slate-800 border border-slate-700 rounded-circle text-info d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
              <i className="bi bi-shield-check"></i>
            </div>
            <button
              className="btn btn-link p-0 text-info fw-extrabold fs-5 text-decoration-none"
              onClick={() => onNavigate('details', { id: project.id })}
            >
              {project.name}
            </button>

            {/* Status Badge */}
            <span className={`badge px-3 py-2 ${this.getStatusBadgeClass(project.status)}`}>
              {project.status.toLowerCase()}
            </span>

            {/* Rating */}
            <span className="text-warning small d-flex align-items-center ms-2">
              <i className="bi bi-star-fill me-1"></i> {project.rating} <span className="text-muted ms-1">({project.reviewsCount} reviews)</span>
            </span>
          </div>

          {/* Header Quick Links */}
          <div className="d-flex align-items-center gap-3 small">
            <button
              className="btn btn-link p-0 text-slate-300 text-decoration-none d-none d-md-inline"
              onClick={() => onNavigate('details', { id: project.id, tab: 'discussion' })}
            >
              <i className="bi bi-chat-dots me-1 text-info"></i> Discussion({project.reviewsCount || 0})
            </button>
            <button
              className="btn btn-link p-0 text-slate-300 text-decoration-none hover-text-danger"
              onClick={() => onOpenReportModal(project)}
            >
              <i className="bi bi-shield-exclamation me-1 text-danger"></i> Report Scam
            </button>
            <button
              className="btn btn-link p-0 text-info text-decoration-none fw-bold"
              onClick={() => onOpenReviewModal(project)}
            >
              <i className="bi bi-pencil-square me-1"></i> Write Review!
            </button>
          </div>
        </div>

        {/* Bento Card Body Grid */}
        <div className="p-3">
          <div className="row g-3">
            {/* Left Bento Sub-Box: Investment & SSL info */}
            <div className="col-md-4">
              <div className="bento-box-inner h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="badge badge-ssl badge-ssl-pulse px-2.5 py-1">
                      <i className="bi bi-shield-lock-fill me-1"></i> {project.ssl || 'SSL Encrypted'}
                    </span>
                    <span className="badge badge-roi badge-roi-pulse px-2.5 py-1">
                      ROI: {project.roi}%
                    </span>
                  </div>
                  <div className="small text-slate-300">
                    <div>Monitored Deposit: <strong className="blink-monitored-deposit">${project.ourInvestment}</strong></div>
                    <div>Min Deposit Limit: <strong className="blink-min-deposit">${project.minDeposit}</strong></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Bento Sub-Box: Plan duration, last payout, referral */}
            <div className="col-md-5">
              <div className="bento-box-inner h-100">
                <div className="text-danger fw-bold mb-1 small">
                  <i className="bi bi-lightning-charge me-1"></i> {project.duration}
                </div>
                <div className="row g-2 small text-slate-300">
                  <div className="col-6">
                    <div>Last payout: <strong className="text-success">{this.getFormattedLastPayoutDate(project)}</strong></div>
                    <div>Withdrawal: <strong className="blink-withdrawal">{project.withdrawalType}</strong></div>
                  </div>
                  <div className="col-6">
                    <div>Affiliate: <strong className="blink-affiliate">{project.referralPercent}</strong></div>
                    <div className="d-flex align-items-center mt-1">
                      <span className="me-1 small text-muted">Crypto:</span>
                      {project.processors && project.processors.map(p => this.renderProcessorIcon(p))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Bento Sub-Box: Rating Badge circle */}
            <div className="col-md-3">
              <div className="bento-box-inner h-100 text-center d-flex flex-column align-items-center justify-content-center">
                <div className="d-inline-flex flex-column align-items-center justify-content-center bg-slate-900 border border-emerald-500 rounded-circle p-2 shadow-sm rating-circle-anim" style={{ width: '60px', height: '60px' }}>
                  <span className="fw-extrabold fs-5 text-success rating-val-blink">{project.rating}</span>
                  <span className="rating-text-blink" style={{ fontSize: '0.6rem' }}>RATING</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Banner & Snippet */}
          <div className="row mt-3 pt-3 border-top border-slate-800 align-items-center">
            <div className="col-md-3 mb-2 mb-md-0">
              <img
                src={project.banner || project.logo}
                alt={project.name}
                className="img-fluid rounded border border-slate-700 shadow-sm"
                style={{ maxHeight: '70px', width: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-9">
              <p className="small text-slate-300 mb-0 line-clamp-2" style={{ fontSize: '0.85rem' }}>
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bento Footer Bar */}
        <div className="p-3 bg-slate-950 border-top border-slate-800 d-flex flex-wrap align-items-center justify-content-between gap-2">
          <div className="d-flex gap-2 flex-wrap">
            <button
              onClick={() => onNavigate('details', { id: project.id })}
              className="btn btn-sm btn-outline-info btn-bento d-flex align-items-center gap-1"
            >
              <i className="bi bi-info-circle"></i> Project details
            </button>

            {project.telegram && (
              <a
                href={project.telegram}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-primary btn-bento d-flex align-items-center gap-1"
              >
                <i className="bi bi-telegram"></i> Tg link
              </a>
            )}

            <button
              onClick={() => onOpenReportModal(project)}
              className="btn btn-sm btn-outline-danger btn-bento d-flex align-items-center gap-1 fw-semibold"
              title="Report payout issues or submit scam evidence"
            >
              <i className="bi bi-shield-exclamation text-danger"></i> Report Scam
            </button>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-success btn-bento fw-bold d-flex align-items-center gap-1 btn-visit-website-pulse"
            >
              <i className="bi bi-box-arrow-up-right"></i> Visit Website
            </a>
          </div>

          <div className="small text-muted d-flex align-items-center gap-2">
            <span>Since: <strong className="text-light">{project.startDate}</strong> ({project.monitoredDays}d)</span>
            <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded-pill">Monitors: {project.monitorsCount || 1}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectCard;

