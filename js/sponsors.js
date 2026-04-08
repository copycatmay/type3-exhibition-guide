// ── Random exhibition background + accent colour on each load ──
const exhibitions = [
  { img: "doug-bg-1.png", accent: "#5A75FA" },
  { img: "doug-bg-2.png", accent: "#5A75FA" },
  { img: "living-paintings-bg-1.png", accent: "#BF79B3" },
  { img: "living-paintings-bg-2.png", accent: "#BF79B3" },
  { img: "norilla-bg-1.png", accent: "#EB1E16" },
  { img: "norilla-bg-2.png", accent: "#EB1E16" },
  { img: "just-plain-stupid-bg-1.png", accent: "#EBE117" },
  { img: "just-plain-stupid-bg-2.png", accent: "#EBE117" },
];
const exhibit = exhibitions[Math.floor(Math.random() * exhibitions.length)];
document.documentElement.style.setProperty("--color-3", exhibit.accent);

// staggered bg fade-in: 2s delay then 2s transition
let bgLayer = document.createElement("div");
bgLayer.className = "exhibit-bg-layer";
bgLayer.style.backgroundImage = `url("img/bg/${exhibit.img}")`;
document.body.prepend(bgLayer);
setTimeout(() => bgLayer.classList.add("bg-visible"), 500);

const section = document.querySelector("#sponsors");
const logoLockup = section.querySelector(".logo-lockup");
const articles = [...section.querySelectorAll("article")];

// ── Build track: data-panel (col 0) + logo-panel (col 1) ──
const track = document.createElement("div");
track.className = "swipe-track";

const dataPanel = document.createElement("div");
dataPanel.className = "data-panel";
articles.forEach((a) => dataPanel.appendChild(a));

const logoPanel = document.createElement("div");
logoPanel.className = "swipe-panel logo-panel";
const hint = document.createElement("div");
hint.className = "swipe-hint";
logoPanel.appendChild(hint);
logoPanel.appendChild(logoLockup);

track.appendChild(dataPanel);
track.appendChild(logoPanel);
section.appendChild(track);

// ── Fixed title ──

// ── Pagination dots (2) ──
const dots = document.createElement("div");
dots.className = "swipe-dots";
dots.innerHTML = [0, 1]
  .map(
    (i) =>
      `<span class="dot${i === 1 ? " active" : ""}" data-index="${i}"></span>`,
  )
  .join("");
section.appendChild(dots);
const dotEls = dots.querySelectorAll(".dot");

// ── Set initial state (col 1 = logo lockup) ──
section.classList.add("at-logos");

// ── Navigation ──
let currentCol = 1;

function goTo(col) {
  col = Math.max(0, Math.min(1, col));
  if (col === currentCol) return;
  currentCol = col;

  // Position track: col 0 = 0%, col 1 = -50%
  const offset = -(col * 50);
  track.style.transform = `translateX(${offset}%)`;

  // Update dots + title/hint visibility
  dotEls.forEach((d, i) => d.classList.toggle("active", i === col));
  section.classList.toggle("at-logos", col === 1);
  hint.style.opacity = col === 1 ? "" : "0";
}

// ── Interactions ──
logoPanel.addEventListener("click", () => goTo(0));

dots.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot");
  if (dot) goTo(Number(dot.dataset.index));
});

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 48) {
      goTo(currentCol + (dx > 0 ? -1 : 1));
    }
  },
  { passive: true },
);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goTo(currentCol + 1);
  if (e.key === "ArrowLeft") goTo(currentCol - 1);
});
