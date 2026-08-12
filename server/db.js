// In-Memory or MongoDB Mongoose Database Controller for HYIP Monitor Pro

import {
  sampleCategories,
  sampleProjects,
  sampleReviews,
  sampleComments,
  sampleReports,
  sampleAdvertisements,
  sampleSettings
} from './sampleData.js';

function getNowDateTimeStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

class DatabaseService {
  constructor() {
    this.categories = [...sampleCategories];
    this.projects = sampleProjects.map(p => ({
      ...p,
      lastPayoutDate: p.status === 'PAYING' ? getNowDateTimeStr() : p.lastPayoutDate
    }));
    this.reviews = [...sampleReviews];
    this.comments = [...sampleComments];
    this.reports = [...sampleReports];
    this.advertisements = [...sampleAdvertisements];
    this.settings = { ...sampleSettings };
    this.users = [
      { id: 'usr_admin', username: 'admin', passwordHash: 'admin123', role: 'admin' }
    ];
  }

  // --- STATISTICS ---
  getStats() {
    const activeProjects = this.projects.filter(p => p.approved !== false && p.status !== 'PENDING');
    const payingProjects = activeProjects.filter(p => p.status === 'PAYING').length;
    const notPayingProjects = activeProjects.filter(p => p.status === 'NOT PAYING' || p.status === 'SCAM').length;
    const pendingProjects = this.projects.filter(p => p.approved === false || p.status === 'PENDING').length;
    const totalReviews = this.reviews.length;
    const totalInvestmentsListed = '$90,084';
    const totalMembers = 14289;

    return {
      totalProjects: activeProjects.length,
      payingProjects,
      notPayingProjects,
      pendingProjects,
      totalMembers,
      totalReviews,
      totalInvestmentsListed,
      dailyVisits: 18450,
      monthlyVisits: 520000,
      scamProjects: notPayingProjects,
      usersCount: 2450,
      commentsCount: this.comments.length
    };
  }

