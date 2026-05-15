/**
 * MILK & COOKIE BAR - Main Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initBackToTop();
  initStatsCountUp();
  initSauceSelector();
  initPricingToggle();
  initCountdown();
  initBlogFilters();
  initCookieSlider();

  // Theme Toggle Event
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('mcb-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  // RTL Toggle Event
  const rtlToggleBtn = document.getElementById('rtlToggle');
  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      setRTL(newDir);
    });
  }
});

// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('mcb-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle svg path');
  if (!icon) return;
  // Simple toggle between Moon (dark mode) and Sun (light mode)
  if (theme === 'dark') {
    // Sun icon for switching back to light
    icon.setAttribute('d', 'M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z');
  } else {
    // Moon icon for switching to dark
    icon.setAttribute('d', 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z');
  }
}

// --- RTL Management ---
function initRTL() {
  const savedDir = localStorage.getItem('mcb-dir') || 'ltr';
  setRTL(savedDir);
}

function setRTL(dir) {
  document.documentElement.setAttribute('dir', dir);
  localStorage.setItem('mcb-dir', dir);

  // Toggle Bootstrap RTL Link
  const bootstrapLink = document.getElementById('bootstrap-css');
  if (bootstrapLink) {
    if (dir === 'rtl') {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
    } else {
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    }
  }

  // Update button icon
  const rtlToggleBtn = document.getElementById('rtlToggle');
  if (rtlToggleBtn) {
    rtlToggleBtn.style.transform = dir === 'rtl' ? 'scaleX(-1)' : 'scaleX(1)';
  }
}

// --- Navbar & Mobile Menu ---
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  // Sticky scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Auto-close offcanvas on link click
  const offcanvasElement = document.getElementById('mobileMenu');
  if (offcanvasElement) {
    const offcanvasLinks = offcanvasElement.querySelectorAll('.nav-link');
    // Using bootstrap offcanvas API if available
    if (typeof bootstrap !== 'undefined') {
      const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement, { toggle: false });
      offcanvasLinks.forEach(link => {
        link.addEventListener('click', () => {
          bsOffcanvas.hide();
        });
      });
    }
  }
}

// --- Back to Top ---
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// --- Stats Count-Up ---
function initStatsCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseFloat(target.getAttribute('data-target'));
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 2000; // ms
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const counter = setInterval(() => {
          frame++;
          const progress = frame / totalFrames;
          // easeOutQuart
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          let currentValue = targetValue * easeProgress;

          if (targetValue % 1 !== 0) {
            currentValue = currentValue.toFixed(1);
          } else {
            currentValue = Math.round(currentValue);
          }

          target.innerText = prefix + currentValue + suffix;

          if (frame === totalFrames) {
            clearInterval(counter);
            target.innerText = prefix + targetValue + suffix;
          }
        }, frameRate);

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// --- Dipping Sauce Selector ---
function initSauceSelector() {
  const pills = document.querySelectorAll('.sauce-pill');
  if (pills.length === 0) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
    });
  });
}

// --- Pricing Toggle (Home 2 & Pricing Page) ---
function initPricingToggle() {
  const toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
  if (toggleBtns.length === 0) return;

  const priceElements = document.querySelectorAll('.dynamic-price');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Update active state of buttons
      const group = btn.closest('.pricing-toggle-wrapper') || document;
      const groupBtns = group.querySelectorAll('.pricing-toggle-btn');

      groupBtns.forEach(b => b.classList.remove('btn-brand-primary', 'active'));
      groupBtns.forEach(b => b.classList.add('btn-brand-outline'));

      btn.classList.remove('btn-brand-outline');
      btn.classList.add('btn-brand-primary', 'active');

      const type = btn.getAttribute('data-type');

      // Update prices based on data attributes
      priceElements.forEach(priceEl => {
        const newPrice = priceEl.getAttribute(`data-${type}`);
        if (!newPrice) return;

        // simple crossfade effect
        priceEl.style.opacity = '0';
        setTimeout(() => {
          priceEl.innerText = newPrice;
          priceEl.style.opacity = '1';
        }, 200);
      });
    });
  });
}

// --- Coming Soon Countdown ---
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  // Set target date 90 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 90);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

    if (distance < 0) {
      clearInterval(timerInterval);
      countdownEl.innerHTML = "<h3>WE ARE OPEN!</h3>";
    }
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();
}

// --- Blog Filtering ---
function initBlogFilters() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  if (filterBtns.length === 0) return;

  const blogCards = document.querySelectorAll('.blog-card-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Cookie Slider Logic
function initCookieSlider() {
  const slider = document.getElementById("cookieSlider");
  const prevBtn = document.getElementById("cookiePrev");
  const nextBtn = document.getElementById("cookieNext");

  if (slider && prevBtn && nextBtn) {
    const scrollAmount = 320;

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
}

