import React, { Component } from 'react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchReviews,
  fetchReports,
  fetchAdvertisements,
  createAdvertisement,
  fetchSettings,
  updateSettings
} from '../services/api.js';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'projects',
      projects: [],
      pendingProjects: [],
      reviews: [],
      reports: [],
      ads: [],
      settings: {},
      loading: true,
      // Edit project modal state
      editingProject: null,
      showProjectModal: false,
      // Form fields
      projName: '',
      projUrl: '',
      projCategory: 'Class "Premium" (TOP Choices)',
      projStatus: 'PAYING',
      projMinDep: 10,
      projMaxDep: 10000,
      projRoi: 100,
      projDuration: '3% daily for 60 calendar days',
      projDesc: '',
      // Settings form
      siteName: '',
      supportEmail: '',
      announcementText: '',
      // Ad form
      adTitle: '',
      adImage: '',
      adLink: '',
      adPosition: 'Header Banner 728x90',
      successMsg: ''
    };
  }

  async componentDidMount() {
    this.loadAdminData();
  }

  loadAdminData = async () => {
    this.setState({ loading: true });
    try {
      const allProjs = await fetchProjects({ includePending: 'true' });
      const revs = await fetchReviews();
      const reps = await fetchReports();
      const advertisements = await fetchAdvertisements();
      const setts = await fetchSettings();

      const publishedProjs = allProjs.filter(p => p.approved !== false && p.status !== 'PENDING');
      const pendingProjs = allProjs.filter(p => p.approved === false || p.status === 'PENDING');

      this.setState({
        projects: publishedProjs,
        pendingProjects: pendingProjs,
        reviews: revs,
        reports: reps,
        ads: advertisements,
        settings: setts || {},
        siteName: setts ? setts.siteName : 'HYIP Monitor Pro',
        supportEmail: setts ? setts.supportEmail : 'admin@hyip.org',
        announcementText: setts ? setts.announcementText : '',
        loading: false
      });
    } catch (err) {
      console.error(err);
      this.setState({ loading: false });
    }
  };

  handleApproveProject = async (id, status = 'PAYING') => {
    try {
      const { approveProjectApi } = await import('../services/api.js');
      await approveProjectApi(id, status);
      this.setState({ successMsg: '✅ Project approved and published to public listings!' });
      this.loadAdminData();
      if (this.props.onDataChanged) this.props.onDataChanged();
    } catch (err) {
      alert('Error approving project: ' + err.message);
    }
  };

  handleOpenAddModal = () => {
    this.setState({
      editingProject: null,
      projName: '',
      projUrl: '',
      projCategory: 'Class "B" (Trial)',
      projStatus: 'PAYING',
      projMinDep: 10,
      projMaxDep: 10000,
      projRoi: 100,
      projDuration: '1% daily',
      projDesc: '',
      showProjectModal: true
    });
  };

  handleOpenEditModal = (p) => {
    this.setState({
      editingProject: p,
      projName: p.name,
      projUrl: p.url,
      projCategory: p.category,
      projStatus: p.status,
      projMinDep: p.minDeposit,
      projMaxDep: p.maxDeposit,
      projRoi: p.roi,
      projDuration: p.duration,
      projDesc: p.description,
      showProjectModal: true
    });
  };

  handleSaveProject = async (e) => {
    e.preventDefault();
    const { editingProject, projName, projUrl, projCategory, projStatus, projMinDep, projMaxDep, projRoi, projDuration, projDesc } = this.state;

    const payload = {
      name: projName,
      url: projUrl,
      category: projCategory,
      status: projStatus,
      minDeposit: parseFloat(projMinDep),
      maxDeposit: parseFloat(projMaxDep),
      roi: parseFloat(projRoi),
      duration: projDuration,
      description: projDesc
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, payload);
      } else {
        await createProject(payload);
      }
      this.setState({ showProjectModal: false, successMsg: 'Project saved successfully!' });
      this.loadAdminData();
      if (this.props.onDataChanged) this.props.onDataChanged();
    } catch (err) {
      alert('Error saving project: ' + err.message);
    }
  };

  handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        this.setState({ successMsg: 'Project deleted.' });
        this.loadAdminData();
        if (this.props.onDataChanged) this.props.onDataChanged();
      } catch (err) {
        alert('Error deleting: ' + err.message);
      }
    }
  };

  handleSaveSettings = async (e) => {
    e.preventDefault();
    const { siteName, supportEmail, announcementText } = this.state;
    try {
      await updateSettings({ siteName, supportEmail, announcementText });
      this.setState({ successMsg: 'Settings saved.' });
    } catch (err) {
      alert('Error saving settings');
    }
  };

  handleCreateAd = async (e) => {
    e.preventDefault();
    const { adTitle, adImage, adLink, adPosition } = this.state;
    if (!adTitle || !adLink) return;
    try {
      await createAdvertisement({ title: adTitle, imageUrl: adImage, linkUrl: adLink, position: adPosition });
      this.setState({ adTitle: '', adImage: '', adLink: '', successMsg: 'Ad banner created.' });
      this.loadAdminData();
    } catch (err) {
      alert('Error creating ad');
    }
  };

  render() {
    const { stats, isAdminAuthenticated, onOpenAdminModal, onLogoutAdmin } = this.props;

    if (!isAdminAuthenticated) {
      return (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="bento-card p-5 text-center shadow-2xl border border-warning border-opacity-40 rounded-4">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3 border border-warning border-opacity-30">
                  <i className="bi bi-shield-lock-fill text-warning fs-1"></i>
                </div>
                <h4 className="fw-bold text-white mb-2">Admin Portal Restricted</h4>
                <p className="text-slate-300 small mb-4 leading-relaxed">
                  Access to this administration control center requires master password authorization.
                </p>
                <button
                  onClick={onOpenAdminModal}
                  className="btn btn-warning text-dark fw-bold px-4 py-2 d-inline-flex align-items-center gap-2 shadow"
                >
                  <i className="bi bi-key-fill fs-5"></i> Enter Admin Password
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const {
      activeTab,
      projects = [],
      pendingProjects = [],
      reviews = [],
      reports = [],
      ads = [],
      loading,
      showProjectModal,
      editingProject,
      projName,
      projUrl,
      projCategory,
      projStatus,
      projMinDep,
      projMaxDep,
      projRoi,
      projDuration,
      projDesc,
      siteName,
      supportEmail,
      announcementText,
      adTitle,
      adImage,
      adLink,
      adPosition,
      successMsg
    } = this.state;

    return (
      <div className="container-fluid px-3 px-md-4 py-4">
        {/* Admin Header */}
        <div className="glass-panel p-4 mb-4 border-start border-4 border-warning">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div>
              <h3 className="fw-extrabold text-white mb-1 d-flex align-items-center gap-2">
                <i className="bi bi-speedometer2 text-warning fs-2"></i> HYIP Monitor Pro - Admin Panel
              </h3>
              <p className="text-muted small mb-0">
                Complete administration control center for projects, reviews, scam reports, ads, and settings.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-warning text-dark fw-bold fs-6 p-2">System Status: OPERATIONAL</span>
              {onLogoutAdmin && (
                <button
                  onClick={onLogoutAdmin}
                  className="btn btn-sm btn-outline-danger fw-bold d-flex align-items-center gap-1"
                  title="Exit Admin Session"
                >
                  <i className="bi bi-box-arrow-right"></i> Log Out
                </button>
              )}
            </div>
          </div>
        </div>

        {successMsg && <div className="alert alert-success alert-dismissible fade show p-2 mb-3">{successMsg}</div>}

        {/* Dashboard KPI Cards */}
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-6">
            <div className="glass-card p-3 border-start border-4 border-info">
              <div className="text-muted small">Total Projects</div>
              <div className="fs-3 fw-bold text-white">{projects.length}</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="glass-card p-3 border-start border-4 border-success">
              <div className="text-muted small">Paying Projects</div>
              <div className="fs-3 fw-bold text-success">{projects.filter(p => p.status === 'PAYING').length}</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="glass-card p-3 border-start border-4 border-danger">
              <div className="text-muted small">Scam / Not Paying</div>
              <div className="fs-3 fw-bold text-danger">{projects.filter(p => p.status === 'NOT PAYING' || p.status === 'SCAM').length}</div>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="glass-card p-3 border-start border-4 border-warning">
              <div className="text-muted small">Total Reviews</div>
              <div className="fs-3 fw-bold text-warning">{reviews.length}</div>
            </div>
          </div>
        </div>

        {/* Admin Subtabs */}
        <ul className="nav nav-tabs border-secondary mb-4">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'pending' ? 'active bg-slate-800 text-warning border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'pending' })}
            >
              <i className="bi bi-clock-history me-1"></i> Pending Approvals {pendingProjects.length > 0 && <span className="badge bg-warning text-dark ms-1">{pendingProjects.length}</span>}
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'projects' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'projects' })}
            >
              <i className="bi bi-folder-fill me-1"></i> Published Projects ({projects.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'reviews' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'reviews' })}
            >
              <i className="bi bi-star-fill me-1"></i> Reviews ({reviews.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'reports' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'reports' })}
            >
              <i className="bi bi-shield-exclamation me-1"></i> Scam Reports ({reports.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'ads' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'ads' })}
            >
              <i className="bi bi-card-image me-1"></i> Banners & Ads ({ads.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'settings' ? 'active bg-slate-800 text-info border-secondary' : 'text-slate-300'}`}
              onClick={() => this.setState({ activeTab: 'settings' })}
            >
              <i className="bi bi-gear-fill me-1"></i> Settings
            </button>
          </li>
        </ul>

        {/* TAB: PENDING APPROVALS */}
        {activeTab === 'pending' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 d-flex justify-content-between align-items-center py-3">
              <div>
                <h5 className="fw-bold text-warning mb-0">
                  <i className="bi bi-clock-history me-2"></i> User Submitted Projects Pending Admin Approval
                </h5>
                <span className="text-muted small">Submissions from public users require administrator verification before publishing.</span>
              </div>
              <span className="badge bg-warning text-dark fw-bold">{pendingProjects.length} Pending</span>
            </div>
            <div className="card-body p-0 table-responsive">
              {pendingProjects.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  <i className="bi bi-check-circle fs-2 text-success d-block mb-2"></i>
                  No pending project submissions! All projects are up to date.
                </div>
              ) : (
                <table className="table table-hyip mb-0 align-middle">
                  <thead>
                    <tr>
                      <th>Project Name & Domain</th>
                      <th>Category</th>
                      <th>Submitted Plan & ROI</th>
                      <th>Submitted Min Deposit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProjects.map((p) => (
                      <tr key={p.id}>
                        <td className="fw-bold text-white">
                          <img src={p.logo} alt="" className="rounded me-2" style={{ width: '28px', height: '28px', objectFit: 'cover' }} />
                          {p.name} <span className="text-muted small">({p.domain || p.url})</span>
                          {p.description && <div className="text-muted small fw-normal mt-1">{p.description.substring(0, 90)}...</div>}
                        </td>
                        <td className="small text-muted">{p.category}</td>
                        <td className="text-warning fw-bold">{p.roi}% ({p.duration})</td>
                        <td className="text-success fw-bold">${p.minDeposit}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-success fw-bold px-3"
                              onClick={() => this.handleApproveProject(p.id, 'PAYING')}
                            >
                              <i className="bi bi-check-circle-fill me-1"></i> Approve & Publish
                            </button>
                            <button
                              className="btn btn-sm btn-outline-info"
                              onClick={() => this.handleOpenEditModal(p)}
                            >
                              <i className="bi bi-pencil me-1"></i> Review
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => this.handleDeleteProject(p.id)}
                            >
                              <i className="bi bi-x-circle me-1"></i> Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 d-flex justify-content-between align-items-center py-3">
              <h5 className="fw-bold text-white mb-0">Projects Directory</h5>
              <button className="btn btn-sm btn-success fw-bold" onClick={this.handleOpenAddModal}>
                <i className="bi bi-plus-circle me-1"></i> + Add New Project
              </button>
            </div>
            <div className="card-body p-0 table-responsive">
              <table className="table table-hyip mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>ROI</th>
                    <th>Min Dep</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td className="fw-bold text-white">
                        <img src={p.logo} alt="" className="rounded me-2" style={{ width: '28px', height: '28px', objectFit: 'cover' }} />
                        {p.name} <span className="text-muted small">({p.domain})</span>
                      </td>
                      <td className="small text-muted">{p.category}</td>
                      <td>
                        <span className={`badge ${p.status === 'PAYING' ? 'badge-paying' : 'badge-notpaying'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-warning fw-bold">{p.roi}%</td>
                      <td className="text-success fw-bold">${p.minDeposit}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-info me-2" onClick={() => this.handleOpenEditModal(p)}>
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => this.handleDeleteProject(p.id)}>
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 fw-bold text-white">User Reviews Moderation</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {reviews.map((r) => (
                  <div key={r.id} className="p-3 bg-slate-950 border border-secondary rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-info">{r.name} ({r.country})</span>
                      <span className="text-warning fw-bold">★ {r.rating}/5</span>
                    </div>
                    <p className="small text-slate-200 mb-1">{r.reviewText}</p>
                    <div className="small text-muted">Amount: ${r.paymentAmount} | Wallet: {r.wallet || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SCAM REPORTS */}
        {activeTab === 'reports' && (
          <div className="card bg-slate-900 border-secondary">
            <div className="card-header bg-slate-800 fw-bold text-danger">Submitted Scam Evidence</div>
            <div className="card-body">
              <div className="d-flex flex-column gap-3">
                {reports.map((rep) => (
                  <div key={rep.id} className="p-3 bg-slate-950 border border-danger border-opacity-50 rounded">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <strong className="text-white">{rep.projectName}</strong>
                      <span className="badge bg-danger">Pending Investigation</span>
                    </div>
                    <p className="small text-slate-200 mb-1">{rep.reason}</p>
                    <div className="small text-muted">Reporter: {rep.reporterEmail} | Wallet: {rep.wallet}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="card bg-slate-900 border-secondary max-w-2xl">
            <div className="card-header bg-slate-800 fw-bold text-white">Site Configuration</div>
            <div className="card-body">
              <form onSubmit={this.handleSaveSettings}>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Site Title</label>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    value={siteName}
                    onChange={(e) => this.setState({ siteName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Support Email</label>
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    value={supportEmail}
                    onChange={(e) => this.setState({ supportEmail: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Announcement Text Banner</label>
                  <textarea
                    rows="3"
                    className="form-control bg-dark text-light border-secondary"
                    value={announcementText}
                    onChange={(e) => this.setState({ announcementText: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary fw-bold">Save Settings</button>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showProjectModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.75)', zIndex: 1060 }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content bg-slate-900 border-secondary text-light">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title fw-bold text-info">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => this.setState({ showProjectModal: false })}></button>
                </div>

                <form onSubmit={this.handleSaveProject}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Project Name</label>
                        <input
                          type="text"
                          className="form-control bg-dark text-light border-secondary"
                          value={projName}
                          onChange={(e) => this.setState({ projName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Website URL</label>
                        <input
                          type="url"
                          className="form-control bg-dark text-light border-secondary"
                          value={projUrl}
                          onChange={(e) => this.setState({ projUrl: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Category</label>
                        <select
                          className="form-select bg-dark text-light border-secondary"
                          value={projCategory}
                          onChange={(e) => this.setState({ projCategory: e.target.value })}
                        >
                          <option value='Class "Premium" (TOP Choices)'>Class "Premium" (TOP Choices)</option>
                          <option value='Class "A" (Top Performer)'>Class "A" (Top Performer)</option>
                          <option value='Class "B" (Trial)'>Class "B" (Trial)</option>
                          <option value='Not Paying / Scam'>Not Paying / Scam</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Status</label>
                        <select
                          className="form-select bg-dark text-light border-secondary"
                          value={projStatus}
                          onChange={(e) => this.setState({ projStatus: e.target.value })}
                        >
                          <option value="PAYING">PAYING</option>
                          <option value="WAITING">WAITING</option>
                          <option value="NOT PAYING">NOT PAYING</option>
                          <option value="SCAM">SCAM</option>
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Min Deposit ($)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-light border-secondary"
                          value={projMinDep}
                          onChange={(e) => this.setState({ projMinDep: e.target.value })}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Max Deposit ($)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-light border-secondary"
                          value={projMaxDep}
                          onChange={(e) => this.setState({ projMaxDep: e.target.value })}
                        />
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">ROI (%)</label>
                        <input
                          type="number"
                          className="form-control bg-dark text-light border-secondary"
                          value={projRoi}
                          onChange={(e) => this.setState({ projRoi: e.target.value })}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold">Description</label>
                        <textarea
                          rows="3"
                          className="form-control bg-dark text-light border-secondary"
                          value={projDesc}
                          onChange={(e) => this.setState({ projDesc: e.target.value })}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer border-secondary">
                    <button type="button" className="btn btn-secondary" onClick={() => this.setState({ showProjectModal: false })}>Cancel</button>
                    <button type="submit" className="btn btn-success fw-bold">Save Project</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdminDashboard;
