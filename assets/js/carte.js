/* Cartes NFC LADR : paillettes dorées qui flottent sur la page */
(function () {
  var cv = document.querySelector('.nfc-sparkles');
  if (!cv || !cv.getContext) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = 1, parts = [], raf = null;
  var COLORS = ['#FFD700', '#F2C14E', '#E8B923', '#FFE680'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function make(anywhere) {
    return {
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 10,
      r: 1.4 + Math.random() * 2.6,           // taille
      vy: 0.18 + Math.random() * 0.42,        // montée
      sway: 0.4 + Math.random() * 1.1,        // balancement
      ph: Math.random() * Math.PI * 2,
      tw: 0.02 + Math.random() * 0.04,        // scintillement
      star: Math.random() < 0.45,             // éclat en étoile ou simple point
      c: COLORS[(Math.random() * COLORS.length) | 0]
    };
  }

  function drawStar(x, y, r) {
    ctx.beginPath();
    ctx.moveTo(x, y - r * 2.4);
    ctx.quadraticCurveTo(x, y, x + r * 2.4, y);
    ctx.quadraticCurveTo(x, y, x, y + r * 2.4);
    ctx.quadraticCurveTo(x, y, x - r * 2.4, y);
    ctx.quadraticCurveTo(x, y, x, y - r * 2.4);
    ctx.fill();
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      p.y -= p.vy; p.ph += p.tw;
      var x = p.x + Math.sin(p.ph * 0.6) * p.sway * 6;
      var a = 0.35 + 0.65 * Math.abs(Math.sin(p.ph));
      ctx.globalAlpha = a * 0.85;
      ctx.fillStyle = p.c;
      ctx.shadowColor = 'rgba(232,185,35,.7)';
      ctx.shadowBlur = p.r * 3;
      if (p.star) drawStar(x, p.y, p.r);
      else { ctx.beginPath(); ctx.arc(x, p.y, p.r * 0.7, 0, Math.PI * 2); ctx.fill(); }
      if (p.y < -12) parts[i] = make(false);
    }
    raf = requestAnimationFrame(tick);
  }

  function start() { if (!raf) raf = requestAnimationFrame(tick); }
  function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }

  resize();
  var n = Math.round(Math.min(34, Math.max(18, W / 14)));
  for (var i = 0; i < n; i++) parts.push(make(true));
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();
})();
