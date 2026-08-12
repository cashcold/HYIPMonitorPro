import React, { Component } from 'react';
import ScrollReveal from './ScrollReveal.js';

class HeroStats extends Component {
  render() {
    const { stats, onNavigate, projects, isAdminAuthenticated } = this.props;

    const recentProjects = projects ? projects.slice(0, 5) : [];
    const payingCount = stats ? stats.payingProjects : 0;
    const notPayingCount = stats ? stats.notPayingProjects : 0;
    const totalMembers = this.props.activeMembersCount || (stats ? stats.totalMembers : 14289);
    const totalReviews = stats ? stats.totalReviews : 0;
    const totalInvestedDisplay = (stats && stats.totalInvestmentsListed) ? stats.totalInvestmentsListed : '$90,084';

    return (
      <div className="mb-4">
        {/* Bento Grid Top Section */}
        <div className="row g-3 mb-4">
          {/* Bento Box 1: Main Hero Banner */}
          <div className="col-lg-8">
            <div className="bento-card p-4 h-100 position-relative overflow-hidden d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge bg-cyan-500 bg-opacity-20 text-cyan-400 border border-cyan-500 border-opacity-30 px-3 py-1 rounded-pill small fw-bold blink-live-indicator">
                    <i className="bi bi-broadcast me-1"></i> 24/7 Live Monitoring
                  </span>
                </div>
                <h1 className="fw-extrabold text-white h3 mb-2 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-info fs-2 text-glow"></i>
                  Investment Projects & Daily HYIP Tracker
                </h1>
                <p className="text-slate-300 small mb-0 lh-base">
                  <strong className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</strong> is your premier monitoring associate in the high-yield investment program space. We invest our own funds in listed projects to track real daily withdrawals 24/7, offering unbiased evaluations and scam prevention tools.
                </p>
              </div>

              <div className="pt-3 mt-3 border-top border-slate-800 d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-3 text-slate-400 small">
                  <span className="blink-proofs-item">
                    <i className="bi bi-check-circle-fill text-success me-1"></i> Real Funds Monitored
                  </span>
                  <span className="blink-proofs-item">
                    <i className="bi bi-shield-lock-fill text-info me-1"></i> Verified Proofs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Quick Overview Status Box */}
          <div className="col-lg-4">
            <div className="bento-card p-4 h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="fw-bold fs-6 blink-system-health">
                    <i className="bi bi-activity text-info me-2 system-health-icon-pulse"></i> System Health
                  </span>
                  <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded-pill px-2 py-1 small blink-live-indicator">
                    Operational
                  </span>
                </div>

                <div className="bento-box-inner bento-box-inner-pulse mb-2 d-flex align-items-center justify-content-between">
                  <span className="small text-slate-400 blink-stat-label">Total Projects Tracked</span>
                  <span className="fw-bold fs-6 blink-stat-value-primary">{projects ? projects.length : 0}</span>
                </div>

                <div className="bento-box-inner bento-box-inner-pulse mb-2 d-flex align-items-center justify-content-between">
                  <span className="small text-slate-400 blink-stat-label">Active Payout Rate</span>
                  <span className="fw-bold fs-6 blink-stat-value-success">
                    {projects && projects.length > 0
                      ? `${Math.round((payingCount / projects.length) * 100)}%`
                      : '94%'}
                  </span>
                </div>

                <div className="bento-box-inner bento-box-inner-pulse d-flex align-items-center justify-content-between">
                  <span className="small text-slate-400 blink-stat-label">Community Safety Index</span>
                  <span className="fw-bold fs-6 blink-stat-value-info">99.8%</span>
                </div>
              </div>

              <div className="mt-3 pt-2 text-center">
                <button
                  onClick={() => onNavigate('scams')}
                  className="btn btn-sm btn-outline-danger w-100 btn-bento"
                >
                  <i className="bi bi-shield-x me-1"></i> View Scam / Not Paying List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Metric Cards Bento Row */}
        <div className="row g-2 g-md-3 mb-4">
          <div className="col-6 col-md-4 col-lg-2-4">
            <ScrollReveal animation="zoom-in" delay={50} duration={500}>
              <div className="bento-card p-3 text-center border-start border-4 border-success">
                <div className="text-success fs-3 mb-1"><i className="bi bi-check-circle-fill metric-icon-paying"></i></div>
                <div className="fw-bold fs-4 text-white text-glow-success">{payingCount}</div>
                <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Paying Projects</div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-6 col-md-4 col-lg-2-4">
            <ScrollReveal animation="zoom-in" delay={120} duration={500}>
              <div className="bento-card p-3 text-center border-start border-4 border-danger">
                <div className="text-danger fs-3 mb-1"><i className="bi bi-x-circle-fill metric-icon-notpaying"></i></div>
                <div className="fw-bold fs-4 text-white blink-notpaying-text">{notPayingCount}</div>
                <div className="text-muted small text-uppercase fw-semibold blink-notpaying-text" style={{ fontSize: '0.7rem' }}>Not Paying</div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-6 col-md-4 col-lg-2-4">
            <ScrollReveal animation="zoom-in" delay={190} duration={500}>
              <div className="bento-card p-3 text-center border-start border-4 border-info position-relative">
                <span className="position-absolute top-0 end-0 m-2 badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded-pill blink-live-indicator" style={{ fontSize: '0.62rem' }}>
                  <span className="spinner-grow spinner-grow-sm me-1" style={{ width: '6px', height: '6px' }}></span> Live
                </span>
                <div className="text-info fs-3 mb-1"><i className="bi bi-people-fill metric-icon-members"></i></div>
                <div className="fw-bold fs-4 text-white text-glow">{totalMembers.toLocaleString()}</div>
                <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Active Members</div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-6 col-md-4 col-lg-2-4">
            <ScrollReveal animation="zoom-in" delay={260} duration={500}>
              <div className="bento-card p-3 text-center border-start border-4 border-warning">
                <div className="text-warning fs-3 mb-1"><i className="bi bi-star-fill metric-icon-reviews"></i></div>
                <div className="fw-bold fs-4 text-white">{totalReviews}</div>
                <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>Verified Reviews</div>
              </div>
            </ScrollReveal>
          </div>

