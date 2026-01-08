/* Number Counter Module JavaScript */

(function() {
  'use strict';

  function initCounters() {
    const grids = document.querySelectorAll('.counter__grid[data-animate="true"]');

    grids.forEach(function(grid) {
      const duration = parseInt(grid.dataset.duration) || 2000;
      const numbers = grid.querySelectorAll('.counter__number[data-target]');

      // Use Intersection Observer for scroll-triggered animation
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            numbers.forEach(function(num) {
              animateNumber(num, duration);
            });
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      });

      observer.observe(grid);
    });
  }

  function animateNumber(element, duration) {
    const target = element.dataset.target;

    // Handle decimal numbers
    const isDecimal = target.includes('.');
    const decimalPlaces = isDecimal ? target.split('.')[1].length : 0;
    const targetNum = parseFloat(target);

    if (isNaN(targetNum)) {
      element.textContent = target;
      return;
    }

    const startTime = performance.now();
    const startNum = 0;

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentNum = startNum + (targetNum - startNum) * eased;

      if (isDecimal) {
        element.textContent = currentNum.toFixed(decimalPlaces);
      } else {
        element.textContent = Math.round(currentNum).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        // Ensure final value is exact
        element.textContent = isDecimal ? targetNum.toFixed(decimalPlaces) : targetNum.toLocaleString();
      }
    }

    requestAnimationFrame(updateNumber);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
