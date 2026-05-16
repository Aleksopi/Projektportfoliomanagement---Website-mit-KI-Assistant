/* ============================================================
   PARTICLES · Canvas background field with connection lines
   ============================================================ */
(function(){
  function start(){
    var canvas = document.querySelector('.bg-canvas');
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.className = 'bg-canvas';
      document.body.insertBefore(canvas, document.body.firstChild);
      var mesh = document.createElement('div');
      mesh.className = 'bg-mesh';
      document.body.insertBefore(mesh, canvas);
    }
    var ctx = canvas.getContext('2d');
    var W=0, H=0, DPR=Math.min(2, window.devicePixelRatio||1);
    var mouse = {x:-9999, y:-9999};
    var particles = [];

    function isMobile(){ return window.innerWidth < 768; }
    function targetCount(){ return isMobile() ? 50 : 95; }

    function resize(){
      W = canvas.width  = Math.floor(window.innerWidth * DPR);
      H = canvas.height = Math.floor(window.innerHeight * DPR);
      canvas.style.width  = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      // (re)seed particles
      particles = [];
      var N = targetCount();
      for(var i=0;i<N;i++){
        particles.push({
          x: Math.random()*W,
          y: Math.random()*H,
          vx: (Math.random()-.5)*0.18*DPR,
          vy: (Math.random()-.5)*0.18*DPR,
          r: (Math.random()*1.4 + 0.6)*DPR,
          hue: Math.random()<.18 ? 'lime' : (Math.random()<.5 ? 'mint' : 'blue')
        });
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', function(e){
      mouse.x = e.clientX*DPR;
      mouse.y = e.clientY*DPR;
    });
    window.addEventListener('mouseleave', function(){ mouse.x = -9999; mouse.y = -9999; });

    resize();

    var COLOR = {
      lime: 'rgba(200,230,0,',
      mint: 'rgba(0,196,154,',
      blue: 'rgba(120,180,255,'
    };
    var LINK_DIST = 130*DPR;

    function loop(){
      ctx.clearRect(0,0,W,H);

      for(var i=0;i<particles.length;i++){
        var p = particles[i];
        // parallax pull toward mouse
        if(mouse.x > -1000){
          var dx = mouse.x - p.x, dy = mouse.y - p.y;
          var d2 = dx*dx + dy*dy;
          if(d2 < 22000*DPR){
            var d = Math.sqrt(d2)+0.1;
            p.vx += (dx/d) * 0.004;
            p.vy += (dy/d) * 0.004;
          }
        }
        p.x += p.vx; p.y += p.vy;
        // friction
        p.vx *= 0.992; p.vy *= 0.992;
        if(p.x < 0) p.x = W; else if(p.x > W) p.x = 0;
        if(p.y < 0) p.y = H; else if(p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = COLOR[p.hue] + (p.hue==='lime' ? '0.55)' : '0.35)');
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      }

      // connection lines
      for(var i=0;i<particles.length;i++){
        for(var j=i+1;j<particles.length;j++){
          var a = particles[i], b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d2 = dx*dx + dy*dy;
          if(d2 < LINK_DIST*LINK_DIST){
            var alpha = (1 - Math.sqrt(d2)/LINK_DIST) * 0.18;
            if(a.hue==='lime' || b.hue==='lime'){
              ctx.strokeStyle = 'rgba(200,230,0,'+alpha+')';
            } else {
              ctx.strokeStyle = 'rgba(120,180,255,'+(alpha*0.7)+')';
            }
            ctx.lineWidth = 0.5*DPR;
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(loop);
    }
    loop();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
