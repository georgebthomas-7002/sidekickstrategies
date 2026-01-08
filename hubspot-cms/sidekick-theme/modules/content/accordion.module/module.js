/* Accordion / FAQ Module JavaScript */

(function() {
  'use strict';

  function initAccordions() {
    const accordionLists = document.querySelectorAll('.accordion__list');

    accordionLists.forEach(function(list) {
      const allowMultiple = list.dataset.allowMultiple === 'true';
      const items = list.querySelectorAll('.accordion__item');

      items.forEach(function(item) {
        const trigger = item.querySelector('.accordion__trigger');
        const content = item.querySelector('.accordion__content');

        if (!trigger || !content) return;

        trigger.addEventListener('click', function() {
          const isOpen = item.classList.contains('accordion__item--open');

          // Close other items if multiple not allowed
          if (!allowMultiple && !isOpen) {
            items.forEach(function(otherItem) {
              if (otherItem !== item && otherItem.classList.contains('accordion__item--open')) {
                closeAccordionItem(otherItem);
              }
            });
          }

          // Toggle current item
          if (isOpen) {
            closeAccordionItem(item);
          } else {
            openAccordionItem(item);
          }
        });

        // Handle keyboard navigation
        trigger.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            trigger.click();
          }
        });
      });
    });
  }

  function openAccordionItem(item) {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');

    item.classList.add('accordion__item--open');
    trigger.setAttribute('aria-expanded', 'true');
    content.hidden = false;

    // Animate height
    const height = content.scrollHeight;
    content.style.height = '0px';
    content.offsetHeight; // Force reflow
    content.style.height = height + 'px';

    // Remove height after animation
    setTimeout(function() {
      content.style.height = '';
    }, 300);
  }

  function closeAccordionItem(item) {
    const trigger = item.querySelector('.accordion__trigger');
    const content = item.querySelector('.accordion__content');

    // Animate height
    content.style.height = content.scrollHeight + 'px';
    content.offsetHeight; // Force reflow
    content.style.height = '0px';

    setTimeout(function() {
      item.classList.remove('accordion__item--open');
      trigger.setAttribute('aria-expanded', 'false');
      content.hidden = true;
      content.style.height = '';
    }, 300);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordions);
  } else {
    initAccordions();
  }
})();
