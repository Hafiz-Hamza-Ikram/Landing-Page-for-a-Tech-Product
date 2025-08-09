// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Read and apply saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !savedTheme)) {
  setTheme('dark');
} else {
  setTheme('light');
}

themeToggle.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Hamburger menu logic
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;
hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.style.display = menuOpen ? 'flex' : 'none';
});
hamburger.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    menuOpen = !menuOpen;
    mobileMenu.style.display = menuOpen ? 'flex' : 'none';
  }
});
// Hide mobile menu on nav click
mobileMenu.querySelectorAll('.navbar-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.style.display = 'none';
  });
});

// Highlight active navbar links on scroll
const sectionIds = ['hero', 'features', 'testimonials', 'pricing', 'cta'];
const navbarLinks = document.querySelectorAll('.navbar-link');
function highlightNav() {
  let index = sectionIds.length - 1;
  for (let i = sectionIds.length - 1; i >= 0; i--) {
    const section = document.getElementById(sectionIds[i]);
    if (section && window.scrollY + 80 >= section.offsetTop) {
      index = i;
      break;
    }
  }
  navbarLinks.forEach((link, i) => {
    link.classList.toggle('active', i === index);
  });
  // Also highlight in mobile menu
  mobileMenu.querySelectorAll('.navbar-link').forEach((link, i) => {
    link.classList.toggle('active', i === index);
  });
}
window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);