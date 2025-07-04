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
    { code: "en", label: "English", flag: "flag_en.png" },
    { code: "ar", label: "العربية", flag: "flag_ar.png" },
    { code: "de", label: "Deutsch", flag: "flag_de.png" },
    { code: "fr", label: "Français", flag: "flag_fr.png" },
    { code: "es", label: "Español", flag: "flag_es.png" },
    { code: "it", label: "Italiano", flag: "flag_it.png" },
    { code: "ru", label: "Русский", flag: "flag_ru.png" },
    { code: "fa", label: "فارسی", flag: "flag_fa.png" },
    { code: "ur", label: "اردو", flag: "flag_ur.png" },
    { code: "tr", label: "Türkçe", flag: "flag_tr.png" },
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

// // assets/js/main.js

// import {
//   loadLanguage,
//   getTranslation,
//   currentLanguage,
// } from "./localization.js";
// import { initCarousel } from "./carousel.js"; // Ensure this import is present
// import { initContactForm } from "./contactForm.js";

// document.addEventListener("DOMContentLoaded", () => {
//   // Check for CSS loading issues here if styles are still off
//   console.log("DOM Content Loaded. Initializing...");

//   // Initialize language dropdown first as it might affect other elements
//   initLanguageDropdown();

//   // Initialize carousel - confirm selectors match your HTML
//   initCarousel(
//     ".carousel-container",
//     ".carousel-slide",
//     ".carousel-controls .prev-btn",
//     ".carousel-controls .next-btn"
//   );

//   // Initialize contact form
//   initContactForm();

//   // Set copyright year
//   const copyrightYearElement = document.getElementById("copyright-year");
//   if (copyrightYearElement) {
//     copyrightYearElement.textContent = new Date().getFullYear();
//   }
// });

// function initLanguageDropdown() {
//   const langOptionsContainer = document.getElementById("language-options");
//   const currentLangBtn = document.getElementById("current-language-btn");
//   const currentLangFlag = document.getElementById("current-language-flag");
//   const currentLangLabel = document.getElementById("current-language-label");

//   const languages = [
//     { code: "en", label: "English", flag: "flag_en.png" },
//     { code: "ar", label: "العربية", flag: "flag_ar.png" },
//     { code: "de", label: "Deutsch", flag: "flag_de.png" },
//     { code: "fr", label: "Français", flag: "flag_fr.png" },
//     { code: "es", label: "Español", flag: "flag_es.png" },
//     { code: "it", label: "Italiano", flag: "flag_it.png" },
//     { code: "ru", label: "Русский", flag: "flag_ru.png" },
//     { code: "fa", label: "فارسی", flag: "flag_fa.png" },
//     { code: "tr", label: "Türkçe", flag: "flag_tr.png" },
//   ];

//   // Populate dropdown options
//   languages.forEach((lang) => {
//     const option = document.createElement("a");
//     option.href = "#";
//     option.className = "lang-option";
//     option.dataset.lang = lang.code;
//     option.innerHTML = `<img src="assets/img/icons/${lang.flag}" alt="${lang.label} Flag"> ${lang.label}`;
//     option.addEventListener("click", (e) => {
//       e.preventDefault();
//       loadLanguage(lang.code);
//       updateCurrentLanguageDisplay(lang.code);
//       langOptionsContainer.classList.remove("show"); // Hide dropdown
//     });
//     langOptionsContainer.appendChild(option);
//   });

//   // Toggle dropdown visibility
//   currentLangBtn.addEventListener("click", () => {
//     langOptionsContainer.classList.toggle("show");
//   });

//   // Hide dropdown when clicking outside
//   window.addEventListener("click", (event) => {
//     if (
//       !event.target.matches(".dropbtn") &&
//       !event.target.closest(".dropdown")
//     ) {
//       if (langOptionsContainer.classList.contains("show")) {
//         langOptionsContainer.classList.remove("show");
//       }
//     }
//   });

//   // Initial display based on current language
//   function updateCurrentLanguageDisplay(langCode) {
//     const selectedLang = languages.find((l) => l.code === langCode);
//     if (selectedLang) {
//       currentLangFlag.src = `assets/img/icons/${selectedLang.flag}`;
//       currentLangFlag.alt = `${selectedLang.label} Flag`;
//       currentLangLabel.textContent = selectedLang.label;
//     }
//   }
//   updateCurrentLanguageDisplay(currentLanguage); // Call on initial load
// }
