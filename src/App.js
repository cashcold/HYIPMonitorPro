import React, { Component } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ReviewModal from './components/ReviewModal.js';
import ReportModal from './components/ReportModal.js';
import CommunityChat from './components/CommunityChat.js';
import AdminLoginModal from './components/AdminLoginModal.js';

import HomePage from './pages/HomePage.js';
import ProjectDetailsPage from './pages/ProjectDetailsPage.js';
import LatestPayoutsPage from './pages/LatestPayoutsPage.js';
import LatestScamsPage from './pages/LatestScamsPage.js';
import SearchPage from './pages/SearchPage.js';
import AddProjectPage from './pages/AddProjectPage.js';
import AdminDashboard from './pages/AdminDashboard.js';
import { FAQPage, AboutPage, ContactPage, TermsPage, PrivacyPage } from './pages/StaticPages.js';

import { fetchProjects, fetchStats } from './services/api.js';

class App extends Component {
  constructor(props) {
    super(props);
    const savedTheme = localStorage.getItem('hyip_theme') || 'light';
    const savedAdminAuth = localStorage.getItem('hyip_admin_auth') === 'true';
    this.state = {
      currentView: 'home',
      theme: savedTheme,
      isAdminAuthenticated: savedAdminAuth,
      showAdminLoginModal: false,
      projects: [],
      stats: null,
      activeMembersCount: 14289,
      selectedProjectId: null,
      initialTab: 'summary',
      searchParams: {},
      reviewModalProject: null,
      reportModalProject: null,
      loading: true
    };
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    this.membersInterval = null;
  }

  componentDidMount() {
    this.loadInitialData();
    // Dynamic active members count incrementing live as soon as page opens
    this.membersInterval = setInterval(() => {
      this.setState(prevState => ({
        activeMembersCount: prevState.activeMembersCount + Math.floor(1 + Math.random() * 2)
      }));
    }, 3500);
  }

  componentWillUnmount() {
    if (this.membersInterval) clearInterval(this.membersInterval);
  }

  handleThemeChange = (newTheme) => {
    localStorage.setItem('hyip_theme', newTheme);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
    this.setState({ theme: newTheme });
  };

  loadInitialData = async () => {
    try {
      const [projs, statistics] = await Promise.all([
        fetchProjects(),
        fetchStats()
      ]);
      this.setState({
        projects: projs,
        stats: statistics,
        loading: false
      });
    } catch (err) {
      console.error('Error loading initial app data:', err);
      this.setState({ loading: false });
    }
  };

  handleNavigate = (view, params = {}) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if ((view === 'admin' || view === 'add-project') && !this.state.isAdminAuthenticated) {
      this.setState({
        showAdminLoginModal: true,
        pendingTargetView: view,
        selectedProjectId: params.id || null,
        initialTab: params.tab || 'summary',
        searchParams: params
      });
      return;
    }

