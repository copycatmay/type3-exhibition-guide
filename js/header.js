// Staggered fade-in — skip sponsors and by-the-numbers pages
const skipEntrance = ['sponsors.html', 'exhibitions-by-the-numbers.html'];
const pageName = location.pathname.split('/').pop();
const mainSection = document.querySelector('body > section');

if (mainSection) {
  if (skipEntrance.includes(pageName)) {
    mainSection.classList.add('no-page-enter');
  } else {
    Array.from(mainSection.children).forEach((el, i) => {
      el.style.setProperty('--stagger-i', i);
      el.classList.add('page-enter');
    });
  }
}

// Exhibition accent colours — applied to all nav links site-wide
const accentMap = {
  'just-plain-stupid.html': '#EBE117',
  'doug.html':              '#5A75FA',
  'norilla.html':           '#EB1E16',
  'living-paintings.html':  '#BF79B3',
};

// Mark active page link, assign accent colours, auto-open submenu
document.querySelectorAll('.menu-overlay-list a, .menu-list a').forEach(link => {
  const href = link.getAttribute('href');
  if (accentMap[href]) {
    link.style.setProperty('--link-accent', accentMap[href]);
  }
  if (href === pageName) {
    link.classList.add('is-active');
    const submenu = link.closest('.has-submenu');
    if (submenu) {
      submenu.classList.add('is-open');
      const toggle = submenu.querySelector('.submenu-toggle');
      if (toggle) {
        toggle.classList.add('is-active');
        if (accentMap[href]) {
          toggle.style.setProperty('--link-accent', accentMap[href]);
        }
      }
    }
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const siteHeader = document.querySelector('.site-header');

const openMenu = () => {
  menuToggle.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  siteHeader.classList.remove('is-hidden');
};

const closeMenu = () => {
  menuToggle.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

menuToggle.addEventListener('click', () => {
  menuOverlay.classList.contains('is-open') ? closeMenu() : openMenu();
});

// Only close menu for same-page links (anchors); let navigation links
// leave the overlay visible so the old page doesn't flash through.
menuOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (link.getAttribute('href').startsWith('#')) closeMenu();
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Submenu dropdowns
document.querySelectorAll('.submenu-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.parentElement.classList.toggle('is-open');
  });
});

// Show header on scroll up, hide on scroll down
let lastScrollY = window.scrollY;

// Hero parallax + contrast detection
const heroEl = document.querySelector('.hero-img');
const heroImg = heroEl ? heroEl.querySelector('img') : null;

const updateHeaderContrast = () => {
  if (!heroEl) return;
  const heroBottom = heroEl.getBoundingClientRect().bottom;
  siteHeader.classList.toggle('on-dark', heroBottom > 0);
};
updateHeaderContrast();

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // Header show/hide
  if (!menuOverlay.classList.contains('is-open')) {
    if (currentScrollY < lastScrollY || currentScrollY <= 0) {
      siteHeader.classList.remove('is-hidden');
    } else {
      siteHeader.classList.add('is-hidden');
    }
  }

  // Parallax — image scrolls at 40% speed
  if (heroImg) {
    heroImg.style.transform = `translateY(${currentScrollY * 0.4}px)`;
  }

  // Swap toggle colour when header leaves the hero
  updateHeaderContrast();

  lastScrollY = currentScrollY;
}, { passive: true });
