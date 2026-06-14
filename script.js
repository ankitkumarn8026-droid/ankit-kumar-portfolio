// === Scroll Reveal ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-card').forEach(el => {
  revealObserver.observe(el);
});

// === Typewriter ===
const isMobile = window.innerWidth <= 768;
const strings = isMobile ? [
  "E-commerce Operations",
  "Marketplace Expert",
  "Catalog & Inventory",
  "SEO | Amazon | Flipkart"
] : [
  "E-commerce Operations & Data Management",
  "Marketplace Operations Expert",
  "Catalog & Inventory Specialist",
  "SEO Optimization | Amazon | Flipkart"
];

const twEl = document.getElementById('tw-text');
let si = 0, ci = 0, deleting = false;

function typewriter() {
  const s = strings[si];
  if (!deleting) {
    twEl.textContent = s.slice(0, ++ci);
    if (ci === s.length) {
      deleting = true;
      setTimeout(typewriter, 2400);
      return;
    }
  } else {
    twEl.textContent = s.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      si = (si + 1) % strings.length;
    }
  }
  setTimeout(typewriter, deleting ? 70 : 120);
}
typewriter();

// === Navbar Active Link ===
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { 
  threshold: 0.3,
  rootMargin: '-80px 0px -50% 0px'
});

sections.forEach(section => navObserver.observe(section));


// Hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinksMenu.classList.toggle('open');
});

// Link click pe menu band ho jaye
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinksMenu.classList.remove('open');
  });
});


function sendEmail() {
  const name = document.querySelector('.cf-input[placeholder="Your Name"]').value;
  const email = document.querySelector('.cf-input[placeholder="Your Email"]').value;
  const subject = document.querySelector('.cf-input[placeholder="Subject"]').value;
  const message = document.querySelector('.cf-textarea').value;

  if (!name || !email || !message) {
    alert('Please fill all fields!');
    return;
  }

  const mailtoLink = `mailto:ankitkumarn8026@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
  window.location.href = mailtoLink;
}
