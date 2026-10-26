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
].map(([slug,title,tagline,href,info])=>({
  slug,title,tagline,href,info,
  year:'',
  video: slug === 'ransomware-homelab' ? '/assets/projects/Ransomware attack.MP4' : slug === 'wireless-security-lab' ? '/assets/projects/Evil twin attack.MP4' : '',
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
  </div>
  <div class="my-work-grid">
    <article class="work-card">
      <div class="work-card-badge">FOUNDER &amp; TECHNICAL OPERATIONS</div>
      <h3 class="work-card-role">Founder &amp; Technical Operations Head</h3>
      <div class="work-card-org">
        <span><strong>Beeskilled</strong></span>
        <span class="work-card-tag">(AICTE-Listed E-Learning Platform)</span>
        <a href="https://beeskilled.com" target="_blank" rel="noopener noreferrer" class="work-card-link">Website ↗</a>
      </div>
      <ul class="work-card-list">
        <li>Managed backend operations, server uptime, and user account provisioning for 10,000+ students.</li>
        <li>Implemented secure access policies and resolved login and technical issues.</li>
      </ul>
    </article>
    <article class="work-card security-assessment-card">
      <div class="work-card-badge assessment-badge">SECURITY ASSESSMENT</div>
      <div class="work-card-org">
        <h3 class="work-card-role">SkillNexis</h3>
        <a href="https://skillnexis.in" target="_blank" rel="noopener noreferrer" class="work-card-link">skillnexis.in ↗</a>
      </div>
      <p class="assessment-subtitle">Web Application Security Assessment &amp; Vulnerability Disclosure</p>
      <div class="vuln-container">
        <div class="vuln-box">
          <div class="vuln-header">
            <span class="vuln-number">01</span>
            <h4 class="vuln-title">Authentication Bypass via Cookie/Storage Manipulation</h4>
            <span class="vuln-severity severity-high">HIGH</span>
          </div>
          <div class="vuln-details">
            <p><strong>Risk:</strong> Client-side authentication controls could potentially be manipulated to bypass login and access protected resources.</p>
            <p><strong>Recommended Fix:</strong> Implement server-side authentication and authorization, validate sessions on every protected request, and securely configure session cookies.</p>
            <p><strong class="status-pending">Remediation Status: Reported; fix confirmation pending.</strong></p>
          </div>
        </div>
        <div class="vuln-box">
          <div class="vuln-header">
            <span class="vuln-number">02</span>
            <h4 class="vuln-title">Hardcoded Administrative Password Hash</h4>
            <span class="vuln-severity severity-high">HIGH</span>
          </div>
          <div class="vuln-details">
            <p><strong>Risk:</strong> Exposed password hash could potentially be cracked, leading to administrative account compromise if the password is recovered and remains valid.</p>
            <p><strong>Recommended Fix:</strong> Remove hardcoded credential material, rotate affected credentials, use Argon2id/bcrypt for password hashing, and audit administrative access.</p>
            <p><strong class="status-pending">Remediation Status: Reported; fix confirmation pending.</strong></p>
          </div>
        </div>
      </div>
      <div class="assessment-outcome">
        <span class="outcome-icon">🛡️</span>
        <div><strong>Outcome:</strong> Two security vulnerabilities identified and reported, with remediation recommendations provided.</div>
      </div>
    </article>
  </div>
</div>
</section>`;

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
      
      // Inject My Work section if not already present
      if(!s.includes('id="my-work"')){
        s=s.replace('<div class="page-module-scss-module__qnDekq__contactsWrap">', `${myWorkSectionHtml}<div class="page-module-scss-module__qnDekq__contactsWrap">`);
      }
      
      if(!s.includes('/personal-links.js')){
        s=s.replace('</head>','<link rel="stylesheet" href="/personal.css"/></head>').replace('</body>','<script src="/personal-links.js" defer></script></body>');
      }
    } else if(p.endsWith('.rsc')){
      s=transformFlight(s);
    } else {
      s=replaceText(s);
    }
    
    if(p.endsWith('1tzay28hfjym9.js')){
      s=s.replaceAll('href:`/projects/${e.slug}`','href:e.href').replaceAll('onClick:z(`/projects/${e.slug}`)','target:"_blank",rel:"noopener noreferrer"');
      s=s.replace('children:"Some Selected Works"', 'children:"My Projects"');
      
      // Support video loops (e.g. Ransomware attack) or images
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
console.log('Personalized project cards with smaller grid, images, video loop, My Projects title, My Work section, and favicon.');
