/* Shared scripts:
 - feather icons init
 - progress-bar animation
 - smooth anchor fallback
*/

document.addEventListener('DOMContentLoaded', () => {
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