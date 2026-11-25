Saurav Kumar — Software Developer Portfolio
Personal portfolio website for Saurav Kumar, a 2026 Computer Science & Engineering graduate and full-stack software developer based in Bangalore, India.
Features
Hero & Featured Work Spotlight: Interactive tab switcher highlighting flagship builds (TalentHubb and Student Marks Analysis System) with case study modals and a live calculator preview.
Selected Engineering Projects: Filterable showcase (All Projects, Full-Stack Web, Python & Backend) covering:
TalentHubb — Peer-to-peer student skill marketplace built with the MERN stack (3rd Place at TechXcelerate 2025, BITS Pilani Hyderabad).
Student Marks Analysis System — Python, Tkinter, and SQLite grade management app, paired with an interactive browser-based marks & CSV export demo (MarksDemoWidget).
SprintBoard Task Workspace — Full-stack Kanban & sprint workspace built with React.js, Node.js, Express.js, and MongoDB.
ExpenseLedger REST Tracker — Backend-first expense tracking REST API built with Python, Flask, and MySQL.
Technical Stack & Foundations: Filterable skills grid covering Languages, Frontend, Backend, Databases, Tools (Git, GitHub, Postman, VS Code), Core Concepts (Data Structures and Algorithms, OOP, DBMS, Agile basics), and familiarity with TensorFlow, scikit-learn, and OpenCV.
Experience, Leadership, Education & Certifications: Timeline of industry experience, campus leadership (Vice President, IE(I) Student Chapter & Microsoft Club), academic background, and completed certifications.
Resume Sheet & PDF Download: Formatted in-app resume modal with direct PDF view and download.
Contact Section: Validated contact form with one-click email and phone copy actions.
Motion & Accessibility: Smooth transitions powered by motion/react with prefers-reduced-motion support and responsive mobile navigation.
Tech Stack
Framework: React 19 + TypeScript
Build Tool: Vite 8
Styling: Tailwind CSS v4
Animations: Motion (motion/react)
Icons: Lucide React (lucide-react)
Testing: Node.js built-in test runner (node:test) via tsx
Project Structure
Text
├── index.html
├── metadata.json
├── package.json
├── public/
│   └── assets/                  # Resume PDF asset
└── src/
    ├── App.tsx                  # Root layout and modal state
    ├── index.css                # Tailwind CSS entry & theme tokens
    ├── main.tsx                 # React DOM mount
    ├── data/
    │   └── resume.ts            # Portfolio content, projects, skills, and experience
    ├── utils/
    │   ├── portfolio.ts         # Filtering, grading, CSV export, and form validation helpers
    │   ├── portfolio.test.ts    # Unit tests for core utility logic
    │   └── themeTones.ts        # Accent palette helpers
    └── components/
        ├── Navbar.tsx
        ├── HeroSection.tsx
        ├── MarqueeRibbon.tsx
        ├── ProjectsSection.tsx
        ├── ProjectModal.tsx
        ├── MarksDemoWidget.tsx
        ├── SkillsSection.tsx
        ├── ExperienceEducationSection.tsx
        ├── ResumeModal.tsx
        ├── ContactSection.tsx
        └── Footer.tsx
Getting Started
Prerequisites
Node.js 20+
npm
Installation & Local Development
Bash
npm install
npm run dev
The development server runs at http://localhost:3000.
Available Scripts
Command	Description
npm run dev	Starts the Vite dev server on port 3000
npm run build	Builds the production bundle into dist/
npm run preview	Previews the production build locally
npm run lint	Runs TypeScript type-checking (tsc --noEmit)
npx tsx --test src/utils/portfolio.test.ts	Runs unit tests for filtering, grade math, CSV generation, and form validation
Contact
Email: itssaurav13@gmail.com
GitHub: github.com/saurav-16
LinkedIn: linkedin.com/in/saurav-kumar-a089ba25a

<img width="1901" height="907" alt="Screenshot 2026-11-26 045451" src="https://github.com/user-attachments/assets/62df8372-bb43-494a-941e-586af4dbb306" />
<img width="1897" height="903" alt="Screenshot 2026-11-26 045436" src="https://github.com/user-attachments/assets/bdae0824-ac58-46a3-afc1-f823ad04015c" />
<img width="1900" height="902" alt="Screenshot 2026-11-26 045422" src="https://github.com/user-attachments/assets/e1d4d09d-3345-43f7-a12d-eef0a3560308" />
<img width="1896" height="907" alt="Screenshot 2026-11-26 045408" src="https://github.com/user-attachments/assets/63063f6e-6b4f-47f7-b0b4-fdf4a70fa3a0" />
<img width="1901" height="907" alt="Screenshot 2026-11-26 045350" src="https://github.com/user-attachments/assets/f559cd44-b879-49e5-808c-ac7640d4c3dc" />
