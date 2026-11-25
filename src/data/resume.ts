export type ProjectCategory = 'all' | 'fullstack' | 'python-backend';

export type AccentTone = 'cobalt' | 'emerald' | 'amber' | 'cyan' | 'indigo' | 'rose';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  stackLabel: string;
  year: string;
  accentTone: AccentTone;
  venue?: string;
  recognition?: string;
  repoUrl: string;
  repoDisplay: string;
  summary: string;
  highlights: string[];
  stack: string[];
  architectureNotes: {
    layer: string;
    detail: string;
  }[];
  hasInteractiveDemo?: boolean;
}

export type SkillCategory =
  | 'all'
  | 'languages'
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'tools'
  | 'concepts';

export interface SkillGroup {
  id: Exclude<SkillCategory, 'all'>;
  label: string;
  accentTone: AccentTone;
  items: string[];
  context: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'experience' | 'leadership';
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  highlight?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer?: string;
  accentTone: AccentTone;
  focus: string;
}

export const PROFILE = {
  name: 'Saurav Kumar',
  shortRole: 'Software Developer · MERN & Python',
  headlineLead: 'Building full-stack web products and',
  headlineAccent: 'reliable software tools.',
  location: 'Bangalore, Karnataka',
  phone: '+91 77648 35844',
  email: 'itssaurav13@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/saurav-kumar-a089ba25a',
  linkedinHandle: 'linkedin.com/in/saurav-kumar-a089ba25a',
  githubUrl: 'https://github.com/saurav-16',
  githubHandle: 'github.com/saurav-16',
  resumePath: '/assets/aistudio/Saurav_Kumar_Resume_74b961e2.pdf',
  summary:
    "2026 Computer Science graduate and MERN stack software developer. I built TalentHubb, a skill marketplace for college students, in a 24-hour hackathon and won 3rd place at TechXcelerate 2025 (BITS Pilani, Hyderabad). I enjoy turning ideas into working products, and I'm looking for an entry-level software developer role where I can keep building and learning on a real team.",
};

