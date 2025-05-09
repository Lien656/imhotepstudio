document.addEventListener("DOMContentLoaded", () => {
  // fade-in анимация при скролле
  const fadeElements = document.querySelectorAll(".fade");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // печатание текста
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

  // анимация счётчиков
  const counters = [
    { id: "years", target: 6 },
    { id: "projects", target: 155 },
    { id: "guarantee", target: 100 }
  ];

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const el = document.getElementById(counter.id);
          let count = 0;
          const step = Math.ceil(counter.target / 50);
          const interval = setInterval(() => {
            if (count < counter.target) {
              count += step;
              if (count > counter.target) count = counter.target;
              el.textContent = count;
            } else {
              clearInterval(interval);
            }
          }, 40);
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(document.getElementById("stats"));

  // плавный скролл
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
