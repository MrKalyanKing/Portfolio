export const portfolioConfig = {
  theme: {
    accent: '#34d399',
    showGrid: true,
  },
  // [EDIT: replace '#contact' with your Calendly / cal.com link]
  bookingLink: '#contact',
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#flagship' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    name: "Kalyan Badhavath",
    firstName: "Kalyan Nayak",
    lastName: "Badhavath",
    role: "Full-Stack + AI Engineer",
    availableText: "Available for freelance & contract work",
    headline: {
      top: "I build production",
      accent: "SaaS and AI-powered",
      rest: "products.",
    },
    description: "Full-stack + AI engineer. I architect multi-tenant platforms, complex business logic, and agentic/LLM features — then ship them reliably with NestJS, PostgreSQL, React, and MERN.",
    availableForWork: true,
    badges: [
      { id: 1, text: '⚙ Multi-tenant SaaS' },
      { id: 2, text: '🤖 Agentic AI' },
      { id: 3, text: '✔ Merged PRs in Rocket.Chat' },
    ],
    codeSnippet: {
      role: "Full-Stack + AI Engineer",
      builds: ["multi-tenant SaaS", "LLM features"],
      stack: ["NestJS", "PostgreSQL", "React"],
      ships: "production code"
    },
    trustStrip: [
      { id: 1, n: 'B2B SaaS', l: 'Enterprise platform built' },
      { id: 2, n: 'Agentic AI', l: 'LLM features shipped' },
      { id: 3, n: 'OSS', l: 'Rocket.Chat contributor' },
    ],
  },
  services: [
    {
      id: 1,
      icon: 'Layers',
      title: 'SaaS Platform Architecture & Build',
      outcome: 'A multi-tenant product built to scale.',
      deliverables: ['Multi-tenancy', 'RBAC', 'API-enforced entitlements', 'Subscription tiers', 'Config-driven logic'],
    },
    {
      id: 2,
      icon: 'Bot',
      title: 'AI & Agentic Features',
      outcome: 'LLM features grounded in your real data.',
      deliverables: ['Context-injected AI assistants', 'Agentic workflows', 'AI-guided forecasting', 'RAG-style grounding'],
    },
    {
      id: 3,
      icon: 'Server',
      title: 'Backend & API Development',
      outcome: 'Clean, documented, reliable APIs.',
      deliverables: ['NestJS / Node', 'PostgreSQL & MongoDB design', 'Auth', 'Pagination / filtering / search', 'Swagger docs'],
    },
    {
      id: 4,
      icon: 'Rocket',
      title: 'Full-Stack Product / MVP',
      outcome: 'Idea to deployed product.',
      deliverables: ['React front end', 'Dashboards', 'Admin panels', 'Integrations', 'Deployment'],
    },
    {
      id: 5,
      icon: 'Plug',
      title: 'Integrations & Automation',
      outcome: 'Your stack, connected.',
      deliverables: ['Payments', 'SendGrid email', 'WhatsApp / SMS', 'Calendar sync', 'SSO', 'Event-driven notifications', 'Audit trails'],
    },
  ],
  servicesNote: 'Fixed-price for defined scope, contract/hourly for ongoing work —',
  flagship: {
    title: 'Ember360',
    subtitle: 'Enterprise B2B SaaS',
    framing: 'A multi-tenant B2B platform for an enterprise entrepreneurship-development organization — managing assessment programmes, coaching, AI-guided financial forecasting, and ESG/SDG impact reporting end to end.',
    confidentialNote: 'Confidential client project — live walkthrough available on request.',
    pillars: [
      { id: 1, title: 'Multi-tenant hierarchy', desc: 'Corporate → Programme → Cohort → Entrepreneur, with two account models (fully-managed and self-serve licensed) and programme-scoped data isolation.' },
      { id: 2, title: 'API-enforced entitlements', desc: 'Per-client feature flags gating subscription tiers; disabled features return 403 at the API layer, not just hidden in the UI.' },
      { id: 3, title: 'Role-based access (5 roles)', desc: 'Dual onboarding: B2B invite flows and B2C self-registration with approval.' },
      { id: 4, title: 'Versioned assessment engine', desc: 'Config-driven question banks keyed by Assessment Type × Industry × Lifecycle Stage — versioned so edits never mutate historical data.' },
      { id: 5, title: 'Dual scoring engines', desc: 'Average-then-scale (spider diagrams + threshold classification) and sum-based compliance scoring (Investment Readiness %), with a store-raw / compute-display integrity rule.' },
      { id: 6, title: 'PRE/POST impact engine', desc: 'Timestamped baselines and multi-level deltas as the evidence layer for funders.' },
      { id: 7, title: 'Agentic AI Business Coach', desc: 'An LLM grounded by injecting each user\'s full assessment context — proactive, conversational, action-oriented coaching.' },
      { id: 8, title: 'AI-guided financial forecasting', desc: 'Configurable horizons and actuals-vs-forecast projections feeding the impact model.' },
      { id: 9, title: 'Analytics + reporting', desc: 'M&E dashboards and versioned PDF reports — individual, cohort, and ESG/SDG mapped to SDG 1–17.' },
      { id: 10, title: 'Integrations & notifications', desc: 'Event-driven multi-channel alerts (in-app, SendGrid, WhatsApp/SMS), Google Calendar sync, payments, SSO, and an immutable audit trail.' },
    ],
    techChips: ['NestJS', 'TypeORM', 'PostgreSQL', 'React', 'LLM / Agentic AI', 'SendGrid', 'WhatsApp / SMS', 'Google Calendar API', 'Payment Gateway', 'SSO'],
    roleLine: 'Backend & AI feature engineer — designed the data model, scoring engines, entitlement layer, and the AI coach integration.',
  },
  approach: [
    { id: 1, title: 'Model the domain first', desc: 'Turn business rules into a clear data model before writing features.' },
    { id: 2, title: 'Config over hardcoding', desc: 'Make behavior data-driven — feature flags, versioned content, thresholds — so the product flexes without redeploys.' },
    { id: 3, title: 'Enforce at the API layer', desc: 'Access and entitlements are server-side truth. Never trust the UI.' },
    { id: 4, title: 'Protect data integrity', desc: 'Store source-of-truth values, compute display values; version and audit anything that changes.' },
    { id: 5, title: 'Ground AI in real data', desc: 'LLM features are only as good as the context you feed them — I build the retrieval and context layer, not just the prompt.' },
  ],
  proof: {
    testimonials: [
      {
        id: 1,
        quote: '[EDIT: real testimonial — e.g. "Kalyan took our loose spec and turned it into a reliable, well-architected product. Communication was sharp throughout."]',
        name: '[EDIT: Client name]',
        role: '[EDIT: Role, Company]',
      },
      {
        id: 2,
        quote: '[EDIT: real testimonial — e.g. "The AI features he built actually use our data properly — not a demo, a product."]',
        name: '[EDIT: Client name]',
        role: '[EDIT: Role, Company]',
      },
    ],
    strip: [
      { id: 1, text: 'Merged PRs in Rocket.Chat — maintainer-reviewed open source', href: 'https://github.com/MrKalyanKing/MrKalyanKing' },
      { id: 2, text: 'GitHub — production code, public', href: 'https://github.com/MrKalyanKing/MrKalyanKing' },
      { id: 3, text: '260+ DSA solved', href: 'https://leetcode.com/u/Kalyanithin/' },
    ],
  },
  aboutStats: [
    { id: 1, n: '1', l: 'Enterprise B2B SaaS' },
    { id: 2, n: 'AI', l: 'Agentic / LLM features' },
    { id: 3, n: 'OSS', l: 'Rocket.Chat contributor' },
    { id: 4, n: '3+', l: 'Production builds' },
  ],
  aboutText: [
    "I help founders and product teams ship serious software: multi-tenant SaaS platforms, complex business logic, and AI features that are grounded in real product data. I work systems-first — data model, access control, and integrity rules before pixels — so what I build holds up as it grows.",
    "Day to day that means NestJS, PostgreSQL, React and the MERN stack, plus LLM/agentic integrations. I'm also an open-source contributor at Rocket.Chat, with dev internship experience and a CS degree from JNTU Hyderabad (2026)."
  ],
  timeline: [
    {
      id: 1,
      role: 'Open Source Contributor',
      company: 'Rocket.Chat',
      location: 'Remote',
      date: '2025 — Present',
      points: [
        'Shipped production-ready UI fixes, feature enhancements and refactors — multiple pull requests merged after maintainer review.',
        'Worked in a distributed team across GitHub issues, PRs, CI pipelines and code reviews, following GSoC-quality standards.',
      ],
      tags: ['React', 'TypeScript', 'CI/CD', 'Code Review'],
    },
    {
      id: 2,
      role: 'Full Stack Developer — Intern',
      company: 'EazyByts',
      location: 'Hyderabad',
      date: 'Jan 2025',
      points: [
        'Built scalable MERN frontend and backend features with REST APIs and core database workflows.',
        'Created a student dashboard with basic data analysis to track and present performance data.',
      ],
      tags: ['MERN', 'REST APIs', 'MongoDB', 'Dashboards'],
    },
    {
      id: 3,
      role: 'Full Stack Web Developer — Intern',
      company: 'Teachnook',
      location: 'Hyderabad',
      date: 'Nov 2023 — Jan 2024',
      points: [
        'Developed RESTful auth and role-based access APIs in Node.js / Express with JWT access + refresh tokens.',
        'Designed single-session login that invalidates previous sessions; improved API reliability through code reviews.',
      ],
      tags: ['Node.js', 'Express', 'JWT', 'Auth'],
    },
  ],
  techGroups: [
    {
      id: 'ai',
      label: 'AI / LLM',
      items: [
        { name: 'LLM Integration', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
        { name: 'Agentic Workflows', icon: 'https://cdn.simpleicons.org/dependabot/34d399' },
        { name: 'Prompt & Context Engineering', icon: 'https://cdn.simpleicons.org/googlegemini/8E75B2' },
      ]
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      items: [
        { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
        { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
        { name: 'TypeORM', icon: 'https://cdn.simpleicons.org/typeorm/FE0803' },
        { name: 'Socket.IO', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
      ]
    },
    {
      id: 'databases',
      label: 'Databases',
      items: [
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
      ]
    },
    {
      id: 'frontend',
      label: 'Frontend',
      items: [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      ]
    },
    {
      id: 'integrations',
      label: 'Integrations & Infra',
      items: [
        { name: 'SendGrid', icon: 'https://api.iconify.design/logos:sendgrid-icon.svg' },
        { name: 'Google Calendar', icon: 'https://cdn.simpleicons.org/googlecalendar/4285F4' },
        { name: 'Payments', icon: 'https://cdn.simpleicons.org/stripe/635BFF' },
        { name: 'SSO / JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      items: [
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
        { name: 'Sentry', icon: 'https://cdn.simpleicons.org/sentry/ffffff' },
        { name: 'SonarQube', icon: 'https://cdn.simpleicons.org/sonarqubeserver/4E9BCD' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
      ]
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Banking Transaction System',
      kind: 'Fintech · Backend',
      desc: 'A backend simulating real banking workflows — account creation, deposits, withdrawals and secure transfers — with ACID-like transaction handling via MongoDB sessions, atomic operations and rollback. Consistent across 100+ concurrent transactions.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: '#',
      live: '#',
      image: '/uploads/pasted-1782918501583-0.png'
    },
    {
      id: 2,
      title: 'Real-Time Ride Booking',
      kind: 'Full-Stack · Real-Time',
      desc: 'Full-stack ride-booking platform with real-time driver–rider matching over Socket.IO, OAuth, RBAC and live trip tracking. Optimized MongoDB schemas load-tested to 500+ concurrent users; Maps API cut response latency ~25%.',
      tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
      github: '#',
      live: '#',
      image: '/uploads/pasted-1782918602160-0.png'
    },
    {
      id: 3,
      title: 'Real-Time Fraud Prevention',
      kind: 'Security · Fintech',
      desc: 'Configurable risk-rule scoring engine — transaction velocity, anomaly detection and geolocation checks — that auto-flags, holds or blocks suspicious transactions in low latency, with a full audit trail for every decision.',
      tags: ['Node.js', 'MongoDB', 'Risk Rules', 'Audit Trail'],
      github: '#',
      live: '#',
      image: '/uploads/pasted-1782918625595-0.png'
    },
  ],
  dsaStats: [
    { id: 1, n: '150+', l: 'LeetCode', sub: 'DSA across all topics' },
    { id: 2, n: '110+', l: 'Hive Platform', sub: 'Structured problem solving' },
    { id: 3, n: '260+', l: 'Total Solved', sub: 'across both platforms' },
  ],
  socials: [
    { id: 'github', name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff', href: 'https://github.com/MrKalyanKing/MrKalyanKing' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M20.447%2020.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853%200-2.136%201.445-2.136%202.939v5.667H9.351V9h3.414v1.561h.046c.477-.9%201.637-1.85%203.37-1.85%203.601%200%204.267%202.37%204.267%205.455v6.286zM5.337%207.433c-1.144%200-2.063-.926-2.063-2.065%200-1.138.92-2.063%202.063-2.063%201.14%200%202.064.925%202.064%202.063%200%201.139-.925%202.065-2.064%202.065zm1.782%2013.019H3.555V9h3.564v11.452zM22.225%200H1.771C.792%200%200%20.774%200%201.729v20.542C0%2023.227.792%2024%201.771%2024h20.451C23.2%2024%2024%2023.227%2024%2022.271V1.729C24%20.774%2023.2%200%2022.222%200h.003z%22%2F%3E%3C%2Fsvg%3E', href: 'https://www.linkedin.com/in/kalyan-badhavath-7a4178281/' },
    { id: 'leetcode', name: 'LeetCode', icon: 'https://cdn.simpleicons.org/leetcode/FFA116', href: 'https://leetcode.com/u/Kalyanithin/' },
    { id: 'email', name: 'Email', icon: 'https://cdn.simpleicons.org/gmail/EA4335', href: 'mailto:badhavath.kalyan.nayak@gmail.com' },
  ]
};
