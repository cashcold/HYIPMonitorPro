// Sample database store for HYIP Monitor Pro

const getNowDateTimeStr = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export const sampleCategories = [
  { id: 'cat_1', name: 'Class "Premium" (TOP Choices)', slug: 'premium', description: 'Highest verified capital investment & 100% daily payout reliability.' },
  { id: 'cat_2', name: 'Class "A" (Top Performer)', slug: 'class-a', description: 'Proven long term track record with consistent payments.' },
  { id: 'cat_3', name: 'Class "B" (Trial)', slug: 'class-b', description: 'Medium to high risk programs currently on trial monitoring.' },
  { id: 'cat_4', name: 'New Listing', slug: 'new-listing', description: 'Recently added programs undergoing initial monitoring.' },
  { id: 'cat_5', name: 'Not Paying / Scam', slug: 'not-paying', description: 'Programs with reported payment issues or pending withdrawal delays.' }
];

export const sampleProjects = [
  {
    id: 'proj_goldbod',
    name: 'GoldBod Pro',
    domain: 'gold-bod-pro.vercel.app',
    url: 'https://gold-bod-pro.vercel.app',
    logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
    status: 'PAYING',
    category: 'Class "Premium" (TOP Choices)',
    rating: 4.9,
    reviewsCount: 2840,
    votes: { excellent: 2834, good: 6, average: 0, bad: 0, veryBad: 0 },
    ourInvestment: 2500,
    minDeposit: 50,
    maxDeposit: 2500,
    roi: 20.00,
    duration: '5% to 20% total profit (1 - 7 days)',
    withdrawalType: 'Instant',
    referralPercent: '10% (First Deposit) / 5% - 2% - 1%',
    lastPayoutDate: getNowDateTimeStr(),
    startDate: '2026-08-02',
    monitoredDays: 8,
    monitorsCount: 1,
    ssl: 'EV SSL',
    hosting: 'Vercel / Cloudflare',
    processors: ['Bitcoin', 'Ethereum', 'USDT TRC20', 'USDT BEP20', 'USDT ERC20', 'Mobile Money'],
    telegram: 'https://t.me/goldbodpro_official',
    description: 'GoldBod Pro bridges institutional-grade cloud mining hardware with retail cryptocurrency investment opportunity. Offering automated, multi-currency yields with zero hardware requirements and high-efficiency ASIC mining rigs.',
    country: 'United States',
    company: 'GoldBod Pro',
    countryStats: [
      { country: 'Switzerland', flag: '🇨🇭', votes: 2, percent: 33 },
      { country: 'United Arab Emirates', flag: '🇦🇪', votes: 1, percent: 17 },
      { country: 'Singapore', flag: '🇸🇬', votes: 1, percent: 17 },
      { country: 'United Kingdom', flag: '🇬🇧', votes: 1, percent: 17 },
      { country: 'Germany', flag: '🇩🇪', votes: 1, percent: 16 }
    ],
    investmentPlans: [
      { name: 'Starter Plan', minDeposit: 50, maxDeposit: 399, roi: '+5% Total Net Profit', duration: '24 Hours', compounding: 'No' },
      { name: 'Silver Plan', minDeposit: 400, maxDeposit: 999, roi: '+12% Total Net Profit', duration: '3 Days', compounding: 'No' },
      { name: 'Gold Plan', minDeposit: 1000, maxDeposit: 1700, roi: '+15% Total Net Profit', duration: '5 Days', compounding: 'No' },
      { name: 'Diamond Plan', minDeposit: 1700, maxDeposit: 2500, roi: '+20% Total Net Profit', duration: '7 Days', compounding: 'No' }
    ],
    whois: {
      domain: 'gold-bod-pro.vercel.app',
      ip: '76.76.21.21',
      country: 'United States',
      registrar: 'Vercel Inc.',
      created: '2026-08-02',
      expires: '2027-08-02',
      updated: '2026-08-02',
      nameservers: 'ns1.vercel-dns.com, ns2.vercel-dns.com'
    },
    payoutHistory: [
      { date: 'Aug 10, 2026 17:36:12', amount: '$2,880.00', currency: 'USDT TRC20', wallet: 'dubai_vip', txHash: 'Verified Instant', status: 'Completed' },
      { date: 'Aug 10, 2026 17:36:12', amount: '$3,772.00', currency: 'USDT BEP20', wallet: 'singapore_tx', txHash: 'Verified Instant', status: 'Completed' },
      { date: 'Aug 10, 2026 17:36:12', amount: '$1,842.00', currency: 'Ethereum', wallet: 'rome_trader', txHash: 'Verified Instant', status: 'Completed' },
      { date: 'Aug 10, 2026 17:36:12', amount: '$2,712.00', currency: 'Bitcoin', wallet: 'dubai_vip', txHash: 'Verified Instant', status: 'Completed' },
      { date: 'Aug 10, 2026 17:36:12', amount: '$1,642.00', currency: 'Bitcoin', wallet: 'cyber_sam', txHash: 'Verified Instant', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Aug 02, 2026', value: 1500 },
      { date: 'Aug 04, 2026', value: 18000 },
      { date: 'Aug 06, 2026', value: 42000 },
      { date: 'Aug 08, 2026', value: 85000 },
      { date: 'Aug 10, 2026', value: 124000 }
    ]
  },
  {
  id: 'proj_cloudminex',
  name: 'CloudMineX',
  domain: 'cloud-mine-x.vercel.app',
  url: 'https://cloud-mine-x.vercel.app',
  logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=120&auto=format&fit=crop&q=80',
  banner: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
  status: 'PAYING',
  category: 'Class "Premium" (TOP Choices)',
  rating: 4.9,
  reviewsCount: 1240,
  votes: { excellent: 1210, good: 20, average: 10, bad: 0, veryBad: 0 },
  ourInvestment: 1500,
  minDeposit: 10,
  maxDeposit: 20000,
  roi: 12.00,
  duration: '5% to 12% daily (7 - 180 days)',
  withdrawalType: 'Instant',
  referralPercent: '10% (First Deposit) / 5% - 2% - 1%',
  lastPayoutDate: getNowDateTimeStr(),
  startDate: '2026-08-02',
  monitoredDays: 10,
  monitorsCount: 1,
  ssl: 'EV SSL',
  hosting: 'Cloudflare / CloudMineX Inc',
  processors: ['MTN MoMo', 'Telecel Cash', 'AT Money', 'USDT TRC20', 'USDT BEP20', 'Bitcoin', 'Ethereum'],
  telegram: 'https://t.me/cloudminex_official',
  description: 'Next-Gen Cloud Mining Infrastructure providing automated, high-density cloud mining nodes. Rent enterprise-grade ASIC hash power and generate daily crypto rewards with zero hardware maintenance.',
  country: 'United States',
  company: 'CloudMineX Inc.',
  countryStats: [
    { country: 'Ghana', flag: '🇬🇭', votes: 45, percent: 50 },
    { country: 'Nigeria', flag: '🇳🇬', votes: 20, percent: 22 },
    { country: 'South Africa', flag: '🇿🇦', votes: 12, percent: 13 },
    { country: 'United States', flag: '🇺🇸', votes: 8, percent: 9 },
    { country: 'United Kingdom', flag: '🇬🇧', votes: 5, percent: 6 }
  ],
  investmentPlans: [
    { name: 'Starter Miner', minDeposit: 10, maxDeposit: 299, roi: '5.0% Daily', duration: '7 Days', compounding: 'No' },
    { name: 'Basic Miner', minDeposit: 300, maxDeposit: 699, roi: '6.0% Daily', duration: '14 Days', compounding: 'No' },
    { name: 'Pro Miner', minDeposit: 700, maxDeposit: 1499, roi: '7.0% Daily', duration: '30 Days', compounding: 'No' },
    { name: 'Advanced Miner', minDeposit: 1500, maxDeposit: 2999, roi: '8.0% Daily', duration: '60 Days', compounding: 'No' },
    { name: 'Premium Miner', minDeposit: 3000, maxDeposit: 4999, roi: '9.0% Daily', duration: '90 Days', compounding: 'No' },
    { name: 'VIP Miner', minDeposit: 5000, maxDeposit: 9999, roi: '10.0% Daily', duration: '90 Days', compounding: 'No' },
    { name: 'Enterprise Miner', minDeposit: 10000, maxDeposit: 19999, roi: '11.0% Daily', duration: '120 Days', compounding: 'No' },
    { name: 'Titan Rig Miner', minDeposit: 20000, maxDeposit: 50000, roi: '12.0% Daily', duration: '180 Days', compounding: 'No' }
  ],
  whois: {
    domain: 'cloudminex.com',
    ip: '104.21.55.120',
    country: 'United States',
    registrar: 'Cloudflare Inc.',
    created: '2026-08-02',
    expires: '2027-08-02',
    updated: '2026-08-02',
    nameservers: 'ns1.cloudflare.com, ns2.cloudflare.com'
  },
  payoutHistory: [
    { date: 'Aug 12, 2026 14:10:02', amount: 'GHS 350.00', currency: 'MTN MoMo', wallet: 'Kwame', txHash: 'Verified Instant', status: 'Completed' },
    { date: 'Aug 12, 2026 13:45:10', amount: 'GHS 720.00', currency: 'MTN MoMo', wallet: 'Kofi', txHash: 'Verified Instant', status: 'Completed' },
    { date: 'Aug 12, 2026 12:20:15', amount: 'GHS 200.00', currency: 'AT Money', wallet: 'Rita', txHash: 'Verified Instant', status: 'Completed' },
    { date: 'Aug 12, 2026 11:05:40', amount: 'GHS 1,200.00', currency: 'USDT TRC20', wallet: 'Grace', txHash: 'Verified Instant', status: 'Completed' },
    { date: 'Aug 12, 2026 10:15:22', amount: 'GHS 450.00', currency: 'MTN MoMo', wallet: 'Belinda', txHash: 'Verified Instant', status: 'Completed' }
  ],
  trafficData: [
    { date: 'Aug 02, 2026', value: 1500 },
    { date: 'Aug 04, 2026', value: 18000 },
    { date: 'Aug 06, 2026', value: 42000 },
    { date: 'Aug 08, 2026', value: 85000 },
    { date: 'Aug 10, 2026', value: 124000 }
  ]
},
  {
    id: 'proj_winvest',
    name: 'Winvest',
    domain: 'winvest.com',
    url: 'https://winvest.com',
    logo: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING',
    category: 'Class "Premium" (TOP Choices)',
    rating: 4.8,
    reviewsCount: 91,
    votes: { excellent: 89, good: 1, average: 1, bad: 0, veryBad: 0 },
    ourInvestment: 1000,
    minDeposit: 10,
    maxDeposit: 100000000,
    roi: 1635.30,
    duration: '3% daily for 60 calendar days',
    withdrawalType: 'Manual',
    referralPercent: '5% - 2% - 1%',
    lastPayoutDate: '2026-07-28',
    startDate: '2026-03-14',
    monitoredDays: 136,
    monitorsCount: 5,
    ssl: 'EV SSL',
    hosting: 'Cloudflare Inc / DDoS Guard',
    processors: ['Bitcoin', 'USDT', 'Ethereum', 'PerfectMoney', 'Payeer', 'Litecoin'],
    telegram: 'https://t.me/winvest_official',
    description: 'Ready to Accelerate Your Financial Success? Welcome to Winvest, the Secure, Transparent, and Unstoppable AI-Powered Bitcoin Investment. Backed by Wealth Invest Corp, Incorporated in New York — Providing Unmatched Trust and World-Class Regulatory Compliance.',
    country: 'United States',
    company: 'Wealth Invest Corp',
    countryStats: [
      { country: 'United States', flag: '🇺🇸', votes: 55, percent: 60 },
      { country: 'Brazil', flag: '🇧🇷', votes: 18, percent: 20 },
      { country: 'China', flag: '🇨🇳', votes: 12, percent: 13 },
      { country: 'Ukraine', flag: '🇺🇦', votes: 4, percent: 4 },
      { country: 'Germany', flag: '🇩🇪', votes: 1, percent: 1 },
      { country: 'South Africa', flag: '🇿🇦', votes: 1, percent: 1 }
    ],
    investmentPlans: [
      { name: 'AI Starter Plan', minDeposit: 10, maxDeposit: 499, roi: '3.0% Daily', duration: '60 Calendar Days', compounding: 'Yes' },
      { name: 'AI Pro Wealth', minDeposit: 500, maxDeposit: 10000, roi: '4.5% Daily', duration: '45 Calendar Days', compounding: 'Yes' },
      { name: 'Institutional VIP', minDeposit: 10000, maxDeposit: 100000000, roi: '7.0% Daily', duration: '30 Calendar Days', compounding: 'No' }
    ],
    whois: {
      domain: 'winvest.com',
      ip: '172.66.147.133',
      country: 'United States',
      registrar: 'Tucows Domains Inc.',
      created: '1998-06-20',
      expires: '2032-06-19',
      updated: '2026-01-02',
      nameservers: 'nicolas.ns.cloudflare.com (162.159.44.84), nova.ns.cloudflare.com (108.162.194.129)'
    },
    payoutHistory: [
      { date: 'Jul 28, 2026 12:00:02', amount: '$267.57', currency: 'BTC', wallet: 'bc1q5sxm0pkmh3729s39pmkvgs7h8jn9ywt7c8y8n', txHash: '36ea4b16bc6a4525a814e8ddb6681847d8734c00aff1f7d296f7575332eea6e', status: 'Completed' },
      { date: 'Jul 27, 2026 12:00:02', amount: '$211.42', currency: 'BTC', wallet: 'bc1q5sxm0pkmh3729s39pmkvgs7h8jn9ywt7c8y8n', txHash: '7ca48bd14b98af8d044b1513f986fa9eada00c901c3402a819186fca7b2155a', status: 'Completed' },
      { date: 'Jul 22, 2026 19:00:02', amount: '$321.85', currency: 'USDT', wallet: '0x3990a9fd90573cc9279c63b0b9188efe3cd8521eb6da73e23d5a6a1c3b8ce50', txHash: '9e5ca1e198f7fb8772fc0f8d9c04b0c8035a53e379b63a23603287a4c186849', status: 'Completed' },
      { date: 'Jul 21, 2026 12:00:03', amount: '$324.36', currency: 'BTC', wallet: 'bc1q5sxm0pkmh3729s39pmkvgs7h8jn9ywt7c8y8n', txHash: '3990a9fd90573cc9279c63b0b9188efe3cd8521eb6da73e23d5a6a1c3b8ce50', status: 'Completed' },
      { date: 'Jul 20, 2026 02:00:02', amount: '$252.42', currency: 'BTC', wallet: 'bc1q5sxm0pkmh3729s39pmkvgs7h8jn9ywt7c8y8n', txHash: '6086abdd2ad847740167fe043f9dd09224ae77244d9c34ebacb40773e12a5fd', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Mar 17, 2026', value: 1200 },
      { date: 'Apr 09, 2026', value: 2400 },
      { date: 'May 03, 2026', value: 3800 },
      { date: 'May 24, 2026', value: 6500 },
      { date: 'Jun 15, 2026', value: 10800 },
      { date: 'Jul 06, 2026', value: 14200 },
      { date: 'Jul 28, 2026', value: 16500 }
    ]
  },
  {
    id: 'proj_kinghectares',
    name: 'King Hectares',
    domain: 'kinghectares.com',
    url: 'https://kinghectares.com',
    logo: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING',
    category: 'Class "A" (Top Performer)',
    rating: 3.2,
    reviewsCount: 4,
    votes: { excellent: 3, good: 1, average: 0, bad: 0, veryBad: 0 },
    ourInvestment: 200,
    minDeposit: 30,
    maxDeposit: 50000,
    roi: 80.00,
    duration: '1% weekly for 1 year',
    withdrawalType: 'Manual',
    referralPercent: '1%',
    lastPayoutDate: '2026-07-25',
    startDate: '2024-11-07',
    monitoredDays: 627,
    monitorsCount: 5,
    ssl: 'Standard SSL',
    hosting: 'Namecheap Hosting Inc.',
    processors: ['Bitcoin', 'USDT', 'PerfectMoney'],
    telegram: 'https://t.me/kinghectares_group',
    description: 'Our program is designed for people who want to achieve financial freedom but are unable to do so because they are not financial experts. King Hectares is a long-term, high-yield private lending program backed by trading in agricultural markets.',
    country: 'United Kingdom',
    company: 'King Hectares Ltd',
    countryStats: [
      { country: 'United Kingdom', flag: '🇬🇧', votes: 3, percent: 75 },
      { country: 'Nigeria', flag: '🇳🇬', votes: 1, percent: 25 }
    ],
    investmentPlans: [
      { name: 'Agri Growth', minDeposit: 30, maxDeposit: 50000, roi: '1.0% Weekly', duration: '52 Weeks', compounding: 'No' }
    ],
    whois: {
      domain: 'kinghectares.com',
      ip: '104.21.32.11',
      country: 'United Kingdom',
      registrar: 'NameCheap, Inc.',
      created: '2024-10-12',
      expires: '2027-10-12',
      updated: '2025-10-01',
      nameservers: 'ns1.digitalocean.com, ns2.digitalocean.com'
    },
    payoutHistory: [
      { date: 'Jul 25, 2026 10:15:00', amount: '$42.00', currency: 'USDT', wallet: '0x71b...89c', txHash: '0x81fa...92a', status: 'Completed' },
      { date: 'Jul 18, 2026 10:00:00', amount: '$42.00', currency: 'USDT', wallet: '0x71b...89c', txHash: '0x51ab...11c', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Jan 2025', value: 1500 },
      { date: 'Apr 2025', value: 2800 },
      { date: 'Jul 2025', value: 3400 },
      { date: 'Oct 2025', value: 4100 },
      { date: 'Jan 2026', value: 4900 },
      { date: 'Jul 2026', value: 5800 }
    ]
  },
  {
    id: 'proj_cryptoize',
    name: 'Cryptoize Limited',
    domain: 'cryptoize.net',
    url: 'https://cryptoize.net',
    logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING',
    category: 'Class "B" (Trial)',
    rating: 2.7,
    reviewsCount: 170,
    votes: { excellent: 110, good: 40, average: 15, bad: 3, veryBad: 2 },
    ourInvestment: 200,
    minDeposit: 10,
    maxDeposit: 25000,
    roi: 231.00,
    duration: '101%-125% after 1 day, 106%-450% after 5 days',
    withdrawalType: 'Manual',
    referralPercent: '10%',
    lastPayoutDate: '2026-07-20',
    startDate: '2024-10-10',
    monitoredDays: 654,
    monitorsCount: 4,
    ssl: 'SSL High Risk Hot',
    hosting: 'GeniusGuard Protection',
    processors: ['Bitcoin', 'USDT', 'Ethereum', 'Payeer', 'Litecoin'],
    telegram: 'https://t.me/cryptoize_channel',
    description: 'Your trusted partner in cryptocurrency investment. At Cryptoize, we are committed to helping our members effectively earn and increase their cryptocurrency holdings with quantitative trading arbitrage.',
    country: 'Panama',
    company: 'Cryptoize Holdings Inc',
    countryStats: [
      { country: 'United States', flag: '🇺🇸', votes: 80, percent: 47 },
      { country: 'Russia', flag: '🇷🇺', votes: 45, percent: 26 },
      { country: 'India', flag: '🇮🇳', votes: 30, percent: 18 }
    ],
    investmentPlans: [
      { name: '1-Day Express', minDeposit: 10, maxDeposit: 1000, roi: '101%-125%', duration: '1 Day', compounding: 'No' },
      { name: '5-Day Quantum', minDeposit: 50, maxDeposit: 5000, roi: '106%-450%', duration: '5 Days', compounding: 'No' }
    ],
    whois: {
      domain: 'cryptoize.net',
      ip: '198.51.100.42',
      country: 'Panama',
      registrar: 'PublicDomainRegistry',
      created: '2024-09-28',
      expires: '2026-09-28',
      updated: '2025-09-20',
      nameservers: 'dns1.geniusguard.com, dns2.geniusguard.com'
    },
    payoutHistory: [
      { date: 'Jul 20, 2026 14:22:00', amount: '$85.50', currency: 'LTC', wallet: 'Lbc3...98k', txHash: 'f450f191671787ccd23308f194e1225288eaae5cc1503ae4acd464c35d99bd84', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Nov 2024', value: 800 },
      { date: 'Mar 2025', value: 2100 },
      { date: 'Aug 2025', value: 4500 },
      { date: 'Jan 2026', value: 7200 },
      { date: 'Jul 2026', value: 9100 }
    ]
  },
  {
    id: 'proj_optima',
    name: 'Optima',
    domain: 'optima.cc',
    url: 'https://optima.cc',
    logo: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING',
    category: 'Class "B" (Trial)',
    rating: 4.0,
    reviewsCount: 2,
    votes: { excellent: 2, good: 0, average: 0, bad: 0, veryBad: 0 },
    ourInvestment: 200,
    minDeposit: 50,
    maxDeposit: 100000,
    roi: 115.00,
    duration: 'up to 1.25% daily',
    withdrawalType: 'Instant',
    referralPercent: 'up to 40% by fees',
    lastPayoutDate: '2026-07-28',
    startDate: '2026-03-29',
    monitoredDays: 121,
    monitorsCount: 2,
    ssl: 'Cloudflare SSL',
    hosting: 'Cloudflare',
    processors: ['USDT', 'Bitcoin', 'Ethereum', 'Litecoin'],
    telegram: 'https://t.me/optimacc_chat',
    description: 'Optima is a global crypto ecosystem that blends traditional banking principles with advanced fintech tools through a unified technology stack, adhering to business standards of security and compliance.',
    country: 'Switzerland',
    company: 'Optima Crypto AG',
    countryStats: [
      { country: 'Switzerland', flag: '🇨🇭', votes: 2, percent: 100 }
    ],
    investmentPlans: [
      { name: 'Core Yield', minDeposit: 50, maxDeposit: 100000, roi: '1.25% Daily', duration: 'Forever (Principal Back Any Time)', compounding: 'Yes' }
    ],
    whois: {
      domain: 'optima.cc',
      ip: '104.26.12.88',
      country: 'Switzerland',
      registrar: 'NameCheap Inc.',
      created: '2026-02-10',
      expires: '2028-02-10',
      updated: '2026-03-25',
      nameservers: 'ashley.ns.cloudflare.com, devon.ns.cloudflare.com'
    },
    payoutHistory: [
      { date: 'Jul 28, 2026 08:30:11', amount: '$12.50', currency: 'USDT', wallet: '0x99a...11f', txHash: '0x3c7763a29cfbc312a780fcc876d1a715c260f50fc7f9ec5c476320adc56d5cd', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Apr 2026', value: 900 },
      { date: 'May 2026', value: 2300 },
      { date: 'Jun 2026', value: 3900 },
      { date: 'Jul 2026', value: 5400 }
    ]
  },
  {
    id: 'proj_biceex',
    name: 'Biceex.com',
    domain: 'biceex.com',
    url: 'https://biceex.com',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80',
    status: 'WAITING',
    category: 'Class "B" (Trial)',
    rating: 3.8,
    reviewsCount: 1,
    votes: { excellent: 1, good: 0, average: 0, bad: 0, veryBad: 0 },
    ourInvestment: 200,
    minDeposit: 50,
    maxDeposit: 100000,
    roi: 51.00,
    duration: '30/60/90/180 days lock period, up to 52% interest paid daily',
    withdrawalType: 'Instant',
    referralPercent: '10%',
    lastPayoutDate: '2026-07-28',
    startDate: '2026-05-16',
    monitoredDays: 73,
    monitorsCount: 1,
    ssl: 'Cloudflare ECC SSL',
    hosting: 'Cloudflare',
    processors: ['USDT', 'Bitcoin', 'Ethereum'],
    telegram: 'https://t.me/biceex_trading',
    description: 'Biceex.com - The Future of Digital Asset Trading BICEEX is the best place for traders to earn profits with a simple interface. Base 12% up to 22% (Platinum) Growth 60-day lock period.',
    country: 'Singapore',
    company: 'Biceex Global Pte',
    countryStats: [
      { country: 'Singapore', flag: '🇸🇬', votes: 1, percent: 100 }
    ],
    investmentPlans: [
      { name: 'Starter 30-Day', minDeposit: 50, maxDeposit: 1000, roi: '12% Base', duration: '30 Days', compounding: 'No' },
      { name: 'Growth 60-Day', minDeposit: 500, maxDeposit: 5000, roi: '18% Growth', duration: '60 Days', compounding: 'Yes' }
    ],
    whois: {
      domain: 'biceex.com',
      ip: '104.21.55.19',
      country: 'Singapore',
      registrar: 'GoDaddy.com LLC',
      created: '2026-04-01',
      expires: '2027-04-01',
      updated: '2026-05-01',
      nameservers: 'ns-112.awsdns-14.com, ns-582.awsdns-08.net'
    },
    payoutHistory: [
      { date: 'Jul 28, 2026 11:10:00', amount: '$24.00', currency: 'USDT', wallet: '0x882...90c', txHash: '0x8f8aa4e0419ab1ac38a5266ff0fb94a8e3b10fa4151a21cd0ecbe3188594c10', status: 'Completed' }
    ],
    trafficData: [
      { date: 'May 2026', value: 400 },
      { date: 'Jun 2026', value: 1200 },
      { date: 'Jul 2026', value: 2900 }
    ]
  },
  {
    id: 'proj_aitimart',
    name: 'AiTiMart',
    domain: 'aitimart.com',
    url: 'https://aitimart.com',
    logo: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    status: 'NOT PAYING',
    category: 'Not Paying / Scam',
    rating: 1.2,
    reviewsCount: 155,
    votes: { excellent: 4, good: 7, average: 10, bad: 40, veryBad: 94 },
    ourInvestment: 500,
    minDeposit: 20,
    maxDeposit: 50000,
    roi: 0,
    duration: '1.2% daily lifetime',
    withdrawalType: 'Manual',
    referralPercent: '3%',
    lastPayoutDate: '2026-06-12',
    startDate: '2023-01-15',
    monitoredDays: 1290,
    monitorsCount: 12,
    ssl: 'Expired',
    hosting: 'Suspended Server',
    processors: ['Bitcoin', 'PerfectMoney'],
    telegram: 'https://t.me/aitimart_warn',
    description: 'WARNING: AiTiMart has stopped processing pending withdrawal requests since mid June 2026. Multiple scam reports submitted.',
    country: 'Belize',
    company: 'AiTiMart Financial',
    countryStats: [
      { country: 'Global', flag: '🌐', votes: 155, percent: 100 }
    ],
    investmentPlans: [
      { name: 'Legacy Plan', minDeposit: 20, maxDeposit: 50000, roi: '1.2% Daily', duration: 'Lifetime', compounding: 'No' }
    ],
    whois: {
      domain: 'aitimart.com',
      ip: '192.0.2.1',
      country: 'Unknown',
      registrar: 'REDACTED FOR PRIVACY',
      created: '2022-12-01',
      expires: '2026-12-01',
      updated: '2026-06-15',
      nameservers: 'ns1.suspended-domain.org'
    },
    payoutHistory: [],
    trafficData: [
      { date: 'Jan 2026', value: 12000 },
      { date: 'May 2026', value: 8500 },
      { date: 'Jul 2026', value: 400 }
    ]
  },
  {
    id: 'proj_luxioprofit',
    name: 'Luxio Profit',
    domain: 'luxioprofit.com',
    url: 'https://luxioprofit.com',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    status: 'NOT PAYING',
    category: 'Not Paying / Scam',
    rating: 1.0,
    reviewsCount: 12,
    votes: { excellent: 0, good: 0, average: 1, bad: 3, veryBad: 8 },
    ourInvestment: 200,
    minDeposit: 25,
    maxDeposit: 10000,
    roi: 0,
    duration: '5% daily for 30 days',
    withdrawalType: 'Manual',
    referralPercent: '5%',
    lastPayoutDate: '2026-06-01',
    startDate: '2026-04-10',
    monitoredDays: 109,
    monitorsCount: 3,
    ssl: 'Invalid Certificate',
    hosting: 'Unknown',
    processors: ['USDT', 'Bitcoin'],
    telegram: '',
    description: 'Luxio Profit is non-responsive and admin accounts are deleted. DO NOT INVEST.',
    country: 'Seychelles',
    company: 'Luxio Group',
    countryStats: [],
    investmentPlans: [],
    whois: {
      domain: 'luxioprofit.com',
      ip: '198.51.100.99',
      country: 'Seychelles',
      registrar: 'Domain.com',
      created: '2026-03-20',
      expires: '2027-03-20',
      updated: '2026-06-02',
      nameservers: 'dns1.host.com'
    },
    payoutHistory: [],
    trafficData: []
  },
  {
    id: 'proj_bitbillionaire',
    name: 'BitBillionaire Limited',
    domain: 'bitbillionaire.com',
    url: 'https://bitbillionaire.com',
    logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=600&auto=format&fit=crop&q=80',
    status: 'PAYING',
    category: 'Class "A" (Top Performer)',
    rating: 3.2,
    reviewsCount: 2,
    votes: { excellent: 2, good: 0, average: 0, bad: 0, veryBad: 0 },
    ourInvestment: 200,
    minDeposit: 10,
    maxDeposit: 50000,
    roi: 229.00,
    duration: '130% after 1 day, 490% after 5 days, 820% after 12 days',
    withdrawalType: 'Manual',
    referralPercent: 'Upto 15',
    lastPayoutDate: '2026-07-27',
    startDate: '2024-10-13',
    monitoredDays: 653,
    monitorsCount: 3,
    ssl: 'Cloudflare SSL',
    hosting: 'DDOS Guard',
    processors: ['Bitcoin', 'USDT', 'PerfectMoney', 'Payeer', 'Litecoin'],
    telegram: 'https://t.me/bitbillionaire_official',
    description: 'Bitbillionaire revealed a strategic funding initiative to support development of its blockchain research and technology infrastructure, reinforcing its commitment to education, market analysis, and scalable crypto technology solutions.',
    country: 'United Kingdom',
    company: 'BitBillionaire Corp',
    countryStats: [
      { country: 'United Kingdom', flag: '🇬🇧', votes: 2, percent: 100 }
    ],
    investmentPlans: [
      { name: '1-Day Plan', minDeposit: 10, maxDeposit: 500, roi: '130%', duration: '1 Day', compounding: 'No' },
      { name: '5-Day Plan', minDeposit: 100, maxDeposit: 2000, roi: '490%', duration: '5 Days', compounding: 'No' }
    ],
    whois: {
      domain: 'bitbillionaire.com',
      ip: '190.115.18.22',
      country: 'United Kingdom',
      registrar: 'Enom Inc',
      created: '2024-09-10',
      expires: '2027-09-10',
      updated: '2025-09-10',
      nameservers: 'ns1.ddos-guard.net, ns2.ddos-guard.net'
    },
    payoutHistory: [
      { date: 'Jul 27, 2026 16:20:00', amount: '$65.00', currency: 'BTC', wallet: '1BvBMSEst...1Bv', txHash: '0x1337...888', status: 'Completed' }
    ],
    trafficData: [
      { date: 'Oct 2024', value: 1000 },
      { date: 'Feb 2025', value: 3100 },
      { date: 'Oct 2025', value: 5800 },
      { date: 'Jul 2026', value: 8200 }
    ]
  },
  {
    id: 'proj_cryptoflex',
    name: 'Crypto Flex Limited',
    domain: 'cryptoflex.org',
    url: 'https://cryptoflex.org',
    logo: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=120&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=80',
    status: 'PAYING',
    category: 'Class "A" (Top Performer)',
    rating: 3.3,
    reviewsCount: 92,
    votes: { excellent: 75, good: 10, average: 5, bad: 1, veryBad: 1 },
    ourInvestment: 200,
    minDeposit: 10,
    maxDeposit: 100000,
    roi: 177.00,
    duration: '135% after 3 days, 500% after 7 days, 1050% after 10 days',
    withdrawalType: 'Manual',
    referralPercent: 'up to 15%',
    lastPayoutDate: '2026-07-22',
    startDate: '2023-05-10',
    monitoredDays: 1175,
    monitorsCount: 2,
    ssl: 'PositiveSSL',
    hosting: 'Namecheap SSL',
    processors: ['Bitcoin', 'USDT', 'Ethereum', 'PerfectMoney', 'Litecoin'],
    telegram: 'https://t.me/cryptoflex_group',
    description: 'Crypto Flex Limited is Legally Registered in United Kingdom under companies house. Crypto Flex engaged with Crypto Trading. We Trade on your behalf and make profit with your investment.',
    country: 'United Kingdom',
    company: 'Crypto Flex Ltd (#14892019)',
    countryStats: [
      { country: 'United Kingdom', flag: '🇬🇧', votes: 45, percent: 49 },
      { country: 'Canada', flag: '🇨🇦', votes: 30, percent: 33 },
      { country: 'Australia', flag: '🇦🇺', votes: 17, percent: 18 }
    ],
    investmentPlans: [
      { name: 'Flex 3-Day', minDeposit: 10, maxDeposit: 1000, roi: '135%', duration: '3 Days', compounding: 'No' },
      { name: 'Flex 7-Day', minDeposit: 100, maxDeposit: 10000, roi: '500%', duration: '7 Days', compounding: 'No' }
    ],
    whois: {
      domain: 'cryptoflex.org',
      ip: '104.21.88.90',
      country: 'United Kingdom',
      registrar: 'Public Interest Registry',
      created: '2023-04-20',
      expires: '2028-04-20',
      updated: '2026-04-20',
      nameservers: 'ns1.cloudflare.com, ns2.cloudflare.com'
    },
    payoutHistory: [
      { date: 'Jul 22, 2026 19:10:00', amount: '$135.00', currency: 'USDT', wallet: '0x911...44a', txHash: '0x3388...121', status: 'Completed' }
    ],
    trafficData: [
      { date: 'May 2023', value: 500 },
      { date: 'May 2024', value: 4200 },
      { date: 'May 2025', value: 8900 },
      { date: 'Jul 2026', value: 13500 }
    ]
  }
];

export const sampleReviews = [
  {
    id: 'rev_1',
    projectId: 'proj_winvest',
    projectName: 'Winvest',
    name: 'SQMonitor',
    email: 'sqmonitor@hyip.org',
    country: 'United States',
    rating: 5,
    reviewText: 'Payment received from Winvest to sqmonitor: 5febf61877b3fafcf712714537db676e06649e6a7c9b42553274066f2dc6101d 2026-07-27 11:40:25 GMT +3 0.00014685 BTC (~$9.56)',
    paymentAmount: 9.56,
    wallet: '5febf61877b3fafcf712714537db676e06649e6a7c9b42553274066f2dc6101d',
    screenshot: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    status: 'approved',
    ip: '169.150.*.*',
    createdAt: '2026-07-27T19:34:29Z'
  },
  {
    id: 'rev_2',
    projectId: 'proj_winvest',
    projectName: 'Winvest',
    name: 'linxe',
    email: 'linxe@crypto.cn',
    country: 'China',
    rating: 5,
    reviewText: 'Withdrawal $51.63 Jul-25-2026 02:09:32 AM Withdraw to account bc1qk8kz5800kpsvn0knnxgzu9ltgjk3vh4vq86pgz. Batch is 53af4deb8793629aac011d2d5d3a68f9a11e6706a6c74700fc64b157e6d8686',
    paymentAmount: 51.63,
    wallet: 'bc1qk8kz5800kpsvn0knnxgzu9ltgjk3vh4vq86pgz',
    screenshot: '',
    status: 'approved',
    ip: '39.174.*.*',
    createdAt: '2026-07-26T06:28:55Z'
  },
  {
    id: 'rev_3',
    projectId: 'proj_kinghectares',
    projectName: 'King Hectares',
    name: 'zoricavasic20',
    email: 'zoric@invest.eu',
    country: 'Germany',
    rating: 4,
    reviewText: 'Received weekly payout on schedule. Very smooth process so far with King Hectares.',
    paymentAmount: 42.00,
    wallet: '0x71b9...89c',
    screenshot: '',
    status: 'approved',
    ip: '185.220.*.*',
    createdAt: '2026-07-25T14:10:00Z'
  }
];

export const sampleComments = [
  {
    id: 'comm_1',
    projectId: 'proj_winvest',
    parentId: null,
    name: 'Penn',
    text: 'Winvest has been consistently paying for over 130 days without a single missed batch! Great admin.',
    likes: 14,
    dislikes: 0,
    createdAt: '2026-07-27T18:00:00Z',
    replies: [
      {
        id: 'comm_1_1',
        projectId: 'proj_winvest',
        parentId: 'comm_1',
        name: 'naale',
        text: 'Agreed! One of the strongest projects of 2026.',
        likes: 5,
        dislikes: 0,
        createdAt: '2026-07-27T19:15:00Z'
      }
    ]
  },
  {
    id: 'comm_2',
    projectId: 'proj_aitimart',
    parentId: null,
    name: 'edpr2140',
    text: 'STAY AWAY FROM AITIMART! Pending payout for 3 weeks now.',
    likes: 42,
    dislikes: 1,
    createdAt: '2026-06-20T10:00:00Z',
    replies: []
  }
];

export const sampleReports = [
  {
    id: 'rep_1',
    projectId: 'proj_aitimart',
    projectName: 'AiTiMart',
    reason: 'Withdrawal pending for more than 14 days with no response from support.',
    wallet: 'bc1q9999...333',
    proof: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop&q=80',
    reporterEmail: 'investor_alert@gmail.com',
    status: 'confirmed_scam',
    createdAt: '2026-06-18T12:00:00Z'
  }
];

export const sampleAdvertisements = [
  {
    id: 'ad_1',
    title: 'Accept Crypto In Your Store - BitPay Banner',
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=1200&auto=format&fit=crop&q=80',
    linkUrl: 'https://example.com/crypto-gateway',
    position: 'Header Banner 728x90',
    status: 'active'
  },
  {
    id: 'ad_2',
    title: 'Premium VIP HYIP Listing Spot',
    imageUrl: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&auto=format&fit=crop&q=80',
    linkUrl: 'https://winvest.com',
    position: 'Sidebar Banner 300x250',
    status: 'active'
  }
];

export const sampleSettings = {
  siteName: 'HYIP Monitor Pro',
  siteEmail: 'admin@hyipmonitorpro.com',
  currencySymbol: '$',
  serverTimezone: 'UTC',
  autoApproveReviews: false,
  minDepositAlert: 10,
  whatsappGroup: 'https://chat.whatsapp.com/KJ1R8WcP2yk3jtcxym1nsS?s=cl&p=a&ilr=1',
  supportEmail: 'support@hyipmonitorpro.com',
  announcementText: 'Welcome to HYIP Monitor Pro — The #1 Trusted Associate & High-Yield Investment Program Tracking Portal.'
};
