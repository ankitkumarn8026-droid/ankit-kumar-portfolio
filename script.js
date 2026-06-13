const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 150); // stagger delay
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-card').forEach(el => {
  observer.observe(el);
});

const strings = [
  "E-commerce Operations & Data Management",
  "Marketplace Operations Expert",
  "Catalog & Inventory Specialist",
  "SEO Optimization | Amazon | Flipkart"
  // aur strings add kar sakte ho
];

const el = document.getElementById('tw-text');
let si = 0, ci = 0, deleting = false;

function typewriter() {
  const s = strings[si];
  if (!deleting) {
    el.textContent = s.slice(0, ++ci);
    if (ci === s.length) {
      deleting = true;
      setTimeout(typewriter, 2400); // pause before deleting
      return;
    }
  } else {
    el.textContent = s.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      si = (si + 1) % strings.length;
    }
  }
  setTimeout(typewriter, deleting ? 70 : 120);
}

typewriter();


const navLinks = document.querySelectorAll('.nav-link');

// Click pe active set karo
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Scroll pe bhi active update karo
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { 
  threshold: 0.3,
  rootMargin: '-80px 0px -50% 0px' /* navbar height account karo */
});

sections.forEach(section => observer.observe(section));
