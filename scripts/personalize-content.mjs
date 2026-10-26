import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
import path from 'node:path';

const projects = [
  ['nla-engine','NLA Engine','Financial OSINT · Network analysis','https://nla-engine.onrender.com/','01 / ANALYSIS'],
  ['cyber-cell-cdr','Cyber Cell CDR','CDR & IPDR · Telecom forensics','https://cyber-cell-cdr.onrender.com/','02 / FORENSICS'],
  ['ghostnet','GhostNet','Cybersecurity project','https://ghostnet-1.onrender.com/','03 / SECURITY'],
  ['ip-changer','IP Changer','Tor-based IP rotation · Bash','https://github.com/harpind3r/ip-changer','04 / AUTOMATION'],
  ['get-location','Get Location','Browser permission awareness · Flask','https://github.com/harpind3r/Get-location','05 / AWARENESS'],
  ['wireless-security-lab','Wireless Security Lab','Wi-Fi handshake & Evil Twin lab','https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-ethicalhacking-activity-7514644215507800064-bFMb','06 / WIRELESS'],
  ['ransomware-homelab','Ransomware Home Lab','Isolated virtual lab · Metasploit','https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-homelab-ethicalhacking-activity-7470407225866588160-0LO9','07 / HOME LAB'],
  ['digital-forensics-case-b4dm755','Digital Forensics Case B4DM755','DFIR Investigation · Evidence analysis','https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-digitalforensics-dfir-activity-7515755026091376640-pFI5','08 / CASE STUDY'],
].map(([slug,title,tagline,href,info])=>({
  slug,title,tagline,href,info,
  year:'',
  video: slug === 'ransomware-homelab' ? '/assets/projects/Ransomware attack.MP4' : 
         slug === 'wireless-security-lab' ? '/assets/projects/Evil twin attack.MP4' : 
         slug === 'digital-forensics-case-b4dm755' ? '/assets/projects/Digital Forensics Case B4DM755..MP4' : '',
  image:`/assets/projects/${slug}.jpg`,
  description:[tagline],stack:[],stackNote:'',
  collaboration:'Personal project by Harpinder Singh.',partner:'',partnerUrl:''
}));

await mkdir('public/assets/projects',{recursive:true});
await writeFile('public/assets/projects.json', JSON.stringify(projects,null,2));

const replacements=[
 ['I turn ambitious designs into fast, interactive web experiences. Frontend, motion and performance for agencies, designers and creative teams.','Cybersecurity and digital forensics portfolio of Harpinder Singh. Network traffic analysis, OSINT, SIEM monitoring, practical security projects and labs.'],
 ['Daniel Ingrassia','Harpinder Singh'],
 ['DANIEL INGRASSIA','HARPINDER SINGH'],
 ['Creative Frontend Developer','Cybersecurity & Digital Forensics Analyst'],
 ['hello@ingrassiadaniel.it','harpindersinghhs8696@gmail.com'],
 ['Based in Italy','Based in India'],
 ['https://www.linkedin.com/in/daniel-ingrassia-71a874188/','https://www.linkedin.com/in/harpinder-singh-324886402/'],
 ['I turn ambitious designs into fast, interactive web experiences. Frontend, motion, performance - as a technical partner for agencies, designers and creative teams.','I explore cybersecurity and digital forensics through practical projects, security labs and investigation tools. Turning technical curiosity into hands-on analysis.'],
 ['I don’t just execute what’s handed to me - I bring my own creative instinct into the mix, pushing interactions, animation and visual ideas wherever they’d genuinely elevate the work.','I learn by investigating how systems work, testing them in controlled environments, and building tools that make security analysis clearer.'],
 [' - VAT/P.IVA 04872350279',''],
 [' - VAT/P.IVA ',''],
 ['Some Selected Works','My Projects'],
 ['SOME SELECTED WORKS','MY PROJECTS']
];

function replaceText(s){
  for(const [a,b] of replacements) s = s.replaceAll(a,b);
  return s;
}

