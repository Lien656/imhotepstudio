document.addEventListener("DOMContentLoaded",()=>{

  /* 1. прелоадер */
  window.addEventListener("load",()=>{
    const pre=document.querySelector(".preloader");
    setTimeout(()=>{pre.classList.add("hide")},1100);
    pre.addEventListener("transitionend",()=>pre.remove());
  });

  /* 2. fade */
  const fadeIO=new IntersectionObserver(e=>e.forEach(i=>i.isIntersecting&&i.target.classList.add("show")),{threshold:.2});
  document.querySelectorAll(".fade").forEach(el=>fadeIO.observe(el));

  /* 3. counters */
  const statIO=new IntersectionObserver(e=>{
    e.forEach(i=>{
      if(!i.isIntersecting) return;
      i.target.querySelectorAll(".num").forEach(el=>{
        const end=+el.dataset.num;let cur=0,step=Math.max(1,Math.ceil(end/60));
        (function t(){cur+=step;el.textContent=cur>=end?end:cur;if(cur<end)requestAnimationFrame(t)})();});
    });
  },{threshold:.6});
  statIO.observe(document.getElementById("stats"));

  /* 4. проекты */
  const projects=[
    {slug:"luchi",name:"Квартира в ЖК «Лучи»"},
    {slug:"spa",name:"Современный дом SPA"},
    {slug:"oktava",name:"ЖК «Октава»"},
    {slug:"meshchera",name:"ЖК «Мещера»"},
    {slug:"piskunova",name:"Дом на Пискунова"},
    {slug:"tihiy",name:"Квартира «Тихий уголок»"}
  ];
  const wrap=document.querySelector(".projects-wrap");

  projects.forEach(p=>{
    const sec=document.createElement("div");
    sec.className="project fade";
    sec.innerHTML=`<h3>${p.name}</h3><div class="gallery"></div>`;
    const g=sec.querySelector(".gallery");

    for(let i=1;i<=8;i++){
      const img=new Image();
      img.src=`${p.slug}/${i}.jpg`;img.alt=p.name;img.loading="lazy";
      img.onerror=()=>img.remove();
      g.appendChild(img);
    }

    /* авто + drag */
    let auto=setInterval(()=>{g.scrollLeft+=1},20);
    let down=false,startX,scroll;
    g.addEventListener("pointerdown",e=>{
      down=true;startX=e.pageX;scroll=g.scrollLeft;clearInterval(auto);
      g.setPointerCapture(e.pointerId);
    });
    g.addEventListener("pointermove",e=>{
      if(!down)return;
      g.scrollLeft=scroll-(e.pageX-startX);
    });
    g.addEventListener("pointerup",()=>{down=false});

    wrap.appendChild(sec);
    fadeIO.observe(sec);
  });

  /* 5. коллаж */
  const col=document.querySelector(".collage-col");
  for(let i=1;i<=11;i++){
    const img=new Image();
    img.src=`collage/${i}.jpg`;img.loading="lazy";img.onerror=()=>img.remove();
    col.appendChild(img);fadeIO.observe(img);
  }
});
