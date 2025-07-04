// assets/js/main.js
import {
  loadLanguage,
  getTranslation,
  currentLanguage,
} from "./localization.js";
import { initCarousel } from "./carousel.js";
import { initContactForm } from "./contactForm.js";

document.addEventListener("DOMContentLoaded", () => {
  initLanguageDropdown();
  initCarousel(
    ".carousel-container",
    ".carousel-slide",
    ".prev-btn",
    ".next-btn"
  );
  initContactForm();
  document.getElementById("copyright-year").textContent =
    new Date().getFullYear();
});

function initLanguageDropdown() {
  const langOptionsContainer = document.getElementById("language-options");
  const currentLangBtn = document.getElementById("current-language-btn");
  const currentLangFlag = document.getElementById("current-language-flag");
  const currentLangLabel = document.getElementById("current-language-label");

  const languages = [
    { code: "en", label: "English", flag: "flag_en.png" },
    { code: "ar", label: "العربية", flag: "flag_ar.png" },
    { code: "de", label: "Deutsch", flag: "flag_de.png" },
    { code: "fr", label: "Français", flag: "flag_fr.png" },
    { code: "es", label: "Español", flag: "flag_es.png" },
    { code: "it", label: "Italiano", flag: "flag_it.png" },
    { code: "ru", label: "Русский", flag: "flag_ru.png" },
    { code: "fa", label: "فارسی", flag: "flag_fa.png" },
    { code: "tr", label: "Türkçe", flag: "flag_tr.png" },
  ];

  // Populate dropdown options
  languages.forEach((lang) => {
    const option = document.createElement("a");
    option.href = "#";
    option.className = "lang-option";
    option.dataset.lang = lang.code;
    option.innerHTML = `<img src="assets/img/icons/${lang.flag}" alt="${lang.label} Flag"> ${lang.label}`;
    option.addEventListener("click", (e) => {
      e.preventDefault();
      loadLanguage(lang.code);
      updateCurrentLanguageDisplay(lang.code);
      langOptionsContainer.classList.remove("show"); // Hide dropdown
    });
    langOptionsContainer.appendChild(option);
  });

  // Toggle dropdown visibility
  currentLangBtn.addEventListener("click", () => {
    langOptionsContainer.classList.toggle("show");
  });

  // Hide dropdown when clicking outside
  window.addEventListener("click", (event) => {
    if (
      !event.target.matches(".dropbtn") &&
      !event.target.closest(".dropdown")
    ) {
      if (langOptionsContainer.classList.contains("show")) {
        langOptionsContainer.classList.remove("show");
      }
    }
  });

  // Initial display based on current language
  function updateCurrentLanguageDisplay(langCode) {
    const selectedLang = languages.find((l) => l.code === langCode);
    if (selectedLang) {
      currentLangFlag.src = `assets/img/icons/${selectedLang.flag}`;
      currentLangFlag.alt = `${selectedLang.label} Flag`;
      currentLangLabel.textContent = selectedLang.label;
    }
  }
  updateCurrentLanguageDisplay(currentLanguage); // Call on initial load
}
