// Dark mode toggle
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

toggleBtn.addEventListener("click", () => {
body.classList.toggle("dark");
toggleBtn.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
});

///////////////////////////////// Translation
let translations = {};
let currentLang = "en";

const langBtn = document.getElementById("lang-toggle");

// Load translations from JSON
fetch("translations.json")
  .then(response => response.json())
  .then(data => {
    translations = data;

    // Initialize the page
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

// Same updateLanguage function as before
function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = translations[lang];

    for (const k of keys) {
      if (text && text[k]) {
        text = text[k];
      } else {
        console.warn(`Missing translation for: ${keys.join(".")} in ${lang}`);
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


//INIT
updateLanguage(currentLang);
langBtn.textContent = "FR"; // show opposite language
