import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      serverTime: new Date().toUTCString(),
      dropdownOpen: false,
      themeDropdownOpen: false
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ serverTime: new Date().toUTCString() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchQuery.trim()) {
      this.props.onNavigate('search', { query: this.state.searchQuery });
    }
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({ dropdownOpen: !prevState.dropdownOpen, themeDropdownOpen: false }));
  };

  toggleThemeDropdown = () => {
    this.setState((prevState) => ({ themeDropdownOpen: !prevState.themeDropdownOpen, dropdownOpen: false }));
  };

  selectTheme = (themeKey) => {
    this.setState({ themeDropdownOpen: false });
    if (this.props.onThemeChange) {
      this.props.onThemeChange(themeKey);
    }
  };

  render() {
    const { onNavigate, currentView, currentTheme = 'dark', isAdminAuthenticated, onOpenAdminModal, onLogoutAdmin } = this.props;
    const { searchQuery, serverTime, dropdownOpen, themeDropdownOpen } = this.state;

    const themeNames = {
      dark: { name: 'Bento Dark', icon: 'bi-moon-stars-fill', color: 'text-info' },
      light: { name: 'Clean Light', icon: 'bi-sun-fill', color: 'text-warning' },
      emerald: { name: 'Emerald Crypto', icon: 'bi-emerald-fill bi-gem', color: 'text-success' },
      cyber: { name: 'Cyber Neon', icon: 'bi-cpu-fill', color: 'text-primary' },
      gold: { name: 'Gold Luxury', icon: 'bi-crown-fill', color: 'text-warning' }
    };

    return (
      <header className="sticky-top shadow-lg" style={{ zIndex: 1040 }}>
        {/* Top Server Time & Info Bar */}
        <div className="server-time-bar py-1 px-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div className="d-flex align-items-center gap-3">
            <span className="text-success fw-bold d-flex align-items-center gap-1">
              <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '8px', height: '8px' }}></span>
              Server Time: <span className="text-light ms-1 font-monospace">{serverTime}</span>
            </span>
          </div>

          {/* Quick Theme Switcher Pills */}
          <div className="d-flex align-items-center gap-1 flex-wrap">
            <span className="text-muted small me-1 d-none d-sm-inline fw-semibold" style={{ fontSize: '0.75rem' }}>Theme:</span>
            <button
              className={`btn btn-xs px-2 py-0 border rounded-pill ${currentTheme === 'dark' ? 'btn-info text-dark fw-bold' : 'btn-outline-info'}`}
              onClick={() => this.selectTheme('dark')}
              style={{ fontSize: '0.72rem' }}
              title="Bento Dark Theme"
            >
              <i className="bi bi-moon-stars-fill me-1"></i> Dark
            </button>
            <button
              className={`btn btn-xs px-2 py-0 border rounded-pill ${currentTheme === 'light' ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
              onClick={() => this.selectTheme('light')}
              style={{ fontSize: '0.72rem' }}
              title="Clean Light Theme"
            >
              <i className="bi bi-sun-fill me-1"></i> Light
            </button>
            <button
              className={`btn btn-xs px-2 py-0 border rounded-pill ${currentTheme === 'emerald' ? 'btn-success text-dark fw-bold' : 'btn-outline-success'}`}
              onClick={() => this.selectTheme('emerald')}
              style={{ fontSize: '0.72rem' }}
              title="Emerald Crypto Theme"
            >
              <i className="bi bi-gem me-1"></i> Emerald
            </button>
            <button
              className={`btn btn-xs px-2 py-0 border rounded-pill ${currentTheme === 'cyber' ? 'btn-primary text-white fw-bold' : 'btn-outline-primary'}`}
              onClick={() => this.selectTheme('cyber')}
              style={{ fontSize: '0.72rem' }}
              title="Cyber Neon Theme"
            >
              <i className="bi bi-cpu-fill me-1"></i> Cyber
            </button>
            <button
              className={`btn btn-xs px-2 py-0 border rounded-pill ${currentTheme === 'gold' ? 'btn-warning text-dark fw-bold' : 'btn-outline-warning'}`}
              onClick={() => this.selectTheme('gold')}
              style={{ fontSize: '0.72rem' }}
              title="Gold Luxury Theme"
            >
              <i className="bi bi-crown-fill me-1"></i> Gold
            </button>
          </div>

          <div className="d-flex align-items-center gap-3">
             <a
                href="https://t.me/hyipexplorerpro"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded bg-[#0088cc] hover:bg-[#0077b5] text-white cursor-pointer transition-colors shadow-xs"
                title="Contact Support on Telegram"
              >
                <Send className="w-3 h-3 -rotate-45" />
                <span className="hidden sm:inline">Telegram</span>
              </a>
            <span className="text-muted">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="btn btn-link p-0 text-light text-decoration-none small"
            >
              <i className="bi bi-envelope"></i> Support
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="navbar navbar-expand-lg border-bottom py-2 px-3">
          <div className="container-fluid px-0">
            {/* Logo */}
            <div
              className="navbar-brand d-flex align-items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('home')}
              style={{ cursor: 'pointer' }}
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-2 rounded-3 text-white d-flex align-items-center justify-content-center shadow" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-[#38bdf8] bi-shield-lock-fill fs-4"></i>
              </div>
              <div>
                <span className="fw-extrabold fs-4 text-white tracking-wider brand-hyipexplorer-glow">
                  HYIP<span className="text-info">Explorer</span> <span className="badge bg-primary text-uppercase fs-6 brand-pro-badge-blink">Pro</span>
                </span>
                <div className="text-muted small" style={{ fontSize: '0.68rem', marginTop: '-4px' }}>
                  Trusted Investment Monitoring Platform
                </div>
              </div>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMain"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Menu */}
            <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-1">
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${currentView === 'home' ? 'active text-info fw-bold' : 'text-light'}`}
                    onClick={() => onNavigate('home')}
                  >
                    <i className="bi bi-house-door me-1"></i> Home
                  </button>
                </li>

                {/* Projects Dropdown */}
                <li className="nav-item dropdown position-relative">
                  <button
                    className="nav-link btn btn-link text-decoration-none text-light dropdown-toggle d-flex align-items-center gap-1"
                    type="button"
                    onClick={this.toggleDropdown}
                  >
                    <i className="bi bi-grid-3x3-gap me-1"></i> Projects
                  </button>

                  {dropdownOpen && (
                    <ul className="dropdown-menu dropdown-menu-dark show position-absolute shadow-lg border-secondary mt-1" style={{ minWidth: '200px' }}>
                      <li>
                        <button className="dropdown-menu-item btn btn-link w-100 text-start text-light text-decoration-none px-3 py-2 border-bottom border-secondary" onClick={() => { this.setState({ dropdownOpen: false }); onNavigate('search', { status: 'PAYING' }); }}>
                          <span className="badge badge-paying me-2">PAYING</span> Paying Projects
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-menu-item btn btn-link w-100 text-start text-light text-decoration-none px-3 py-2 border-bottom border-secondary" onClick={() => { this.setState({ dropdownOpen: false }); onNavigate('search', { category: 'Premium' }); }}>
                          <span className="badge badge-featured me-2">PREMIUM</span> Premium Choices
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-menu-item btn btn-link w-100 text-start text-light text-decoration-none px-3 py-2 border-bottom border-secondary" onClick={() => { this.setState({ dropdownOpen: false }); onNavigate('search', { sort: 'newest' }); }}>
                          <span className="badge badge-new me-2">NEW</span> New Listings
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-menu-item btn btn-link w-100 text-start text-light text-decoration-none px-3 py-2" onClick={() => { this.setState({ dropdownOpen: false }); onNavigate('scams'); }}>
                          <span className="badge badge-scam me-2">SCAM</span> Scam / Not Paying
                        </button>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-decoration-none ${currentView === 'scams' ? 'active text-danger fw-bold' : 'text-light'}`}
                    onClick={() => onNavigate('scams')}
                  >
                    <i className="bi bi-exclamation-triangle me-1"></i> Scam List
                  </button>
                </li>
              </ul>

              {/* Search Bar */}
              <form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={this.handleSearchSubmit}>
                <div className="input-group input-group-sm" style={{ width: '240px' }}>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Search project name or domain..."
                    value={searchQuery}
                    onChange={this.handleSearchChange}
                  />
                  <button className="btn btn-outline-info" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>

              {/* Header Action Buttons */}
              <div className="d-flex align-items-center gap-2">
                {/* Theme Selector Dropdown */}
                <div className="dropdown position-relative">
                  <button
                    className="btn btn-sm btn-outline-info fw-bold d-flex align-items-center gap-1 dropdown-toggle"
                    type="button"
                    onClick={this.toggleThemeDropdown}
                    title="Change Theme"
                  >
                    <i className={`bi ${themeNames[currentTheme]?.icon || 'bi-palette-fill'}`}></i>
                    <span className="d-none d-xl-inline">{themeNames[currentTheme]?.name || 'Theme'}</span>
                  </button>

                  {themeDropdownOpen && (
                    <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end show position-absolute shadow-lg border-slate-700 mt-1 py-1" style={{ minWidth: '180px', zIndex: 1050 }}>
                      <li className="dropdown-header text-info text-uppercase fw-bold" style={{ fontSize: '0.65rem' }}>
                        Select App Theme
                      </li>
                      <li>
                        <button
                          className={`dropdown-item btn btn-link w-100 text-start text-decoration-none px-3 py-1-5 d-flex align-items-center justify-content-between ${currentTheme === 'dark' ? 'active fw-bold' : ''}`}
                          onClick={() => this.selectTheme('dark')}
                        >
                          <span><i className="bi bi-moon-stars-fill text-info me-2"></i> Bento Dark</span>
                          {currentTheme === 'dark' && <i className="bi bi-check2 text-info"></i>}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`dropdown-item btn btn-link w-100 text-start text-decoration-none px-3 py-1-5 d-flex align-items-center justify-content-between ${currentTheme === 'light' ? 'active fw-bold' : ''}`}
                          onClick={() => this.selectTheme('light')}
                        >
                          <span><i className="bi bi-sun-fill text-warning me-2"></i> Clean Light</span>
                          {currentTheme === 'light' && <i className="bi bi-check2 text-warning"></i>}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`dropdown-item btn btn-link w-100 text-start text-decoration-none px-3 py-1-5 d-flex align-items-center justify-content-between ${currentTheme === 'emerald' ? 'active fw-bold' : ''}`}
                          onClick={() => this.selectTheme('emerald')}
                        >
                          <span><i className="bi bi-gem text-success me-2"></i> Emerald Crypto</span>
                          {currentTheme === 'emerald' && <i className="bi bi-check2 text-success"></i>}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`dropdown-item btn btn-link w-100 text-start text-decoration-none px-3 py-1-5 d-flex align-items-center justify-content-between ${currentTheme === 'cyber' ? 'active fw-bold' : ''}`}
                          onClick={() => this.selectTheme('cyber')}
                        >
                          <span><i className="bi bi-cpu-fill text-primary me-2"></i> Cyber Neon</span>
                          {currentTheme === 'cyber' && <i className="bi bi-check2 text-primary"></i>}
                        </button>
                      </li>
                      <li>
                        <button
                          className={`dropdown-item btn btn-link w-100 text-start text-decoration-none px-3 py-1-5 d-flex align-items-center justify-content-between ${currentTheme === 'gold' ? 'active fw-bold' : ''}`}
                          onClick={() => this.selectTheme('gold')}
                        >
                          <span><i className="bi bi-crown-fill text-warning me-2"></i> Gold Luxury</span>
                          {currentTheme === 'gold' && <i className="bi bi-check2 text-warning"></i>}
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

                {isAdminAuthenticated && (
                  <button
                    onClick={() => onNavigate('add-project')}
                    className="btn btn-sm btn-outline-success fw-bold d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-circle-fill"></i> Add Project
                  </button>
                )}

                {isAdminAuthenticated ? (
                  <div className="btn-group">
                    <button
                      onClick={() => onNavigate('admin')}
                      className={`btn btn-sm ${currentView === 'admin' ? 'btn-primary' : 'btn-warning'} text-dark fw-bold d-flex align-items-center gap-1`}
                    >
                      <i className="bi bi-shield-check"></i> Admin Panel
                    </button>
                    <button
                      onClick={onLogoutAdmin}
                      className="btn btn-sm btn-outline-danger fw-bold"
                      title="Log Out of Admin Portal"
                    >
                      <i className="bi bi-box-arrow-right"></i>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onOpenAdminModal}
                    className="btn btn-sm btn-outline-warning fw-bold d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-shield-lock-fill"></i> Admin Portal
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
