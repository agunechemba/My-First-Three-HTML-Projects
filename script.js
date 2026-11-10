/* ============================================================
   MY FIRST THREE HTML PROJECTS — PAGE NAVIGATION
   Handles page switching, progress bar, indicator, TOC links,
   and keyboard navigation.
   ============================================================ */

(function () {
  'use strict';

  const pages = Array.from(document.querySelectorAll('.book-page'));
  const progressFill = document.querySelector('.reading-progress-fill');
  const pageIndicator = document.querySelector('.page-indicator');
  let currentPage = 0;

  // Enable JS mode
  document.body.classList.add('js-ready');

  function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    pages.forEach(function (p) {
      p.classList.remove('active', 'page-enter');
    });

    currentPage = index;
    const page = pages[currentPage];
    page.classList.add('active', 'page-enter');
    window.setTimeout(function () {
      page.classList.remove('page-enter');
    }, 500);

    // Update progress bar
    const pct = ((currentPage + 1) / pages.length) * 100;
    progressFill.style.width = pct + '%';

    // Update page indicator
    pageIndicator.textContent = (currentPage + 1) + ' / ' + pages.length;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  // Expose navigation globally so inline onclick can use them
  window.goToPage = showPage;
  window.nextPage = function () { showPage(currentPage + 1); };
  window.prevPage = function () { showPage(currentPage - 1); };

  // Handle TOC and other internal links with data-goto
  document.addEventListener('click', function (e) {
    const link = e.target.closest('[data-goto]');
    if (link) {
      e.preventDefault();
      showPage(parseInt(link.dataset.goto, 10));
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      showPage(currentPage + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      showPage(currentPage - 1);
    } else if (e.key === 'Home') {
      showPage(0);
    } else if (e.key === 'End') {
      showPage(pages.length - 1);
    }
  });

  // Start at the first page
  showPage(0);
})();