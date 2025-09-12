let translations = {};
let currentLang = "en";

const langBtn = document.getElementById("lang-toggle");
const themeBtn = document.getElementById("theme-toggle");

// Load translations
fetch("translations.json")
  .then(res => res.json())
  .then(data => {
    translations = data;
    updateLanguage(currentLang);
    langBtn.textContent = currentLang === "en" ? "FR" : "EN";
  })
  .catch(err => console.error("Error loading translations:", err));

// Language toggle
langBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "fr" : "en";
  updateLanguage(currentLang);
  langBtn.textContent = currentLang === "en" ? "FR" : "EN";
});

// Dark/light theme toggle
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Highlight active nav link
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active");
  }
});

// Translation function
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
      if (["input","textarea"].includes(el.tagName.toLowerCase())) {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });
}
