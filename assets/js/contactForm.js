// assets/js/contactForm.js

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (!contactForm || !formMessage) {
    console.warn(
      "Contact form or form message element not found. Contact form will not be initialized."
    );
    return;
  }

  // Replace with your EmailJS service ID and template ID
  const serviceID = "YOUR_EMAILJS_SERVICE_ID"; // e.g., 'service_xxxxx'
  const templateID = "YOUR_EMAILJS_TEMPLATE_ID"; // e.g., 'template_yyyyy'

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Check if emailjs is available globally
    if (typeof emailjs === "undefined" || !emailjs.sendForm) {
      formMessage.textContent =
        "Email service not initialized. Please check your EmailJS setup.";
      formMessage.className = "form-message error";
      console.error("EmailJS SDK not loaded or init() not called.");
      return;
    }

    formMessage.textContent = "Sending...";
    formMessage.className = "form-message"; // Clear previous status

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        formMessage.textContent = "Message sent successfully!";
        formMessage.className = "form-message success";
        contactForm.reset(); // Clear the form
      },
      (error) => {
        formMessage.textContent = `Failed to send message: ${
          error.text || error
        }`;
        formMessage.className = "form-message error";
        console.error("EmailJS send failed:", error);
      }
    );
  });
}

export { initContactForm };
