/* Image Gallery Module JavaScript - Lightbox */
(function() {
  'use strict';

  function initGalleryLightbox() {
    const galleries = document.querySelectorAll('.image-gallery--lightbox');

    galleries.forEach(function(gallery) {
      const triggers = gallery.querySelectorAll('.image-gallery__lightbox-trigger');
      const lightbox = gallery.querySelector('.image-gallery__lightbox');

      if (!lightbox || triggers.length === 0) return;

      const backdrop = lightbox.querySelector('.image-gallery__lightbox-backdrop');
      const closeBtn = lightbox.querySelector('.image-gallery__lightbox-close');
      const prevBtn = lightbox.querySelector('.image-gallery__lightbox-prev');
      const nextBtn = lightbox.querySelector('.image-gallery__lightbox-next');
      const image = lightbox.querySelector('.image-gallery__lightbox-image');
      const caption = lightbox.querySelector('.image-gallery__lightbox-caption');

      let currentIndex = 0;
      const images = [];

      // Collect all images
      triggers.forEach(function(trigger, index) {
        images.push({
          src: trigger.dataset.src,
          alt: trigger.dataset.alt,
          caption: trigger.dataset.caption
        });

        trigger.addEventListener('click', function() {
          openLightbox(index);
        });
      });

      function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
      }

      function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        triggers[currentIndex].focus();
      }

      function updateLightboxImage() {
        const data = images[currentIndex];
        image.src = data.src;
        image.alt = data.alt;
        caption.textContent = data.caption || '';
        caption.style.display = data.caption ? 'block' : 'none';

        // Update nav button visibility
        prevBtn.style.display = images.length > 1 ? 'flex' : 'none';
        nextBtn.style.display = images.length > 1 ? 'flex' : 'none';
      }

      function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
      }

      function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
      }

      // Event listeners
      closeBtn.addEventListener('click', closeLightbox);
      backdrop.addEventListener('click', closeLightbox);
      prevBtn.addEventListener('click', showPrev);
      nextBtn.addEventListener('click', showNext);

      // Keyboard navigation
      lightbox.addEventListener('keydown', function(e) {
        if (lightbox.getAttribute('aria-hidden') === 'true') return;

        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case 'ArrowLeft':
            showPrev();
            break;
          case 'ArrowRight':
            showNext();
            break;
        }
      });

      // Touch swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });

      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            showNext();
          } else {
            showPrev();
          }
        }
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryLightbox);
  } else {
    initGalleryLightbox();
  }
})();
