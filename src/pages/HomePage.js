import React, { Component } from 'react';
import HeroStats from '../components/HeroStats.js';
import ProjectCard from '../components/ProjectCard.js';
import ProjectFilter from '../components/ProjectFilter.js';
import ScrollReveal from '../components/ScrollReveal.js';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredProjects: props.projects || [],
      filterParams: {}
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.projects !== this.props.projects) {
      this.applyFilter(this.state.filterParams);
    }
  }

  handleFilterChange = (params) => {
    this.setState({ filterParams: params }, () => {
      this.applyFilter(params);
    });
  };

  applyFilter = (params) => {
    let list = [...(this.props.projects || [])];

    if (params.q) {
      const q = params.q.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (params.status) {
      list = list.filter(p => p.status.toUpperCase() === params.status.toUpperCase());
    }

    if (params.category) {
      list = list.filter(p => p.category.toLowerCase().includes(params.category.toLowerCase()));
    }

    if (params.processor) {
      list = list.filter(p => p.processors && p.processors.some(proc => proc.toLowerCase().includes(params.processor.toLowerCase())));
    }

    if (params.sort) {
      if (params.sort === 'newest') {
        list.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      } else if (params.sort === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      } else if (params.sort === 'roi') {
        list.sort((a, b) => b.roi - a.roi);
      } else if (params.sort === 'min_deposit') {
        list.sort((a, b) => a.minDeposit - b.minDeposit);
      }
    }

    this.setState({ filteredProjects: list });
  };

  render() {
    const { stats, onNavigate, onOpenReviewModal, onOpenReportModal, isAdminAuthenticated } = this.props;
    const { filteredProjects } = this.state;

    // Group projects by category
    const premiumProjects = filteredProjects.filter(p => p.category.includes('Premium'));
    const classAProjects = filteredProjects.filter(p => p.category.includes('Class "A"'));
    const classBProjects = filteredProjects.filter(p => p.category.includes('Class "B"'));
    const notPayingProjects = filteredProjects.filter(p => p.status === 'NOT PAYING' || p.status === 'SCAM' || p.category.includes('Not Paying'));
    const otherProjects = filteredProjects.filter(p =>
      !p.category.includes('Premium') &&
      !p.category.includes('Class "A"') &&
      !p.category.includes('Class "B"') &&
      p.status !== 'NOT PAYING' &&
      p.status !== 'SCAM'
    );

    return (
      <div className="container-fluid px-3 px-md-4 py-3">
        {/* Hero Section */}
        <ScrollReveal animation="fade-down" duration={700}>
          <HeroStats
            stats={stats}
            onNavigate={onNavigate}
            projects={this.props.projects}
            activeMembersCount={this.props.activeMembersCount}
            isAdminAuthenticated={isAdminAuthenticated}
          />
        </ScrollReveal>

        {/* Search & Filter Bar */}
        <ScrollReveal animation="zoom-in" duration={500} delay={100}>
          <ProjectFilter onFilterChange={this.handleFilterChange} />
        </ScrollReveal>

        {/* Section: Class "Premium" (TOP Choices) */}
        {premiumProjects.length > 0 && (
          <section className="mb-4">
            <ScrollReveal animation="flip-up" duration={600}>
              <div className="bento-category-header d-flex align-items-center justify-content-between p-3 mb-3 bg-gradient-to-r from-amber-600/90 via-yellow-600/80 to-amber-700/90 text-white shadow-lg category-header-premium-anim">
                <span className="fw-bold fs-6 d-flex align-items-center gap-2">
                  <i className="bi bi-trophy-fill text-warning fs-5 trophy-icon-spin"></i> Class "Premium" (TOP Choices)
                </span>
              </div>
            </ScrollReveal>
            {premiumProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={idx * 80} duration={550}>
                <ProjectCard
                  project={project}
                  onNavigate={onNavigate}
                  onOpenReviewModal={onOpenReviewModal}
                  onOpenReportModal={onOpenReportModal}
                />
              </ScrollReveal>
            ))}
          </section>
        )}

        {/* Section: Class "A" (Top Performer) */}
        {classAProjects.length > 0 && (
          <section className="mb-4">
            <ScrollReveal animation="flip-up" duration={600}>
              <div className="bento-category-header d-flex align-items-center justify-content-between p-3 mb-3 bg-gradient-to-r from-emerald-600/90 via-teal-700/80 to-emerald-800/90 text-white shadow-lg category-header-classa-anim">
                <span className="fw-bold fs-6 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-success fs-5 shield-icon-pulse"></i> Class "A" (Top Performer)
                </span>
              </div>
            </ScrollReveal>
            {classAProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={idx * 80} duration={550}>
                <ProjectCard
                  project={project}
                  onNavigate={onNavigate}
                  onOpenReviewModal={onOpenReviewModal}
                  onOpenReportModal={onOpenReportModal}
                />
              </ScrollReveal>
            ))}
          </section>
        )}

        {/* Section: Class "B" (Trial) */}
        {classBProjects.length > 0 && (
          <section className="mb-4">
            <ScrollReveal animation="flip-up" duration={600}>
              <div className="bento-category-header d-flex align-items-center justify-content-between p-3 mb-3 bg-slate-900 text-info border border-slate-800 shadow category-header-classb-anim">
                <span className="fw-bold fs-6 d-flex align-items-center gap-2">
                  <i className="bi bi-layers-fill text-info fs-5 layers-icon-bounce"></i> Class "B" (Trial & Growth)
                </span>
                <span className="badge bg-secondary rounded-pill blink-live-indicator">Monitored</span>
              </div>
            </ScrollReveal>
            {classBProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={idx * 80} duration={550}>
                <ProjectCard
                  project={project}
                  onNavigate={onNavigate}
                  onOpenReviewModal={onOpenReviewModal}
                  onOpenReportModal={onOpenReportModal}
                />
              </ScrollReveal>
            ))}
          </section>
        )}

        {/* Section: Other Paying Projects */}
        {otherProjects.length > 0 && (
          <section className="mb-4">
            <ScrollReveal animation="flip-up" duration={600}>
              <div className="bento-category-header d-flex align-items-center justify-content-between p-3 mb-3 bg-slate-900 text-white border border-slate-800">
                <span className="fw-bold fs-6">Other Paying Listings</span>
              </div>
            </ScrollReveal>
            {otherProjects.map((project, idx) => (
              <ScrollReveal key={project.id} animation="fade-up" delay={idx * 80} duration={550}>
                <ProjectCard
                  project={project}
                  onNavigate={onNavigate}
                  onOpenReviewModal={onOpenReviewModal}
                  onOpenReportModal={onOpenReportModal}
                />
              </ScrollReveal>
            ))}
          </section>
        )}

        {/* Section: Not Paying / Scam List */}
        {notPayingProjects.length > 0 && (
          <section className="mb-4">
            <ScrollReveal animation="flip-up" duration={600}>
              <div className="bento-category-header d-flex align-items-center justify-content-between p-3 mb-3 scam-header-high-contrast rounded-3 blink-scam-alert">
                <span className="scam-title-text fs-6 d-flex align-items-center gap-2">
                  <i className="bi bi-slash-circle-fill fs-5 text-warning"></i> Not Paying & Scam Blacklist ({notPayingProjects.length})
                </span>
                <button
                  className="btn btn-sm btn-light text-danger fw-bold shadow-sm"
                  onClick={() => onNavigate('scams')}
                >
                  View Full Scam List
                </button>
              </div>
            </ScrollReveal>
            <div className="row g-2">
              {notPayingProjects.map((project, idx) => (
                <div key={project.id} className="col-12">
                  <ScrollReveal animation="fade-left" delay={idx * 80} duration={550}>
                    <ProjectCard
                      project={project}
                      onNavigate={onNavigate}
                      onOpenReviewModal={onOpenReviewModal}
                      onOpenReportModal={onOpenReportModal}
                    />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practical Guide Bento Card Banner */}
        <ScrollReveal animation="zoom-in" duration={650}>
          <div className="bento-card p-4 mt-5 border-start border-4 border-info">
            <h5 className="fw-bold text-info mb-2 d-flex align-items-center gap-2">
              <i className="bi bi-info-circle-fill"></i> High-Yield Investment Programs: A Practical Guide
            </h5>
            <p className="small text-slate-300 mb-0 leading-relaxed">
              High-yield investment programs (HYIPs) offer exceptional potential returns, often 1% to 10% daily or weekly. However, high rewards come with high operational risks and volatility. Always verify payment proofs, review daily batch transactions, check WHOIS creation dates, and never invest money you cannot afford to lose. <strong className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</strong> tracks live payment statuses 24/7 to safeguard your capital.
            </p>
          </div>
        </ScrollReveal>
      </div>
    );
  }
}

export default HomePage;

