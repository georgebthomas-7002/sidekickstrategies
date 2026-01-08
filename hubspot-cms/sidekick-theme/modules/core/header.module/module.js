/**
 * Header Module JavaScript
 * Handles sticky header, mobile navigation, search overlay, and mega menu interactions
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const mobileNavToggles = document.querySelectorAll('.mobile-nav-toggle');

  // Get mobile breakpoint from data attribute
  const mobileBreakpoint = header ? parseInt(header.dataset.mobileBreakpoint) || 992 : 992;

  // State
  let lastScroll = 0;
  let isScrolled = false;

  /**
   * Handle sticky header on scroll
   */
  function handleScroll() {
    if (!header || !header.classList.contains('site-header--sticky')) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 50 && !isScrolled) {
      header.classList.add('is-scrolled');
      isScrolled = true;
    } else if (currentScroll <= 50 && isScrolled) {
      header.classList.remove('is-scrolled');
      isScrolled = false;
    }

    lastScroll = currentScroll;
  }

  /**
   * Toggle mobile navigation
   */
  function toggleMobileNav() {
    if (!menuToggle || !mobileNav) return;

    const isOpen = mobileNav.classList.contains('is-open');

    menuToggle.classList.toggle('is-active', !isOpen);
    menuToggle.setAttribute('aria-expanded', !isOpen);
    mobileNav.classList.toggle('is-open', !isOpen);
    mobileNav.setAttribute('aria-hidden', isOpen);
    document.body.classList.toggle('mobile-nav-open', !isOpen);

    // Create or remove overlay
    if (!isOpen) {
      createMobileNavOverlay();
    } else {
      removeMobileNavOverlay();
    }
  }

  /**
   * Create mobile nav overlay
   */
  function createMobileNavOverlay() {
    let overlay = document.querySelector('.mobile-nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-nav-overlay';
      document.body.appendChild(overlay);
    }
    // Trigger reflow for animation
    overlay.offsetHeight;
    overlay.classList.add('is-visible');
    overlay.addEventListener('click', toggleMobileNav);
  }

  /**
   * Remove mobile nav overlay
   */
  function removeMobileNavOverlay() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
      overlay.classList.remove('is-visible');
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  /**
   * Toggle mobile submenu
   */
  function toggleMobileSubmenu(event) {
    const toggle = event.currentTarget;
    const item = toggle.closest('.mobile-nav-item');
    const isOpen = item.classList.contains('is-open');

    // Close other open submenus
    document.querySelectorAll('.mobile-nav-item.is-open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('is-open');
        openItem.querySelector('.mobile-nav-toggle').setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle current submenu
    item.classList.toggle('is-open', !isOpen);
    toggle.setAttribute('aria-expanded', !isOpen);
  }

  /**
   * Toggle search overlay
   */
  function toggleSearchOverlay(open) {
    if (!searchOverlay) return;

    if (open) {
      searchOverlay.classList.add('is-open');
      searchOverlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('search-open');

      // Focus search input
      const searchInput = searchOverlay.querySelector('.search-input');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    } else {
      searchOverlay.classList.remove('is-open');
      searchOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('search-open');
    }
  }

  /**
   * Handle keyboard events
   */
  function handleKeydown(event) {
    // Close search on Escape
    if (event.key === 'Escape') {
      if (searchOverlay && searchOverlay.classList.contains('is-open')) {
        toggleSearchOverlay(false);
      }
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        toggleMobileNav();
      }
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    // Close mobile nav on desktop
    if (window.innerWidth >= mobileBreakpoint) {
      if (mobileNav && mobileNav.classList.contains('is-open')) {
        toggleMobileNav();
      }
    }
  }

  /**
   * Initialize
   */
  function init() {
    // Scroll handler
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener('click', toggleMobileNav);
    }

    // Mobile submenu toggles
    mobileNavToggles.forEach(toggle => {
      toggle.addEventListener('click', toggleMobileSubmenu);
    });

    // Search toggle
    if (searchToggle) {
      searchToggle.addEventListener('click', () => toggleSearchOverlay(true));
    }

    // Search close
    if (searchClose) {
      searchClose.addEventListener('click', () => toggleSearchOverlay(false));
    }

    // Keyboard events
    document.addEventListener('keydown', handleKeydown);

    // Window resize
    window.addEventListener('resize', handleResize);

    // Initial scroll check
    handleScroll();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