export const PROOF_METRICS = [
  {
    value: '3rd Place',
    label: 'TechXcelerate 2025',
    detail: 'BITS Pilani, Hyderabad',
    accentTone: 'amber' as AccentTone,
  },
  {
    value: '24 Hours',
    label: 'Hackathon Delivery',
    detail: 'Full-stack MERN marketplace',
    accentTone: 'cobalt' as AccentTone,
  },
  {
    value: '2026',
    label: 'B.E. Computer Science',
    detail: 'Software & systems engineering',
    accentTone: 'emerald' as AccentTone,
  },
  {
    value: '4 Projects',
    label: 'Engineering Builds',
    detail: 'MERN, REST APIs, Python & SQL',
    accentTone: 'indigo' as AccentTone,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'talenthubb',
    title: 'TalentHubb',
    subtitle: 'Skill Marketplace for College Students',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    stackLabel: 'MERN Stack',
    year: '2025',
    accentTone: 'cobalt',
    venue: 'TechXcelerate 2025 · BITS Pilani, Hyderabad',
    recognition: '3rd Place Winner',
    repoUrl: 'https://github.com/saurav-16',
    repoDisplay: 'github.com/saurav-16',
    summary:
      'Peer-to-peer platform enabling college students to showcase verified skills, connect with employers, and pick up freelance work—built and shipped from scratch within a 24-hour hackathon sprint.',
    highlights: [
      'Built a peer-to-peer platform where college students can showcase their skills, connect with employers and pick up freelance work.',
      'Developed the full stack with React.js, Node.js, Express.js and MongoDB.',
      'Worked with teammates to split tasks and prioritise features, and delivered a working product within 24 hours at TechXcelerate 2025.',
      'Won 3rd place at TechXcelerate 2025, held at BITS Pilani, Hyderabad.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    architectureNotes: [
      {
        layer: 'Client Interface',
        detail: 'React.js storefront for student skill profiles, project listings, and employer discovery.',
      },
      {
        layer: 'API & Routing',
        detail: 'Node.js and Express.js REST endpoints coordinating listings, profiles, and freelance workflows.',
      },
      {
        layer: 'Persistence',
        detail: 'MongoDB collections structured for student portfolios, skill tags, and employer connections.',
      },
    ],
  },
  {
    id: 'student-marks-analysis',
    title: 'Student Marks Analysis System',
    subtitle: 'Desktop Academic Records & CSV Export Utility',
    category: 'python-backend',
    categoryLabel: 'Python & Backend',
    stackLabel: 'Python · Tkinter · SQLite',
    year: '2025',
    accentTone: 'emerald',
    repoUrl: 'https://github.com/saurav-16',
    repoDisplay: 'github.com/saurav-16',
    summary:
      'Desktop application engineered to calculate grades and totals in real time across any number of subjects, manage student records, and export full datasets cleanly to CSV.',
    highlights: [
      'Created a desktop app that calculates grades and totals in real time for any number of subjects.',
      'Lets users add and delete student records and export everything to CSV.',
    ],
    stack: ['Python', 'Tkinter', 'SQLite', 'CSV Export'],
    architectureNotes: [
      {
        layer: 'Desktop UI',
        detail: 'Tkinter interface supporting dynamic multi-subject entry and immediate grade computation.',
      },
      {
        layer: 'Local Storage',
        detail: 'SQLite relational database storing student records with reliable add and delete operations.',
      },
      {
        layer: 'Data Portability',
        detail: 'One-click CSV export formatting student totals, percentages, and grades for reporting.',
      },
    ],
    hasInteractiveDemo: true,
  },
  {
    id: 'sprintboard-rest-workspace',
    title: 'SprintBoard Task Workspace',
    subtitle: 'Collaborative Issue & Sprint Tracker',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Web',
    stackLabel: 'React.js · Node.js · Express.js · MongoDB',
    year: '2024',
    accentTone: 'indigo',
    repoUrl: 'https://github.com/saurav-16',
    repoDisplay: 'github.com/saurav-16',
    summary:
      'Full-stack sprint planning web application built around Agile workflows—helping small development teams create, prioritize, filter, and track tasks across status columns.',
    highlights: [
      'Implemented RESTful CRUD routes in Node.js and Express.js with structured payload validation and clean status codes.',
      'Built responsive React.js views with priority filters, assignee tags, and instant status transitions.',
      'Verified API endpoints and error states with Postman test collections backed by MongoDB.',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Postman'],
    architectureNotes: [
      {
        layer: 'Frontend State',
        detail: 'React.js task board supporting status transitions and multi-criteria filtering.',
      },
      {
        layer: 'Express Service',
        detail: 'Modular Node.js and Express.js controllers verified via Postman test suites.',
      },
      {
        layer: 'Document Model',
        detail: 'MongoDB task documents indexed by sprint, priority, and workflow status.',
      },
    ],
  },
  {
    id: 'expense-ledger-api',
    title: 'ExpenseLedger REST Tracker',
    subtitle: 'Personal Finance API & Reporting App',
    category: 'python-backend',
    categoryLabel: 'Python & Backend',
    stackLabel: 'Python · Flask · MySQL · REST APIs',
    year: '2024',
    accentTone: 'amber',
    repoUrl: 'https://github.com/saurav-16',
    repoDisplay: 'github.com/saurav-16',
    summary:
      'Backend-first expense tracking service built with Python, Flask, and MySQL to categorize transactions, compute monthly category totals via SQL queries, and serve clean JSON APIs.',
    highlights: [
      'Designed normalized MySQL tables for expense categories, transactions, and monthly budget limits.',
      'Built Flask REST APIs with parameterized SQL queries, input validation, and structured JSON responses.',
      'Added category-wise aggregation summaries and CSV statement exports for quick monthly reviews.',
    ],
    stack: ['Python', 'Flask', 'MySQL', 'REST APIs', 'SQL'],
    architectureNotes: [
      {
        layer: 'API Layer',
        detail: 'Flask routes handling transaction creation, filtering by date range, and category rollups.',
      },
      {
        layer: 'Relational Schema',
        detail: 'MySQL tables with foreign-key constraints and indexed timestamps for fast monthly queries.',
      },
      {
        layer: 'Reporting',
        detail: 'Server-side SQL aggregations generating category totals and downloadable summaries.',
      },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    accentTone: 'cobalt',
    items: ['JavaScript', 'Python', 'C++', 'SQL'],
    context: 'Core programming languages for web apps, backend services, DSA, and database queries.',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accentTone: 'indigo',
    items: ['React.js', 'HTML5', 'CSS3', 'Bootstrap'],
    context: 'Component-driven user interfaces, semantic markup, and responsive layouts.',
  },
  {
    id: 'backend',
    label: 'Backend',
    accentTone: 'emerald',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Flask'],
    context: 'Server-side routing, API architecture, request validation, and business logic.',
  },
  {
    id: 'databases',
    label: 'Databases',
    accentTone: 'cyan',
    items: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'],
    context: 'Document databases, relational SQL schemas, embedded storage, and cloud persistence.',
  },
  {
    id: 'tools',
    label: 'Tools',
    accentTone: 'amber',
    items: ['Git', 'GitHub', 'Postman', 'VS Code'],
    context: 'Version control, collaborative branching, API testing, and daily development workflow.',
  },
  {
    id: 'concepts',
    label: 'Core Concepts',
    accentTone: 'rose',
    items: ['Data Structures and Algorithms', 'OOP', 'DBMS', 'Agile basics'],
    context: 'Computer science fundamentals applied in problem solving and team product sprints.',
  },
];

export const FAMILIAR_WITH_SKILLS = ['TensorFlow', 'scikit-learn', 'OpenCV'];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'nextnation',
    role: 'Immigration Consultant',
    organization: 'NextNation',
    period: 'Jul 2026 – Sep 2026',
    type: 'experience',
    bullets: [
      'Advised clients on visa and immigration options for study, work and migration, based on their profile and goals.',
      'Guided clients through the application process and checked forms and supporting documents for completeness.',
      'Answered client questions and followed up on application progress to keep clients informed at every step.',
    ],
  },
  {
    id: 'sas-sales',
    role: 'Trainee Manager',
    organization: 'SAS Sales Group',
    period: 'May 2026 – Jun 2026',
    type: 'experience',
    bullets: [
      'Handled field sales in an assigned territory, talking to prospective customers and closing sales.',
      'Trained new team members on the sales process and product knowledge, and tracked daily targets for a small team.',
    ],
  },
  {
    id: 'iei-microsoft',
    role: 'Vice President',
    organization: 'IE(I) Student Chapter and Microsoft Club',
    period: 'Campus Leadership',
    type: 'leadership',
    bullets: [
      'Organised events and coordinated the team behind them, which kept members engaged and everything running on schedule.',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'sathyabama',
    degree: 'B.E., Computer Science and Engineering (IoT Specialization)',
    institution: 'Sathyabama Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    period: '2022 – 2026',
  },
  {
    id: 'class-12',
    degree: 'Class 12',
    institution: 'Terisa International Academy',
    location: 'Patna, Bihar',
    period: '2020 – 2022',
  },
  {
    id: 'class-10',
    degree: 'Class 10',
    institution: 'New Era High School',
    location: 'Patna, Bihar',
    period: 'Secondary School',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'jpmorgan',
    title: 'Cybersecurity Job Simulation',
    issuer: 'J.P. Morgan (Forage)',
    accentTone: 'cobalt',
    focus: 'Practical security workflows and vulnerability assessment exercises.',
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    accentTone: 'emerald',
    focus: 'Supervised and unsupervised learning fundamentals with Python tooling.',
  },
  {
    id: 'dbms',
    title: 'Database Management System',
    accentTone: 'cyan',
    focus: 'Relational schema design, normalization, indexing, and SQL querying.',
  },
  {
    id: 'remote-sensing',
    title: 'Remote Sensing',
    accentTone: 'amber',
    focus: 'Spatial imagery analysis and environmental data interpretation.',
  },
];
