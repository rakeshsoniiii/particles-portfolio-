(() => {
  function initNav() {
    if(document.querySelector('.personal-nav')) return;
    const nav=document.createElement('nav');
    nav.className='personal-nav'; nav.setAttribute('aria-label','Profile and resume');
    const links=[
      ['Projects', '#projects'],
      ['My Work', '#my-work'],
      ['GitHub','https://github.com/harpind3r'],
      ['TryHackMe','https://tryhackme.com/p/VENOM.WHO'],
      ['LinkedIn','https://www.linkedin.com/in/harpinder-singh-324886402/'],
      ['Résumé ↗','/assets/RESUME.pdf']
    ];
    for(const [label,href] of links){
      const a=document.createElement('a');
      a.textContent=label;
      a.href=href;
      if(href.startsWith('http') || href.endsWith('.pdf')){
        a.target='_blank';
        a.rel='noopener noreferrer';
      }
      if(href === '#projects'){
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const stage = document.querySelector('[class*="playground-module"]');
          if(stage) {
            if(window.__lenis) {
              window.__lenis.scrollTo(stage, { duration: 1.2 });
            } else {
              stage.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
      if(href === '#my-work'){
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const work = document.getElementById('my-work');
          if(work) {
            if(window.__lenis) {
              window.__lenis.scrollTo(work, { duration: 1.2, offset: 0 });
            } else {
              work.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
      if(href.endsWith('.pdf')){
        a.className='resume-link';
        a.setAttribute('aria-label','Open Harpinder Singh resume PDF');
      }
      nav.append(a);
    }
    document.body.append(nav);
  }

  const myWorkHtml = `
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
</div>`;

  function mountMyWork() {
    let section = document.getElementById('my-work');
    const contactsWrap = document.querySelector('[class*="contactsWrap"]');
    if (!contactsWrap) return;
    
    if (!section) {
      section = document.createElement('section');
      section.id = 'my-work';
      section.className = 'my-work-section';
      section.innerHTML = myWorkHtml;
      contactsWrap.parentNode.insertBefore(section, contactsWrap);
      if (window.__lenis) {
        window.__lenis.resize();
      }
    } else if (section.nextElementSibling !== contactsWrap) {
      contactsWrap.parentNode.insertBefore(section, contactsWrap);
      if (window.__lenis) {
        window.__lenis.resize();
      }
    }
  }

  initNav();
  mountMyWork();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initNav();
      mountMyWork();
    });
  }
  window.addEventListener('load', () => {
    initNav();
    mountMyWork();
    setTimeout(mountMyWork, 200);
    setTimeout(mountMyWork, 600);
    setTimeout(mountMyWork, 1500);
  });

  const observer = new MutationObserver(() => {
    const contactsWrap = document.querySelector('[class*="contactsWrap"]');
    const section = document.getElementById('my-work');
    if (contactsWrap && (!section || section.nextElementSibling !== contactsWrap)) {
      mountMyWork();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
