/* main.js – shared magic for the birthday experience */

/* ── STAR FIELD ──────────────────────────────────────── */
function initStars() {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + .3,
      a: Math.random(),
      speed: Math.random() * .008 + .003,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = performance.now() / 1000;
    stars.forEach(s => {
      s.a = .3 + .7 * Math.abs(Math.sin(t * s.speed * 6 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,230,200,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

/* ── FIREWORKS ───────────────────────────────────────── */
function launchFireworks(container, count = 7) {
  const colors = ['#f5c842','#ff6b6b','#4ecdc4','#c084fc','#fff','#ffa94d','#74c0fc'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = 15 + Math.random() * 70; // % from left
      const y = 10 + Math.random() * 50; // % from top
      burst(container, x, y, colors[Math.floor(Math.random() * colors.length)]);
    }, i * 220);
  }
}

function burst(container, px, py, color) {
  const PARTICLES = 28;
  for (let i = 0; i < PARTICLES; i++) {
    const p = document.createElement('div');
    const angle = (i / PARTICLES) * 360;
    const dist  = 60 + Math.random() * 80;
    const size  = 4 + Math.random() * 5;

    Object.assign(p.style, {
      position: 'absolute',
      left: px + '%',
      top:  py + '%',
      width: size + 'px',
      height: size + 'px',
      borderRadius: Math.random() > .5 ? '50%' : '2px',
      background: color,
      boxShadow: `0 0 6px ${color}`,
      pointerEvents: 'none',
      transform: 'translate(-50%,-50%)',
      animation: `none`,
      transition: `transform 1s cubic-bezier(.2,.8,.4,1), opacity 1s ease`,
    });

    container.appendChild(p);

    // trigger reflow
    p.getBoundingClientRect();

    const rad = (angle * Math.PI) / 180;
    p.style.transform = `translate(calc(-50% + ${Math.cos(rad) * dist}px), calc(-50% + ${Math.sin(rad) * dist}px)) scale(0)`;
    p.style.opacity = '0';

    setTimeout(() => p.remove(), 1100);
  }
}

/* ── CONFETTI RAIN (card page) ───────────────────────── */
function confettiRain() {
  const shapes = ['🎉','🎊','✨','🌟','💫','🎈','🥳'];
  const body = document.body;

  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      const size = .8 + Math.random() * 1.4;
      Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 100 + 'vw',
        top: '-2rem',
        fontSize: size + 'rem',
        zIndex: 400,
        pointerEvents: 'none',
        animation: `confettiFall ${1.5 + Math.random() * 2}s linear forwards`,
        animationDelay: Math.random() * .5 + 's',
      });
      body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 80);
  }
}

// inject confetti keyframe dynamically
const kf = document.createElement('style');
kf.textContent = `
@keyframes confettiFall {
  to { transform: translateY(105vh) rotate(720deg); opacity: 0; }
}`;
document.head.appendChild(kf);

/* ── CARD FLIP ───────────────────────────────────────── */
function initCard() {
  const card = document.getElementById('bday-card');
  if (!card) return;

  let opened = false;
  const stage = document.getElementById('firework-stage');

  card.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    card.classList.add('is-open');

    // small delay so the flip starts first
    setTimeout(() => {
      confettiRain();
      if (stage) launchFireworks(stage, 9);
    }, 400);
  });
}

/* ── MUSIC TOGGLE (optional ambient sound) ───────────── */
function initMusicBtn() {
  const btn = document.getElementById('music-btn');
  if (!btn) return;

  // Use AudioContext to generate a tiny happy tune
  let ctx = null, playing = false, nodes = [];

  const notes = [261.63,329.63,392,523.25,659.26,523.25,392,329.63,261.63];

  function playNote(freq, start, dur, actx) {
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(.18, start + .05);
    gain.gain.linearRampToValueAtTime(0, start + dur);
    osc.connect(gain);
    gain.connect(actx.destination);
    osc.start(start);
    osc.stop(start + dur + .05);
    return osc;
  }

  function startTune(actx) {
    nodes = [];
    let t = actx.currentTime + .1;
    for (let rep = 0; rep < 99; rep++) {
      notes.forEach((f, i) => {
        nodes.push(playNote(f, t, .35, actx));
        t += .38;
      });
    }
  }

  btn.addEventListener('click', () => {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (!playing) {
      startTune(ctx);
      btn.textContent = '🔇 Stop music';
      playing = true;
    } else {
      nodes.forEach(n => { try { n.stop(); } catch(e){} });
      nodes = [];
      playing = false;
      btn.textContent = '🎵 Play music';
    }
  });
}

/* ── INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initCard();
  initMusicBtn();
});
