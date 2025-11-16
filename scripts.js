/* Shared scripts:
 - feather icons init
 - progress-bar animation
 - smooth anchor fallback
 - Dark/Light Mode Toggle Logic (NEW)
*/

// Dark/Light Mode Toggle Logic
(function () {
  const toggleButton = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  // Apply saved theme on load
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  } else {
    // Default to light mode if no theme is saved
    document.documentElement.setAttribute('data-theme', 'light');
  }

  // Function to update the icon based on the current theme
  function updateIcon(theme) {
    // We will rely on the DOMContentLoaded feather.replace() for initial load
    // and call it explicitly after a theme change.
    if (theme === 'dark') {
      toggleButton.innerHTML = '<i data-feather="sun"></i>';
    } else {
      toggleButton.innerHTML = '<i data-feather="moon"></i>';
    }
    // Re-render feather icons after changing the innerHTML
    if (window.feather) feather.replace();
  }

  // Set initial icon if button exists
  if (toggleButton) {
    updateIcon(document.documentElement.getAttribute('data-theme'));

    // Event listener for the toggle button
    toggleButton.addEventListener('click', function () {
      let theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateIcon('light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateIcon('dark');
      }
    });
  }
})();


document.addEventListener('DOMContentLoaded', () => {
  // Initialize feather icons globally (for all icons not in the toggle button)
  if (window.feather) feather.replace();

  function applyProgressBars() {
    document.querySelectorAll('.software-item, .competency-card').forEach(el => {
      const percent = Math.max(0, Math.min(100, parseInt(el.getAttribute('data-percent') || '0', 10)));
      const bar = el.querySelector('.progress .progress-bar');
      const swScore = el.querySelector('.sw-score');
      const compScore = el.querySelector('.comp-score');
      if (bar) requestAnimationFrame(() => { bar.style.width = percent + '%'; });
      if (swScore) swScore.textContent = percent + '%';
      if (compScore) compScore.textContent = percent + '/100';
    });
  }
  applyProgressBars();

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
