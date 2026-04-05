/* =================================================================
   Balance AI — Script
   UIUX Pro Max rules applied:
   - Max 1-2 animations per view
   - ease-out for entering, ease-in for exiting
   - prefers-reduced-motion check
   - Smooth transitions 200-300ms
   ================================================================= */

(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll Animations (IntersectionObserver, ease-out) ---- */
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
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
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

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) { target.scrollIntoView({ behavior: 'smooth' }); if (links) links.classList.remove('open'); }
    });
  });

  /* ---- CTA Form ---- */
  var form = document.getElementById('cta-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      btn.textContent = 'Welcome aboard!';
      btn.style.background = 'linear-gradient(135deg, #E918DA, #6E79FF)';
      setTimeout(function () { btn.textContent = 'Get Early Access'; btn.style.background = ''; }, 3500);
    });
  }


  /* ---- Init ---- */
  function init() {
    initScrollAnimations();
    initCounters();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
