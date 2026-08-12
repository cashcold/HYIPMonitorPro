import React, { Component } from 'react';

export class FAQPage extends Component {
  render() {
    return (
      <div className="container py-4 max-w-4xl mx-auto">
        <div className="glass-panel p-4 mb-4 border-start border-4 border-info">
          <h3 className="fw-bold text-white mb-2">Frequently Asked Questions</h3>
          <p className="text-muted small mb-0">Learn how <strong className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</strong> tracks and verifies high-yield investment programs.</p>
        </div>

        <div className="accordion accordion-flush" id="faqAccordion">
          <div className="accordion-item bg-slate-900 border-secondary text-light mb-2 rounded">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed bg-slate-800 text-info fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                How does HYIPExplorer Pro determine if a program is PAYING?
              </button>
            </h2>
            <div id="faq1" className="accordion-collapse collapse p-3">
              We deposit our own real capital into listed programs. Our automated script and manual daily checking verify that withdrawal requests are processed on schedule to recipient wallets.
            </div>
          </div>

          <div className="accordion-item bg-slate-900 border-secondary text-light mb-2 rounded">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed bg-slate-800 text-info fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                What should I do if a program delays my withdrawal?
              </button>
            </h2>
            <div id="faq2" className="accordion-collapse collapse p-3">
              Use the "Report Scam" button on the project card to submit your wallet address and screenshot proof. If verified, the project status will be moved to NOT PAYING or SCAM to protect other investors.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class AboutPage extends Component {
  render() {
    return (
      <div className="container py-4 max-w-4xl mx-auto">
        <div className="glass-panel p-4">
          <h3 className="fw-bold text-white mb-3">About <span className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</span></h3>
          <p className="text-slate-300 lh-relaxed">
            Established in 2004 and updated for modern cryptocurrency protocols in 2026, <strong className="brand-hyipexplorer-glow text-info">HYIPExplorer Pro</strong> is the premier independent monitoring directory for high-yield online investments. We offer transparent transaction logging, domain infrastructure auditing, and community reviews.
          </p>
        </div>
      </div>
    );
  }
}

export class ContactPage extends Component {
  render() {
    return (
      <div className="container py-4 max-w-3xl mx-auto">
        <div className="glass-panel p-4">
          <h3 className="fw-bold text-white mb-3">Contact Support & Monitoring Team</h3>
          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <div className="mb-3">
              <label className="form-label text-slate-300">Your Email</label>
              <input type="email" className="form-control bg-dark text-light border-secondary" required />
            </div>
            <div className="mb-3">
              <label className="form-label text-slate-300">Subject</label>
              <input type="text" className="form-control bg-dark text-light border-secondary" required />
            </div>
            <div className="mb-3">
              <label className="form-label text-slate-300">Message</label>
              <textarea rows="4" className="form-control bg-dark text-light border-secondary" required></textarea>
            </div>
            <button type="submit" className="btn btn-info fw-bold">Send Message</button>
          </form>
        </div>
      </div>
    );
  }
}

export class TermsPage extends Component {
  render() {
    return (
      <div className="container py-4 max-w-4xl mx-auto">
        <div className="glass-panel p-4">
          <h3 className="fw-bold text-white mb-3">Terms of Service</h3>
          <p className="text-slate-300 small">
            By using HYIPExplorer Pro, you acknowledge that all high-yield investment programs carry inherent financial risks. Information on this site is provided for monitoring purposes only.
          </p>
        </div>
      </div>
    );
  }
}

export class PrivacyPage extends Component {
  render() {
    return (
      <div className="container py-4 max-w-4xl mx-auto">
        <div className="glass-panel p-4">
          <h3 className="fw-bold text-white mb-3">Privacy Policy</h3>
          <p className="text-slate-300 small">
            We do not sell user data. Wallet information provided in review proofs is displayed publicly to verify transaction authenticities.
          </p>
        </div>
      </div>
    );
  }
}
