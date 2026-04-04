/* ============================================
   BalanceAI — Landing Page Script
   ============================================ */

(function () {
  'use strict';

  /* ---- Particle Background ---- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resizeCanvas() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((w * h) / 18000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          color: ['rgba(56,178,172,', 'rgba(129,230,217,', 'rgba(72,187,120,', 'rgba(154,230,180,'][Math.floor(Math.random() * 4)]
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(56,178,172,' + (0.06 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => { resizeCanvas(); createParticles(); });
  }

  /* ---- Character System ---- */
  const character = document.getElementById('character');
  const speech = document.getElementById('character-speech');
  const nav = document.getElementById('nav');

  const sections = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'cta'];

  const sectionBehaviors = {
    'hero': {
      classes: ['idle', 'waving'],
      position: { xPercent: 85, yPercent: 30 },
      speech: 'Hey there! Welcome! 👋',
      speechDuration: 3500
    },
    'features': {
      classes: ['idle', 'sparkle'],
      position: { xPercent: 88, yPercent: 40 },
      speech: 'Look at all these cool features!',
      speechDuration: 3000
    },
    'how-it-works': {
      classes: ['idle', 'thinking'],
      position: { xPercent: 8, yPercent: 45 },
      speech: 'Let me walk you through it...',
      speechDuration: 3000
    },
    'testimonials': {
      classes: ['idle', 'excited'],
      position: { xPercent: 90, yPercent: 35 },
      speech: 'People really love this! 🎉',
      speechDuration: 3000
    },
    'pricing': {
      classes: ['idle', 'thinking'],
      position: { xPercent: 7, yPercent: 40 },
      speech: 'Such great value!',
      speechDuration: 2500
    },
    'cta': {
      classes: ['idle', 'excited', 'sparkle'],
      position: { xPercent: 85, yPercent: 25 },
      speech: "Let's get started! 🚀",
      speechDuration: 3500
    }
  };

  let currentSection = '';
  let speechTimeout = null;
  let isTransitioning = false;

  function positionCharacter(pos) {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const charW = character.offsetWidth;
    const charH = character.offsetHeight;

    const x = Math.max(8, Math.min(vw - charW - 8, (vw * pos.xPercent / 100) - charW / 2));
    const y = Math.max(80, Math.min(vh - charH - 8, vh * pos.yPercent / 100));

    character.style.left = x + 'px';
    character.style.top = y + 'px';
    character.style.right = 'auto';
  }

  function showSpeech(text, duration) {
    if (speechTimeout) clearTimeout(speechTimeout);
    speech.textContent = text;
    speech.classList.add('visible');
    speechTimeout = setTimeout(() => {
      speech.classList.remove('visible');
    }, duration);
  }

  function setCharacterState(sectionId) {
    if (isTransitioning || sectionId === currentSection) return;
    isTransitioning = true;
    currentSection = sectionId;

    const behavior = sectionBehaviors[sectionId];
    if (!behavior) { isTransitioning = false; return; }

    character.classList.add('walking');

    requestAnimationFrame(() => {
      positionCharacter(behavior.position);

      setTimeout(() => {
        character.className = 'character';
        behavior.classes.forEach(cls => character.classList.add(cls));
        if (behavior.speech) showSpeech(behavior.speech, behavior.speechDuration);
        isTransitioning = false;
      }, 500);
    });
  }

  function getCurrentSection() {
    const scrollY = window.scrollY + window.innerHeight * 0.45;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollY) return sections[i];
    }
    return sections[0];
  }

  /* ---- Scroll Animations (IntersectionObserver) ---- */
  function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay) || 0;
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  /* ---- Nav scroll effect ---- */
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  /* ---- Mouse-following eyes ---- */
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  function updateEyes() {
    const rect = character.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height * 0.35;
    const dx = mouseX - cx;
    const dy = mouseY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const max = 2.8;
    const mx = dist > 0 ? (dx / dist) * Math.min(max, dist / 40) : 0;
    const my = dist > 0 ? (dy / dist) * Math.min(max, dist / 40) : 0;

    character.querySelectorAll('.char-pupil').forEach(p => {
      p.setAttribute('transform', `translate(${mx}, ${my})`);
    });
  }

  document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  /* ---- Animated Counter ---- */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-num[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = el.dataset.decimal === 'true';
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          const current = target * ease;

          if (isDecimal) {
            el.textContent = current.toFixed(1);
          } else if (target >= 1000) {
            el.textContent = Math.floor(current).toLocaleString() + (suffix ? '+' : '');
          } else {
            el.textContent = Math.floor(current) + suffix;
          }

          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ---- Score Counter in Phone Mockup ---- */
  function animateScore() {
    const scoreEl = document.getElementById('score-counter');
    if (!scoreEl) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = 90;
        const duration = 2200;
        const start = performance.now();

        function tick(now) {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          scoreEl.textContent = Math.floor(target * ease);
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(scoreEl);
      });
    }, { threshold: 0.3 });
    observer.observe(scoreEl);
  }

  /* ---- Billing Toggle ---- */
  function initBillingToggle() {
    const toggle = document.getElementById('billing-toggle');
    const monthlyLabel = document.getElementById('toggle-monthly');
    const yearlyLabel = document.getElementById('toggle-yearly');
    if (!toggle) return;

    let isYearly = false;

    toggle.addEventListener('click', () => {
      isYearly = !isYearly;
      toggle.classList.toggle('active', isYearly);
      monthlyLabel.classList.toggle('toggle-active', !isYearly);
      yearlyLabel.classList.toggle('toggle-active', isYearly);

      document.querySelectorAll('.price-amount').forEach(el => {
        const monthly = el.dataset.monthly;
        const yearly = el.dataset.yearly;
        const price = isYearly ? yearly : monthly;
        el.textContent = '$' + price;
      });
    });
  }

  /* ---- Mobile Menu ---- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });
  }

  /* ---- Form Handling ---- */
  const ctaForm = document.getElementById('cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = ctaForm.querySelector('button');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = 'Welcome aboard! &#x1F389;';
      btn.style.background = 'linear-gradient(135deg, #48BB78, #9AE6B4)';

      showSpeech('Yay, you joined! 🎉', 4000);
      character.className = 'character excited sparkle';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 3500);
    });
  }

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('open');
      }
    });
  });

  /* ---- Scroll Handler ---- */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        setCharacterState(getCurrentSection());
        ticking = false;
      });
      ticking = true;
    }
  }

  /* ---- Animation Loop ---- */
  function animLoop() {
    updateEyes();
    requestAnimationFrame(animLoop);
  }

  /* ---- Init ---- */
  function init() {
    setCharacterState('hero');
    updateNav();
    initScrollAnimations();
    animateCounters();
    animateScore();
    initBillingToggle();
    animLoop();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      const section = getCurrentSection();
      if (sectionBehaviors[section]) positionCharacter(sectionBehaviors[section].position);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
