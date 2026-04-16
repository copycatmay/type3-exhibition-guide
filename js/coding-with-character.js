// Swipe layout — same pattern as numbers.js
// h2-panel (col 1, default) | data-panel (col 0, article content)

const section = document.querySelector('#coding-with-character');
const h2 = section.querySelector('h2');
const articles = [...section.querySelectorAll('article')];

// build track: data-panel (col 0) + h2-panel (col 1, default)
const track = document.createElement('div');
track.className = 'swipe-track';

const dataPanel = document.createElement('div');
dataPanel.className = 'swipe-panel data-panel';
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

// pagination dots (2)
const dots = document.createElement('div');
dots.className = 'swipe-dots';
dots.innerHTML = [0, 1].map(i =>
  `<span class="dot${i === 1 ? ' active' : ''}" data-index="${i}"></span>`
).join('');
section.appendChild(dots);
const dotEls = dots.querySelectorAll('.dot');

// navigation
let currentCol = 1;

function goTo(col) {
  col = Math.max(0, Math.min(1, col));
  if (col === currentCol) return;
  currentCol = col;

  const offset = -(col * 50);
  track.style.transform = `translateX(${offset}%)`;

  dotEls.forEach((d, i) => d.classList.toggle('active', i === col));
  section.classList.toggle('at-h2', col === 1);
  hint.style.opacity = col === 1 ? '' : '0';

}

// interactions
h2.addEventListener('click', () => goTo(0));

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
