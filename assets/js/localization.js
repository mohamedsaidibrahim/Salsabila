// assets/js/localization.js

const translations = {}; // Stores UI strings
const content = {}; // Stores richer content (descriptions, lists)
let currentLanguage = "en"; // Default language

async function loadLanguage(lang) {
  console.log(`[Localization] Attempting to load language: ${lang}`);
  try {
    const [stringsRes, contentRes] = await Promise.all([
      fetch(`./assets/data/strings.json`),
      fetch(`./assets/data/content.json`),
    ]);

    if (!stringsRes.ok || !contentRes.ok) {
      console.error(
        `[Localization] HTTP error during fetch. Strings status: ${stringsRes.status}, Content status: ${contentRes.status}`
      );
      throw new Error(
        `HTTP error! Strings status: ${stringsRes.status}, Content status: ${contentRes.status}`
      );
    }

    const [stringsData, contentData] = await Promise.all([
      stringsRes.json(),
      contentRes.json(),
    ]);

    console.log(
      `[Localization] Fetched stringsData for all languages:`,
      stringsData
    );
    console.log(
      `[Localization] Fetched contentData for all languages:`,
      contentData
    );

    if (!stringsData[lang] || !contentData[lang]) {
      console.error(
        `[Localization] Language data for '${lang}' is incomplete or missing in JSON. Falling back to English.`
      );
      // If the requested language isn't fully available, try 'en' as fallback
      if (lang !== "en") {
        return loadLanguage("en"); // Recursive call, but safe due to 'en' check
      }
      console.error(
        `[Localization] 'en' language data also missing or incomplete. Localization will be limited.`
      );
      return; // If 'en' is also missing, stop.
    }

    translations[lang] = stringsData[lang];
    content[lang] = contentData[lang];
    console.log(
      `[Localization] Successfully loaded strings for ${lang}:`,
      translations[lang]
    );
    console.log(
      `[Localization] Successfully loaded content for ${lang}:`,
      content[lang]
    );

    currentLanguage = lang;
    document.documentElement.lang = lang; // Set HTML lang attribute

    // Set RTL class for Arabic, Persian, Urdu
    if (lang === "ar" || lang === "fa" || lang === "ur") {
      document.body.classList.add("rtl");
      console.log(
        `[Localization] Added 'rtl' class to body for language: ${lang}`
      );
    } else {
      document.body.classList.remove("rtl");
      console.log(
        `[Localization] Removed 'rtl' class from body for language: ${lang}`
      );
    }

    localStorage.setItem("salsabila_lang", lang);
    console.log(`[Localization] Calling applyTranslations()`);
    applyTranslations();
  } catch (error) {
    console.error(
      "[Localization] Error loading language files or applying translations:",
      error
    );
    if (lang !== "en") {
      loadLanguage("en"); // Try to load English as a last resort
    }
  }
}

function getTranslation(key) {
  const translatedString =
    translations[currentLanguage]?.[key] || translations["en"]?.[key];
  if (!translatedString) {
    console.warn(
      `[Localization] Missing translation key '${key}' for language '${currentLanguage}'. Falling back to placeholder.`
    );
    return `[MISSING_KEY_${key}]`;
  }
  return translatedString;
}

