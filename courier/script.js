/* ============================================================
   COURIER — Active Order Tracking Dashboard
   State machine: HEADING_TO_PICKUP → AT_PICKUP → DELIVERING → DELIVERED
   Simulates courier movement along the SVG path, ETA countdown,
   and delay alerts as notification triggers.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Order States ---- */
  const STATES = {
    HEADING_TO_PICKUP: 'HEADING_TO_PICKUP',
    AT_PICKUP:         'AT_PICKUP',
    DELIVERING:        'DELIVERING',
    DELIVERED:         'DELIVERED'
  };

  let currentState = STATES.HEADING_TO_PICKUP;
  let etaSeconds = 480; // 8 minutes
  let progress = 0;     // 0–1 along route
  let isDelayed = false;

  /* ---- DOM References ---- */
  const statusBar    = document.getElementById('status-bar');
  const statusLabel  = document.getElementById('status-label');
  const etaValue     = document.getElementById('eta-value');
  const etaOverlay   = document.getElementById('eta-overlay');
  const btnAction    = document.getElementById('btn-action');
  const btnText      = document.getElementById('btn-action-text');
  const btnIcon      = document.getElementById('btn-action-icon');
  const delayAlert   = document.getElementById('delay-alert');
  const courierDot   = document.getElementById('courier-dot');
  const routeTraveled = document.getElementById('route-traveled');
  const routeFull    = document.getElementById('route-full');
  const toastContainer = document.getElementById('toast-container');
  const etaLabel     = etaOverlay.querySelector('.eta-label');

  /* ---- SVG Path Utilities ---- */
  function getPathLength() {
    return routeFull.getTotalLength();
  }

  function getPointAtProgress(t) {
    const len = getPathLength();
    return routeFull.getPointAtLength(len * Math.min(1, Math.max(0, t)));
  }

  function updateCourierPosition(t) {
    const pt = getPointAtProgress(t);
    courierDot.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);

    const totalLen = getPathLength();
    const traveled = totalLen * t;
    routeTraveled.style.strokeDasharray = totalLen;
    routeTraveled.style.strokeDashoffset = totalLen - traveled;
  }

  /* ---- ETA Formatting ---- */
  function formatEta(seconds) {
    if (seconds <= 0) return '< 1 min';
    const m = Math.ceil(seconds / 60);
    return m + ' min';
  }

  /* ---- Toast Notifications ----
     Triggers that a real Courier integration would send via push. */
  function showToast(message, type) {
    const t = document.createElement('div');
    t.className = 'toast toast-' + (type || 'info');
    t.textContent = message;
    toastContainer.appendChild(t);
    setTimeout(() => { if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
  }

  /* ---- Delay Alert ---- */
  function triggerDelay(reason, newEtaMin) {
    isDelayed = true;
    etaSeconds = newEtaMin * 60;
    delayAlert.hidden = false;
    document.getElementById('delay-title').textContent = 'Delayed — ' + reason;
    document.getElementById('delay-detail').textContent = 'ETA updated to ' + newEtaMin + ' min';
    statusBar.classList.add('alert');
    showToast('⚠️ Delay detected: ' + reason, 'warning');
  }

  function clearDelay() {
    isDelayed = false;
    delayAlert.hidden = true;
    statusBar.classList.remove('alert');
  }

  /* ---- State Transitions ---- */
  function transitionTo(newState) {
    currentState = newState;

    switch (newState) {
      case STATES.HEADING_TO_PICKUP:
        statusLabel.textContent = 'Heading to Pickup';
        etaLabel.textContent = 'ETA to pickup';
        btnText.textContent = 'Arrived at Pickup';
        btnAction.className = 'btn-primary-action state-confirm';
        btnIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
        break;

      case STATES.AT_PICKUP:
        statusLabel.textContent = 'At Pickup Location';
        etaLabel.textContent = 'Waiting for items';
        etaValue.textContent = '—';
        btnText.textContent = 'Confirm Pickup';
        btnAction.className = 'btn-primary-action state-confirm';
        btnIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M9 12l2 2 4-4"/></svg>';
        showToast('📍 You arrived at Café Aroma', 'info');
        break;

      case STATES.DELIVERING:
        statusLabel.textContent = 'Delivering to Customer';
        etaLabel.textContent = 'ETA to drop-off';
        etaSeconds = 600; // 10 min to dropoff
        progress = 0;
        btnText.textContent = 'Confirm Delivery';
        btnAction.className = 'btn-primary-action state-delivering';
        btnIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>';
        showToast('📦 Pickup confirmed! Heading to drop-off', 'success');
        clearDelay();
        break;

      case STATES.DELIVERED:
        statusLabel.textContent = 'Delivered!';
        etaLabel.textContent = 'Complete';
        etaValue.textContent = '✓';
        btnText.textContent = 'Order Complete';
        btnAction.className = 'btn-primary-action state-complete';
        btnAction.disabled = true;
        btnIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>';
        showToast('✅ Delivery complete! +$8.40 earned', 'success');
        progress = 1;
        updateCourierPosition(1);
        break;
    }
  }

  /* ---- Action Button Handler ---- */
  btnAction.addEventListener('click', function () {
    switch (currentState) {
      case STATES.HEADING_TO_PICKUP:
        progress = 0.45;
        updateCourierPosition(progress);
        transitionTo(STATES.AT_PICKUP);
        break;

      case STATES.AT_PICKUP:
        transitionTo(STATES.DELIVERING);
        break;

      case STATES.DELIVERING:
        transitionTo(STATES.DELIVERED);
        break;
    }
  });

  /* ---- Simulation Loop ----
     Moves courier along path, counts down ETA.
     Triggers a delay event at ~30% progress for demo purposes. */
  let simInterval;
  let delayTriggered = false;

  function startSimulation() {
    simInterval = setInterval(function () {
      if (currentState === STATES.DELIVERED) {
        clearInterval(simInterval);
        return;
      }

      if (currentState === STATES.AT_PICKUP) return;

      // Move progress
      const speed = isDelayed ? 0.001 : 0.003;
      progress = Math.min(1, progress + speed);

      // Countdown ETA
      const etaDecrement = isDelayed ? 1 : 3;
      etaSeconds = Math.max(0, etaSeconds - etaDecrement);
      etaValue.textContent = formatEta(etaSeconds);

      // Trigger delay demo at ~30% if heading to pickup
      if (!delayTriggered && currentState === STATES.HEADING_TO_PICKUP && progress > 0.25) {
        delayTriggered = true;
        triggerDelay('Heavy traffic on Market St', 14);
      }

      updateCourierPosition(
        currentState === STATES.HEADING_TO_PICKUP
          ? progress * 0.45
          : 0.45 + progress * 0.55
      );

      // Auto-arrive at pickup at 45%
      if (currentState === STATES.HEADING_TO_PICKUP && progress >= 0.44) {
        // Let the user confirm manually
      }
    }, 500);
  }

  /* ---- Secondary Buttons ---- */
  document.getElementById('btn-call').addEventListener('click', function () {
    showToast('📞 Calling customer...', 'info');
  });

  document.getElementById('btn-navigate').addEventListener('click', function () {
    showToast('🗺️ Opening navigation...', 'info');
  });

  document.getElementById('btn-chat').addEventListener('click', function () {
    showToast('💬 Opening chat...', 'info');
  });

  document.getElementById('btn-recenter').addEventListener('click', function () {
    showToast('📍 Map recentered', 'info');
  });

  document.getElementById('btn-emergency').addEventListener('click', function () {
    showToast('⚠️ Issue report opened', 'warning');
  });

  /* ---- Init ---- */
  function init() {
    routeTraveled.style.strokeDasharray = getPathLength();
    routeTraveled.style.strokeDashoffset = getPathLength();
    updateCourierPosition(0);
    transitionTo(STATES.HEADING_TO_PICKUP);
    startSimulation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
