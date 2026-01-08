/**
 * Sidekick Hero Module - Mount Animations
 * Triggers CSS animations by adding .is-mounted class after DOM ready
 */
(function() {
  'use strict';

  function initHero() {
    var heroes = document.querySelectorAll('.sidekick-hero');

    heroes.forEach(function(hero) {
      // Small delay to ensure CSS transitions are ready
      setTimeout(function() {
        hero.classList.add('is-mounted');
      }, 100);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHero);
  } else {
    initHero();
  }
})();
