document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Прелоадер ---------- */
  const preloader = document.querySelector(".preloader");
  const logo      = document.querySelector(".preloader-logo");

  setTimeout(() => {
    logo.style.transition = "all 1s ease";
    logo.style.transform  = "scale(1.1)";
    logo.style.opacity    = "0";
    setTimeout(() => preloader.classList.add("hide"), 1000);
  }, 1800);

  /* ---------- Анимация fade ---------- */
  const fadeElements = document.querySelectorAll(".fade");
  const fadeIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  fadeElements.forEach(el => fadeIO.observe(el));

  /* ---------- Счётчики ---------- */
  const stats = document.querySelector("#stats");
  const nums  = stats.querySelectorAll(".num");
  let animated = false;

  const statsIO = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible && !animated) {
      nums.forEach(el => {
        const target = +el.dataset.num;
        let count = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          count += step;
          el.textContent = count > target ? target : count;
          if (count >= target) clearInterval(interval);
        }, 40);
      });
      animated = true;
    } else if (!visible) {
      animated = false;
      nums.forEach(el => (el.textContent = "0"));
    }
  }, { threshold: 0.5 });
  statsIO.observe(stats);

  /* ---------- Проекты ---------- */
  const projects = [
    { name: "Квартира в ЖК «Лучи»",          slug: "luchi"      },
    { name: "ЖК «Мещера»",                  slug: "meshchera"  },
    { name: "ЖК «Октава»",                  slug: "oktava"     },
    { name: "ЖК «Дом на Пискунова»",        slug: "piskunova"  },
    { name: "Современный дом с зоной SPA",  slug: "spa"        },
    { name: "Квартира в ЖК «Тихий уголок»", slug: "tihiy"      }
  ];

  const wrap = document.querySelector(".projects-wrap");

  projects.forEach(project => {
    const block  = document.createElement("div");
    block.className = "project fade";

    const title  = document.createElement("h3");
    title.textContent = project.name;
    block.appendChild(title);

    const gallery = document.createElement("div");
    gallery.className = "gallery";

    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `${project.slug}/${i}.jpg`;
      img.loading = "lazy";
      img.onerror = () => img.remove();
      gallery.appendChild(img);
    }

    block.appendChild(gallery);
    wrap.appendChild(block);

    fadeIO.observe(block);

    /* ---------- автоплей, запускаем только когда лента видна ---------- */
    let index = 0, timer;

    const slide = () => {
      index = (index + 1) % gallery.children.length;
      gallery.scrollTo({ left: index * gallery.clientWidth, behavior: 'smooth' });
    };
    const start = () => { timer = setInterval(slide, 4000); };
    const stop  = () => clearInterval(timer);

    /* наблюдаем сам gallery */
    const galleryIO = new IntersectionObserver(ent => {
      if (ent[0].isIntersecting) start(); else stop();
    }, { threshold: 0.5 });
    galleryIO.observe(gallery);

    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);

    /* вертикальное колесо → горизонтальный скролл */
    gallery.addEventListener('wheel', e => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  });

  /* после генерации контента «включаем» секцию проектов */
  document.querySelector('#projects').classList.add('show');

  /* ---------- Коллаж ---------- */
  const col   = document.querySelector(".collage-col");
  const hero  = new Image();
  hero.src = "collage/collage-full.jpg";

  hero.onload = () => col.appendChild(hero);
  hero.onerror = () => {
    for (let i = 1; i <= 11; i++) {
      const img = new Image();
      img.src = `collage/${i}.jpg`;
      img.loading = "lazy";
      img.onerror = () => img.remove();
      col.appendChild(img);
      fadeIO.observe(img);
    }
  };
});
