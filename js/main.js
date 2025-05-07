// Анимация счётчиков с опциональным суффиксом
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const suffix = el.getAttribute('data-suffix') || '';
  let count = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + suffix;
      clearInterval(interval);
    } else {
      el.textContent = count + suffix;
    }
  }, 30);
}

// Запуск после полной загрузки
window.addEventListener('DOMContentLoaded', () => {
  // Счётчики
  document.querySelectorAll('.counter').forEach(el => animateCounter(el));

  // Прелоадер
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 4000);
});

// Автопрокрутка галерей
window.addEventListener('load', () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    let scroll = 0;
    setInterval(() => {
      scroll += 1;
      carousel.scrollLeft = scroll;
      if (scroll > carousel.scrollWidth - carousel.clientWidth) scroll = 0;
    }, 30);
  });
});
