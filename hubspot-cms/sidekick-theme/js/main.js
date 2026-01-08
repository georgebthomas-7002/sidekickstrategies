/**
 * Sidekick Theme - Main JavaScript
 * Version: 1.0.0
 */

(function() {
  'use strict';

  /**
   * Scroll Animation Observer
   * Handles fade-in animations on scroll
   */
  function initScrollAnimations() {
    const animateOnScroll = document.querySelectorAll('.scroll-animate');

    if (!animateOnScroll.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateOnScroll.forEach(el => observer.observe(el));
  }

  /**
   * Smooth Scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if just "#" or no matching element
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // Calculate offset for sticky header
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update URL
        history.pushState(null, null, href);
      });
    });
  }

  /**
   * Lazy Load Images
   * Native lazy loading fallback for older browsers
   */
  function initLazyLoad() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    } else {
      // Fallback using Intersection Observer
      const lazyImages = document.querySelectorAll('img[data-src]');

      if (!lazyImages.length || !('IntersectionObserver' in window)) return;

      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  /**
   * Responsive Tables
   * Wrap tables for horizontal scroll on mobile
   */
  function initResponsiveTables() {
    document.querySelectorAll('table:not(.wrapped)').forEach(table => {
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
      table.classList.add('wrapped');
    });
  }

  /**
   * External Links
   * Add rel attributes to external links
   */
  function initExternalLinks() {
    const currentHost = window.location.host;

    document.querySelectorAll('a[href^="http"]').forEach(link => {
      const linkHost = new URL(link.href).host;

      if (linkHost !== currentHost) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /**
   * Accordion Component
   */
  function initAccordions() {
    document.querySelectorAll('[data-accordion]').forEach(accordion => {
      const triggers = accordion.querySelectorAll('[data-accordion-trigger]');

      triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
          const item = this.closest('[data-accordion-item]');
          const content = item.querySelector('[data-accordion-content]');
          const isOpen = item.classList.contains('is-open');

          // Close other items if single mode
          if (accordion.dataset.accordion === 'single') {
            accordion.querySelectorAll('[data-accordion-item].is-open').forEach(openItem => {
              if (openItem !== item) {
                openItem.classList.remove('is-open');
                openItem.querySelector('[data-accordion-trigger]').setAttribute('aria-expanded', 'false');
                openItem.querySelector('[data-accordion-content]').style.maxHeight = '0';
              }
            });
          }

          // Toggle current item
          item.classList.toggle('is-open', !isOpen);
          this.setAttribute('aria-expanded', !isOpen);

          if (!isOpen) {
            content.style.maxHeight = content.scrollHeight + 'px';
          } else {
            content.style.maxHeight = '0';
          }
        });
      });
    });
  }

  /**
   * Copy to Clipboard
   */
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(button => {
      button.addEventListener('click', async function() {
        const text = this.dataset.copy;

        try {
          await navigator.clipboard.writeText(text);

          // Show feedback
          const originalText = this.textContent;
          this.textContent = 'Copied!';
          this.classList.add('is-copied');

          setTimeout(() => {
            this.textContent = originalText;
            this.classList.remove('is-copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  }

  /**
   * Form Validation Feedback
   */
  function initFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });

        if (!isValid) {
          e.preventDefault();
          const firstInvalid = form.querySelector('.is-invalid');
          if (firstInvalid) {
            firstInvalid.focus();
          }
        }
      });

      // Remove invalid class on input
      form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', function() {
          if (this.value.trim()) {
            this.classList.remove('is-invalid');
          }
        });
      });
    });
  }

  /**
   * Initialize all functionality
   */
  function init() {
    initScrollAnimations();
    initSmoothScroll();
    initLazyLoad();
    initResponsiveTables();
    initExternalLinks();
    initAccordions();
    initCopyButtons();
    initFormValidation();

    // Log initialization
    console.log('Sidekick Theme initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
