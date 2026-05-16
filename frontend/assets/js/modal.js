/* ============================================================
   PROJECT MODAL · shared across pages
   ============================================================ */
(function(){
  var ov = null, body = null;

  function ensure(){
    if(ov) return;
    ov = document.createElement('div');
    ov.className = 'modal-ov';
    ov.innerHTML = '<div class="modal" id="proj-modal-body"></div>';
    document.body.appendChild(ov);
    body = ov.querySelector('.modal');
    ov.addEventListener('click', function(e){
      if(e.target === ov) close();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') close();
    });
  }
  function close(){
    if(!ov) return;
    ov.classList.remove('show');
  }
  function open(id){
    ensure();
    var p = window.getProject(id);
    if(!p) return;
    var area = window.AREAS.find(function(a){return a.id===p.areaId;});
    body.classList.toggle('gesetz-modal', p.st==='gesetzlich');

    // dependencies
    var depsHtml = '';
    if(p.deps && p.deps.length){
      depsHtml = p.deps.map(function(d){
        var dp = window.getProject(d);
        if(!dp) return '<span class="mdi"><span class="mdi-id">'+d+'</span></span>';
        return '<div class="mdi" onclick="event.stopPropagation(); window.ProjectModal.open(\''+d+'\')"><span class="mdi-id">'+d+'</span> <span>'+dp.name+'</span></div>';
      }).join('');
    } else depsHtml = '<div class="mdi" style="opacity:.6">Keine</div>';

    // reverse deps (needed by)
    var nbHtml = '';
    var needers = window.ALL_PROJECTS.filter(function(x){return (x.deps||[]).indexOf(p.id)>=0;});
    if(needers.length){
      nbHtml = needers.map(function(dp){
        return '<div class="mdi" onclick="event.stopPropagation(); window.ProjectModal.open(\''+dp.id+'\')"><span class="mdi-id">'+dp.id+'</span> <span>'+dp.name+'</span></div>';
      }).join('');
    } else nbHtml = '<div class="mdi" style="opacity:.6">Keine</div>';

    var regBlock = '';
    if(p.st==='gesetzlich'){
      var overlap = (p.overlap||[]).map(function(o){return '<span class="mdi-id" style="color:var(--gesetz);background:rgba(255,184,0,.1);padding:3px 7px;border-radius:5px;margin-right:4px">'+o+'</span>';}).join(' ');
      regBlock = ''
        + '<div class="msect" style="color:var(--gesetz)">§ Regulatorischer Kontext</div>'
        + '<div style="background:rgba(255,184,0,.06);border:1px solid rgba(255,184,0,.25);border-radius:10px;padding:14px;margin-bottom:18px">'
        +   '<div style="font-size:13px;line-height:1.6"><b style="color:var(--gesetz)">Bezugsregulierung:</b> '+(p.reg||'—')+'</div>'
        +   (p.value ? '<div style="font-size:13px;line-height:1.6;margin-top:6px"><b style="color:var(--gesetz)">Business Value:</b> '+p.value+'</div>' : '')
        +   (overlap ? '<div style="font-size:13px;line-height:1.6;margin-top:8px"><b style="color:var(--gesetz)">Überlappt mit:</b><br>'+overlap+'</div>' : '')
        + '</div>';
    }

    var goalLine = p.goalName==='Gesetzliche Pflichten'
      ? '<span style="color:var(--gesetz)">§ '+p.goalName+'</span>'
      : '<span style="color:'+area.color+'">'+area.name+'</span> · '+p.goalName;

    body.innerHTML = ''
      + '<div class="modal-top">'
      +   '<div>'
      +     '<div class="modal-id">'+p.id+(p.regParagraph?' · '+p.regParagraph:'')+'</div>'
      +     '<div class="modal-title">'+p.name+'</div>'
      +     '<div class="modal-badges">'+window.statusBadge(p.st)+window.prioBadge(p.prio)+'</div>'
      +   '</div>'
      +   '<button class="modal-close" aria-label="close">×</button>'
      + '</div>'
      + '<div class="modal-desc">'+p.desc+'</div>'
      + '<div class="mgrid">'
      +   '<div class="mf"><div class="mf-l">Budget</div><div class="mf-v">'+window.fmtBudget(p.budget)+'</div></div>'
      +   '<div class="mf"><div class="mf-l">Zeitraum</div><div class="mf-v">'+window.fmtDur(p.dur)+'</div></div>'
      +   '<div class="mf"><div class="mf-l">Ressourcen</div><div class="mf-v">'+p.res+'</div></div>'
      +   '<div class="mf"><div class="mf-l">Priorität</div><div class="mf-v">'+(p.prio.charAt(0).toUpperCase()+p.prio.slice(1))+'</div></div>'
      + '</div>'
      + '<div class="msect">Zielbezug</div>'
      + '<div style="font-size:13px;color:var(--gray);margin-bottom:6px">'+goalLine+'</div>'
      + (p.agName ? '<div style="font-size:12px;color:var(--gray-2);margin-bottom:18px">'+p.agName+' · '+p.year+'</div>' : '')
      + regBlock
      + '<div class="msect">Abhängig von</div>'+depsHtml
      + '<div class="msect" style="margin-top:14px">Wird benötigt von</div>'+nbHtml;

    body.querySelector('.modal-close').addEventListener('click', close);
    ov.classList.add('show');
  }

  window.ProjectModal = { open: open, close: close };
})();
