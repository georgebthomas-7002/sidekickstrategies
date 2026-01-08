/* Video Player Module JavaScript - Play Button Overlay */
(function() {
  'use strict';

  function initVideoPlayers() {
    const posters = document.querySelectorAll('.video-player__poster');

    posters.forEach(function(poster) {
      poster.addEventListener('click', function() {
        const container = poster.closest('.video-player__container');
        const embedContainer = container.querySelector('.video-player__embed-container');
        const videoType = poster.dataset.videoType;
        const videoId = poster.dataset.videoId;

        if (!embedContainer || !videoType || !videoId) return;

        let embedUrl = '';

        if (videoType === 'youtube') {
          embedUrl = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
        } else if (videoType === 'vimeo') {
          embedUrl = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1';
        }

        if (embedUrl) {
          const iframe = document.createElement('iframe');
          iframe.src = embedUrl;
          iframe.title = videoType.charAt(0).toUpperCase() + videoType.slice(1) + ' video';
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', '');

          embedContainer.innerHTML = '';
          embedContainer.appendChild(iframe);
          container.classList.add('video-player__container--playing');
        }
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoPlayers);
  } else {
    initVideoPlayers();
  }
})();
