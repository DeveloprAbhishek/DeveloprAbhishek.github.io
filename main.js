// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Header shadow on scroll
const header = document.getElementById('siteHeader');
const toggleShadow = () => header.classList.toggle('stuck', window.scrollY > 4);
window.addEventListener('scroll', toggleShadow, { passive: true });
toggleShadow();

// Stable Active-Menu Highlight using IntersectionObserver centered window
const links = [...document.querySelectorAll('header a[data-link]')];
const targets = ['about', 'experience', 'projects'].map(id => document.getElementById(id));
function setActive(id) { links.forEach(a => a.classList.toggle('active', a.dataset.link === id)); }
// Root margin centers the viewport band for detection
const io = new IntersectionObserver((entries) => {
  let best = null;
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
  }
  if (best) { setActive(best.target.id); }
}, { threshold: [0.25, 0.5, 0.75], rootMargin: "-40% 0px -40% 0px" });
targets.forEach(t => io.observe(t));
// On click, set immediately; scroll will keep in sync
links.forEach(a => a.addEventListener('click', () => setActive(a.dataset.link)));
window.addEventListener('load', () => {
  const id = location.hash.replace('#', '') || 'about';
  setActive(id);
});

const projectImages = {
  dunzo: [
    "https://developrabhishek.github.io/assets/img/portfolio/dunzo/dunzo-1.jpg",
    "https://developrabhishek.github.io/assets/img/portfolio/dunzo/dunzo-2.jpg",
    "https://developrabhishek.github.io/assets/img/portfolio/dunzo/dunzo-3.jpg"
  ],
  redbus: [
    "https://developrabhishek.github.io/assets/img/portfolio/red-bus/redbus-1.jpg",
    "https://developrabhishek.github.io/assets/img/portfolio/red-bus/redbus-2.jpg",
    "https://developrabhishek.github.io/assets/img/portfolio/red-bus/redbus-3.jpg"
  ]
};

function changeGalleryImage(project, index) {
  const gallery = document.querySelector(`[data-gallery='${project}']`);
  const mainImg = gallery.querySelector(".main img");
  const dots = gallery.querySelectorAll(".dot");

  if (!mainImg || !dots.length) return;

  // Change image
  mainImg.src = projectImages[project][index];

  // Update active dot
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
