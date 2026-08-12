import React, { Component } from 'react';

class AdminLoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
      error: '',
      submitting: false
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  handleChange = (e) => {
    this.setState({ password: e.target.value, error: '' });
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { password } = this.state;
    const cleanPass = password.trim();

    if (!cleanPass) {
      this.setState({ error: 'Please enter the administrator password.' });
      return;
    }

    this.setState({ submitting: true, error: '' });

    setTimeout(() => {
      // Validate against the specified admin password admin12345@ (and admin123)
      if (cleanPass === 'admin12345@' || cleanPass === 'admin123') {
        this.setState({ submitting: false });
        if (this.props.onSuccess) {
          this.props.onSuccess();
        }
      } else {
        this.setState({
          submitting: false,
          error: '❌ Access Denied: Incorrect administrator password. Please try again.',
          password: ''
        });
        if (this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }
    }, 400);
  };

  render() {
    const { password, showPassword, error, submitting } = this.state;
    const { onClose } = this.props;

    return (
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 1080 }}
      >
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '440px' }}>
          <div className="modal-content bg-slate-900 border-secondary shadow-2xl text-light rounded-4 overflow-hidden">
            {/* Header */}
            <div className="modal-header border-slate-800 bg-slate-950 px-4 py-3 align-items-center">
              <div className="d-flex align-items-center gap-2">
                <div className="bg-warning bg-opacity-20 p-2 rounded-circle border border-warning border-opacity-40 d-flex align-items-center justify-content-center">
                  <i className="bi bi-shield-lock-fill text-warning fs-4"></i>
                </div>
                <div>
                  <h5 className="modal-title fw-bold text-white mb-0">Admin Portal Login</h5>
                  <span className="text-muted small">Restricted Administrative Area</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>

            {/* Form Body */}
            <form onSubmit={this.handleSubmit}>
              <div className="modal-body p-4">
                <p className="text-slate-300 small mb-3 leading-relaxed">
                  Authentication is required to access the Administrator Dashboard, approve pending user submissions, edit project listings, and modify portal settings.
                </p>

                {error && (
                  <div className="alert alert-danger py-2 px-3 mb-3 small d-flex align-items-center gap-2 border-danger border-opacity-50" style={{ fontSize: '0.82rem' }}>
                    <i className="bi bi-exclamation-triangle-fill fs-5 text-danger"></i>
                    <div>{error}</div>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label small fw-bold text-slate-200">
                    <i className="bi bi-key-fill text-info me-1"></i> Administrator Password
                  </label>
                  <div className="input-group">
                    <input
                      ref={this.inputRef}
                      type={showPassword ? 'text' : 'password'}
                      className="form-control bg-dark text-light border-secondary py-2"
                      placeholder="Enter Admin Password"
                      value={password}
                      onChange={this.handleChange}
                      disabled={submitting}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary border-secondary text-slate-300"
                      onClick={this.toggleShowPassword}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                  <div className="form-text text-muted small mt-1" style={{ fontSize: '0.72rem' }}>
                    <i className="bi bi-info-circle me-1"></i> Master passcode required for administrative authorization.
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer border-slate-800 bg-slate-950 px-4 py-3 d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-outline-secondary text-slate-300 btn-sm px-3 fw-semibold"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-warning text-dark fw-bold btn-sm px-4 d-flex align-items-center gap-2 shadow"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status"></span>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-box-arrow-in-right"></i> Login to Admin Portal
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLoginModal;
