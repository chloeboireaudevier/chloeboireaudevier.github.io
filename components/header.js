// header.js
class Header extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
      <link rel="stylesheet" href="css/style.css">
      <header>
      <link rel="icon" type="image/png" href="/images/leaves.png">
        <nav class="navbar">
          <a href="index.html">
            <img src="images/leaves.png" alt="Logo" class="navbar-icon"/>
          </a>
          <ul class="nav-links">
            <li><a href="index.html" data-i18n="nav.home">Home</a></li>
            <li><a href="about.html" data-i18n="nav.about">About</a></li>
            <li><a href="projects.html" data-i18n="nav.projects">Professional Projects</a></li>
            <li><a href="personalProjects.html" data-i18n="nav.personalProjects">Personal Projects</a></li>
            <li><a href="engineering_course.html" data-i18n="nav.engineeringCourse">Engineering Course</a></li>
            <li><a href="PPP.html" data-i18n="nav.PPP">Professional Project - PPP</a></li>
            <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
          </ul>
          <div class="actions">
            <button id="theme-toggle" class="btn-navbar">🌙</button>
            <button id="lang-toggle" class="btn-navbar">FR</button>
          </div>
        </nav>
      </header>
    `;

    // Get buttons inside the custom element
    const langBtn = this.querySelector("#lang-toggle");
    const themeBtn = this.querySelector("#theme-toggle");

    // Language toggle
    langBtn.addEventListener("click", () => {
      window.currentLang = window.currentLang === "en" ? "fr" : "en";
      localStorage.setItem("lang", window.currentLang);
      window.updateLanguage(window.currentLang);
      langBtn.textContent = window.currentLang === "en" ? "FR" : "EN";
    });

    // Dark/light theme toggle
    themeBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      themeBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // Highlight current page link
    this.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      }
    });
  }
}
customElements.define("header-component", Header);
