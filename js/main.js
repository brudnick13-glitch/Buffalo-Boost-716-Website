// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('nav ul');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navList.classList.toggle('open');
  });

  // Close on link click
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      navList.classList.remove('open');
    });
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav ul li a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Scroll fade-in
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Car track animation (only on hero page with .car-wrap)
function initCars() {
  const wrap = document.querySelector('.car-wrap');
  const oval = document.querySelector('.track-oval');
  if (!wrap || !oval) return;

  const rect = oval.getBoundingClientRect();
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const rx = rect.width / 2;
  const ry = rect.height / 2;

  const path = `path('M ${cx - rx},${cy} a ${rx},${ry} 0 1,1 ${rx * 2},0 a ${rx},${ry} 0 1,1 -${rx * 2},0')`;

  document.querySelectorAll('.car').forEach(car => {
    car.style.offsetPath = path;
  });
}

window.addEventListener('load', initCars);
window.addEventListener('resize', initCars);

// Formspree form handler
function initForm(formId, successId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const successEl = document.getElementById(successId);
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (successEl) successEl.style.display = 'block';
        btn.textContent = 'Sent!';
      } else {
        btn.textContent = 'Error — Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Error — Try Again';
      btn.disabled = false;
    }
  });
}

initForm('contact-form', 'contact-success');
initForm('waitlist-form', 'waitlist-success');
