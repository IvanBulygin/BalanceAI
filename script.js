/* ============================================
   BalanceAI — Interactive Script
   ============================================ */

(function () {
  'use strict';

  const character = document.getElementById('character');
  const speech = document.getElementById('character-speech');
  const nav = document.getElementById('nav');

  const sections = ['hero', 'features', 'how-it-works', 'testimonials', 'pricing', 'cta'];

  const sectionBehaviors = {
    'hero': {
      classes: ['idle', 'waving'],
      position: { right: 60, top: 35 },
      speech: 'Hey there! 👋',
      speechDuration: 3000
    },
    'features': {
      classes: ['idle', 'sparkle'],
      position: { right: 40, top: 45 },
      speech: 'Check out these features!',
      speechDuration: 2500
    },
    'how-it-works': {
      classes: ['idle', 'thinking'],
      position: { left: 30, top: 50 },
      speech: 'Hmm, let me explain...',
      speechDuration: 2500
    },
    'testimonials': {
      classes: ['idle', 'excited'],
      position: { right: 50, top: 40 },
      speech: 'People love this! 🎉',
      speechDuration: 2500
    },
    'pricing': {
      classes: ['idle', 'thinking'],
      position: { left: 40, top: 35 },
      speech: 'Great value!',
      speechDuration: 2000
    },
    'cta': {
      classes: ['idle', 'excited', 'sparkle'],
      position: { right: 60, top: 30 },
      speech: 'Let\'s get started! 🚀',
      speechDuration: 3000
    }
  };

  let currentSection = '';
  let speechTimeout = null;
  let isTransitioning = false;

  function positionCharacter(pos) {
    if (pos.left !== undefined) {
      character.style.left = pos.left + 'px';
      character.style.right = 'auto';
    } else if (pos.right !== undefined) {
      character.style.right = pos.right + 'px';
      character.style.left = 'auto';
    }

    const vh = window.innerHeight;
    character.style.top = (vh * pos.top / 100) + 'px';
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
    if (!behavior) {
      isTransitioning = false;
      return;
    }

    character.className = 'character';

    requestAnimationFrame(() => {
      positionCharacter(behavior.position);

      setTimeout(() => {
        behavior.classes.forEach(cls => character.classList.add(cls));
        if (behavior.speech) {
          showSpeech(behavior.speech, behavior.speechDuration);
        }
        isTransitioning = false;
      }, 300);
    });
  }

  function getCurrentSection() {
    const scrollY = window.scrollY + window.innerHeight / 2;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollY) {
        return sections[i];
      }
    }
    return sections[0];
  }

  /* ---- Scroll-based animations ---- */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay) || 0;

          setTimeout(() => {
            el.classList.add('visible');
          }, delay);

          observer.unobserve(el);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate], .feature-card, .testimonial-card, .pricing-card, .step, .cta-content').forEach(el => {
      observer.observe(el);
    });
  }

  /* ---- Nav scroll effect ---- */
  function updateNav() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  /* ---- Mouse-following eyes ---- */
  let mouseX = 0;
  let mouseY = 0;

  function updateEyes() {
    const charRect = character.getBoundingClientRect();
    const charCenterX = charRect.left + charRect.width / 2;
    const charCenterY = charRect.top + charRect.height * 0.35;

    const dx = mouseX - charCenterX;
    const dy = mouseY - charCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxMove = 2.5;

    const moveX = dist > 0 ? (dx / dist) * Math.min(maxMove, dist / 50) : 0;
    const moveY = dist > 0 ? (dy / dist) * Math.min(maxMove, dist / 50) : 0;

    const pupils = character.querySelectorAll('.char-pupil');
    pupils.forEach(pupil => {
      pupil.setAttribute('transform', `translate(${moveX}, ${moveY})`);
    });
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* ---- Mobile menu toggle ---- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileToggle.classList.toggle('active');
    });
  }

  /* ---- Form handling ---- */
  const ctaForm = document.getElementById('cta-form');
  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = ctaForm.querySelector('button');
      btn.textContent = 'Welcome aboard! 🎉';
      btn.style.background = 'linear-gradient(135deg, #00B894, #55EFC4)';

      showSpeech('Yay, welcome! 🎉', 4000);
      character.className = 'character excited sparkle';

      setTimeout(() => {
        btn.textContent = 'Get Started Free';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ---- Smooth scroll for nav links ---- */
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

  /* ---- Throttled scroll handler ---- */
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        const section = getCurrentSection();
        setCharacterState(section);
        ticking = false;
      });
      ticking = true;
    }
  }

  /* ---- Animation loop for eyes ---- */
  function animLoop() {
    updateEyes();
    requestAnimationFrame(animLoop);
  }

  /* ---- Init ---- */
  function init() {
    setCharacterState('hero');
    updateNav();
    initScrollAnimations();
    animLoop();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      const section = getCurrentSection();
      setCharacterState(section);
    });

    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      }, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
