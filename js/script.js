// main.js
// Shared state and functions
window.translations = {};
window.currentLang = localStorage.getItem("lang") || "en";

window.updateLanguage = function(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let text = window.translations[lang];
    for (const k of keys) {
      if (text && text[k] !== undefined) {
        text = text[k];
      } else {
        console.warn(`Missing translation for key: ${keys.join(".")} in ${lang}`);
        text = null;
        break;
      }
    }
    if (text !== null) {
      const tag = el.tagName.toLowerCase();
      if ((tag === "ul" || tag === "ol") && Array.isArray(text)) {
        el.replaceChildren();
        text.forEach(item => {
          const li = document.createElement("li");
          li.textContent = item;
          el.appendChild(li);
        });
      } else if (["input", "textarea"].includes(tag)) {
        el.placeholder = text;
      } else {
        el.innerHTML = text;
      }
    }
  });
};

// Load translations
fetch("translations.json")
  .then(res => res.json())
  .then(data => {
    window.translations = data;
    window.updateLanguage(window.currentLang);
    const langBtn = document.getElementById("lang-toggle");
    if (langBtn) langBtn.textContent = window.currentLang === "en" ? "FR" : "EN";
  })
  .catch(err => console.error("Error loading translations:", err));

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) themeBtn.textContent = "☀️";
}
