/* ═══════════════════════════════════════════════════════════════
   S. VIKRAM REDDY — PORTFOLIO SCRIPT
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─── PRELOADER ─────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    // Trigger hero reveals after preloader
    document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('revealed'), i * 120);
    });
  }, 1900);
});

/* ─── CUSTOM CURSOR ─────────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

// Smooth ring following
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

// Expand ring on interactive elements
document.querySelectorAll('a, button, .project-card, .name-letter, .stag, .social-link, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

/* ─── NAVBAR ─────────────────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

// Scroll sticky
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

// Hamburger
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav highlight
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop, height = sec.offsetHeight;
    const link = document.querySelector(`.nav-link[data-section="${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
  });
}

/* ─── THEME TOGGLE ───────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

/* ─── PARTICLE CANVAS ───────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: null, y: null };

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.vy    = (Math.random() - 0.5) * 0.4;
      this.r     = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      // Mouse repel
      if (mouse.x !== null) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x += dx / dist * 1.5;
          this.y += dy / dist * 1.5;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,229,255,${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
})();

/* ─── TYPING ANIMATION ─────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById('typingText');
  const roles = [
    'Python APIs',
    'Django backends',
    'REST services',
    'OCR pipelines',
    'full-stack apps',
    'scalable systems',
  ];
  let ri = 0, ci = 0, deleting = false;

  function type() {
    const word = roles[ri];
    if (!deleting) {
      el.textContent = word.slice(0, ci + 1);
      ci++;
      if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
    } else {
      el.textContent = word.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
    }
    setTimeout(type, deleting ? 60 : 95);
  }
  setTimeout(type, 2200);
})();

/* ─── MAGNETIC NAME LETTERS ─────────────────────────────────────── */
const fonts = [
  'font-playfair',
  'font-bebas',
  'font-abril',
  'font-orbitron',
  'font-cinzel',
  'font-lobster',
  'font-righteous',
  'font-cormorant',
  'font-mono',
];
const allFontClasses = fonts.join(' ');

// Each letter gets a random font on each hover
document.querySelectorAll('.name-letter').forEach(letter => {
  letter.addEventListener('mouseenter', (e) => {
    // Remove all font classes
    letter.classList.remove(...fonts);
    // Apply random font
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    letter.classList.add(randomFont);
  });

  letter.addEventListener('mouseleave', () => {
    // Return to default with slight delay for smooth feel
    setTimeout(() => {
      letter.classList.remove(...fonts);
    }, 300);
  });

  // Magnetic effect
  letter.addEventListener('mousemove', (e) => {
    const rect = letter.getBoundingClientRect();
    const lx = e.clientX - (rect.left + rect.width / 2);
    const ly = e.clientY - (rect.top + rect.height / 2);
    letter.style.transform = `translate(${lx * 0.3}px, ${ly * 0.3}px) scale(1.25) rotate(${lx * 0.05}deg)`;
    letter.style.transition = 'transform 0.1s, color 0.2s, text-shadow 0.2s';
  });

  letter.addEventListener('mouseleave', () => {
    letter.style.transform = '';
    letter.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), color 0.2s, text-shadow 0.2s';
  });
});

/* ─── SCROLL REVEAL ─────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Skip hero elements (handled by preloader callback)
  if (!el.closest('.hero')) revealObserver.observe(el);
});

/* ─── SKILL BARS ─────────────────────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

/* ─── COUNT-UP STATS ─────────────────────────────────────────────── */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const target = parseFloat(el.dataset.target);
        const isFloat = target % 1 !== 0;
        const duration = 1500, steps = 60;
        let current = 0;
        const increment = target / steps;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = isFloat ? current.toFixed(2) : Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.about-stats').forEach(s => statObserver.observe(s));

/* ─── 3D TILT ON PROJECT CARDS ──────────────────────────────────── */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const cx    = rect.left + rect.width  / 2;
    const cy    = rect.top  + rect.height / 2;
    const dx    = (e.clientX - cx) / (rect.width  / 2);
    const dy    = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-8px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg)`;
    card.style.transition = 'transform 0.1s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s, box-shadow 0.3s';
  });
});

/* ─── 3D TILT ON ABOUT CARD ─────────────────────────────────────── */
const aboutCard = document.getElementById('aboutCard');
if (aboutCard) {
  aboutCard.addEventListener('mousemove', (e) => {
    const rect = aboutCard.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    aboutCard.style.transform = `rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
  });
  aboutCard.addEventListener('mouseleave', () => {
    aboutCard.style.transform = '';
  });
}

/* ─── PROJECT MODAL ─────────────────────────────────────────────── */
const modalOverlay = document.getElementById('modalOverlay');

function openModal(id) {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  const modal = document.getElementById(`modal-${id}`);
  if (modal) { modal.classList.add('active'); modalOverlay.classList.add('active'); }
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Expose globally for onclick in HTML
window.openModal  = openModal;
window.closeModal = closeModal;

/* ─── CONTACT FORM ───────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    function validate(id, errorId, check) {
      const input = document.getElementById(id);
      const error = document.getElementById(errorId);
      const group = input.closest('.form-group');
      if (!check(input.value.trim())) {
        error.classList.add('show');
        group.classList.add('error');
        valid = false;
      } else {
        error.classList.remove('show');
        group.classList.remove('error');
      }
    }

    validate('formName',    'nameError',    v => v.length >= 2);
    validate('formEmail',   'emailError',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    validate('formSubject', 'subjectError', v => v.length >= 3);
    validate('formMessage', 'msgError',     v => v.length >= 10);

    if (valid) {
      const btn = contactForm.querySelector('.form-submit');
      btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      // Simulate API call (replace with EmailJS / backend)
      setTimeout(() => {
        contactForm.reset();
        document.querySelectorAll('.form-group label').forEach(l => l.style = '');
        btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        btn.disabled = false;
        const success = document.getElementById('formSuccess');
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1500);
    }
  });

  // Clear errors on input
  contactForm.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      group.classList.remove('error');
      group.querySelector('.form-error')?.classList.remove('show');
    });
  });
}

/* ─── SMOOTH SCROLL ─────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ─── MAGNETIC BUTTON EFFECT ─────────────────────────────────────── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.25;
    const dy   = (e.clientY - cy) * 0.25;
    btn.style.transform    = `translate(${dx}px, ${dy}px)`;
    btn.style.transition   = 'transform 0.15s';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform  = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  });
});

/* ─── RESUME DOWNLOAD (placeholder) ─────────────────────────────── */
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Resume download ready! Replace this with your actual PDF link in the href attribute of #resumeBtn.');
});
document.getElementById('downloadResume')?.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Resume download ready! Replace this with your actual PDF link.');
});

/* ─── PAGE SCROLL PROGRESS ──────────────────────────────────────── */
(function addScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; z-index:9999;
    background:linear-gradient(90deg,#00e5ff,#7c3aed,#f472b6);
    transition:width 0.1s; pointer-events:none;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = pct + '%';
  });
})();

console.log('%c S. VIKRAM REDDY ', 'background:linear-gradient(135deg,#00e5ff,#7c3aed);color:#000;font-size:16px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('%c Python & Django Developer | sangamvikramreddy@gmail.com ', 'color:#00e5ff;font-size:12px;');
