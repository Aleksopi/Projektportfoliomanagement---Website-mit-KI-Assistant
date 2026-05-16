/* ============================================================
   CHAT WIDGET — Haufe Portfolio KI-Assistent
   Floating button + Slide-in Panel mit Gesprächsverlauf
   ============================================================ */
(function(){

/* ── CSS ─────────────────────────────────────────────────── */
var style = document.createElement('style');
style.textContent = `
.chat-fab{
  position:fixed;bottom:28px;right:28px;z-index:500;
  width:56px;height:56px;border-radius:50%;
  background:linear-gradient(135deg,#9B8CFF,#7B6CEF);
  border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 8px 28px rgba(155,140,255,.55);
  transition:transform .2s ease,box-shadow .2s ease;
  font-size:24px;color:#fff;
}
.chat-fab:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 14px 36px rgba(155,140,255,.7)}

.chat-panel{
  position:fixed;bottom:0;right:0;z-index:499;
  width:420px;height:100vh;
  background:linear-gradient(180deg,#04132E 0%,#020A1F 100%);
  border-left:1px solid rgba(155,140,255,.25);
  display:flex;flex-direction:column;
  transform:translateX(100%);
  transition:transform .3s cubic-bezier(.22,1,.36,1);
  box-shadow:-12px 0 48px rgba(0,0,0,.5);
}
.chat-panel.open{transform:translateX(0)}
@media(max-width:480px){.chat-panel{width:100vw}}

.chat-header{
  display:flex;align-items:center;gap:10px;
  padding:16px 18px;
  border-bottom:1px solid rgba(155,140,255,.2);
  background:rgba(0,5,18,.4);flex-shrink:0;
}
.chat-header-icon{font-size:20px;color:var(--ki)}
.chat-header-title{
  font-family:var(--head);font-weight:700;font-size:15px;flex:1;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.chat-header-sub{font-family:var(--mono);font-size:9px;color:var(--gray-2);letter-spacing:.08em;margin-top:1px}
.chat-btn-icon{
  background:rgba(184,192,208,.08);border:1px solid rgba(184,192,208,.16);
  width:30px;height:30px;border-radius:8px;cursor:pointer;color:var(--white);
  display:flex;align-items:center;justify-content:center;font-size:14px;
  transition:all .15s;flex-shrink:0;
}
.chat-btn-icon:hover{background:rgba(184,192,208,.18)}

/* Sessions sidebar toggle */
.chat-sessions-bar{
  background:rgba(0,5,18,.6);
  border-bottom:1px solid rgba(155,140,255,.15);
  overflow:hidden;max-height:0;transition:max-height .3s ease;flex-shrink:0;
}
.chat-sessions-bar.open{max-height:200px}
.chat-sessions-list{padding:8px;display:flex;flex-direction:column;gap:4px;overflow-y:auto;max-height:192px}
.chat-session-item{
  padding:8px 12px;border-radius:8px;cursor:pointer;
  display:flex;align-items:center;gap:8px;
  font-size:12px;color:var(--gray);
  border:1px solid transparent;transition:all .15s;
}
.chat-session-item:hover{background:rgba(155,140,255,.1);border-color:rgba(155,140,255,.3)}
.chat-session-item.active{background:rgba(155,140,255,.15);border-color:rgba(155,140,255,.4);color:var(--white)}
.chat-session-item .si-title{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chat-session-item .si-date{font-family:var(--mono);font-size:9px;color:var(--gray-2);flex-shrink:0}
.chat-session-del{
  width:18px;height:18px;border-radius:4px;background:none;border:none;
  cursor:pointer;color:rgba(255,92,110,.5);font-size:12px;display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:color .15s;
}
.chat-session-del:hover{color:var(--high)}
.chat-new-btn{
  margin:8px;padding:7px;border-radius:8px;
  background:rgba(155,140,255,.1);border:1px dashed rgba(155,140,255,.3);
  color:var(--ki);font-size:11px;cursor:pointer;text-align:center;
  font-family:var(--mono);letter-spacing:.06em;transition:all .15s;
}
.chat-new-btn:hover{background:rgba(155,140,255,.2);border-color:rgba(155,140,255,.6)}

/* Messages */
.chat-messages{
  flex:1;overflow-y:auto;padding:16px;
  display:flex;flex-direction:column;gap:12px;
  scrollbar-width:thin;scrollbar-color:rgba(155,140,255,.3) transparent;
}
.chat-messages::-webkit-scrollbar{width:4px}
.chat-messages::-webkit-scrollbar-thumb{background:rgba(155,140,255,.3);border-radius:2px}

.chat-msg{display:flex;flex-direction:column;gap:4px;animation:msgIn .25s ease-out}
@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.chat-msg.user{align-items:flex-end}
.chat-msg.assistant{align-items:flex-start}
.chat-bubble{
  max-width:88%;padding:10px 14px;border-radius:12px;
  font-size:13px;line-height:1.6;word-wrap:break-word;
}
.chat-msg.user .chat-bubble{
  background:linear-gradient(135deg,rgba(155,140,255,.25),rgba(120,100,240,.2));
  border:1px solid rgba(155,140,255,.35);color:var(--white);
  border-radius:12px 12px 3px 12px;
}
.chat-msg.assistant .chat-bubble{
  background:rgba(184,192,208,.06);
  border:1px solid rgba(184,192,208,.12);color:var(--gray);
  border-radius:12px 12px 12px 3px;
}
.chat-bubble code{
  background:rgba(0,5,18,.6);padding:1px 5px;border-radius:4px;
  font-family:var(--mono);font-size:11px;color:var(--ki);
}
.chat-bubble strong{color:var(--white);font-weight:600}
.chat-bubble ul,
.chat-bubble ol{padding-left:16px;margin:6px 0}
.chat-bubble li{margin-bottom:3px}
.chat-time{font-family:var(--mono);font-size:9px;color:var(--gray-2);padding:0 4px}

.chat-typing{display:flex;align-items:center;gap:4px;padding:10px 14px;
  background:rgba(184,192,208,.06);border:1px solid rgba(184,192,208,.12);
  border-radius:12px 12px 12px 3px;max-width:60px;
}
.chat-typing span{width:6px;height:6px;border-radius:50%;background:var(--ki);
  animation:typing .9s ease-in-out infinite;
}
.chat-typing span:nth-child(2){animation-delay:.2s}
.chat-typing span:nth-child(3){animation-delay:.4s}
@keyframes typing{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}

/* Empty state */
.chat-empty{
  flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:12px;color:var(--gray-2);text-align:center;padding:24px;
}
.chat-empty .ce-icon{font-size:40px;opacity:.4}
.chat-empty .ce-text{font-size:13px;line-height:1.6;max-width:260px}

/* Suggestions */
.chat-suggestions{
  padding:0 14px 10px;display:flex;flex-direction:column;gap:6px;flex-shrink:0;
}
.chat-suggestion{
  padding:8px 12px;border-radius:8px;cursor:pointer;
  font-size:11px;color:var(--gray-2);
  border:1px solid rgba(155,140,255,.18);
  background:rgba(155,140,255,.05);
  transition:all .15s;line-height:1.4;
  display:flex;align-items:center;gap:8px;
}
.chat-suggestion:hover{color:var(--ki);border-color:rgba(155,140,255,.5);background:rgba(155,140,255,.12)}
.chat-suggestion .sug-icon{font-size:13px;flex-shrink:0}

/* Input */
.chat-input-row{
  display:flex;gap:8px;padding:12px 14px;
  border-top:1px solid rgba(155,140,255,.15);
  background:rgba(0,5,18,.4);flex-shrink:0;
}
.chat-input{
  flex:1;background:rgba(0,5,18,.6);border:1px solid rgba(155,140,255,.25);
  border-radius:10px;padding:10px 14px;color:var(--white);
  font-family:var(--body);font-size:13px;outline:none;resize:none;
  height:42px;max-height:120px;transition:border-color .2s;overflow-y:hidden;
  line-height:1.4;
}
.chat-input:focus{border-color:var(--ki)}
.chat-input::placeholder{color:var(--gray-2)}
.chat-send{
  width:42px;height:42px;border-radius:10px;flex-shrink:0;
  background:var(--ki);border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  color:var(--deep);font-size:16px;transition:all .2s;
}
.chat-send:hover{background:#8070ee;transform:scale(1.05)}
.chat-send:disabled{opacity:.4;cursor:not-allowed;transform:none}
`;
document.head.appendChild(style);

/* ── HTML ────────────────────────────────────────────────── */
var container = document.createElement('div');
container.innerHTML = `
<button class="chat-fab" id="chat-fab" title="KI-Assistent öffnen">
  ◈
</button>

<div class="chat-panel" id="chat-panel">
  <div class="chat-header">
    <span class="chat-header-icon">◈</span>
    <div style="flex:1;min-width:0">
      <div class="chat-header-title" id="chat-header-title">Portfolio-Assistent</div>
      <div class="chat-header-sub" id="chat-header-sub">KI-Berater · Haufe Group</div>
    </div>
    <button class="chat-btn-icon" id="chat-sessions-toggle" title="Chat-Verlauf">≡</button>
    <button class="chat-btn-icon" id="chat-new" title="Neuer Chat">＋</button>
    <button class="chat-btn-icon" id="chat-close" title="Schließen">×</button>
  </div>

  <div class="chat-sessions-bar" id="chat-sessions-bar">
    <button class="chat-new-btn" id="chat-new-2">＋ Neuer Chat</button>
    <div class="chat-sessions-list" id="chat-sessions-list"></div>
  </div>

  <div class="chat-messages" id="chat-messages">
    <div class="chat-empty" id="chat-empty">
      <div class="ce-icon">◈</div>
      <div class="ce-text">Stell mir eine Frage zur aktuellen Portfolio-Ausrichtung — ich bin auf dem neuesten Stand.</div>
    </div>
  </div>

  <div class="chat-suggestions" id="chat-suggestions"></div>

  <div class="chat-input-row">
    <textarea class="chat-input" id="chat-input" placeholder="Frage stellen…" rows="1"></textarea>
    <button class="chat-send" id="chat-send">➤</button>
  </div>
</div>
`;
document.body.appendChild(container);

/* ── State ──────────────────────────────────────────────── */
var panelOpen = false;
var currentSessionId = null;
var sessions = [];

/* ── Kontext vom Portfolio holen ─────────────────────────  */
function getPortfolioContext(){
  var orientationName = 'Unbekannt';
  var orientationDesc = '';
  var weights = {ki:0,pl:0,ak:0,ve:0};
  var risk = '—';
  var ttImpact = '—';
  var activeProjects = [];

  try {
    var currentId = window.current || 'balanced';
    var o = (window.ORIENTATIONS||[]).find(function(x){return x.id===currentId;});
    if(o){
      orientationName = o.name;
      orientationDesc = o.desc || '';
      weights = o.weights || weights;
      risk = o.risk || '—';
      ttImpact = o.ttImpact || '—';
    }
    if(window.ALL_PROJECTS && window.filterActive){
      activeProjects = window.filterActive(currentId).map(function(p){
        return {id:p.id,name:p.name,areaId:p.areaId,budget:p.budget,status:p.st};
      });
    }
  } catch(e){}

  return {orientationName,orientationDesc,weights,risk,ttImpact,activeProjects};
}

/* ── Suggestions generieren ─────────────────────────────── */
function renderSuggestions(){
  var ctx = getPortfolioContext();
  var name = ctx.orientationName;
  var sugs = [
    {icon:'◎', text:'Ausrichtung "'+name+'" bewerten — Stärken und Schwächen'},
    {icon:'▣', text:'Welche Projekte haben die höchste strategische Hebelwirkung?'},
    {icon:'⚠', text:'Welche Risiken birgt diese Portfolio-Ausrichtung?'}
  ];
  var el = document.getElementById('chat-suggestions');
  el.innerHTML = sugs.map(function(s){
    return '<div class="chat-suggestion" data-text="'+s.text+'">'
         +   '<span class="sug-icon">'+s.icon+'</span>'
         +   s.text
         + '</div>';
  }).join('');
  el.querySelectorAll('.chat-suggestion').forEach(function(s){
    s.addEventListener('click', function(){
      sendMessage(s.dataset.text);
    });
  });
}

/* ── Panel öffnen/schließen ─────────────────────────────── */
document.getElementById('chat-fab').addEventListener('click', function(){
  togglePanel();
});
document.getElementById('chat-close').addEventListener('click', function(){
  togglePanel(false);
});

function togglePanel(force){
  panelOpen = (force !== undefined) ? force : !panelOpen;
  document.getElementById('chat-panel').classList.toggle('open', panelOpen);
  document.getElementById('chat-fab').style.display = panelOpen ? 'none' : 'flex';
  if(panelOpen){
    renderSuggestions();
    updateHeaderContext();
    if(!currentSessionId) loadSessions();
  }
}

function updateHeaderContext(){
  var ctx = getPortfolioContext();
  document.getElementById('chat-header-sub').textContent = ctx.orientationName+' · KI-Berater';
}

/* ── Sessions ────────────────────────────────────────────── */
document.getElementById('chat-sessions-toggle').addEventListener('click', function(){
  var bar = document.getElementById('chat-sessions-bar');
  bar.classList.toggle('open');
  if(bar.classList.contains('open')) loadSessions();
});
document.getElementById('chat-new').addEventListener('click', newSession);
document.getElementById('chat-new-2').addEventListener('click', newSession);

async function loadSessions(){
  try {
    var res = await fetch('/api/chat/sessions');
    sessions = await res.json();
    var list = document.getElementById('chat-sessions-list');
    if(!sessions.length){
      list.innerHTML = '<div style="padding:8px 12px;font-size:11px;color:var(--gray-2)">Noch keine Chats</div>';
      return;
    }
    list.innerHTML = sessions.map(function(s){
      var date = new Date(s.updated_at).toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});
      return '<div class="chat-session-item'+(s.id===currentSessionId?' active':'')+'" data-id="'+s.id+'">'
           +   '<span class="si-title">'+s.title+'</span>'
           +   '<span class="si-date">'+date+'</span>'
           +   '<button class="chat-session-del" data-id="'+s.id+'">✕</button>'
           + '</div>';
    }).join('');

    list.querySelectorAll('.chat-session-item').forEach(function(el){
      el.addEventListener('click', function(e){
        if(e.target.classList.contains('chat-session-del')) return;
        loadSession(parseInt(el.dataset.id));
        document.getElementById('chat-sessions-bar').classList.remove('open');
      });
    });
    list.querySelectorAll('.chat-session-del').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        deleteSession(parseInt(btn.dataset.id));
      });
    });

  } catch(err){ console.error('Sessions laden:', err); }
}

