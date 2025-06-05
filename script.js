/* =========  NAVIGATION  ========= */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');

function toggleMenu () {
  navLinks.classList.toggle('open');
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !expanded);
}
burger.addEventListener('click', toggleMenu);

/* smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href'))
            .scrollIntoView({ behavior: 'smooth' });
    if (navLinks.classList.contains('open')) toggleMenu();
  });
});

/* =========  PROJECT FILTER  ========= */
// optional buttons: <button data-filter="all">All</button> …
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => filterProjects(btn.dataset.filter));
});

function filterProjects(category) {
  document.querySelectorAll('.project-card').forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.style.display = match ? 'block' : 'none';
  });
}

/* =========  LIGHTBOX  ========= */
const overlay = document.createElement('div');
overlay.id = 'lightbox';
overlay.style.cssText = `
  position: fixed; inset: 0; background: rgba(0,0,0,.8);
  display: flex; align-items: center; justify-content: center; 
  visibility: hidden; opacity: 0; transition: opacity .3s ease;
`;
overlay.innerHTML = '<img alt="" style="max-width:90%;max-height:90%;">';
overlay.addEventListener('click', () => closeLightbox());
document.body.appendChild(overlay);

function openLightbox(src, alt) {
  const img = overlay.querySelector('img');
  img.src = src;
  img.alt = alt;
  overlay.style.visibility = 'visible';
  overlay.style.opacity = '1';
}

function closeLightbox() {
  overlay.style.opacity = '0';
  setTimeout(() => (overlay.style.visibility = 'hidden'), 300);
}

document.querySelectorAll('.project-card img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});

/* =========  FORM VALIDATION  ========= */
const form   = document.querySelector('#contact form');
const fields = ['name', 'email', 'message'];

form.addEventListener('submit', e => {
  let valid = true;

  fields.forEach(id => {
    const input = form[id];
    if (!input.value.trim()) {
      valid = false;
      showError(input, 'Required');
    }
  });

  if (!valid) e.preventDefault();
});

fields.forEach(id => {
  const input = form[id];
  input.addEventListener('input', () => clearError(input));
});

function showError(el, msg) {
  clearError(el);
  const span = document.createElement('span');
  span.className = 'error';
  span.textContent = msg;
  span.style.color = 'red';
  span.style.fontSize = '0.8rem';
  el.after(span);
}

function clearError(el) {
  const next = el.nextElementSibling;
  if (next?.classList.contains('error')) next.remove();
}