  // --- PROJECTS ---
  getProjects(query = {}) {
    let result = [...this.projects];

    // Filter out pending unless specifically requested for admin
    if (query.onlyPending === 'true') {
      result = result.filter(p => p.approved === false || p.status === 'PENDING');
    } else if (query.includePending !== 'true') {
      result = result.filter(p => p.approved !== false && p.status !== 'PENDING');
    }

    if (query.q) {
      const q = query.q.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.domain.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.country && p.country.toLowerCase().includes(q))
      );
    }

    if (query.status) {
      result = result.filter(p => p.status.toUpperCase() === query.status.toUpperCase());
    }

    if (query.category) {
      result = result.filter(p => p.category.toLowerCase().includes(query.category.toLowerCase()));
    }

    if (query.processor) {
      result = result.filter(p => p.processors && p.processors.some(proc => proc.toLowerCase().includes(query.processor.toLowerCase())));
    }

    if (query.withdrawalType) {
      result = result.filter(p => p.withdrawalType.toLowerCase() === query.withdrawalType.toLowerCase());
    }

    if (query.minDepositMax) {
      result = result.filter(p => p.minDeposit <= parseFloat(query.minDepositMax));
    }

    if (query.sort) {
      if (query.sort === 'newest') {
        result.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      } else if (query.sort === 'rating') {
        result.sort((a, b) => b.rating - a.rating);
      } else if (query.sort === 'roi') {
        result.sort((a, b) => b.roi - a.roi);
      } else if (query.sort === 'min_deposit') {
        result.sort((a, b) => a.minDeposit - b.minDeposit);
      }
    }

    return result;
  }

  getProjectById(id) {
    return this.projects.find(p => p.id === id || p.domain === id);
  }

  addProject(data) {
    const isAdmin = data.isAdmin === true || data.passcode === 'admin123';
    const isApproved = isAdmin;
    const projectStatus = isApproved ? (data.status || 'PAYING') : 'PENDING';

    const newProject = {
      id: 'proj_' + Date.now(),
      name: data.name || 'New Project',
      domain: data.domain || (data.url ? new URL(data.url).hostname : 'project.com'),
      url: data.url || 'https://example.com',
      logo: data.logo || 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=120&auto=format&fit=crop&q=80',
      banner: data.banner || 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
      status: projectStatus,
      approved: isApproved,
      category: data.category || 'Class "B" (Trial)',
      rating: 5.0,
      reviewsCount: 0,
      votes: { excellent: 1, good: 0, average: 0, bad: 0, veryBad: 0 },
      ourInvestment: parseFloat(data.ourInvestment) || 100,
      minDeposit: parseFloat(data.minDeposit) || 10,
      maxDeposit: parseFloat(data.maxDeposit) || 10000,
      roi: parseFloat(data.roi) || 100,
      duration: data.duration || '1% daily',
      withdrawalType: data.withdrawalType || 'Manual',
      referralPercent: data.referralPercent || '5%',
      lastPayoutDate: getNowDateTimeStr(),
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      monitoredDays: 1,
      monitorsCount: 1,
      ssl: data.ssl || 'Valid SSL',
      hosting: data.hosting || 'Protected Server',
      processors: data.processors || ['Bitcoin', 'USDT'],
      telegram: data.telegram || '',
      description: data.description || 'High-yield investment program monitored for daily accuracy.',
      country: data.country || 'International',
      company: data.company || 'Invest Ltd',
      countryStats: [{ country: 'International', flag: '🌐', votes: 1, percent: 100 }],
      investmentPlans: data.investmentPlans || [{ name: 'Standard Plan', minDeposit: 10, maxDeposit: 1000, roi: '2.0% Daily', duration: '30 Days', compounding: 'No' }],
      whois: {
        domain: data.domain || 'project.com',
        ip: '104.21.0.1',
        country: data.country || 'International',
        registrar: 'Cloudflare, Inc.',
        created: new Date().toISOString().split('T')[0],
        expires: '2028-01-01',
        updated: new Date().toISOString().split('T')[0],
        nameservers: 'ns1.cloudflare.com, ns2.cloudflare.com'
      },
      payoutHistory: [],
      trafficData: [{ date: 'Today', value: 100 }]
    };

    this.projects.unshift(newProject);
    return newProject;
  }

  approveProject(id, newStatus = 'PAYING') {
    const project = this.projects.find(p => p.id === id);
    if (!project) return null;
    project.approved = true;
    project.status = newStatus;
    return project;
  }

  updateProject(id, updates) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      return this.projects[index];
    }
    return null;
  }

  deleteProject(id) {
    const index = this.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      const removed = this.projects.splice(index, 1);
      return removed[0];
    }
    return null;
  }

  // --- REVIEWS ---
  getReviews(projectId = null) {
    if (projectId) {
      return this.reviews.filter(r => r.projectId === projectId);
    }
    return this.reviews;
  }

  addReview(reviewData) {
    const newRev = {
      id: 'rev_' + Date.now(),
      projectId: reviewData.projectId,
      projectName: reviewData.projectName || 'Project',
      name: reviewData.name || 'Anonymous',
      email: reviewData.email || 'anon@hyip.org',
      country: reviewData.country || 'United States',
      rating: parseInt(reviewData.rating) || 5,
      reviewText: reviewData.reviewText,
      paymentAmount: parseFloat(reviewData.paymentAmount) || 0,
      wallet: reviewData.wallet || '',
      screenshot: reviewData.screenshot || '',
      status: 'approved', // Auto approved for instant UX feedback
      ip: '192.168.*.*',
      createdAt: new Date().toISOString()
    };

    this.reviews.unshift(newRev);

    // Update project reviews count
    const proj = this.getProjectById(reviewData.projectId);
    if (proj) {
      proj.reviewsCount = (proj.reviewsCount || 0) + 1;
    }

    return newRev;
  }

  // --- VOTE ---
  addVote(projectId, voteType) {
    const proj = this.getProjectById(projectId);
    if (proj && proj.votes) {
      if (voteType === 'excellent') proj.votes.excellent += 1;
      else if (voteType === 'good') proj.votes.good += 1;
      else if (voteType === 'average') proj.votes.average += 1;
      else if (voteType === 'bad') proj.votes.bad += 1;
      else if (voteType === 'veryBad') proj.votes.veryBad += 1;
      return proj.votes;
    }
    return null;
  }

  // --- COMMENTS ---
  getComments(projectId) {
    return this.comments.filter(c => c.projectId === projectId);
  }

  addComment(data) {
    if (data.parentId) {
      const parent = this.comments.find(c => c.id === data.parentId);
      if (parent) {
        const reply = {
          id: 'comm_' + Date.now(),
          projectId: data.projectId,
          parentId: data.parentId,
          name: data.name || 'Investor',
          text: data.text,
          likes: 0,
          dislikes: 0,
          createdAt: new Date().toISOString()
        };
        parent.replies = parent.replies || [];
        parent.replies.push(reply);
        return reply;
      }
    }

    const newComm = {
      id: 'comm_' + Date.now(),
      projectId: data.projectId,
      parentId: null,
      name: data.name || 'Investor',
      text: data.text,
      likes: 0,
      dislikes: 0,
      createdAt: new Date().toISOString(),
      replies: []
    };

    this.comments.unshift(newComm);
    return newComm;
  }

  // --- LATEST PAYOUTS ---
  getLatestPayouts() {
    const payouts = [];
    this.projects.forEach(p => {
      if (p.payoutHistory && p.payoutHistory.length) {
        p.payoutHistory.forEach(ph => {
          payouts.push({
            ...ph,
            projectId: p.id,
            projectName: p.name,
            projectLogo: p.logo
          });
        });
      }
    });
    return payouts;
  }

  // --- LATEST SCAMS ---
  getLatestScams() {
    return this.projects.filter(p => p.status === 'NOT PAYING' || p.status === 'SCAM');
  }

  // --- REPORTS ---
  getReports() {
    return this.reports;
  }

  addReport(reportData) {
    const newReport = {
      id: 'rep_' + Date.now(),
      projectId: reportData.projectId,
      projectName: reportData.projectName || 'Project',
      reason: reportData.reason,
      wallet: reportData.wallet || '',
      proof: reportData.proof || '',
      reporterEmail: reportData.reporterEmail || 'user@hyip.org',
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  // --- ADVERTISEMENTS ---
  getAdvertisements() {
    return this.advertisements;
  }

  addAdvertisement(adData) {
    const newAd = {
      id: 'ad_' + Date.now(),
      title: adData.title,
      imageUrl: adData.imageUrl,
      linkUrl: adData.linkUrl,
      position: adData.position || 'Header Banner',
      status: 'active'
    };
    this.advertisements.push(newAd);
    return newAd;
  }

  // --- SETTINGS ---
  getSettings() {
    return this.settings;
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    return this.settings;
  }
}

export const db = new DatabaseService();
