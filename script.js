/* =============================================
   ANWALT FOR YOU – JavaScript
   ============================================= */

// ── Loader ──────────────────────────────────
const loader = document.getElementById('loader');
document.body.style.overflow = 'hidden';
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = 'auto';
    triggerReveal();
  }, 1600);
});

// ── Custom Cursor ────────────────────────────
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ── Navigation ───────────────────────────────
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 500);
});

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));

// ── 3D Card Effect ───────────────────────────
const card3d = document.getElementById('card3d');
if (card3d) {
  const cardFront = card3d.querySelector('.card-front');
  card3d.addEventListener('mousemove', e => {
    const rect = card3d.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardFront.style.transform = `perspective(1000px) rotateY(${x * 20}deg) rotateX(${-y * 14}deg)`;
  });
  card3d.addEventListener('mouseleave', () => {
    cardFront.style.transform = '';
  });
}

// ── Scroll Reveal ────────────────────────────
function triggerReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('revealed'), parseInt(delay));
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Counter Animation ────────────────────────
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const dur = 1800;
      const step = target / (dur / 16);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = Math.floor(cur);
        if (cur >= target) clearInterval(t);
      }, 16);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.pstat-num').forEach(el => counterObserver.observe(el));

// ── Testimonial Slider ────────────────────────
const stimmenTrack = document.getElementById('stimmenTrack');
const sDots = document.getElementById('sDots');
const stimmenCards = document.querySelectorAll('.stimmen-card');
let sCurrent = 0;
let sAuto;

stimmenCards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => sGoTo(i));
  sDots.appendChild(dot);
});

function sGoTo(i) {
  sCurrent = (i + stimmenCards.length) % stimmenCards.length;
  stimmenTrack.style.transform = `translateX(-${sCurrent * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, idx) => d.classList.toggle('active', idx === sCurrent));
}

document.getElementById('sPrev').addEventListener('click', () => { sGoTo(sCurrent - 1); resetSAuto(); });
document.getElementById('sNext').addEventListener('click', () => { sGoTo(sCurrent + 1); resetSAuto(); });
function resetSAuto() { clearInterval(sAuto); sAuto = setInterval(() => sGoTo(sCurrent + 1), 6000); }
sAuto = setInterval(() => sGoTo(sCurrent + 1), 6000);

// ── Rechtsgebiet Chips ────────────────────────
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    document.getElementById('rechtsgebietInput').value = chip.dataset.val;
  });
});

// ── Contact Form ──────────────────────────────
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Anfrage gesendet – wir melden uns!</span>';
  btn.style.background = '#2d6a4f';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 4000);
});

// ── Back to Top ───────────────────────────────
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Subtle parallax on hero ───────────────────
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.3}px`;
});
