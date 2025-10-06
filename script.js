document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const navLinks = document.querySelectorAll('#nav a');
  const sections = document.querySelectorAll('section[id]');
  const animateElements = document.querySelectorAll('.animate, .skill-card, .project, .exp-card');

  // Nav toggle
  navToggle?.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
  });

  // Smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 900) nav.style.display = 'none';
      }
    });
  });

  // Close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && !e.target.closest('#nav') && !e.target.closest('#nav-toggle')) {
      nav.style.display = 'none';
    }
  });

  // Theme toggle
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
  }
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });

  // Smooth fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // Nav active dot
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -80% 0px' });

  sections.forEach(section => spyObserver.observe(section));

  // Typewriter end
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) setTimeout(() => typewriterEl.style.borderRight = 'none', 2000);
});