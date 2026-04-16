// Staggered fade-in — skip sponsors and by-the-numbers pages
const skipEntrance = ['sponsors.html', 'exhibitions-by-the-numbers.html'];
const pageName = location.pathname.split('/').pop() || '';
const isIndexHome = document.body.classList.contains('index-home');
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
  'doug.html':              '#5A75FA',
  'norilla.html':           '#EB1E16',
  'living-paintings.html':  '#BF79B3',
};

// Mark active page link, assign accent colours, auto-open submenu
document.querySelectorAll('.menu-overlay-list a').forEach(link => {
  const href = link.getAttribute('href');
  const hrefBase = href.split('#')[0];
  if (accentMap[hrefBase]) {
    link.style.setProperty('--link-accent', accentMap[hrefBase]);
    link.classList.add('has-accent');
  }
  const isHomeActive =
    hrefBase === 'index.html' &&
    (pageName === 'index.html' || pageName === '');
  if (hrefBase === pageName || isHomeActive) {
    const submenu = link.closest('.has-submenu');
    if (submenu) {
      submenu.classList.add('is-open');
      // Mark all links in this submenu active
      submenu.querySelectorAll('a').forEach(a => a.classList.add('is-active'));
      const toggle = submenu.querySelector('.submenu-toggle');
      if (toggle) {
        toggle.classList.add('is-active');
        if (accentMap[hrefBase]) {
          toggle.style.setProperty('--link-accent', accentMap[hrefBase]);
        }
      }
    } else {
      link.classList.add('is-active');
    }
  }
});

const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const siteHeader = document.querySelector('.site-header');
const indexOpenHeader = document.querySelector('.index-open-header');

const syncIndexOpenHeaderAria = (expanded) => {
  if (!indexOpenHeader) return;
  indexOpenHeader.setAttribute('aria-expanded', expanded ? 'true' : 'false');
};

const openMenu = () => {
  menuToggle.classList.add('is-open');
  menuOverlay.classList.add('is-open');
  menuToggle.setAttribute('aria-expanded', 'true');
  menuOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  siteHeader.classList.remove('is-hidden');
  syncIndexOpenHeaderAria(true);
};

const closeMenu = () => {
  menuToggle.classList.remove('is-open');
  menuOverlay.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (isIndexHome) {
    siteHeader.classList.add('is-hidden');
  }
  syncIndexOpenHeaderAria(false);
};

if (isIndexHome) {
  siteHeader.classList.add('is-hidden');
  // no hero-img — keep menu toggle legible on random exhibit photo
  siteHeader.classList.add('on-dark');
}

menuToggle.addEventListener('click', () => {
  menuOverlay.classList.contains('is-open') ? closeMenu() : openMenu();
});

if (indexOpenHeader) {
  indexOpenHeader.addEventListener('click', () => {
    if (menuOverlay.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
}

// Close menu + smooth scroll for same-page navigation (pure anchors or
// links pointing to the current page with a hash).
menuOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const hrefBase = href.split('#')[0];
    const hash = href.includes('#') ? href.split('#')[1] : null;
    const isSamePage = href.startsWith('#') || hrefBase === pageName;

    if (isSamePage) {
      closeMenu();
      if (hash) {
        e.preventDefault();
        const target = document.getElementById(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
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

  // Header show/hide (index home keeps header off-canvas until menu opens)
  if (!isIndexHome && !menuOverlay.classList.contains('is-open')) {
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
