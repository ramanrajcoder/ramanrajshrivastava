
/* 
   1. NAVBAR — Scroll Effect & Active State
    */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* 
   2. HAMBURGER MENU — Mobile Toggle
    */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* 
   3. SMOOTH SCROLL — All anchor links
    */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // Height of fixed navbar
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* 
   4. SCROLL REVEAL — Animate elements on scroll
    */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((el, i) => {
          if (el === entry.target) delay = i * 120;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  }
);

revealElements.forEach(el => revealObserver.observe(el));

/*
   5. ACTIVE NAV LINK — Highlight current section
    */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  {
    rootMargin: '-40% 0px -50% 0px'
  }
);

sections.forEach(sec => sectionObserver.observe(sec));

/*
   6. TYPING EFFECT — Hero subtitle (optional)
    */
function typeWriter(element, texts, speed = 80, pause = 2000) {
  let textIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function type() {
    const current = texts[textIndex];
    if (isDeleting) {
      element.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? speed / 2 : speed;

    if (!isDeleting && charIndex === current.length) {
      delay = pause;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex  = (textIndex + 1) % texts.length;
      delay      = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* 
   7. PROJECT CARD — Tilt Effect on Hover
    */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -5;
    const rotateY = ((x - cx) / cx) *  5;

    card.style.transform = `
      translateY(-8px)
      perspective(600px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => { card.style.transition = ''; }, 500);
  });
});

/* 
   8. YEAR — Auto-update footer year
    */
const yearEl = document.querySelector('.footer-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* 
   9. PROGRESS BAR — Reading indicator at top
   */
const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
Object.assign(progressBar.style, {
  position:   'fixed',
  top:        '0',
  left:       '0',
  height:     '2px',
  width:      '0%',
  background: 'linear-gradient(90deg, #f5c842, #4fd1c5)',
  zIndex:     '9999',
  transition: 'width 0.1s linear',
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
});

/* 
   10. CONSOLE EASTER EGG
    */
console.log(
  '%c👋 Hey there, developer!',
  'color: #f5c842; font-size: 18px; font-weight: bold;'
);
console.log(
  '%cThis portfolio was built by Raman Raj Shrivastava.\nCheck out my GitHub: https://github.com/ramanrajcoder',
  'color: #4fd1c5; font-size: 13px;'
);
