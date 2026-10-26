# particles-portfolio-

# Harpinder Singh — Cybersecurity & Digital Forensics Analyst Portfolio

Interactive 3D particle portfolio showcasing cybersecurity projects, technical forensics investigations, and security assessments. Built with Three.js WebGL particle simulations, custom GLSL shaders, React Server Components (Next.js), and Lenis smooth scrolling.

---

## 🌟 Highlights & Features

- **Dynamic 3D Particle Scene**: 
  - Real-time morphing particle system in WebGL (Three.js & custom GLSL shaders).
  - Transitions through: **Harpinder Singh Face Portrait** → **Interactive Rotating Globe** → **Official Survey of India Map** (with complete Jammu & Kashmir, Ladakh, PoK, and Aksai Chin boundaries) → **Project Viewport**.
  - Interactive physics with cursor turbulence, pointer attraction, and scroll velocity dynamics.
- **My Projects (Interactive Showcase)**:
  - **01 / NLA Engine**: Financial OSINT & network analysis framework ([Live Demo](https://nla-engine.onrender.com/)).
  - **02 / Cyber Cell CDR**: Telecom forensics for CDR (Call Detail Record) & IPDR analysis ([Live Demo](https://cyber-cell-cdr.onrender.com/)).
  - **03 / GhostNet**: Cybersecurity investigation and threat detection system ([Live Demo](https://ghostnet-1.onrender.com/)).
  - **04 / IP Changer**: Automated Tor-based IP address rotation utility in Bash ([GitHub](https://github.com/harpind3r/ip-changer)).
  - **05 / Get Location**: Security awareness tool demonstrating browser geolocation permissions ([GitHub](https://github.com/harpind3r/Get-location)).
  - **06 / Wireless Security Lab**: Wi-Fi 4-way handshake capture and rogue Evil Twin access point demonstration with **seamless looping demonstration video** (`Evil twin attack.MP4`).
  - **07 / Ransomware Home Lab**: Isolated virtualization environment simulating ransomware attack vectors and Metasploit penetration testing with **seamless looping demonstration video** (`Ransomware attack.MP4`).
- **My Work & Experience**:
  - **Founder & Technical Operations Head | Beeskilled** (AICTE-Listed E-Learning Platform): Managed backend operations, server uptime, and account provisioning for 10,000+ students; enforced secure access control policies.
  - **Web Application Security Assessment | SkillNexis** (`skillnexis.in`): Identified and responsibly disclosed High-severity authentication bypass via client storage and exposed administrative password hashes, providing remediation roadmaps.
- **Glassmorphic Navigation Bar**: Direct shortcuts to Projects, My Work, GitHub, TryHackMe, LinkedIn, and Résumé PDF.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v22 or newer.
- No external heavy dependencies required (zero-install lightweight server runtime).

### Development Server

Start the development server with live asset serving:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) or [http://127.0.0.1:3000](http://127.0.0.1:3000).

### Production Build

Build the static output and SHA-256 asset manifest into `dist/`:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Verification & Automated Checks

Run the automated test suite to verify project assets, flight payloads, and integrity:

```bash
node scripts/check-personalization.mjs
npm run check
```

---

## 📂 Project Structure

```text
├── public/                 # Static browser assets & flight payloads
│   ├── assets/
│   │   ├── projects/       # Optimized project previews, videos & favicon
│   │   ├── RESUME.pdf      # Harpinder Singh Résumé
│   │   └── projects.json   # Structured project metadata
│   ├── india.bin           # Particle dataset for India map (full boundary)
│   ├── portrait.bin        # Particle dataset for face portrait
│   ├── personal.css        # Clean styling tokens & My Work section
│   └── personal-links.js   # Dynamic navigation & Lenis scroll bindings
├── scripts/
│   ├── personalize-content.mjs  # Automation pipeline for project personalization
│   ├── check-personalization.mjs # Test assertions for personalization integrity
│   └── build.mjs          # Dist builder and SHA-256 manifest generator
├── docs/research/          # Research, GeoJSON maps, and asset evidence
├── server.mjs              # Node.js HTTP server supporting range requests for videos
└── package.json            # Scripts & project configuration
```

---

## 🛡️ Security & Profiling

- **LinkedIn**: [Harpinder Singh](https://www.linkedin.com/in/harpinder-singh-324886402/)
- **GitHub**: [@harpind3r](https://github.com/harpind3r)
- **TryHackMe**: [VENOM.WHO](https://tryhackme.com/p/VENOM.WHO)
- **Email**: harpindersinghhs8696@gmail.com

---

© 2026 Harpinder Singh. All rights reserved.
