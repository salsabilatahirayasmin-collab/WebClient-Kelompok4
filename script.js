/* ============================================
   MindCare - JavaScript
   Navigation, Page Switching, Scroll Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Elements ----
  const navLinks = document.querySelectorAll('.nav-links a[data-page]');
  const pages = document.querySelectorAll('.page');
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLogo = document.querySelector('.nav-logo');

  // ---- Page Navigation ----
  function switchPage(pageName) {
    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
      targetPage.classList.add('active');
    }

    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.page === pageName) {
        link.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    closeMobileMenu();

    // Re-observe scroll animations for new page
    setTimeout(observeAnimations, 100);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageName = link.dataset.page;
      if (pageName) {
        switchPage(pageName);
      }
    });
  });

  // Logo click → go home
  navLogo.addEventListener('click', () => {
    switchPage('home');
  });

  // ---- Mobile Menu ----
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu() {
    const isOpen = hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  navOverlay.addEventListener('click', closeMobileMenu);

  // ---- Scroll Animations ----
  function observeAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
  }

  observeAnimations();

  // ---- Navbar Scroll Effect ----
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 60) {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.06)';
    }

    lastScroll = currentScroll;
  });

  // ---- Download Button ----
  document.querySelectorAll('.download-btn, .nav-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Animate button
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
        const targetUrl = btn.getAttribute('href') || '../mindcare-mobile/index.html';
        window.open(targetUrl, '_blank');
      }, 150);
    });
  });

  // ---- Email Subscribe ----
  const subscribeForm = document.querySelectorAll('.footer-subscribe button');
  subscribeForm.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      if (input && input.value.trim()) {
        const email = input.value.trim();
        if (email.includes('@') && email.includes('.')) {
          alert(`Terima kasih! ${email} telah terdaftar.`);
          input.value = '';
        } else {
          alert('Mohon masukkan alamat email yang valid.');
        }
      } else {
        alert('Mohon masukkan alamat email Anda.');
      }
    });
  });

  // ---- Subtle hover parallax on phone mockup ----
  const phoneMockup = document.querySelector('.phone-mockup');
  if (phoneMockup) {
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneMockup.style.transform = `rotate(${2 + x * 3}deg) translateY(${y * 8}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      phoneMockup.style.transform = 'rotate(2deg)';
    });
  }
});
