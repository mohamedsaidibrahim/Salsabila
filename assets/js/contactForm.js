// assets/js/contactForm.js
import { getTranslation } from './localization.js';

// **IMPORTANT:** Replace with your actual EmailJS IDs
const EMAILJS_SERVICE_ID = 'service_your_service_id'; // e.g., 'service_abcdefg'
const EMAILJS_TEMPLATE_ID = 'template_your_template_id'; // e.g., 'template_1234567'
const EMAILJS_PUBLIC_KEY = 'your_public_key'; // e.g., 'YOUR_USER_ID_PUBLIC_KEY'

function initContactForm() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessage.textContent = '';
            formMessage.classList.remove('success', 'error');

            const formData = {
                user_email: document.getElementById('user-email').value,
                message_title: document.getElementById('message-title').value,
                message_content: document.getElementById('message-content').value,
                to_email: 'mohamedsaidibrahim.apps@gmail.com' // Recipient email
            };

            try {
                // Ensure emailjs is loaded. You'd typically include it via <script> tag in HTML
                // <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
                // And then initialize: emailjs.init(EMAILJS_PUBLIC_KEY); in main.js or here.
                if (typeof emailjs === 'undefined' || !emailjs.send) {
                    console.error("EmailJS SDK not loaded. Please add the script tag and initialize.");
                    formMessage.textContent = getTranslation('formError');
                    formMessage.classList.add('error');
                    return;
                }

                const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_PUBLIC_KEY);

                console.log('EmailJS response:', response);
                if (response.status === 200) {
                    formMessage.textContent = getTranslation('formSuccess');
                    formMessage.classList.add('success');
                    form.reset();
                } else {
                    formMessage.textContent = getTranslation('formError');
                    formMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Error sending email:', error);
                formMessage.textContent = getTranslation('formError');
                formMessage.classList.add('error');
            }
        });
    }
}

export { initContactForm };