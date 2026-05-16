/* ============================================================
   NAV · sticky, active-state, mobile burger, page transitions
   ============================================================ */
(function(){
  function build(){
    var nav = document.querySelector('.nav');
    if(!nav){
      // build nav and inject
      nav = document.createElement('nav');
      nav.className = 'nav';
      document.body.insertBefore(nav, document.body.firstChild);
    }
    var current = (document.body.dataset.page || '').toLowerCase();

    nav.innerHTML = ''
      + '<div class="nav-inner">'
      +   '<a href="index.html" class="brand"><span class="b1">Haufe Group</span><span class="b2">· Portfolio 2026–2027</span></a>'
      +   '<div class="nav-links">'
      +     '<a class="nav-link'+(current==='index'?' active':'')+'" href="index.html">Unternehmen</a>'
      +     '<a class="nav-link'+(current==='strategie'?' active':'')+'" href="strategie.html">Strategie-Methodik</a>'
      +     '<a class="nav-link'+(current==='ziele'?' active':'')+'" href="ziele.html">Ziele & OKR</a>'
      +     '<a class="nav-link'+(current==='portfolio'?' active':'')+'" href="portfolio.html">Portfolio & Backlog</a>'
      +   '</div>'
      +   '<div class="nav-stamp"><span class="dot"></span> Pitch · April 2026</div>'
      +   '<button class="burger" aria-label="Menu">'
      +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>'
      +   '</button>'
      + '</div>'
      + '<div class="mobile-menu">'
      +   '<a class="nav-link'+(current==='index'?' active':'')+'" href="index.html">Unternehmen</a>'
      +   '<a class="nav-link'+(current==='strategie'?' active':'')+'" href="strategie.html">Strategie-Methodik</a>'
      +   '<a class="nav-link'+(current==='ziele'?' active':'')+'" href="ziele.html">Ziele & OKR</a>'
      +   '<a class="nav-link'+(current==='portfolio'?' active':'')+'" href="portfolio.html">Portfolio & Backlog</a>'
      + '</div>';

    // burger toggle
    var burger = nav.querySelector('.burger');
    var menu = nav.querySelector('.mobile-menu');
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
    });

    // scrolled state
    function onScroll(){
      if(window.scrollY > 16) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // page transition wipe
    var wipe = document.createElement('div');
    wipe.className = 'page-wipe';
    document.body.appendChild(wipe);

    // intercept nav clicks
    document.querySelectorAll('.nav-link').forEach(function(a){
      a.addEventListener('click', function(e){
        var href = a.getAttribute('href');
        if(!href || href.indexOf('#')===0) return;
        if(href === window.location.pathname.split('/').pop()) { e.preventDefault(); return; }
        e.preventDefault();
        // wipe in
        if(window.gsap){
          gsap.to(wipe, {width:'100%', duration:.25, ease:'power2.in', onComplete:function(){
            window.location.href = href;
          }});
        } else {
          wipe.style.transition='width .25s ease';
          wipe.style.width='100%';
          setTimeout(function(){ window.location.href = href; },240);
        }
      });
    });
  }

  function pageIn(){
    if(window.gsap){
      gsap.from('.page > *', {opacity:0, y:20, duration:.6, ease:'power2.out', stagger:.05});
    }
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', function(){ build(); pageIn(); });
  } else {
    build(); pageIn();
  }
})();
