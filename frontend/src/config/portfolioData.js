export const portfolioConfig = {
  theme: {
    accent: '#34d399',
    showGrid: true,
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Stack', href: '#stack' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    name: "Kalyan  Badhavath",
    firstName: "Kalyan Nayak ",
    lastName: "Badhavath",
    role: "SDE · OSS Contributor",
    description: "I build scalable backends, real-time systems and open-source software — with the MERN stack, NestJS and a problem-solver's eye for clean, reliable code.",
    availableForWork: true,
    badges: [
      { id: 1, text: '⚡ 500+ concurrent users' },
      { id: 2, text: '🚀 Real-time systems' }
    ],
    codeSnippet: {
      role: "SDE · OSS Contributor",
      stack: ["Node", "Nest", "React"],
      solved: "150+ DSA",
      ships: "production code"
    }
  },
  aboutStats: [
    { id: 1, n: '2+', l: 'Dev internships' },
    { id: 2, n: '150+', l: 'DSA problems' },
    { id: 3, n: '3', l: 'Flagship builds' },
    { id: 4, n: 'OSS', l: 'Rocket.Chat' },
  ],
  aboutText: [
    "I'm a full-stack developer focused on building efficient, scalable backends and real-time systems. I work day-to-day across the MERN stack and NestJS — designing REST APIs, modelling databases, and shipping features that hold up under load.",
    "Beyond client work, I contribute production-ready code to Rocket.Chat, a large-scale open-source platform, and sharpen my fundamentals with 260+ solved DSA problems. I like turning complex problems into clean, reliable software."
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
      id: 'frontend',
      label: 'Frontend',
      items: [
        { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
        { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
      ]
    },
    {
      id: 'backend',
      label: 'Backend & APIs',
      items: [
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
        { name: 'NestJS', icon: 'https://cdn.simpleicons.org/nestjs/E0234E' },
        { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
        { name: 'Socket.IO', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
        { name: 'JWT', icon: 'https://cdn.simpleicons.org/jsonwebtokens/ffffff' },
      ]
    },
    {
      id: 'databases',
      label: 'Databases',
      items: [
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
        { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
      ]
    },
    {
      id: 'tools',
      label: 'Languages & Tools',
      items: [
        { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/ffffff' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
        { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff' },
        { name: 'Postman', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
        { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
      ]
    },

  ],
  projects: [
    {
      id: 1,
      title: 'Banking Transaction Simulation',
      kind: 'Fintech · Backend',
      desc: 'A backend simulating real banking workflows — account creation, deposits, withdrawals and secure transfers — with ACID-like transaction handling via MongoDB sessions, atomic operations and rollback. Load-tested with 100+ concurrent transactions.',
      tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      github: '#',
      live: '#',
      image: '/uploads/pasted-1782918501583-0.png'
    },
    {
      id: 2,
      title: 'Real-Time Ride Booking',
      kind: 'Full-Stack · Real-Time',
      desc: 'Full-stack ride-booking platform with real-time driver–rider matching over Socket.IO, automated fare calculation and live trip tracking. Optimized MongoDB schemas support 500+ concurrent users; Maps API cut response latency ~25%.',
      tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
      github: '#',
      live: '#',
      image: '/uploads/pasted-1782918602160-0.png'
    },
    {
      id: 3,
      title: 'Ember360 — Coaching SaaS',
      kind: 'SaaS · Backend',
      desc: 'Entrepreneur growth & coaching SaaS. A NestJS + TypeORM + PostgreSQL backend for program administration, coach assignments and assessment workflows — with role-based access, configurable question banks and full Swagger API docs.',
      tags: ['React', 'NestJS', 'PostgreSQL', 'TypeORM'],
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
    { id: 'github', name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/ffffff', href: '#' },
    { id: 'linkedin', name: 'LinkedIn', icon: 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ffffff%22%3E%3Cpath%20d%3D%22M20.447%2020.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853%200-2.136%201.445-2.136%202.939v5.667H9.351V9h3.414v1.561h.046c.477-.9%201.637-1.85%203.37-1.85%203.601%200%204.267%202.37%204.267%205.455v6.286zM5.337%207.433c-1.144%200-2.063-.926-2.063-2.065%200-1.138.92-2.063%202.063-2.063%201.14%200%202.064.925%202.064%202.063%200%201.139-.925%202.065-2.064%202.065zm1.782%2013.019H3.555V9h3.564v11.452zM22.225%200H1.771C.792%200%200%20.774%200%201.729v20.542C0%2023.227.792%2024%201.771%2024h20.451C23.2%2024%2024%2023.227%2024%2022.271V1.729C24%20.774%2023.2%200%2022.222%200h.003z%22%2F%3E%3C%2Fsvg%3E', href: '#' },
    { id: 'leetcode', name: 'LeetCode', icon: 'https://cdn.simpleicons.org/leetcode/FFA116', href: '#' },
    { id: 'email', name: 'Email', icon: 'https://cdn.simpleicons.org/gmail/EA4335', href: 'mailto:badhavath.kalyan.nayak@gmail.com' },
  ]
};
