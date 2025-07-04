// assets/js/localization.js

const translations = {}; // Will store loaded strings.json
const content = {};      // Will store loaded content.json
let currentLanguage = 'en'; // Default language

// ... inside localization.js
function updateWhyChooseSalsabila() {
    const listElement = document.getElementById('why-choose-list');
    if (listElement) {
        listElement.innerHTML = '';
        const reasons = content[currentLanguage]?.whyChooseSalsabila || [];
        reasons.forEach(reason => {
            const li = document.createElement('li');
            li.textContent = reason;
            listElement.appendChild(li);
        });
    }
}

function applyTranslations() {
    // ... existing calls
    updateAppDescription();
    updateKeyFeatures();
    updateWhyChooseSalsabila(); // New call
}

async function loadLanguage(lang) {
    try {
        const [stringsRes, contentRes] = await Promise.all([
            fetch(`./assets/data/strings.json`),
            fetch(`./assets/data/content.json`)
        ]);

        const [stringsData, contentData] = await Promise.all([
            stringsRes.json(),
            contentRes.json()
        ]);

        translations[lang] = stringsData[lang];
        content[lang] = contentData[lang];

        if (!translations[lang] || !content[lang]) {
            console.error(`Language data for ${lang} not found.`);
            // Fallback to English if the specific language is missing
            if (lang !== 'en') {
                return loadLanguage('en');
            }
            return;
        }

        currentLanguage = lang;
        applyTranslations();
        document.documentElement.lang = lang; // Set HTML lang attribute
        // For RTL languages like Arabic and Persian, add a class to body or html
        if (lang === 'ar' || lang === 'fa') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }

        // Store selected language in localStorage
        localStorage.setItem('salsabila_lang', lang);

    } catch (error) {
        console.error('Error loading language files:', error);
        // Fallback to English on error
        if (lang !== 'en') {
            return loadLanguage('en');
        }
    }
}

function getTranslation(key) {
    return translations[currentLanguage]?.[key] || translations['en']?.[key] || `MISSING_KEY_${key}`;
}

function applyTranslations() {
    // Apply translations to data-translate attributes
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key);
    });

    // Apply translations to placeholder attributes
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = getTranslation(key);
    });

    // Dynamically update section content
    updateAppDescription();
    updateKeyFeatures();
    // Call other update functions for dynamic content here
}

function updateAppDescription() {
    const descriptionElement = document.getElementById('app-description-text');
    if (descriptionElement) {
        descriptionElement.textContent = content[currentLanguage]?.appDescription || '';
    }
}

function updateKeyFeatures() {
    const featuresContainer = document.getElementById('key-features-container');
    if (featuresContainer) {
        featuresContainer.innerHTML = ''; // Clear existing
        const features = content[currentLanguage]?.featuresList || [];
        features.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <img src="assets/img/icons/${feature.icon}" alt="${feature.title}" class="feature-icon">
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            `;
            featuresContainer.appendChild(featureCard);
        });
    }
}

// Initial load based on localStorage or default
document.addEventListener('DOMContentLoaded', () => {
    const storedLang = localStorage.getItem('salsabila_lang');
    loadLanguage(storedLang || 'en');
});

export { loadLanguage, getTranslation, currentLanguage, translations, content };