async function newSession(){
  var ctx = getPortfolioContext();
  try {
    var res = await fetch('/api/chat/sessions',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({orientationName: ctx.orientationName})
    });
    var session = await res.json();
    currentSessionId = session.id;
    clearMessages();
    document.getElementById('chat-sessions-bar').classList.remove('open');
    document.getElementById('chat-header-title').textContent = 'Neuer Chat';
    await loadSessions();
  } catch(err){ console.error('Neue Session:', err); }
}

async function loadSession(id){
  try {
    var res = await fetch('/api/chat/sessions/'+id);
    var data = await res.json();
    currentSessionId = id;
    clearMessages();
    document.getElementById('chat-header-title').textContent = data.session.title;
    data.messages.forEach(function(m){
      appendMessage(m.role, m.content, new Date(m.created_at));
    });
    scrollToBottom();
    await loadSessions();
  } catch(err){ console.error('Session laden:', err); }
}

async function deleteSession(id){
  if(!confirm('Chat löschen?')) return;
  try {
    await fetch('/api/chat/sessions/'+id, {method:'DELETE'});
    if(currentSessionId === id){
      currentSessionId = null;
      clearMessages();
      document.getElementById('chat-header-title').textContent = 'Portfolio-Assistent';
    }
    await loadSessions();
  } catch(err){ console.error('Session löschen:', err); }
}