function transformFlight(s){
  const key='"projects":['; 
  let start=s.indexOf(key);
  if(start<0) return replaceText(s);
  start += key.length-1;
  let depth=0,quoted=false,esc=false,end=start;
  for(;end<s.length;end++){
    const c=s[end];
    if(quoted){if(esc)esc=false;else if(c==='\\')esc=true;else if(c==='"')quoted=false;}
    else if(c==='"')quoted=true;
    else if(c==='[')depth++;
    else if(c===']'&&--depth===0){end++;break;}
  }
  return replaceText(s.slice(0,start)+JSON.stringify(projects)+s.slice(end));
}

const myWorkSectionHtml = `<section id="my-work" class="my-work-section">
<div class="my-work-container">
  <div class="my-work-header">
    <span class="my-work-kicker">02 / EXPERIENCE &amp; SECURITY ASSESSMENTS</span>
    <h2 class="my-work-title">My Work</h2>
    <p class="my-work-desc">Selected technical leadership, hands-on DFIR investigation case studies, and responsible vulnerability disclosures.</p>
  </div>

  <div class="my-work-grid">
    <!-- 1. Beeskilled -->
    <article class="work-card">
      <div class="work-card-top">
        <span class="work-badge badge-ops">FOUNDER &amp; TECHNICAL OPERATIONS</span>
        <span class="work-period">2024 — Present</span>
      </div>
      <div class="work-title-wrap">
        <h3 class="work-role">Founder &amp; Technical Operations Head</h3>
        <div class="work-org">
          <span class="work-org-name">Beeskilled</span>
          <span class="work-tag">(AICTE-Listed E-Learning Platform)</span>
          <a href="https://beeskilled.com" target="_blank" rel="noopener noreferrer" class="work-link">Visit Website ↗</a>
        </div>
      </div>
      <ul class="work-points">
        <li>Managed backend operations, high-availability server uptime, and user account provisioning architecture for <strong>10,000+ students</strong>.</li>
        <li>Implemented secure access policies, RBAC access governance, and resolved complex login, authentication, and technical incidents.</li>
      </ul>
    </article>

    <!-- 2. Digital Forensics Case B4DM755 -->
    <article class="work-card">
      <div class="work-card-top">
        <span class="work-badge badge-dfir">CASE STUDY / DFIR INVESTIGATION</span>
        <span class="work-period">Case #B4DM755</span>
      </div>
      <div class="case-study-layout">
        <div class="case-study-media">
          <div class="case-video-wrapper">
            <video src="/assets/projects/Digital Forensics Case B4DM755..MP4" autoPlay loop muted playsInline preload="metadata" class="case-video"></video>
            <div class="case-video-badge">LIVE DFIR LAB REPLAY</div>
          </div>
        </div>
        <div class="case-study-body">
          <h3 class="work-role">Digital Forensics Case B4DM755</h3>
          <p class="case-desc">Compromised system triage, evidence acquisition, root-cause identification, and forensic report documentation.</p>
          <ul class="work-points">
            <li><strong>Evidence Analysis:</strong> Reconstructed chronological attack timeline through volatile memory extraction, prefetch inspection, and auth log audits.</li>
            <li><strong>Compromise Identification:</strong> Isolated malicious reverse-shell persistence vectors and unauthorized lateral movement attempts.</li>
            <li><strong>Remediation Reporting:</strong> Authored comprehensive incident report detailing IOCs, attack telemetry, and hardening countermeasures.</li>
          </ul>
          <div class="case-study-cta">
            <a href="https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-digitalforensics-dfir-activity-7515755026091376640-pFI5" target="_blank" rel="noopener noreferrer" class="work-link work-link-accent">Watch Walkthrough on LinkedIn ↗</a>
          </div>
        </div>
      </div>
    </article>

    <!-- 3. SkillNexis Security Assessment -->
    <article class="work-card">
      <div class="work-card-top">
        <span class="work-badge badge-vuln">SECURITY ASSESSMENT &amp; DISCLOSURE</span>
        <span class="work-period">skillnexis.in</span>
      </div>
      <div class="work-title-wrap">
        <h3 class="work-role">SkillNexis</h3>
        <div class="work-org">
          <span class="work-org-name">Web Application Security Assessment</span>
          <a href="https://skillnexis.in" target="_blank" rel="noopener noreferrer" class="work-link">skillnexis.in ↗</a>
        </div>
      </div>

      <div class="vuln-grid">
        <div class="vuln-card">
          <div class="vuln-card-head">
            <span class="vuln-idx">01</span>
            <h4 class="vuln-name">Authentication Bypass via Cookie/Storage Manipulation</h4>
            <span class="vuln-pill pill-high">HIGH</span>
          </div>
          <div class="vuln-meta-row">
            <span class="vuln-label">RISK</span>
            <p class="vuln-text">Client-side authentication controls could potentially be manipulated to bypass login and access protected resources.</p>
          </div>
          <div class="vuln-meta-row">
            <span class="vuln-label">RECOMMENDED FIX</span>
            <p class="vuln-text">Implement server-side authentication and authorization, validate sessions on every protected request, and securely configure session cookies.</p>
          </div>
          <div class="vuln-status-wrap">
            <span class="status-indicator"></span>
            <span class="status-msg">Reported; fix confirmation pending</span>
          </div>
        </div>

        <div class="vuln-card">
          <div class="vuln-card-head">
            <span class="vuln-idx">02</span>
            <h4 class="vuln-name">Hardcoded Administrative Password Hash</h4>
            <span class="vuln-pill pill-high">HIGH</span>
          </div>
          <div class="vuln-meta-row">
            <span class="vuln-label">RISK</span>
            <p class="vuln-text">Exposed password hash could potentially be cracked, leading to administrative account compromise if the password is recovered and remains valid.</p>
          </div>
          <div class="vuln-meta-row">
            <span class="vuln-label">RECOMMENDED FIX</span>
            <p class="vuln-text">Remove hardcoded credential material, rotate affected credentials, use Argon2id/bcrypt for password hashing, and audit administrative access.</p>
          </div>
          <div class="vuln-status-wrap">
            <span class="status-indicator"></span>
            <span class="status-msg">Reported; fix confirmation pending</span>
          </div>
        </div>
      </div>

      <div class="outcome-banner">
        <span class="outcome-shield">🛡️</span>
        <div class="outcome-text">
          <strong>Outcome:</strong> Two security vulnerabilities identified and reported, with remediation recommendations provided.
        </div>
      </div>
    </article>
  </div>
</div>
</section>`;

