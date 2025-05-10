document.addEventListener("DOMContentLoaded", () => {
  /* ---------- PRELOADER ---------- */
  const preloader = document.querySelector(".preloader");
  const logo      = document.querySelector(".preloader-logo");

  window.addEventListener("load", () => {
    setTimeout(() => {
      logo.classList.add("logo-mini");
      preloader.classList.add("preloader-hide");
    }, 1500);
  });

  /* ---------- COUNTERS ---------- */
  const counters = [
    { id: "years",     target: 6   },
    { id: "projects",  target: 155 },
    { id: "guarantee", target: 100 }
  ];

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      counters.forEach(c => {
        const el   = document.getElementById(c.id);
        let cur    = 0;
        const step = Math.ceil(c.target / 50);
        const tick = () => {
          cur += step;
          if (cur >= c.target) { cur = c.target; }
          el.textContent = cur;
          if (cur < c.target) requestAnimationFrame(tick);
        };
        tick();
      });

      obs.unobserve(entry.target);          // запускать каждый раз при прокрутке вниз
      setTimeout(() => obs.observe(entry.target), 1000);
    });
  }, { threshold: .5 });

  counterObserver.observe(document.getElementById("stats"));

  /* ---------- FADE-IN ---------- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add("visible"));
  },{threshold:.2});
  document.querySelectorAll(".fade").forEach(el => fadeObserver.observe(el));

  /* ---------- PROJECT CARDS ---------- */
  const projects = [
    { slug:"luchi",     title:"Квартира в ЖК «Лучи»" },
    { slug:"meshchera", title:"ЖК «Мещера»"         },
    { slug:"oktava",    title:"ЖК «Октава»"         },
    { slug:"piskunova", title:"Дом на Пискунова"    },
    { slug:"spa",       title:"Современный дом SPA" },
    { slug:"tihiy",     title:"Квартира «Тихий уголок»"}
  ];

  const track = document.querySelector(".project-track");

  projects.forEach(p => {
    const card = document.createElement("a");
    card.href  = `${p.slug}/index.html`;   // внутри каждой папки свой index.html
    card.className = "project-card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <img src="${p.slug}/1.png" alt="${p.title}">
    `;
    track.appendChild(card);
  });
});
