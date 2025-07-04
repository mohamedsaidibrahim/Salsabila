// assets/js/carousel.js
function initCarousel(containerSelector, slideSelector, prevBtnSelector, nextBtnSelector) {
    const carouselContainer = document.querySelector(containerSelector);
    if (!carouselContainer) return;

    const slides = carouselContainer.querySelectorAll(slideSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-advance
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    showSlide(currentSlide); // Initial display
}

export { initCarousel };