/* ── Nachrichten ─────────────────────────────────────────── */
function clearMessages(){
  var el = document.getElementById('chat-messages');
  el.innerHTML = '<div class="chat-empty" id="chat-empty">'
               + '<div class="ce-icon">◈</div>'
               + '<div class="ce-text">Stell mir eine Frage zur aktuellen Portfolio-Ausrichtung.</div>'
               + '</div>';
}

function appendMessage(role, content, time){
  var empty = document.getElementById('chat-empty');
  if(empty) empty.remove();

  var el = document.getElementById('chat-messages');
  var div = document.createElement('div');
  div.className = 'chat-msg '+role;

  var timeStr = (time||new Date()).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});
  var html = markdownToHtml(content);

  div.innerHTML = '<div class="chat-bubble">'+html+'</div>'
                + '<div class="chat-time">'+timeStr+'</div>';
  el.appendChild(div);
  scrollToBottom();
}

function markdownToHtml(text){
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/`([^`]+)`/g,'<code>$1</code>')
    .replace(/^### (.+)$/gm,'<strong>$1</strong>')
    .replace(/^## (.+)$/gm,'<strong>$1</strong>')
    .replace(/^- (.+)$/gm,'• $1')
    .replace(/\n\n/g,'<br><br>')
    .replace(/\n/g,'<br>');
}

function scrollToBottom(){
  var el = document.getElementById('chat-messages');
  el.scrollTop = el.scrollHeight;
}

/* ── Nachricht senden ────────────────────────────────────── */
async function sendMessage(text){
  var msg = (text || document.getElementById('chat-input').value).trim();
  if(!msg) return;

  document.getElementById('chat-input').value = '';
  document.getElementById('chat-send').disabled = true;

  // Neue Session falls keine aktiv
  if(!currentSessionId){
    await newSession();
  }

  appendMessage('user', msg);

  // Typing indicator
  var typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg assistant';
  typingDiv.id = 'chat-typing';
  typingDiv.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
  document.getElementById('chat-messages').appendChild(typingDiv);
  scrollToBottom();

  // Suggestions ausblenden während geladen
  document.getElementById('chat-suggestions').style.opacity = '0.3';

  try {
    var ctx = getPortfolioContext();
    var res = await fetch('/api/chat/sessions/'+currentSessionId+'/message',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({message:msg, context:ctx})
    });
    var data = await res.json();

    var typing = document.getElementById('chat-typing');
    if(typing) typing.remove();

    if(!res.ok) throw new Error(data.error||'Fehler');
    appendMessage('assistant', data.message);

    // Titel aktualisieren
    await loadSessions();
    var session = sessions.find(function(s){return s.id===currentSessionId;});
    if(session) document.getElementById('chat-header-title').textContent = session.title;

  } catch(err){
    var typing2 = document.getElementById('chat-typing');
    if(typing2) typing2.remove();
    appendMessage('assistant', '❌ Fehler: '+err.message);
  } finally {
    document.getElementById('chat-send').disabled = false;
    document.getElementById('chat-suggestions').style.opacity = '1';
  }
}

document.getElementById('chat-send').addEventListener('click', function(){
  sendMessage();
});

document.getElementById('chat-input').addEventListener('keydown', function(e){
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    sendMessage();
  }
});

// Textarea auto-resize
document.getElementById('chat-input').addEventListener('input', function(){
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
});

/* ── Auf Ausrichtungswechsel reagieren ─────────────────── */
window.chatWidgetOnOrientationChange = function(o){
  // Header aktualisieren
  document.getElementById('chat-header-sub').textContent = o.name + ' · KI-Berater';

  // Suggestions neu rendern wenn Panel offen
  if(panelOpen){
    renderSuggestions();
  }

  // Hinweis-Nachricht im offenen Chat anzeigen
  if(panelOpen && currentSessionId){
    var hint = document.createElement('div');
    hint.style.cssText = 'text-align:center;padding:6px 12px;margin:4px 0;font-family:var(--mono);font-size:10px;color:var(--ki);background:rgba(155,140,255,.08);border-radius:6px;letter-spacing:.04em';
    hint.textContent = '◈ Ausrichtung gewechselt zu "' + o.name + '"';
    document.getElementById('chat-messages').appendChild(hint);
    scrollToBottom();
  }
};

/* ── Initial laden ───────────────────────────────────────── */
loadSessions();

})();
