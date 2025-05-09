from pathlib import Path

main_js_code = '''
document.addEventListener("DOMContentLoaded", () => {
  // Анимация появления элементов при скролле
  const fadeElements = document.querySelectorAll(".fade");
  const options = {
    threshold: 0.1
  };

  const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, options);

  fadeElements.forEach(el => {
    fadeInOnScroll.observe(el);
  });

  // Анимация печати текста
  function typeText(element, speed = 50) {
    const text = element.textContent;
    element.textContent = "";
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  document.querySelectorAll(".typing").forEach(el => typeText(el));

  // Счётчики
  const counters = {
    years: 6,
    projects: 155,
    guarantee: 100
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        Object.entries(counters).forEach(([id, target]) => {
          const el = document.getElementById(id);
          let count = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            if (count < target) {
              count += step;
              if (count > target) count = target;
              el.textContent = count;
            } else {
              clearInterval(interval);
            }
          }, 50);
        });
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById("stats"));

  // Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
'''

# Сохраняем в main.js
output_path = Path("/mnt/data/main.js")
output_path.write_text(main_js_code.strip(), encoding="utf-8")
output_path