const fontHeadLinks = `<link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"/>`;

async function walk(dir){
  for(const e of await readdir(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()){await walk(p);continue;}
    if(!/\.(html|rsc|js)$/.test(p)||p.endsWith('1stl4ykwpf_a2.js')||p.endsWith('personal-links.js'))continue;
    let s=await readFile(p,'utf8');
    
    if(p.endsWith('.html')){
      s=s.replace(/self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g,(all,json)=>{
        try{
          const a=JSON.parse(json);
          if(typeof a[1]==='string') a[1]=transformFlight(a[1]);
          return 'self.__next_f.push('+JSON.stringify(a)+')</script>';
        }catch{return all;}
      });
      s=replaceText(s);
      
      // Update favicon links
      s=s.replace(/<link rel="icon" href="[^"]*"\s*sizes="[^"]*"\s*type="[^"]*"\/>/, 
        '<link rel="icon" type="image/jpeg" href="/assets/projects/fevicon.jpeg"/><link rel="apple-touch-icon" href="/assets/projects/fevicon.jpeg"/>');
      
      // Inject or replace My Work section
      if(s.includes('id="my-work"')){
        s=s.replace(/<section id="my-work"[\s\S]*?<\/section>/, myWorkSectionHtml);
      } else {
        s=s.replace('<div class="page-module-scss-module__qnDekq__contactsWrap">', `${myWorkSectionHtml}<div class="page-module-scss-module__qnDekq__contactsWrap">`);
      }
      
      // Fonts and external styles/scripts
      if(!s.includes('fonts.googleapis.com')){
        s=s.replace('</head>', `${fontHeadLinks}</head>`);
      }
      if(!s.includes('/personal-links.js')){
        s=s.replace('</head>','<link rel="stylesheet" href="/personal.css"/></head>').replace('</body>','<script src="/personal-links.js" defer></script></body>');
      }
      // Replace D monogram with H monogram in HTML
      s=s.replace(/<svg viewBox="0 0 686 850" aria-hidden="true" class="monogram-module-scss-module__K070Ja__monogram">[\s\S]*?<\/svg>/, 
        `<svg viewBox="0 0 686 850" aria-hidden="true" class="monogram-module-scss-module__K070Ja__monogram"><g class="monogram-module-scss-module__K070Ja__swirl"><path d="M 145,140 C 135,140 125,148 125,158 L 125,692 C 125,702 135,710 145,710 L 225,710 C 235,710 245,702 245,692 L 245,475 L 441,475 L 441,692 C 441,702 451,710 461,710 L 541,710 C 551,710 561,702 561,692 L 561,158 C 561,148 551,140 541,140 L 461,140 C 451,140 441,148 441,158 L 441,375 L 245,375 L 245,158 C 245,148 235,140 225,140 Z"></path></g><g class="monogram-module-scss-module__K070Ja__mark"><circle cx="343" cy="425" r="72" class="monogram-module-scss-module__K070Ja__markCircle"></circle><path d="M 343,330 A 95,95 0 1 0 343,520 A 95,95 0 1 0 343,330 Z" class="monogram-module-scss-module__K070Ja__markPath"></path></g></svg>`);
    } else if(p.endsWith('.rsc')){
      s=transformFlight(s);
    } else {
      s=replaceText(s);
    }
    
    if(p.endsWith('0w7o8fu3bnjrw.js')){
      s=s.replace(
        /\(0,e\.jsxs\)\("svg",\{viewBox:"0 0 686 850"[\s\S]*?className:o\.default\.markCircle\}\)\]\}\)\]\}/,
        '(0,e.jsxs)("svg",{viewBox:"0 0 686 850","aria-hidden":"true",className:o.default.monogram,children:[(0,e.jsx)("g",{className:o.default.swirl,children:(0,e.jsx)("path",{d:"M 145,140 C 135,140 125,148 125,158 L 125,692 C 125,702 135,710 145,710 L 225,710 C 235,710 245,702 245,692 L 245,475 L 441,475 L 441,692 C 441,702 451,710 461,710 L 541,710 C 551,710 561,702 561,692 L 561,158 C 561,148 551,140 541,140 L 461,140 C 451,140 441,148 441,158 L 441,375 L 245,375 L 245,158 C 245,148 235,140 225,140 Z"})}),(0,e.jsxs)("g",{className:o.default.mark,children:[(0,e.jsx)("circle",{cx:"343",cy:"425",r:"72",className:o.default.markCircle}),(0,e.jsx)("path",{d:"M 343,330 A 95,95 0 1 0 343,520 A 95,95 0 1 0 343,330 Z",className:o.default.markPath})]})]}'
      );
    }

    if(p.endsWith('1tzay28hfjym9.js')){
      s=s.replaceAll('href:`/projects/${e.slug}`','href:e.href').replaceAll('onClick:z(`/projects/${e.slug}`)','target:"_blank",rel:"noopener noreferrer"');
      s=s.replace('children:"Some Selected Works"', 'children:"My Projects"');
      
      // Support video loops (e.g. Ransomware attack, Evil twin, Digital forensics case) or images
      s=s.replace(
        '(0,t.jsx)(f,{video:e.video,className:g.default.tileMedia,energyRef:b})',
        'e.video?(0,t.jsx)("video",{src:e.video,className:g.default.tileMedia+" personal-project-image",autoPlay:!0,loop:!0,muted:!0,playsInline:!0}):(0,t.jsx)("img",{src:e.image,alt:e.title,className:g.default.tileMedia+" personal-project-image",loading:"lazy"})'
      );
      s=s.replace(
        '(0,t.jsx)("img",{src:e.image,alt:e.title,className:g.default.tileMedia+" personal-project-image",loading:"lazy"})',
        'e.video?(0,t.jsx)("video",{src:e.video,className:g.default.tileMedia+" personal-project-image",autoPlay:!0,loop:!0,muted:!0,playsInline:!0}):(0,t.jsx)("img",{src:e.image,alt:e.title,className:g.default.tileMedia+" personal-project-image",loading:"lazy"})'
      );
      s=s.replace('let r=e.map(e=>e.video),n=','let r=e.map(e=>e.video).filter(Boolean),n=');
    }
    
    await writeFile(p,s);
  }
}

await walk('public');
console.log('Personalized project cards with 8 projects, video loops, upgraded My Work section, Google fonts, and favicon.');
