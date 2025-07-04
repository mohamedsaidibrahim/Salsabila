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

// // assets/js/carousel.js

// function initCarousel(
//   containerSelector,
//   slideSelector,
//   prevBtnSelector,
//   nextBtnSelector
// ) {
//   const carouselContainer = document.querySelector(containerSelector);
//   if (!carouselContainer) {
//     console.warn(
//       `Carousel container not found for selector: ${containerSelector}`
//     );
//     return; // Exit if container not found
//   }

//   const slides = carouselContainer.querySelectorAll(slideSelector);
//   if (slides.length === 0) {
//     console.warn(
//       `No slides found for selector: ${slideSelector} within ${containerSelector}`
//     );
//     return; // Exit if no slides
//   }

//   const prevBtn = document.querySelector(prevBtnSelector);
//   const nextBtn = document.querySelector(nextBtnSelector);
//   let currentSlide = 0;

//   function showSlide(index) {
//     slides.forEach((slide, i) => {
//       if (i === index) {
//         slide.classList.add("active");
//       } else {
//         slide.classList.remove("active");
//       }
//     });
//   }

//   function nextSlide() {
//     currentSlide = (currentSlide + 1) % slides.length;
//     showSlide(currentSlide);
//   }

//   function prevSlide() {
//     currentSlide = (currentSlide - 1 + slides.length) % slides.length;
//     showSlide(currentSlide);
//   }

//   if (prevBtn) {
//     prevBtn.addEventListener("click", prevSlide);
//   } else {
//     console.warn(`Previous button not found for selector: ${prevBtnSelector}`);
//   }
//   if (nextBtn) {
//     nextBtn.addEventListener("click", nextSlide);
//   } else {
//     console.warn(`Next button not found for selector: ${nextBtnSelector}`);
//   }

//   // Auto-advance
//   // Clear any existing interval to prevent duplicates if initCarousel is called multiple times
//   if (carouselContainer.dataset.intervalId) {
//     clearInterval(parseInt(carouselContainer.dataset.intervalId));
//   }
//   const intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
//   carouselContainer.dataset.intervalId = intervalId.toString(); // Store interval ID

//   showSlide(currentSlide); // Initial display: ensure the first slide is active
// }

// export { initCarousel };
