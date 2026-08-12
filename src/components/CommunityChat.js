import React, { Component } from 'react';

class CommunityChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      userName: localStorage.getItem('hyip_chat_user') || 'CryptoInvestor_' + Math.floor(1000 + Math.random() * 9000),
      inputText: '',
      selectedProject: '',
      isOpen: false,
      unreadCount: 0,
      isMuted: false
    };

    this.chatEndRef = React.createRef();
    this.timer = null;
    this.audioCtx = null;
  }

  componentDidMount() {
    this.seedInitialMessages();
    // Periodically add simulated investor messages to create active chatter around paying sites
    this.timer = setInterval(this.addSimulatedMessage, 6000);
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.messages.length !== this.state.messages.length) {
      this.scrollToBottom();
    }
  }

  playNotificationSound = () => {
    if (this.state.isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtx();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5 note

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (err) {
      // Quietly ignore audio errors if blocked by browser policy before interaction
    }
  };

  toggleSound = () => {
    this.setState((prevState) => ({ isMuted: !prevState.isMuted }));
  };

  scrollToBottom = () => {
    if (this.chatEndRef.current) {
      this.chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  seedInitialMessages = () => {
    const paying = this.getPayingProjects();
    const p1 = paying[0] ? paying[0].name : 'VaultMax';
    const p2 = paying[1] ? paying[1].name : 'CryptoGain';
    const p3 = paying[2] ? paying[2].name : 'QuantumPay';

    const initial = [
      {
        id: 'msg_1',
        user: 'Satoshi_Whale',
        badge: 'VIP Investor',
        badgeColor: 'bg-warning text-dark',
        text: `Just received $320.00 instant payout from ${p1}! TRC20 wallet confirmed in 45s. 🚀`,
        project: p1,
        time: '3m ago',
        isUser: false
      },
      {
        id: 'msg_2',
        user: 'Elena_DeFi',
        badge: 'Pro Trader',
        badgeColor: 'bg-info text-dark',
        text: `Can anyone confirm if ${p2} is still instant on withdrawals?`,
        project: p2,
        time: '2m ago',
        isUser: false
      },
      {
        id: 'msg_3',
        user: 'Alex_Investor',
        badge: 'Verified',
        badgeColor: 'bg-success text-white',
        text: `Yes Elena! Just got my $85.50 profit from ${p2} via LTC. Monitor stats are 100% accurate.`,
        project: p2,
        time: '1m ago',
        isUser: false
      },
      {
        id: 'msg_4',
        user: 'Mark_Crypto',
        badge: 'Whale',
        badgeColor: 'bg-primary text-white',
        text: `Added $1,500 to ${p3}. Daily 3.5% plan running strong. Thanks admin!`,
        project: p3,
        time: 'Just now',
        isUser: false
      }
    ];

    this.setState({ messages: initial });
  };

  getPayingProjects = () => {
    const { projects } = this.props;
    if (!projects || projects.length === 0) {
      return [
        { name: 'VaultMax', domain: 'vaultmax.io' },
        { name: 'CryptoGain', domain: 'cryptogain.biz' },
        { name: 'QuantumPay', domain: 'quantumpay.net' }
      ];
    }
    const filtered = projects.filter(p => p.status === 'PAYING');
    return filtered.length > 0 ? filtered : projects.slice(0, 5);
  };

  addSimulatedMessage = () => {
    const paying = this.getPayingProjects();
    const randomProj = paying[Math.floor(Math.random() * paying.length)];
    const projName = randomProj ? randomProj.name : 'VaultMax';

    const users = [
      { name: 'CryptoWhale_88', badge: 'VIP Investor', color: 'bg-warning text-dark' },
      { name: 'David_Trader', badge: 'Verified', color: 'bg-success text-white' },
      { name: 'Sergei_HYIP', badge: 'Pro Monitor', color: 'bg-info text-dark' },
      { name: 'Elena_Crypto', badge: 'Investor', color: 'bg-secondary text-white' },
      { name: 'Satoshi_Fan', badge: 'VIP Member', color: 'bg-primary text-white' }
    ];

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const amounts = ['$45.00', '$120.00', '$250.00', '$80.50', '$500.00', '$65.00', '$310.00'];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    const cryptos = ['USDT-TRC20', 'Bitcoin', 'Litecoin', 'Ethereum', 'ePayCore'];
    const randomCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];

    const messageTemplates = [
      `Instant withdrawal of ${randomAmount} received from ${projName} (${randomCrypto})! Smooth as butter. 🔥`,
      `Proof #${Math.floor(Math.random() * 80 + 10)} from ${projName}: ${randomAmount} arrived in my wallet. Still 100% paying!`,
      `Checking payout speed on ${projName}... Confirmed! Got ${randomAmount} in less than 1 minute.`,
      `Just upgraded my active plan on ${projName}. Reinvested ${randomAmount} for another cycle.`,
      `HYIP Monitor status for ${projName} is spot on. Paid ${randomAmount} without fees. Thanks!`
    ];

    const randomText = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];

    const newMsg = {
      id: 'msg_' + Date.now(),
      user: randomUser.name,
      badge: randomUser.badge,
      badgeColor: randomUser.color,
      text: randomText,
      project: projName,
      time: 'Just now',
      isUser: false
    };

    this.playNotificationSound();

    this.setState((prevState) => {
      const updated = [...prevState.messages, newMsg];
      // keep last 50 messages
      const sliced = updated.slice(-50);
      return {
        messages: sliced,
        unreadCount: !prevState.isOpen ? prevState.unreadCount + 1 : 0
      };
    });
  };

  handleSendMessage = (e) => {
    e.preventDefault();
    const { inputText, userName, selectedProject } = this.state;
    if (!inputText.trim()) return;

    localStorage.setItem('hyip_chat_user', userName);

    const userMsg = {
      id: 'usr_msg_' + Date.now(),
      user: userName || 'You',
      badge: 'YOU',
      badgeColor: 'bg-info text-dark fw-bold',
      text: inputText.trim(),
      project: selectedProject || null,
      time: 'Just now',
      isUser: true
    };

    this.playNotificationSound();

    this.setState((prevState) => ({
      messages: [...prevState.messages, userMsg],
      inputText: ''
    }));
  };

  toggleWidget = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
      unreadCount: 0
    }));
  };

  render() {
    const { messages, userName, inputText, selectedProject, isOpen, unreadCount, isMuted } = this.state;
    const payingProjects = this.getPayingProjects();

    return (
      <>
        {/* Floating Chat Launcher Button (Bottom Right) */}
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1050 }}>
          <button
            onClick={this.toggleWidget}
            className="btn btn-info shadow-lg rounded-circle p-0 d-flex align-items-center justify-content-center position-relative"
            style={{ width: '58px', height: '58px', border: '2px solid rgba(255,255,255,0.3)' }}
            title="Open Live Investor Community Chat"
          >
            <i className={`bi ${isOpen ? 'bi-x-lg fs-4' : 'bi-chat-dots-fill fs-4'} text-dark`}></i>
            {!isOpen && unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow">
                {unreadCount}
              </span>
            )}
            {!isOpen && unreadCount === 0 && (
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                <span className="visually-hidden">Live</span>
              </span>
            )}
          </button>
        </div>

        {/* Embedded Card View or Floating Modal Drawer */}
        <div
          className={`bento-card overflow-hidden shadow-2xl transition-all duration-300 ${isOpen ? 'd-block' : 'd-none'}`}
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '24px',
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 120px)',
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(56, 189, 248, 0.4)'
          }}
        >
          {/* Chat Header */}
          <div className="p-3 bg-slate-900 border-bottom border-slate-800 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className="spinner-grow spinner-grow-sm text-success" style={{ width: '10px', height: '10px' }}></span>
              <h6 className="fw-bold text-white mb-0 d-flex align-items-center gap-1">
                <i className="bi bi-chat-quote-fill text-info me-1"></i> Live Investor Chat
              </h6>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-sm btn-dark border border-slate-700 py-0 px-2 me-1 text-light"
                onClick={this.toggleSound}
                title={isMuted ? 'Unmute chat sounds' : 'Mute chat sounds'}
                style={{ fontSize: '0.75rem' }}
              >
                <i className={`bi ${isMuted ? 'bi-volume-mute-fill text-danger' : 'bi-volume-up-fill text-info'} me-1`}></i>
                {isMuted ? 'Muted' : 'Sound'}
              </button>
              <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded-pill small">
                {messages.length + 120} online
              </span>
              <button onClick={this.toggleWidget} className="btn-close btn-close-white btn-sm ms-1"></button>
            </div>
          </div>

          {/* User Display Name Header */}
          <div className="px-3 py-2 bg-slate-950 border-bottom border-slate-800 d-flex align-items-center justify-content-between">
            <span className="text-muted small">Chatting as:</span>
            <input
              type="text"
              className="form-control form-control-sm bg-dark text-info border-secondary py-0 px-2 fw-bold"
              style={{ width: '170px', fontSize: '0.75rem' }}
              value={userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
              placeholder="Your Nickname"
            />
          </div>

          {/* Messages Stream */}
          <div className="p-3 flex-grow-1 overflow-y-auto" style={{ background: 'rgba(9, 13, 22, 0.95)' }}>
            <div className="alert alert-info py-1 px-2 mb-3 small" style={{ fontSize: '0.72rem' }}>
              <i className="bi bi-shield-check me-1"></i>
              Real-time community discussions on paying sites. Be respectful!
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`mb-3 d-flex ${msg.isUser ? 'justify-content-end' : 'justify-content-start'}`}>
                <div style={{ maxWidth: '88%' }}>
                  <div className={`d-flex align-items-center gap-1 mb-1 ${msg.isUser ? 'justify-content-end' : ''}`}>
                    <span className="fw-bold text-info small" style={{ fontSize: '0.78rem' }}>
                      <i className="bi bi-person-fill me-1 opacity-75" style={{ fontSize: '0.72rem' }}></i>
                      {msg.user}
                    </span>
                    <span className={`badge ${msg.badgeColor}`} style={{ fontSize: '0.62rem' }}>{msg.badge}</span>
                    <span className="text-muted ms-1" style={{ fontSize: '0.65rem' }}>{msg.time}</span>
                  </div>

                  <div
                    className={`p-2 rounded-3 text-light small ${
                      msg.isUser
                        ? 'bg-info bg-opacity-20 border border-info border-opacity-40 text-end'
                        : 'bento-box-inner border border-slate-800'
                    }`}
                    style={{ fontSize: '0.82rem', lineHeight: '1.4' }}
                  >
                    {msg.project && (
                      <div className="mb-1">
                        <span className="badge bg-success bg-opacity-20 text-success border border-success border-opacity-30 rounded px-1 me-1" style={{ fontSize: '0.65rem' }}>
                          <i className="bi bi-check-circle-fill me-1"></i> {msg.project}
                        </span>
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={this.chatEndRef} />
          </div>

          {/* Chat Form Footer */}
          <form onSubmit={this.handleSendMessage} className="p-2 bg-slate-900 border-top border-slate-800">
            <div className="mb-1">
              <select
                className="form-select form-select-sm bg-dark text-muted border-secondary py-0 px-2"
                style={{ fontSize: '0.72rem' }}
                value={selectedProject}
                onChange={(e) => this.setState({ selectedProject: e.target.value })}
              >
                <option value="">-- Tag a Paying Site (Optional) --</option>
                {payingProjects.map((p) => (
                  <option key={p.id || p.name} value={p.name}>
                    {p.name} ({p.domain}) - PAYING
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-light border-secondary"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => this.setState({ inputText: e.target.value })}
              />
              <button className="btn btn-sm btn-info text-dark fw-bold px-3" type="submit">
                <i className="bi bi-send-fill"></i>
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default CommunityChat;