    this.setState({
      currentView: view,
      selectedProjectId: params.id || null,
      initialTab: params.tab || 'summary',
      searchParams: params
    });
  };

  handleOpenAdminModal = () => {
    this.setState({ showAdminLoginModal: true });
  };

  handleCloseAdminModal = () => {
    this.setState({ showAdminLoginModal: false });
  };

  handleAdminLoginSuccess = () => {
    localStorage.setItem('hyip_admin_auth', 'true');
    const target = this.state.pendingTargetView || 'admin';
    this.setState({
      isAdminAuthenticated: true,
      showAdminLoginModal: false,
      currentView: target,
      pendingTargetView: null
    });
  };

  handleAdminLogout = () => {
    localStorage.removeItem('hyip_admin_auth');
    this.setState({
      isAdminAuthenticated: false,
      currentView: 'home'
    });
  };

  handleOpenReviewModal = (project) => {
    this.setState({ reviewModalProject: project });
  };

  handleCloseReviewModal = () => {
    this.setState({ reviewModalProject: null });
  };

  handleOpenReportModal = (project) => {
    this.setState({ reportModalProject: project });
  };

  handleCloseReportModal = () => {
    this.setState({ reportModalProject: null });
  };

  renderView() {
    const {
      currentView,
      projects,
      stats,
      selectedProjectId,
      initialTab,
      searchParams,
      loading
    } = this.state;

    if (loading) {
      return (
        <div className="container py-5 text-center">
          <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }} role="status"></div>
          <p className="mt-3 text-light fw-bold">Loading HYIP Monitor Pro...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <HomePage
            projects={projects}
            stats={stats}
            activeMembersCount={this.state.activeMembersCount}
            isAdminAuthenticated={this.state.isAdminAuthenticated}
            onNavigate={this.handleNavigate}
            onOpenReviewModal={this.handleOpenReviewModal}
            onOpenReportModal={this.handleOpenReportModal}
          />
        );

      case 'details':
        return (
          <ProjectDetailsPage
            projectId={selectedProjectId}
            initialTab={initialTab}
            onNavigate={this.handleNavigate}
            onOpenReviewModal={this.handleOpenReviewModal}
            onOpenReportModal={this.handleOpenReportModal}
          />
        );

      case 'scams':
        return (
          <LatestScamsPage
            onNavigate={this.handleNavigate}
            onOpenReportModal={this.handleOpenReportModal}
          />
        );

      case 'payouts':
        return (
          <LatestPayoutsPage
            onNavigate={this.handleNavigate}
          />
        );

      case 'search':
        return (
          <SearchPage
            projects={projects}
            searchParams={searchParams}
            onNavigate={this.handleNavigate}
            onOpenReviewModal={this.handleOpenReviewModal}
            onOpenReportModal={this.handleOpenReportModal}
          />
        );

      case 'add-project':
        return (
          <AddProjectPage
            isAdminAuthenticated={this.state.isAdminAuthenticated}
            onOpenAdminModal={this.handleOpenAdminModal}
            onNavigate={this.handleNavigate}
            onProjectAdded={this.loadInitialData}
          />
        );

      case 'admin':
        return (
          <AdminDashboard
            stats={stats}
            isAdminAuthenticated={this.state.isAdminAuthenticated}
            onOpenAdminModal={this.handleOpenAdminModal}
            onLogoutAdmin={this.handleAdminLogout}
            onNavigate={this.handleNavigate}
            onDataChanged={this.loadInitialData}
          />
        );

      case 'faq':
        return <FAQPage />;

      case 'about':
        return <AboutPage />;

      case 'contact':
        return <ContactPage />;

      case 'terms':
        return <TermsPage />;

      case 'privacy':
        return <PrivacyPage />;

      default:
        return (
          <HomePage
            projects={projects}
            stats={stats}
            activeMembersCount={this.state.activeMembersCount}
            isAdminAuthenticated={this.state.isAdminAuthenticated}
            onNavigate={this.handleNavigate}
            onOpenReviewModal={this.handleOpenReviewModal}
            onOpenReportModal={this.handleOpenReportModal}
          />
        );
    }
  }

  render() {
    const { currentView, reviewModalProject, reportModalProject, projects, showAdminLoginModal, isAdminAuthenticated } = this.state;

    return (
      <div className="d-flex flex-column min-vh-100 app-container">
        {/* Header Navigation */}
        <Header 
          onNavigate={this.handleNavigate} 
          currentView={currentView}
          currentTheme={this.state.theme}
          onThemeChange={this.handleThemeChange}
          isAdminAuthenticated={isAdminAuthenticated}
          onOpenAdminModal={this.handleOpenAdminModal}
          onLogoutAdmin={this.handleAdminLogout}
        />

        {/* Main Content Area */}
        <main className="flex-grow-1">
          {this.renderView()}
        </main>

        {/* Global Live Community Chat Widget */}
        <CommunityChat projects={projects} />

        {/* Footer */}
        <Footer 
          onNavigate={this.handleNavigate} 
          isAdminAuthenticated={isAdminAuthenticated}
          onOpenAdminModal={this.handleOpenAdminModal}
        />

        {/* Admin Portal Authentication Modal */}
        {showAdminLoginModal && (
          <AdminLoginModal
            onClose={this.handleCloseAdminModal}
            onSuccess={this.handleAdminLoginSuccess}
          />
        )}

        {/* Review Submission Modal */}
        {reviewModalProject && (
          <ReviewModal
            project={reviewModalProject}
            onClose={this.handleCloseReviewModal}
            onSuccess={this.loadInitialData}
          />
        )}

        {/* Scam Report Modal */}
        {reportModalProject && (
          <ReportModal
            project={reportModalProject}
            onClose={this.handleCloseReportModal}
            onSuccess={this.loadInitialData}
          />
        )}
      </div>
    );
  }
}

export default App;
