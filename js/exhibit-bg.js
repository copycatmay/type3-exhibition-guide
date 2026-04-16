// random exhibition full-viewport background (shared with numbers page)
let exhibitions = [
  { img: "doug-bg-1.png", accent: "#5A75FA" },
  { img: "doug-bg-2.png", accent: "#5A75FA" },
  { img: "living-paintings-bg-1.png", accent: "#BF79B3" },
  { img: "living-paintings-bg-2.png", accent: "#BF79B3" },
  { img: "norilla-bg-1.png", accent: "#EB1E16" },
  { img: "norilla-bg-2.png", accent: "#EB1E16" },
];

let exhibit = exhibitions[Math.floor(Math.random() * exhibitions.length)];
document.documentElement.classList.add("exhibit-random-bg");
document.documentElement.style.setProperty("--color-3", exhibit.accent);

// staggered bg fade-in: 2s delay then 2s transition
let bgLayer = document.createElement("div");
bgLayer.className = "exhibit-bg-layer";
bgLayer.style.backgroundImage = `url("img/bg/${exhibit.img}")`;
document.body.prepend(bgLayer);
setTimeout(() => bgLayer.classList.add("bg-visible"), 500);
