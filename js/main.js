from pathlib import Path

final_main_js = """
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  const logo = document.querySelector(".preloader-logo");
  const siteContent = document.querySelector("main");
  const header = document.querySelector("header");

  siteContent.style.display = "none";
  header.style.display = "none";

  window.addEventListener("load", () => {
    logo.classList.add("logo-hide");

    setTimeout(() => {
      preloader.classList.add("preloader-hide");
      logo.classList.add("logo-mini");
      siteContent.style.display = "block";
      header.style.display = "flex";
    }, 2000);
  });

  const faders = document.querySelectorAll(".fade");
  const appearOptions = { threshold: 0.2 };

  const appearOnScroll = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  const counters = [
    { id: "years", target: 6 },
    { id: "projects", target: 155 },
    { id: "guarantee", target: 100 }
  ];

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => {
          const el = document.getElementById(counter.id);
          let count = 0;
          const step = Math.ceil(counter.target / 60);
          const interval = setInterval(() => {
            if (count < counter.target) {
              count += step;
              el.textContent = Math.min(count, counter.target);
            } else {
              clearInterval(interval);
            }
          }, 30);
        });
      }
    });
  }, { threshold: 0.6 });

  const statsSection = document.getElementById("stats");
  if (statsSection) counterObserver.observe(statsSection);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
"""

Path("/mnt/data/main.js").write_text(final_main_js.strip(), encoding="utf-8")
