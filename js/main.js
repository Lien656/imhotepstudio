// Анимация счётчиков (запускается каждый раз при скролле)
function animateCounter(id, endValue) {
  let current = 0;
  const el = document.getElementById(id);
  const duration = 1500;
  const increment = endValue / (duration / 16);

  function update() {
    current += increment;
    if (current >= endValue) {
      current = endValue;
    } else {
      requestAnimationFrame(update);
    }
    el.textContent = Math.floor(current);
  }

  update();
}

// IntersectionObserver для запуска счётчиков
const statsSection = document.querySelector('#stats');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter('years', 6);
      animateCounter('projects', 155);
      animateCounter('guarantee', 100);
    }
  });
}, { threshold: 0.5 });

if (statsSection) observer.observe(statsSection);

// Плавное появление секций
const animatedSections = document.querySelectorAll('section');
const appearObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

animatedSections.forEach(sec => appearObserver.observe(sec));
