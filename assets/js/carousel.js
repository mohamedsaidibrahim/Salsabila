// assets/js/carousel.js

function initCarousel(
  containerSelector,
  slideSelector,
  prevBtnSelector,
  nextBtnSelector
) {
  const carouselContainer = document.querySelector(containerSelector);
  if (!carouselContainer) {
    console.warn(
      `Carousel container not found for selector: ${containerSelector}. Carousel will not initialize.`
    );
    return;
  }

  const slides = carouselContainer.querySelectorAll(slideSelector);
  if (slides.length === 0) {
    console.warn(
      `No slides found for selector: ${slideSelector} within ${containerSelector}. Carousel will not initialize.`
    );
    return;
  }

  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  let currentSlide = 0;
  let autoAdvanceInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
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

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoAdvance();
    });
  } else {
    console.warn(
      `Previous button element not found with selector: ${prevBtnSelector}`
    );
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoAdvance();
    });
  } else {
    console.warn(
      `Next button element not found with selector: ${nextBtnSelector}`
    );
  }

  function startAutoAdvance() {
    if (autoAdvanceInterval) {
      clearInterval(autoAdvanceInterval);
    }
    autoAdvanceInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    startAutoAdvance();
  }

  showSlide(currentSlide);
  startAutoAdvance();
}

export { initCarousel };