          <div className="col-6 col-md-4 col-lg-2-4">
            <ScrollReveal animation="zoom-in" delay={330} duration={500}>
              <div className="bento-card p-3 text-center border-start border-4 border-primary position-relative overflow-hidden">
                <span className="position-absolute top-0 end-0 m-2 badge bg-primary bg-opacity-20 text-cyan-400 border border-primary border-opacity-30 rounded-pill blink-live-indicator" style={{ fontSize: '0.62rem' }}>
                  <span className="spinner-grow spinner-grow-sm me-1" style={{ width: '6px', height: '6px' }}></span> Live
                </span>
                <div className="text-primary fs-3 mb-1"><i className="bi bi-currency-dollar metric-icon-invested"></i></div>
                <div className="fw-bold fs-4 text-white">
                  {totalInvestedDisplay}
                </div>
                <div className="text-muted small text-uppercase fw-semibold" style={{ fontSize: '0.7rem' }}>
                  Investments Monitored
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Recently Updated & Hot Topics Split Bento Cards */}
        <div className="row g-3">
          {/* Recently Updated Widget */}
          <div className="col-md-6">
            <ScrollReveal animation="fade-right" duration={600}>
              <div className="bento-card h-100 overflow-hidden">
                <div className="p-3 bg-slate-900 border-bottom border-slate-800 text-info fw-bold d-flex justify-content-between align-items-center">
                  <span className="blink-recent-header"><i className="bi bi-clock-history me-2"></i> Recently Updated Listings</span>
                  <span className="badge rounded-pill blink-live-feed-badge">Live Feed</span>
                </div>
                <div className="p-2">
                  <div className="list-group list-group-flush">
                    {recentProjects.map((p) => (
                      <div
                        key={p.id}
                        className="list-group-item bg-transparent text-light border-slate-800 p-2 d-flex justify-content-between align-items-center cursor-pointer bento-box-inner mb-1"
                        onClick={() => onNavigate('details', { id: p.id })}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img src={p.logo} alt={p.name} className="rounded" style={{ width: '32px', height: '32px', objectFit: 'cover' }} />
                          <div>
                            <span className="fw-bold text-info">{p.domain || p.name}</span>
                            <span className="text-muted ms-2 small">- {p.name}</span>
                          </div>
                        </div>
                        <span className={`badge ${p.status === 'PAYING' ? 'badge-paying' : 'badge-notpaying'}`}>
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hot Topics Widget */}
          <div className="col-md-6">
            <ScrollReveal animation="fade-left" duration={600}>
              <div className="bento-card h-100 overflow-hidden">
              <div className="p-3 bg-slate-900 border-bottom border-slate-800 text-warning fw-bold d-flex justify-content-between align-items-center">
                <span className="blink-topics-header"><i className="bi bi-fire me-2"></i> Hot Topics & Discussions</span>
                <span className="badge rounded-pill blink-community-badge">Community</span>
              </div>
              <div className="p-2">
                <div className="list-group list-group-flush">
                  {(() => {
                    const now = new Date();
                    const formatDt = (offsetHours = 0) => {
                      const d = new Date(now.getTime() - offsetHours * 3600000);
                      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                    };

                    const topicsData = [
                      {
                        title: 'GoldBod Pro - AI Cloud ASIC Mining',
                        author: 'cryptominer99',
                        comments: 2840,
                        offset: 0,
                        projectId: 'proj_goldbod'
                      },
                      {
                        title: 'Winvest.com - AI Powered Payouts',
                        author: 'naale',
                        comments: 376,
                        offset: 2,
                        projectId: 'proj_winvest'
                      },
                      {
                        title: 'King Hectares - Agri Growth Yields',
                        author: 'agritrader',
                        comments: 210,
                        offset: 4,
                        projectId: 'proj_kinghectares'
                      },
                      {
                        title: 'Cryptoize Limited - 5 Day Quantum Plan',
                        author: 'zoricavasic20',
                        comments: 170,
                        offset: 6,
                        projectId: 'proj_cryptoize'
                      },
                      {
                        title: 'Optima - Core Yield Crypto Banking',
                        author: 'edpr2140',
                        comments: 155,
                        offset: 8,
                        projectId: 'proj_optima'
                      }
                    ];

                    const displayTopics = (recentProjects && recentProjects.length >= 5)
                      ? recentProjects.map((p, idx) => {
                          const meta = topicsData[idx] || {};
                          return {
                            id: p.id,
                            title: p.name + (p.domain ? ` (${p.domain})` : ''),
                            author: meta.author || 'community_user',
                            comments: p.reviewsCount || meta.comments || 100,
                            offset: idx * 2
                          };
                        })
                      : topicsData.map(t => ({ id: t.projectId, ...t }));

                    return displayTopics.slice(0, 5).map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="list-group-item bg-transparent text-light border-slate-800 p-2 bento-box-inner mb-1"
                        onClick={() => item.id && onNavigate && onNavigate('details', { id: item.id })}
                        style={{ cursor: item.id ? 'pointer' : 'default' }}
                      >
                        <div className="fw-bold text-light d-flex align-items-center justify-content-between">
                          <span>{item.title}</span>
                          <i className="bi bi-chevron-right text-muted small"></i>
                        </div>
                        <div className="text-muted small mt-1">
                          Updated {formatDt(item.offset)} by <span className="text-info">{item.author}</span> • <span className="text-warning fw-semibold">{item.comments.toLocaleString()} Comments</span>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
    );
  }
}

export default HeroStats;

