// ── Random exhibition background + accent colour on each load ──
const exhibitions = [
  { img: 'doug-bg-1.png',              accent: '#5A75FA' },
  { img: 'doug-bg-2.png',              accent: '#5A75FA' },
  { img: 'living-paintings-bg-1.png',   accent: '#BF79B3' },
  { img: 'living-paintings-bg-2.png',   accent: '#BF79B3' },
  { img: 'norilla-bg-1.png',           accent: '#EB1E16' },
  { img: 'norilla-bg-2.png',           accent: '#EB1E16' },
  { img: 'just-plain-stupid-bg-1.png', accent: '#EBE117' },
  { img: 'just-plain-stupid-bg-2.png', accent: '#EBE117' },
];
const exhibit = exhibitions[Math.floor(Math.random() * exhibitions.length)];
document.documentElement.style.setProperty('--bg-image', `url("../img/bg/${exhibit.img}")`);
document.documentElement.style.setProperty('--color-3', exhibit.accent);

const section = document.querySelector('#exhibitions-by-the-numbers');
const h2 = section.querySelector('h2');
const articles = [...section.querySelectorAll('article')];

// ── Build track: data-panel (spans cols 0-1) + h2-panel (col 2) ──
const track = document.createElement('div');
track.className = 'swipe-track';

const dataPanel = document.createElement('div');
dataPanel.className = 'data-panel';
articles.forEach(a => dataPanel.appendChild(a));

const h2Panel = document.createElement('div');
h2Panel.className = 'swipe-panel h2-panel';
h2Panel.appendChild(h2);
const hint = document.createElement('div');
hint.className = 'swipe-hint';
h2Panel.appendChild(hint);

track.appendChild(dataPanel);
track.appendChild(h2Panel);
section.appendChild(track);

// ── Collect shared headers that stay visible across cols 0-1 ──
const sharedHeaders = [];
articles.forEach(article => {
  const h3 = article.querySelector('h3');
  if (h3) sharedHeaders.push(h3);
  article.querySelectorAll(':scope > p:not(.director-signature)').forEach(p => {
    sharedHeaders.push(p);
  });
  article.querySelectorAll('th[colspan]').forEach(th => {
    sharedHeaders.push(th);
  });
});

// Mark them for CSS (z-index, transition)
sharedHeaders.forEach(el => el.classList.add('pinned-header'));

// ── Fixed title ──

// ── Pagination dots (3) ──
const dots = document.createElement('div');
dots.className = 'swipe-dots';
dots.innerHTML = [0, 1, 2].map(i =>
  `<span class="dot${i === 2 ? ' active' : ''}" data-index="${i}"></span>`
).join('');
section.appendChild(dots);
const dotEls = dots.querySelectorAll('.dot');

// ── Set initial state (col 2 = h2) ──
section.classList.add('at-h2');

// ── Navigation ──
let currentCol = 2;

function goTo(col) {
  col = Math.max(0, Math.min(2, col));
  if (col === currentCol) return;
  currentCol = col;

  // Position track
  const offset = -(col * 100 / 3);
  track.style.transform = `translateX(${offset}%)`;

  // Counter-translate shared headers so they stay at viewport left edge
  const counterX = col < 2 ? col * section.clientWidth : 0;
  sharedHeaders.forEach(el => {
    el.style.transform = `translateX(${counterX}px)`;
  });

  // Update dots + title/hint visibility
  dotEls.forEach((d, i) => d.classList.toggle('active', i === col));
  section.classList.toggle('at-h2', col === 2);
  hint.style.opacity = col === 2 ? '' : '0';
}

// ── Interactions ──
h2.addEventListener('click', () => goTo(1));

dots.addEventListener('click', e => {
  const dot = e.target.closest('.dot');
  if (dot) goTo(Number(dot.dataset.index));
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
    goTo(currentCol + (dx > 0 ? -1 : 1));
  }
}, { passive: true });

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') goTo(currentCol + 1);
  if (e.key === 'ArrowLeft') goTo(currentCol - 1);
});

// ── Recalculate counter-translate on resize ──
window.addEventListener('resize', () => {
  if (currentCol < 2) {
    const counterX = currentCol * section.clientWidth;
    sharedHeaders.forEach(el => {
      el.style.transition = 'none';
      el.style.transform = `translateX(${counterX}px)`;
    });
    // Restore transition after reflow
    requestAnimationFrame(() => {
      sharedHeaders.forEach(el => { el.style.transition = ''; });
    });
  }
});
