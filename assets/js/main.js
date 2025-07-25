// assets/js/main.js
import {
  loadLanguage,
  currentLanguage,
  applyTranslations,
} from "./localization.js";
import { initCarousel } from "./carousel.js";
import { initContactForm } from "./contactForm.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM Content Loaded. Initializing website...");

  // 1. Set copyright year immediately
  const copyrightYearElement = document.getElementById("copyright-year");
  if (copyrightYearElement) {
    copyrightYearElement.textContent = new Date().getFullYear();
  }

  // 2. Initialize Language Dropdown and load initial language
  const langOptionsContainer = document.getElementById("language-options");
  const currentLangBtn = document.getElementById("current-language-btn");
  const currentLangFlag = document.getElementById("current-language-flag");
  const currentLangLabel = document.getElementById("current-language-label");

  const languages = [
    { code: "en", label: "English", flag: "flag_en.svg" },
    { code: "ar", label: "العربية", flag: "flag_ar.svg" },
    { code: "de", label: "Deutsch", flag: "flag_de.svg" },
    { code: "fr", label: "Français", flag: "flag_fr.svg" },
    { code: "es", label: "Español", flag: "flag_es.svg" },
    { code: "it", label: "Italiano", flag: "flag_it.svg" },
    { code: "ru", label: "Русский", flag: "flag_ru.svg" },
    { code: "fa", label: "فارسی", flag: "flag_fa.svg" },
    { code: "ur", label: "اردو", flag: "flag_ur.svg" },
    { code: "tr", label: "Türkçe", flag: "flag_tr.svg" },
  ];

  if (langOptionsContainer) {
    languages.forEach((lang) => {
      const option = document.createElement("a");
      option.href = "#";
      option.className = "lang-option";
      option.dataset.lang = lang.code;
      option.innerHTML = `<img src="assets/img/icons/${lang.flag}" alt="${lang.label} Flag"> ${lang.label}`;
      option.addEventListener("click", async (e) => {
        e.preventDefault();
        await loadLanguage(lang.code);
        updateCurrentLanguageDisplay(lang.code);
        langOptionsContainer.classList.remove("show");
      });
      langOptionsContainer.appendChild(option);
    });
  } else {
    console.warn(
      "Language options container (id='language-options') not found."
    );
  }

  if (currentLangBtn) {
    currentLangBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langOptionsContainer.classList.toggle("show");
    });
  } else {
    console.warn(
      "Current language button (id='current-language-btn') not found."
    );
  }

  window.addEventListener("click", (event) => {
    if (langOptionsContainer && !event.target.closest(".language-selector")) {
      langOptionsContainer.classList.remove("show");
    }
  });

  function updateCurrentLanguageDisplay(langCode) {
    const selectedLang = languages.find((l) => l.code === langCode);
    if (selectedLang && currentLangFlag && currentLangLabel) {
      currentLangFlag.src = `assets/img/icons/${selectedLang.flag}`;
      currentLangFlag.alt = `${selectedLang.label} Flag`;
      currentLangLabel.textContent = selectedLang.label;
    } else {
      console.warn(
        "Could not update current language display. Elements or selected language not found."
      );
    }
  }

  const storedLang = localStorage.getItem("salsabila_lang");
  await loadLanguage(storedLang || "en");
  updateCurrentLanguageDisplay(currentLanguage);

  // 3. Initialize Carousel
  initCarousel(
    ".carousel-container",
    ".carousel-slide",
    ".carousel-controls .prev-btn",
    ".carousel-controls .next-btn"
  );

  // 4. Initialize Contact Form
  initContactForm();

  // 5. Smooth scrolling for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
