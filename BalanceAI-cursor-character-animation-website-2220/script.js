/* =================================================================
   Balance AI — Modern Interactions
   - Scroll reveal with stagger
   - Animated counters
   - Cursor glow effect
   - Magnetic hover on cards
   - prefers-reduced-motion respected
   ================================================================= */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll Reveal Animations ---- */
  function initScrollAnimations() {
    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate]').forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(function () { entry.target.classList.add('visible'); }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

    document.querySelectorAll('[data-animate]').forEach(function (el) { observer.observe(el); });
  }

  /* ---- Animated Counters ---- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.dataset.count);
        var duration = 2000;
        var start = performance.now();

        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 4);
          var v = target * ease;
          el.textContent = target >= 100 ? Math.floor(v).toLocaleString() : v.toFixed(1);
          if (p < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { observer.observe(el); });
  }

  /* ---- Mobile Nav Toggle ---- */
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  /* ---- Smooth Scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (links) links.classList.remove('open');
      }
    });
  });

  /* ---- CTA Form ---- */
  var form = document.getElementById('cta-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var originalText = btn.textContent;
      btn.textContent = 'Welcome aboard!';
      btn.style.background = 'linear-gradient(135deg, #6E79FF, #3FA0F5)';
      setTimeout(function () { btn.textContent = originalText; btn.style.background = ''; }, 3500);
    });
  }

  /* ---- Cursor Glow on Cards (desktop only) ---- */
  function initCardGlow() {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(hover: none)').matches) return;

    var glowCards = document.querySelectorAll('.bento-card, .step-card, .loop-card, .stat-card');

    glowCards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.style.background =
          'radial-gradient(300px circle at var(--glow-x) var(--glow-y), rgba(142, 119, 226, 0.1), transparent 60%), #FFFFFF';
      });

      card.addEventListener('mouseleave', function () {
        card.style.background = '';
      });
    });
  }

  /* ---- Nav scroll effect ---- */
  function initNavScroll() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var scrolled = false;
    window.addEventListener('scroll', function () {
      var shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        scrolled = shouldBeScrolled;
        if (scrolled) {
          nav.style.background = 'rgba(255, 255, 255, 0.92)';
          nav.style.boxShadow = '0 8px 32px rgba(142, 119, 226, 0.12)';
        } else {
          nav.style.background = '';
          nav.style.boxShadow = '';
        }
      }
    }, { passive: true });
  }

  /* ---- Tilt Effect on Phone Mockup ---- */
  function initPhoneTilt() {
    if (prefersReducedMotion) return;
    var phone = document.querySelector('.phone-mockup');
    if (!phone) return;

    var visual = phone.closest('.hero-visual');
    if (!visual) return;

    visual.addEventListener('mousemove', function (e) {
      var rect = visual.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      phone.style.transform = 'translateY(' + (-10 * (0.5 + 0.5 * Math.cos(Date.now() / 2500 * Math.PI * 2))) + 'px) perspective(800px) rotateY(' + (x * 8) + 'deg) rotateX(' + (-y * 8) + 'deg)';
    });

    visual.addEventListener('mouseleave', function () {
      phone.style.transform = '';
    });
  }

  /* ---- Init ---- */
  function init() {
    initScrollAnimations();
    initCounters();
    initCardGlow();
    initNavScroll();
    initPhoneTilt();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
