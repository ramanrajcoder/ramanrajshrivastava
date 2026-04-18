/* ═══════════════════════════════════════════════
   PORTFOLIO JS — Raman Raj Shrivastava
════════════════════════════════════════════════ */

// ─── CUSTOM CURSOR ───
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .service-card, .blog-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });
}

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ─── THEME TOGGLE ───
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ─── TYPED TEXT EFFECT ───
const typedEl = document.getElementById('typedText');
const phrases = [
  'Web Experiences.',
  'Business Solutions.',
  'AI-Powered Apps.',
  'Startup MVPs.',
  'Digital Products.',
];
let pIdx = 0, cIdx = 0, deleting = false;
const typingSpeed = 90, deletingSpeed = 50, pauseTime = 2200;

function typeWriter() {
  const current = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = current.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, pauseTime);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? deletingSpeed : typingSpeed);
}
typeWriter();

// ─── SCROLL REVEAL ───
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target.dataset.delay || 0));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
document.querySelectorAll('.skills-grid .skill-card, .projects-grid .project-card, .services-grid .service-card, .blog-grid .blog-card').forEach((el, i) => {
  el.dataset.delay = i;
});
document.querySelectorAll('.timeline-item').forEach((el, i) => { el.dataset.delay = i; });

revealEls.forEach(el => revealObserver.observe(el));

// ─── SKILL BARS ───
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => skillObserver.observe(card));

// ─── PROJECT FILTER ───
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── CONTACT FORM ───
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  setTimeout(() => {
    btn.innerHTML = '<span>Message Sent!</span><i class="fas fa-check"></i>';
    formSuccess.classList.add('show');
    form.reset();
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    }, 3500);
  }, 1500);
});

// ─── SMOOTH ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navLinksList.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + current
      ? 'var(--text-primary)'
      : '';
  });
});

// ─── HERO ORB PARALLAX ───
const orb1 = document.querySelector('.hero-orb-1');
const orb2 = document.querySelector('.hero-orb-2');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  if (orb1) orb1.style.transform = `translate(${x}px, ${y}px)`;
  if (orb2) orb2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
});

// ─── COUNTER ANIMATION ───
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent);
      const suffix = el.textContent.replace(target.toString(), '');
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + suffix;
        if (count >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });
statNums.forEach(el => counterObserver.observe(el));

// ─── CSS ANIMATION KEYFRAME ───
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
