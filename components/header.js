class Header extends HTMLElement {
  constructor() {
    super();
  }

    connectedCallback() {
        this.innerHTML = `
        <style>
            header {
            background: #093f26;
            color: white;
            padding: 1rem;
            position: sticky;
            top: 0;
            }

            .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            }

            .nav-links {
            list-style: none;
            display: flex;
            gap: 1rem;
            }

            .nav-links a {
            color: white;
            text-decoration: none;
            }

            body.dark header,
            body.dark footer {
            background: #000;
            }

            .nav-links a.active {
            color: #60ae8a;
            font-weight: bold;
            }
        </style>
        <header>
            <nav class="navbar">
                <a href="index.html" class="logo">
                <img src="images/frog.jpg" alt="Logo" />
                </a>
                <ul class="nav-links">
                <li><a href="index.html" data-i18n="nav.home">Home</a></li>
                <li><a href="about.html" data-i18n="nav.about">About</a></li>
                <li><a href="projects.html" data-i18n="nav.projects">Professional Projects</a></li>
                <li><a href="personalProjects.html" data-i18n="nav.personalProjects">Personal Projects</a></li>
                <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
                </ul>
                <div class="actions">
                <button id="theme-toggle">🌙</button>
                <button id="lang-toggle">FR</button>
                </div>
            </nav>
        </header>
        `;
        let translations = {};

// ✅ Load saved preferences or use defaults
let currentLang = localStorage.getItem("lang") || "en";
const savedTheme = localStorage.getItem("theme") || "light";

const langBtn = document.getElementById("lang-toggle");
const themeBtn = document.getElementById("theme-toggle");

// ✅ Apply saved theme on load
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

// ✅ Load translations from external JSON
fetch("translations.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    updateLanguage(currentLang);
    langBtn.textContent = currentLang === "en" ? "FR" : "EN";
  })
  .catch(err => console.error("Error loading translations:", err));

// ✅ Language toggle with saving to localStorage
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "fr" : "en";
  localStorage.setItem("lang", currentLang); // Save preference
  updateLanguage(currentLang);
  langBtn.textContent = currentLang === "en" ? "FR" : "EN";
});

// ✅ Dark/light theme toggle with saving to localStorage
themeBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light"); // Save preference
});

// ✅ Highlight current page link
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// ✅ Translation function
function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = translations[lang];

    for (const k of keys) {
      if (text && text[k]) {
        text = text[k];
      } else {
        console.warn(`Missing translation for key: ${keys.join(".")} in ${lang}`);
        text = null;
        break;
      }
    }

    if (text) {
      if (["input", "textarea"].includes(el.tagName.toLowerCase())) {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });
}


    }
}


customElements.define('header-component', Header);