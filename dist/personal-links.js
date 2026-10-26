(() => {
  function tuneLenis() {
    if (window.__lenis) {
      window.__lenis.options.lerp = 0.075;
      window.__lenis.options.duration = 1.0;
      window.__lenis.options.wheelMultiplier = 0.85;
      window.__lenis.options.smoothTouch = false;
      window.__lenis.options.infinite = false;
    }
  }

  function getFirstProjectScrollTop() {
    const stage = document.querySelector('[class*="playground-module"]');
    if (!stage) return 0;
    const r = window.innerWidth;
    const n = window.innerHeight;
    const isPortrait = r < n;
    const s = 0.09 * r + (isPortrait ? 0.9 * n : 0);
    const a = 2 * n; // revealSpan
    const e = 8; // projects count
    // ponytail: tile width matches bundle — 31vw landscape, 85vw portrait
    const t = isPortrait ? 85 : 31;
    // ponytail: gap is 0.065*r (CSS 6.5vw), not 0.12*r
    const gap = 0.065 * r;
    const tileWidth = (t / 100) * r;
    const pitch = tileWidth + gap;
    // l formula: separate the percentage and pixel terms so neither is divided by 100
    const l = -(r * e * t / 100 + (e - 1) * gap) - s;
    const o = r + s - l;

    // Center of first project (NLA Engine, index e-1 in reversed array)
    const lastIndex = e - 1;
    const tileCenterInTrack = lastIndex * pitch + tileWidth / 2;
    const targetF = r / 2 - tileCenterInTrack;
    const targetC = Math.max(0, Math.min(1, (targetF - l) / o));

    let low = 0, high = 1, ratio = 0.28;
    for (let i = 0; i < 24; i++) {
      const mid = (low + high) / 2;
      const val = mid * mid * mid * (mid * (6 * mid - 15) + 10);
      if (val < targetC) low = mid;
      else high = mid;
      ratio = mid;
    }
    const u = ratio * o;
    const delta = (u / (isPortrait ? 0.6 : 1)) - a;
    const stageTop = stage.getBoundingClientRect().top + (window.__lenis ? window.__lenis.actualScroll : window.scrollY);
    return Math.max(0, stageTop + delta);
  }

  // Nudge scroll position to wake up reveal animations after programmatic scrollTo
  function nudgeScrollReveal() {
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
      if (window.__lenis) {
        try { window.__lenis.emit(); } catch (_) {}
      }
    }, 300);
  }

  function initParticleHover() {
    // EMAIL hover — wire data-entered on the particle-disintegrate wrapper
    const emailLink = document.querySelector('[class*="contacts-module"] a[href^="mailto:"]');
    if (emailLink) {
      const pdWrap = emailLink.closest('[class*="particle-disintegrate"]') || emailLink.parentElement;
      if (pdWrap) {
        pdWrap.addEventListener('mouseenter', () => pdWrap.setAttribute('data-entered', 'true'));
        pdWrap.addEventListener('mouseleave', () => pdWrap.setAttribute('data-entered', 'false'));
      } else {
        emailLink.addEventListener('mouseenter', () => emailLink.setAttribute('data-entered', 'true'));
        emailLink.addEventListener('mouseleave', () => emailLink.setAttribute('data-entered', 'false'));
      }
    }

    // PORTRAIT hover — find hero section canvas or particle scene
    const heroSection = document.querySelector('[class*="hero-module"]') || document.querySelector('[class*="heroModule"]');
    if (heroSection) {
      const particleCanvas = heroSection.querySelector('canvas') || heroSection.querySelector('[class*="particle-scene"]');
      heroSection.addEventListener('mouseenter', () => {
        if (particleCanvas) {
          particleCanvas.dispatchEvent(new CustomEvent('portfolioHoverPortrait', { bubbles: true }));
          particleCanvas.classList.add('is-hovered');
        }
      });
      heroSection.addEventListener('mouseleave', () => {
        if (particleCanvas) {
          particleCanvas.dispatchEvent(new CustomEvent('portfolioLeavePortrait', { bubbles: true }));
          particleCanvas.classList.remove('is-hovered');
        }
      });
    }

    // INDIA MAP hover — find italy-module or india-related section
    const indiaSection = document.querySelector('[class*="italy-module"]') || document.querySelector('#india') || document.querySelector('[class*="india"]') || document.querySelector('[class*="location"]');
    if (indiaSection) {
      const indiaCanvas = indiaSection.querySelector('canvas') || indiaSection.querySelector('[class*="particle-scene"]');
      indiaSection.addEventListener('mouseenter', () => {
        if (indiaCanvas) {
          indiaCanvas.dispatchEvent(new CustomEvent('portfolioHoverIndia', { bubbles: true }));
          indiaCanvas.classList.add('is-hovered');
        }
        indiaSection.classList.add('is-hovered');
      });
      indiaSection.addEventListener('mouseleave', () => {
        if (indiaCanvas) {
          indiaCanvas.dispatchEvent(new CustomEvent('portfolioLeaveIndia', { bubbles: true }));
          indiaCanvas.classList.remove('is-hovered');
        }
        indiaSection.classList.remove('is-hovered');
      });
    }
  }

  const hMonogramSvg = `<svg viewBox="0 0 686 850" aria-hidden="true" class="monogram-module-scss-module__K070Ja__monogram">
  <g class="monogram-module-scss-module__K070Ja__swirl">
    <path d="M 145,140 C 135,140 125,148 125,158 L 125,692 C 125,702 135,710 145,710 L 225,710 C 235,710 245,702 245,692 L 245,475 L 441,475 L 441,692 C 441,702 451,710 461,710 L 541,710 C 551,710 561,702 561,692 L 561,158 C 561,148 551,140 541,140 L 461,140 C 451,140 441,148 441,158 L 441,375 L 245,375 L 245,158 C 245,148 235,140 225,140 Z"></path>
  </g>
  <g class="monogram-module-scss-module__K070Ja__mark">
    <circle cx="343" cy="425" r="72" class="monogram-module-scss-module__K070Ja__markCircle"></circle>
    <path d="M 343,330 A 95,95 0 1 0 343,520 A 95,95 0 1 0 343,330 Z" class="monogram-module-scss-module__K070Ja__markPath"></path>
  </g>
</svg>`;

  function updateFooterMonogram() {
    const wrap = document.querySelector('.monogram-module-scss-module__K070Ja__wrap');
    if (!wrap) return;
    const oldSvg = wrap.querySelector('svg');
    if (oldSvg && oldSvg.getAttribute('data-personal-monogram') !== 'true') {
      const template = document.createElement('template');
      template.innerHTML = hMonogramSvg.trim();
      const newSvg = template.content.firstChild;
      newSvg.setAttribute('data-personal-monogram', 'true');
      oldSvg.replaceWith(newSvg);
    }
  }

  function initNav() {
    if (document.querySelector('.personal-nav')) return;
    const nav = document.createElement('nav');
    nav.className = 'personal-nav';
    nav.setAttribute('aria-label', 'Profile and resume');
    const toggle = document.createElement('button');
    toggle.className = 'personal-nav-toggle';
    toggle.type = 'button';
    toggle.textContent = 'Menu';
    toggle.setAttribute('aria-expanded', 'false');
    const closeMenu = () => toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', String(toggle.getAttribute('aria-expanded') !== 'true'));
    });
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    nav.addEventListener('keydown', event => {
      if (event.key === 'Escape') { closeMenu(); toggle.focus(); }
    });
    nav.append(toggle);
    const links = [
      ['Projects', '#projects'],
      ['My Work', '#my-work'],
      ['GitHub', 'https://github.com/harpind3r'],
      ['TryHackMe', 'https://tryhackme.com/p/VENOM.WHO'],
      ['LinkedIn', 'https://www.linkedin.com/in/harpinder-singh-324886402/'],
      ['Résumé ↗', '/assets/RESUME.pdf']
    ];
    for (const [label, href] of links) {
      const a = document.createElement('a');
      a.textContent = label;
      a.href = href;
      if (href.startsWith('http') || href.endsWith('.pdf')) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      if (href === '#projects') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const targetY = getFirstProjectScrollTop();
          if (targetY > 0) {
            if (window.__lenis) {
              window.__lenis.scrollTo(targetY, { duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            nudgeScrollReveal();
          }
        });
      }
      if (href === '#my-work') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          const work = document.getElementById('my-work');
          if (work) {
            if (window.__lenis) {
              window.__lenis.scrollTo(work, { duration: 1.0, offset: 0, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            } else {
              work.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      }
      if (href.endsWith('.pdf')) {
        a.className = 'resume-link';
        a.setAttribute('aria-label', 'Open Harpinder Singh resume PDF');
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
    <p class="my-work-desc">Selected technical leadership, hands-on DFIR investigation case studies, and responsible vulnerability disclosures.</p>
  </div>

  <div class="my-work-grid">
    <article class="work-card">
      <div class="work-card-top">
        <span class="work-badge badge-ops">ACHIEVEMENT / TRYHACKME</span>
      </div>
      <h3 class="work-role">Top 5% globally · Top 500 in India</h3>
      <p class="case-desc">TryHackMe cybersecurity training and hands-on security challenges.</p>
      <a class="work-link" href="https://tryhackme.com/p/VENOM.WHO" target="_blank" rel="noopener noreferrer">View TryHackMe profile ↗</a>
    </article>
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
            <video data-src="/assets/projects/Digital Forensics Case B4DM755..MP4" poster="/assets/projects/digital-forensics-case-b4dm755.webp" loop muted playsInline preload="none" class="case-video"></video>
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
            <span class="status-msg">Bug fixed</span>
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
            <span class="status-msg">Bug fixed</span>
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
    } else {
      section.innerHTML = myWorkHtml;
      if (section.nextElementSibling !== contactsWrap) {
        contactsWrap.parentNode.insertBefore(section, contactsWrap);
      }
      if (window.__lenis) {
        window.__lenis.resize();
      }
    }
  }

  function handleProjectsHash() {
    if (window.location.hash === '#projects') {
      setTimeout(() => {
        const targetY = getFirstProjectScrollTop();
        if (targetY > 0) {
          if (window.__lenis) {
            window.__lenis.scrollTo(targetY, { immediate: false, duration: 1.0 });
          } else {
            window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
          nudgeScrollReveal();
        }
      }, 400);
    }
  }

  tuneLenis();
  initNav();
  mountMyWork();
  updateFooterMonogram();
  handleProjectsHash();
  initParticleHover();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      tuneLenis();
      initNav();
      mountMyWork();
      updateFooterMonogram();
      handleProjectsHash();
      initParticleHover();
    });
  }
  window.addEventListener('load', () => {
    tuneLenis();
    initNav();
    mountMyWork();
    updateFooterMonogram();
    handleProjectsHash();
    initParticleHover();
    setTimeout(() => { tuneLenis(); mountMyWork(); updateFooterMonogram(); initParticleHover(); }, 200);
    setTimeout(() => { tuneLenis(); mountMyWork(); updateFooterMonogram(); initParticleHover(); }, 600);
    setTimeout(() => { tuneLenis(); mountMyWork(); updateFooterMonogram(); initParticleHover(); }, 1500);
  });

  window.addEventListener('hashchange', () => {
    handleProjectsHash();
  });

  // Download and play lab videos only while their card is on screen.
  const mediaObserver = new IntersectionObserver(entries => {
    for (const { target: video, isIntersecting } of entries) {
      if (isIntersecting && !document.hidden) {
        if (!video.getAttribute('src')) video.src = video.dataset.src;
        video.muted = true;
        video.play().catch(() => {});
      } else video.pause();
    }
  }, { threshold: 0.15 });
  function observeMedia() {
    document.querySelectorAll('video[data-src]:not([data-observed])').forEach(video => {
      video.dataset.observed = 'true';
      mediaObserver.observe(video);
    });
  }
  observeMedia();
  const observer = new MutationObserver(() => {
    observeMedia();
    const contactsWrap = document.querySelector('[class*="contactsWrap"]');
    const section = document.getElementById('my-work');
    if (contactsWrap && (!section || section.nextElementSibling !== contactsWrap)) {
      mountMyWork();
    }
    updateFooterMonogram();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
