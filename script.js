document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const navLinks = document.querySelectorAll('#nav a');
  const sections = document.querySelectorAll('section[id]');
  const animateElements = document.querySelectorAll('.skill-card, .project, .exp-card');
  const scrollProgress = document.getElementById('scroll-progress');

  // 1. Mobile Menu Toggle
  navToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (nav.style.display === 'block') {
      nav.style.display = 'none';
    } else {
      nav.style.display = 'block';
    }
  });

  // Close nav on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && !e.target.closest('#nav') && !e.target.closest('#nav-toggle')) {
      nav.style.display = 'none';
    }
  });

  // 2. Smooth scrolling for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (window.innerWidth <= 900) {
          nav.style.display = 'none';
        }
      }
    });
  });

  // 3. Theme Toggle & Sync
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('light');
    themeToggle.textContent = '🌙';
  }

  themeToggle?.addEventListener('click', () => {
    body.classList.toggle('light');
    if (body.classList.contains('light')) {
      themeToggle.textContent = '☀️';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.textContent = '🌙';
      localStorage.setItem('theme', 'dark');
    }
  });

  // 4. Scroll Progress Indicator
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
      }
    }
  });

  // 5. Project Category Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#project-grid .project');

  // Set initial visibility status for animation
  projectCards.forEach(card => card.classList.add('visible-card'));

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active states of buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden-card');
          card.classList.add('visible-card');
        } else {
          card.classList.remove('visible-card');
          card.classList.add('hidden-card');
        }
      });
    });
  });

  // 6. Smooth scroll fade-in Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing after anim has fired once
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // 7. Dynamic Navigation Active Indicator Observer
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
  }, { threshold: 0.2, rootMargin: '-25% 0px -75% 0px' });

  sections.forEach(section => spyObserver.observe(section));

  // 8. Typewriter Effect
  const words = ["Data Scientist", "AI Engineer", "Data Analyst", "Software Developer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.querySelector(".typed-text");
  
  function type() {
    if (!typedTextSpan) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1800; // pause at the end of the word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 300; // pause before starting next word
    }

    setTimeout(type, typeSpeed);
  }
  
  // Start typewriter
  if (typedTextSpan) {
    setTimeout(type, 800);
  }

  // 9. Interactive 3D Tilt Effect on Avatar Card
  const avatarCard = document.getElementById('avatar-card');
  const avatarContainer = document.querySelector('.hero-avatar-container');
  
  if (avatarCard && avatarContainer) {
    avatarContainer.addEventListener('mousemove', (e) => {
      const rect = avatarContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((centerY - y) / centerY) * 15; // tilt up/down
      const rotateY = ((x - centerX) / centerX) * 15; // tilt left/right
      
      avatarCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });
    
    avatarContainer.addEventListener('mouseleave', () => {
      avatarCard.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      avatarCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    avatarContainer.addEventListener('mouseenter', () => {
      avatarCard.style.transition = 'none';
    });
  }
});