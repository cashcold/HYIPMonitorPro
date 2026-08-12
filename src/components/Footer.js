import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { onNavigate, onOpenAdminModal, isAdminAuthenticated } = this.props;

    return (
      <footer className="mt-5 border-top border-slate-800 bg-slate-950 text-slate-400 py-4" style={{ background: '#0a0f1d' }}>
        <div className="container-fluid px-4">
          <div className="row g-4 mb-4">
            {/* Brand column */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-shield-lock-fill text-info fs-3"></i>
                <span className="fw-bold fs-5 text-white brand-hyipexplorer-glow">
                  HYIP<span className="text-info">Explorer</span> <span className="badge bg-primary text-uppercase fs-6 brand-pro-badge-blink">Pro</span>
                </span>
              </div>
              <p className="small text-muted mb-3">
                <strong className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</strong> is a trusted associate in the high-yield investment program space and the premier monitoring service, providing reliable daily payment verification, scam alerts, and unbiased evaluations.
              </p>
              <div className="d-flex gap-2">
                <a href="https://chat.whatsapp.com/KJ1R8WcP2yk3jtcxym1nsS?s=cl&p=a&ilr=1" target="_blank" rel="noreferrer" className="btn btn-sm btn-dark text-success border-success">
                  <i className="bi bi-whatsapp"></i> WhatsApp Group
                </a>
                <button onClick={() => onNavigate('contact')} className="btn btn-sm btn-dark text-light border-secondary">
                  <i className="bi bi-envelope-fill"></i> Contact Support
                </button>
              </div>
            </div>

            {/* Navigation links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="text-white fw-bold mb-3">Quick Navigation</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><button onClick={() => onNavigate('home')} className="btn btn-link p-0 text-muted text-decoration-none">Home Monitoring</button></li>
                <li><button onClick={() => onNavigate('scams')} className="btn btn-link p-0 text-muted text-decoration-none">Latest Scams</button></li>
                {isAdminAuthenticated && (
                  <li><button onClick={() => onNavigate('add-project')} className="btn btn-link p-0 text-muted text-decoration-none">+ Add Project (Admin)</button></li>
                )}
                <li>
                  <button 
                    onClick={() => isAdminAuthenticated ? onNavigate('admin') : (onOpenAdminModal ? onOpenAdminModal() : onNavigate('admin'))} 
                    className="btn btn-link p-0 text-warning text-decoration-none d-flex align-items-center gap-1 fw-bold"
                  >
                    <i className="bi bi-shield-lock-fill"></i> Admin Portal
                  </button>
                </li>
              </ul>
            </div>

            {/* Information links */}
            <div className="col-lg-2 col-md-6">
              <h6 className="text-white fw-bold mb-3">Information</h6>
              <ul className="list-unstyled small d-flex flex-column gap-2">
                <li><button onClick={() => onNavigate('about')} className="btn btn-link p-0 text-muted text-decoration-none">About Us</button></li>
                <li><button onClick={() => onNavigate('faq')} className="btn btn-link p-0 text-muted text-decoration-none">FAQ & Guidance</button></li>
                <li><button onClick={() => onNavigate('terms')} className="btn btn-link p-0 text-muted text-decoration-none">Terms of Service</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="btn btn-link p-0 text-muted text-decoration-none">Privacy Policy</button></li>
              </ul>
            </div>

            {/* Payment Processors */}
            <div className="col-lg-4 col-md-6">
              <h6 className="text-white fw-bold mb-3">Supported Processors</h6>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="badge bg-secondary p-2"><i className="bi bi-currency-bitcoin me-1 text-warning"></i> Bitcoin</span>
                <span className="badge bg-secondary p-2"><i className="bi bi-[#38bdf8] bi-coin me-1 text-info"></i> USDT (TRC20/ERC20)</span>
                <span className="badge bg-secondary p-2"><i className="bi bi-currency-ethereum me-1 text-primary"></i> Ethereum</span>
                <span className="badge bg-secondary p-2"><i className="bi bi-bank me-1 text-success"></i> PerfectMoney</span>
                <span className="badge bg-secondary p-2"><i className="bi bi-wallet2 me-1 text-danger"></i> Payeer</span>
                <span className="badge bg-secondary p-2"><i className="bi bi-lightning-fill me-1 text-warning"></i> Litecoin</span>
              </div>
              <p className="small text-muted">
                All daily payouts tracked automatically and manually verified 24/7.
              </p>
            </div>
          </div>

          {/* Legal Risk Disclaimer Banner */}
          <div className="p-3 bg-dark rounded border border-danger border-opacity-25 mb-4">
            <p className="small text-muted mb-0" style={{ fontSize: '0.78rem' }}>
              <strong className="text-danger">Disclaimer:</strong> We do not promote or endorse any HYIP programs or investment projects listed here. The materials and information provided by HYIPExplorer Pro are for general information purposes only. Some high-yield programs may carry extreme financial risk and could be illegal depending on your country's laws. Do not invest what you cannot afford to lose!
            </p>
          </div>

          {/* Bottom Copyright */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25 text-center text-sm-start">
            <span className="small text-muted">
              © 2004-2026 <strong>HYIPExplorer Pro</strong>. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
