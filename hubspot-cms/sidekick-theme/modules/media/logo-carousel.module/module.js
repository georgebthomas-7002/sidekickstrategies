/* Logo Carousel Module JavaScript */
(function() {
  'use strict';

  // Initialize all slider carousels
  function initSliderCarousels() {
    const sliders = document.querySelectorAll('.logo-carousel--slide .logo-carousel__slider');

    sliders.forEach(function(slider) {
      const track = slider.querySelector('.logo-carousel__slider-track');
      const prevBtn = slider.querySelector('.logo-carousel__nav--prev');
      const nextBtn = slider.querySelector('.logo-carousel__nav--next');
      const items = slider.querySelectorAll('.logo-carousel__item');

      if (!track || !prevBtn || !nextBtn || items.length === 0) return;

      let currentIndex = 0;
      let itemsPerView = getItemsPerView();

      function getItemsPerView() {
        if (window.innerWidth <= 575) return 2;
        if (window.innerWidth <= 991) return 4;
        return 6;
      }

      function updateSlider() {
        const itemWidth = items[0].offsetWidth;
        const maxIndex = Math.max(0, items.length - itemsPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        track.style.transform = 'translateX(' + (-currentIndex * itemWidth) + 'px)';

        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
      }

      function goToPrev() {
        if (currentIndex > 0) {
          currentIndex--;
          updateSlider();
        }
      }

      function goToNext() {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateSlider();
        }
      }

      // Event listeners
      prevBtn.addEventListener('click', goToPrev);
      nextBtn.addEventListener('click', goToNext);

      // Handle resize
      let resizeTimeout;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          itemsPerView = getItemsPerView();
          updateSlider();
        }, 100);
      });

      // Initial state
      updateSlider();
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliderCarousels);
  } else {
    initSliderCarousels();
  }
})();
