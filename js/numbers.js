// background + accent: js/exhibit-bg.js (loaded before this file)

let section = document.querySelector('#exhibitions-by-the-numbers');
let h2 = section.querySelector('h2');
let articles = [...section.querySelectorAll('article')];

// ── build track: data-panel (col 0) + h2-panel (col 1, default) ──
let track = document.createElement('div');
track.className = 'swipe-track';

let dataPanel = document.createElement('div');
dataPanel.className = 'swipe-panel data-panel';
articles.forEach(a => dataPanel.appendChild(a));

let h2Panel = document.createElement('div');
h2Panel.className = 'swipe-panel h2-panel';
h2Panel.appendChild(h2);
let hint = document.createElement('div');
hint.className = 'swipe-hint';
h2Panel.appendChild(hint);

track.appendChild(dataPanel);
track.appendChild(h2Panel);
section.appendChild(track);

// ── pagination dots (2) ──
let dots = document.createElement('div');
dots.className = 'swipe-dots';
dots.innerHTML = [0, 1].map(i =>
  `<span class="dot${i === 1 ? ' active' : ''}" data-index="${i}"></span>`
).join('');
section.appendChild(dots);
let dotEls = dots.querySelectorAll('.dot');

// ── navigation ──
let currentCol = 1;

function goTo(col) {
  col = Math.max(0, Math.min(1, col));
  if (col === currentCol) return;
  currentCol = col;

  // slide track
  let offset = -(col * 50);
  track.style.transform = `translateX(${offset}%)`;

  // update dots + hint visibility
  dotEls.forEach((d, i) => d.classList.toggle('active', i === col));
  section.classList.toggle('at-h2', col === 1);
  hint.style.opacity = col === 1 ? '' : '0';
}

// ── interactions ──
h2.addEventListener('click', () => goTo(0));

dots.addEventListener('click', e => {
  let dot = e.target.closest('.dot');
  if (dot) goTo(Number(dot.dataset.index));
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  let dx = e.changedTouches[0].clientX - touchStartX;
  let dy = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
    goTo(currentCol + (dx > 0 ? -1 : 1));
  }
}, { passive: true });

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') goTo(currentCol + 1);
  if (e.key === 'ArrowLeft') goTo(currentCol - 1);
});