function applyTranslations() {
  console.log(
    `[Localization] applyTranslations() called for language: ${currentLanguage}`
  );

  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    const translatedText = getTranslation(key);
    if (element.textContent !== translatedText) {
      // Only update if necessary
      element.textContent = translatedText;
      // console.log(`[Localization] Translated data-translate: ${key} to ${translatedText}`);
    }
  });

  document
    .querySelectorAll("[data-translate-placeholder]")
    .forEach((element) => {
      const key = element.getAttribute("data-translate-placeholder");
      const translatedPlaceholder = getTranslation(key);
      if (element.placeholder !== translatedPlaceholder) {
        // Only update if necessary
        element.placeholder = translatedPlaceholder;
        // console.log(`[Localization] Translated data-translate-placeholder: ${key} to ${translatedPlaceholder}`);
      }
    });

  console.log(`[Localization] Calling updateAppDescription()`);
  updateAppDescription();
  console.log(`[Localization] Calling updateKeyFeatures()`);
  updateKeyFeatures();
  console.log(`[Localization] Calling updateWhyChooseSalsabila()`);
  updateWhyChooseSalsabila();

  // Update dynamic text for download buttons (if applicable, assuming they have data-translate)
  document.getElementById('play-store-download-text').textContent = getTranslation('playStore');
  document.getElementById("play-store-download-text").textContent =
    getTranslation("playStore");
  document.getElementById("app-store-download-text").textContent =
    getTranslation("appStore");
  document.getElementById("download-get-it-on").textContent =
    getTranslation("getItOn");
  document.getElementById("download-on-the").textContent =
    getTranslation("downloadOn");
  document.getElementById("download-section-title").textContent =
    getTranslation("downloadAppSectionTitle");

  // Update copyright and social links if they have data-translate
  // The copyright year is handled in main.js, but the text might need translation here
  const copyrightTextElement = document.getElementById("copyright-text");
  if (copyrightTextElement) {
    copyrightTextElement.textContent = getTranslation("allRightsReserved");
  }
  const followUsElement = document.getElementById("follow-us-text");
  if (followUsElement) {
    followUsElement.textContent = getTranslation("followUs");
  }
}

function updateAppDescription() {
  console.log(
    `[Localization] Entering updateAppDescription(). Current language: ${currentLanguage}`
  );
  const descriptionElement = document.getElementById("app-description-text");
  if (descriptionElement) {
    // Ensure content[currentLanguage] and content[currentLanguage].appDescription exist
    const descriptionText =
      content[currentLanguage]?.appDescription || content["en"]?.appDescription;
    if (descriptionText) {
      descriptionElement.textContent = descriptionText;
      console.log(
        `[Localization] App description updated to: ${descriptionText.substring(
          0,
          50
        )}...`
      );
    } else {
      console.warn(
        `[Localization] App description text not found for language '${currentLanguage}' in content.json.`
      );
    }
  } else {
    console.warn(
      "[Localization] Element with id 'app-description-text' not found."
    );
  }
}

function updateKeyFeatures() {
  console.log(
    `[Localization] Entering updateKeyFeatures(). Current language: ${currentLanguage}`
  );
  const featuresContainer = document.getElementById("key-features-container");
  if (featuresContainer) {
    const features =
      content[currentLanguage]?.featuresList || content["en"]?.featuresList;
    if (features && features.length > 0) {
      featuresContainer.innerHTML = ""; // Clear existing features
      features.forEach((feature) => {
        const featureCard = document.createElement("div");
        featureCard.className = "feature-card";
        // Ensure icon path is correct
        featureCard.innerHTML = `
                    <img src="assets/img/icons/${feature.icon}" alt="${feature.title}" class="feature-icon">
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                `;
        featuresContainer.appendChild(featureCard);
        // console.log(`[Localization] Added feature card: ${feature.title}`);
      });
      console.log(
        `[Localization] Key features updated. Total: ${features.length}`
      );
    } else {
      console.warn(
        `[Localization] Features list not found or empty for language '${currentLanguage}' in content.json.`
      );
    }
  } else {
    console.warn(
      "[Localization] Element with id 'key-features-container' not found."
    );
  }
}

function updateWhyChooseSalsabila() {
  console.log(
    `[Localization] Entering updateWhyChooseSalsabila(). Current language: ${currentLanguage}`
  );
  const listElement = document.getElementById("why-choose-list");
  if (listElement) {
    const reasons =
      content[currentLanguage]?.whyChooseSalsabila ||
      content["en"]?.whyChooseSalsabila;
    if (reasons && reasons.length > 0) {
      listElement.innerHTML = ""; // Clear existing reasons
      reasons.forEach((reason) => {
        const li = document.createElement("li");
        li.textContent = reason;
        listElement.appendChild(li);
        // console.log(`[Localization] Added why-choose reason: ${reason.substring(0, 30)}...`);
      });
      console.log(
        `[Localization] Why Choose Salsabila list updated. Total: ${reasons.length}`
      );
    } else {
      console.warn(
        `[Localization] Why Choose Salsabila list not found or empty for language '${currentLanguage}' in content.json.`
      );
    }
  } else {
    console.warn("[Localization] Element with id 'why-choose-list' not found.");
  }
}

export {
  loadLanguage,
  getTranslation,
  currentLanguage,
  translations,
  content,
  applyTranslations,
};
