// single source of truth for the site header + menu overlay
// injected into every page via <script src="js/menu-include.js"></script>

let menuHTML = `
<header class="site-header">
  <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">
    <span class="menu-toggle-letter menu-toggle-m">M</span>
    <span class="menu-toggle-letter menu-toggle-x">X</span>
  </button>
  <a href="index.html" class="header-logo"><img src="img/exhibitLogo.svg" alt="TYPE3 2026: AI/AS26"></a>
</header>

<nav id="site-menu-overlay" class="menu-overlay" aria-hidden="true">
  <ul class="menu-overlay-list">
    <li><a href="index.html">Home</a></li>
    <li><a href="exhibition-intro.html">Intro</a></li>
    <li class="has-submenu">
      <button class="submenu-toggle">Exhibitions</button>
      <ul class="submenu">
        <li><a href="doug.html">What will you draw?<span class="submenu-exhibit-name">D.O.U.G.</span></a></li>
        <li><a href="norilla.html">What will you create?<span class="submenu-exhibit-name">NoRILLA</span></a></li>
        <li><a href="living-paintings.html">What will you see?<span class="submenu-exhibit-name">living p<em>AI</em>ntings</span></a></li>
      </ul>
    </li>
    <li><a href="exhibitions-by-the-numbers.html">by the Numbers</a></li>
    <li class="has-submenu">
      <button class="submenu-toggle">Credits</button>
      <ul class="submenu">
        <li><a href="sponsors.html">Sponsors</a></li>
        <li><a href="staff-credits.html">Staff</a></li>
        <li><a href="thank-you.html">Thank You</a></li>
      </ul>
    </li>
    <li class="has-submenu">
      <button class="submenu-toggle">Articles</button>
      <ul class="submenu">
        <li><a href="coding-with-character.html">Coding with Character</a></li>
      </ul>
    </li>
    <li><a href="donation-card.html">Donations</a></li>
  </ul>
</nav>
`;

document.body.insertAdjacentHTML('afterbegin', menuHTML);
