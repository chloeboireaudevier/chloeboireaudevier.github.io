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





// -------------------- Home page mind map ---------------------
document.addEventListener('DOMContentLoaded', function() {
    const center = document.querySelector('.center-node');
    const nodes = document.querySelectorAll('.node');

    nodes.forEach(node => {
        const button = node.querySelector('.mindmap-button');
        button.addEventListener('mouseover', function() {
            // Animation ou effet visuel au survol
            this.style.transform = 'scale(1.1)';
        });
        button.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});


/* --------------------- Smooth Scroll for main page ---------------*/
// Source - https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
// Posted by Sanjay Shr
// Retrieved 11/5/2025, License - CC-BY-SA 4.0

function smoothScroll(element){
    const elementExists = document.querySelector(element);
    if (elementExists)
      document.querySelector(element).scrollIntoView({
          behavior: 'smooth'
    });
}

const scrollButton = document.querySelector("#scroll-btn");

scrollButton.addEventListener("click", () => {
  smoothScroll("#MM");
});