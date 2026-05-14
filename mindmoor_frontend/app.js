/* MindMoor — Application JavaScript */

/* ══ PAGE MAP (real navigation) ══ */
const PAGE_MAP = {
  home:'home.html', diary:'diary.html', sessions:'sessions.html',
  chat:'chat.html', articles:'articles.html', activities:'activities.html',
  community:'community.html', emergency:'emergency.html',
  medications:'medications.html', milestones:'milestones.html', profile:'profile.html'
};
const PAGE_TITLES = {
  home:'Início', diary:'Diário', sessions:'Sessões', chat:'Conversa',
  articles:'Artigos', activities:'Atividades', community:'Comunidade',
  emergency:'Apoio imediato', medications:'Medicações', milestones:'Conquistas', profile:'Perfil'
};
function goTo(id){ if(PAGE_MAP[id]) window.location.href=PAGE_MAP[id]; }

/* ══ AUTH ══ */
function showAuth(id){
  document.querySelectorAll('.auth-screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function codeNext(el,idx){
  const d=document.querySelectorAll('.code-digit');
  if(el.value&&idx<5)d[idx+1].focus();
  let c='';d.forEach(x=>c+=x.value);
  if(c.length===6)setTimeout(validateCode,300);
}
function codeBack(e,el,idx){
  const d=document.querySelectorAll('.code-digit');
  if(e.key==='Backspace'&&!el.value&&idx>0)d[idx-1].focus();
}
function validateCode(){
  const d=document.querySelectorAll('.code-digit');
  let c='';d.forEach(x=>c+=x.value.toUpperCase());
  if(c==='MM2025'||c.length===6){
    toast('Código válido! Crie sua conta.');
    setTimeout(()=>showAuth('auth-register'),500);
  } else {
    toast('Código inválido. Use MM2025 para demo.');
    d.forEach(x=>x.style.borderColor='var(--r500)');
    setTimeout(()=>d.forEach(x=>x.style.borderColor=''),1500);
  }
}
function regNext(step){
  [1,2,3].forEach(n=>{const e=document.getElementById('reg-step'+n);if(e)e.style.display=n===step?'block':'none';});
  ['sd1','sd2','sd3'].forEach((id,i)=>{const e=document.getElementById(id);if(e)e.className='step-dot'+(i+1<step?' done':i+1===step?' active':'');});
  const titles=['','Criar sua conta','Sobre você','Termos de uso'];
  const subs=['','Código verificado! Crie seu acesso pessoal.','Nos conte mais sobre você.','Leia antes de continuar.'];
  const t=document.getElementById('reg-title');const s=document.getElementById('reg-sub');
  if(t)t.textContent=titles[step];if(s)s.textContent=subs[step];
}
function finishRegister(){
  const cb=document.getElementById('terms-cb');
  if(!cb||!cb.checked){toast('Aceite os termos para continuar.');return;}
  toast('Conta criada! Bem-vinda 🌱');
  setTimeout(()=>window.location.href='home.html',1000);
}
function enterApp(){ window.location.href='home.html'; }
function logout(){ if(confirm('Deseja sair da sua conta?')) window.location.href='index.html'; }

/* ══ SIDEBAR ACTIVE STATE ══ */
document.addEventListener('DOMContentLoaded',function(){
  const page=window.location.pathname.split('/').pop().replace('.html','');
  const nl=document.getElementById('nav-'+page);if(nl)nl.classList.add('active');
  const tb=document.getElementById('page-title');if(tb)tb.textContent=PAGE_TITLES[page]||'';
  document.querySelectorAll('.modal-bg').forEach(bg=>{
    bg.addEventListener('click',function(e){if(e.target===this)closeModal(this.id);});
  });
});

/* ══ MOOD ══ */
function selMc(el){document.querySelectorAll('.mood-row .mc').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');}
function selMcDiary(el){el.closest('.card').querySelectorAll('.mc').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');}
function saveMoodDash(){const n=document.getElementById('mood-note');toast('Humor registrado!'+(n&&n.value?' 📝':''));if(n)n.value='';}

/* ══ DIARY ══ */
function saveDiaryEntry(){
  const ta=document.getElementById('diary-ta');
  if(!ta||!ta.value.trim()){toast('Escreva algo primeiro...');return;}
  const sel=document.querySelector('.mc.sel span');
  const emoji=sel?sel.textContent:'😐';
  const e=document.createElement('div');e.className='diary-entry';
  e.innerHTML=`<div class="de-top"><span class="de-emoji">${emoji}</span><span class="de-date">Hoje</span></div><div class="de-text">${ta.value.trim()}</div>`;
  const list=document.getElementById('diary-list');if(list)list.insertBefore(e,list.firstChild);
  ta.value='';toast('Reflexão salva! 🌱');incrementMilestone('diary_entries');
}

/* ══ COMMUNITY ══ */
function tgLike(btnId,cntId){
  const btn=document.getElementById(btnId),cnt=document.getElementById(cntId);
  if(!btn||!cnt)return;const l=btn.classList.toggle('liked');
  cnt.textContent=parseInt(cnt.textContent)+(l?1:-1);
}
function tgR(id){const el=document.getElementById(id);if(el)el.classList.toggle('open');}
function sendReply(secId,inId){
  const inp=document.getElementById(inId);if(!inp||!inp.value.trim())return;
  const sec=document.getElementById(secId);
  const item=document.createElement('div');item.className='reply-item';
  item.innerHTML=`<div class="reply-av" style="background:var(--b50);color:var(--b700);">AP</div><div class="reply-bub"><div class="reply-auth">Você</div><div class="reply-txt">${inp.value.trim()}</div></div>`;
  const row=sec.querySelector('.reply-row');if(row)sec.insertBefore(item,row);
  inp.value='';toast('Resposta enviada 💙');incrementMilestone('community_posts');
}
function submitPost(){
  const ta=document.getElementById('new-post-ta');
  const topicEl=document.getElementById('new-post-topic');
  if(!ta||!ta.value.trim()){toast('Escreva algo antes de publicar');return;}
  const topic=topicEl?topicEl.value:'';
  const feed=document.querySelector('.g-comm > div:first-child');if(!feed)return;
  const pid='pc-'+Date.now();const lid='l'+pid;const cid='c'+pid;const rid='r'+pid;const rii='ri'+pid;
  const badge=topic?`<span class="badge badge-purple">${topic}</span>`:'';
  const p=document.createElement('div');p.className='post-card';
  p.innerHTML=`<div class="post-top"><div class="post-av" style="background:var(--b50);color:var(--b700);">AP</div><div class="post-meta"><div class="post-author">Ana Paula (você)</div><div class="post-time">agora</div></div>${badge}</div><div class="post-text">${ta.value.trim()}</div><div class="post-actions"><button class="pa" id="${lid}" onclick="tgLike('${lid}','${cid}')"><svg viewBox="0 0 14 14"><path d="M7 12s-5-3.6-5-7a5 5 0 0110 0c0 3.4-5 7-5 7z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg><span id="${cid}">0</span></button><button class="pa" onclick="tgR('${rid}')"><svg viewBox="0 0 14 14"><path d="M2 2h10v8H8l-2 2-2-2H2V2z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>0 respostas</button></div><div class="replies-section" id="${rid}"><div class="reply-row"><input class="reply-in" id="${rii}" placeholder="Respostas..."/><button class="reply-send" onclick="sendReply('${rid}','${rii}')">Enviar</button></div></div>`;
  const banner=feed.querySelector('.mod-banner');if(banner)feed.insertBefore(p,banner.nextSibling);
  ta.value='';if(topicEl)topicEl.value='';toast('Publicado! 🌟');
}
function filterChip(el){
  const parent=el.closest('.card,.g-comm,.screen');
  if(parent)parent.querySelectorAll('.topic-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');toast('Filtrando: '+el.textContent.trim());
}

/* ══ CHAT ══ */
function sendChat(){
  const inp=document.getElementById('chat-input');if(!inp||!inp.value.trim())return;
  const msgs=document.getElementById('chat-msgs');
  const now=new Date();const t=now.getHours()+':'+String(now.getMinutes()).padStart(2,'0');
  const m=document.createElement('div');m.className='msg me';
  m.innerHTML=`<div class="msg-avatar" style="background:var(--b50);color:var(--b700);">AP</div><div><div class="msg-bubble">${inp.value.trim()}</div><div class="msg-time">${t}</div></div>`;
  msgs.appendChild(m);msgs.scrollTop=msgs.scrollHeight;inp.value='';
  setTimeout(()=>{
    const r=document.createElement('div');r.className='msg them';
    r.innerHTML=`<div class="msg-avatar" style="background:var(--p50);color:var(--p700);">CR</div><div><div class="msg-bubble">Obrigada por compartilhar, Ana. Continuamos na sexta! 🌱</div><div class="msg-time">${t}</div></div>`;
    msgs.appendChild(r);msgs.scrollTop=msgs.scrollHeight;
  },1800);
}
function selectChat(who){
  document.querySelectorAll('.chat-contact').forEach(c=>c.classList.remove('active'));
  event.currentTarget.classList.add('active');
  const av=document.getElementById('chat-avatar');const nm=document.getElementById('chat-name');const st=document.getElementById('chat-status');
  if(who==='clinica'){if(av){av.textContent='BE';av.style.background='var(--b50)';}if(nm)nm.textContent='Clínica Bem-Estar SP';if(st)st.textContent='Atendimento em horário comercial';}
  else{if(av){av.innerHTML='CR<div class="cc-online"></div>';av.style.background='var(--p50)';}if(nm)nm.textContent='Dra. Camila Rocha';if(st)st.textContent='Online agora · CRP 06/12345';}
}

/* ══ ARTICLES ══ */
const articles=[
  {title:'Respiração consciente e o sistema nervoso',tag:'Ansiedade',tagClass:'badge-blue',gradient:'linear-gradient(135deg,#2563EB,#7C3AED)',content:`<p>A respiração diafragmática lenta é uma das ferramentas mais poderosas para regular o sistema nervoso autônomo.</p><h3>O papel do nervo vago</h3><p>Ao expirar mais longamente, enviamos um sinal de segurança ao cérebro, ativando o sistema parassimpático.</p><h3>A técnica 4-7-8</h3><p>Inspire por 4 segundos, segure por 7, expire por 8. Reduz ansiedade, melhora o sono e aumenta tolerância ao estresse.</p>`},
  {title:'Autocompaixão: o antídoto para a autocrítica',tag:'Autoestima',tagClass:'badge-teal',gradient:'linear-gradient(135deg,#14B8A6,#22C55E)',content:`<p>A autocrítica excessiva está associada a maior ansiedade e procrastinação.</p><h3>Como praticar</h3><p>Na próxima vez que cometer um erro, pergunte: "O que eu diria a um amigo querido?" Diga isso para si mesmo.</p>`},
  {title:'Comunicação não-violenta nos vínculos',tag:'Relacionamentos',tagClass:'badge-amber',gradient:'linear-gradient(135deg,#F59E0B,#EF4444)',content:`<p>A CNV é baseada em quatro componentes: observação, sentimento, necessidade e pedido.</p><h3>Na prática</h3><p>Em vez de acusar, expresse o que sente e o que precisa. Essa mudança transforma relações.</p>`},
  {title:'Síndrome de burnout: identificar e prevenir',tag:'Trabalho',tagClass:'badge-purple',gradient:'linear-gradient(135deg,#334155,#64748B)',content:`<p>Burnout: exaustão emocional, despersonalização e ineficácia. Reconhecido pela OMS como fenômeno ocupacional.</p><h3>O que fazer</h3><p>Estabelecer limites, recuperar atividades prazerosas e buscar suporte terapêutico são os pilares.</p>`},
  {title:'Higiene do sono: rituais que funcionam',tag:'Sono',tagClass:'badge-blue',gradient:'linear-gradient(135deg,#1D4ED8,#0D9488)',content:`<p>Horário consistente de acordar é a intervenção mais poderosa. Evite telas 30-60min antes de dormir. Quarto entre 18-21°C.</p>`},
  {title:'O corpo guarda o trauma',tag:'Trauma',tagClass:'badge-red',gradient:'linear-gradient(135deg,#8B5CF6,#EF4444)',content:`<p>O trauma se aloja no corpo como tensão crônica. EMDR, terapia somática e ioga terapêutica trabalham especificamente com isso.</p>`}
];
function openArticle(idx){
  const a=articles[idx];const overlay=document.getElementById('art-detail-overlay');if(!overlay)return;
  document.getElementById('art-detail-header').style.background=a.gradient;
  document.getElementById('art-detail-body').innerHTML=`<span class="badge ${a.tagClass} art-detail-tag">${a.tag}</span><div class="art-detail-title">${a.title}</div><div class="art-detail-text">${a.content}</div>`;
  overlay.classList.add('open');
}
function closeArticle(){const o=document.getElementById('art-detail-overlay');if(o)o.classList.remove('open');}

/* ══ ACTIVITIES ══ */
const activityContent={
  breath:`<div class="modal-title">Respiração 4-7-8</div><div class="modal-sub">Clique no círculo para começar.</div><div class="breath-circle" id="act-circ" onclick="startBreathAct()" style="margin:0 auto 10px;"><span id="act-txt">clique</span></div><div class="breath-timer" id="act-timer">0</div><div class="breath-phase" id="act-phase">Inspire 4 · segure 7 · expire 8</div><button class="btn btn-primary btn-full" onclick="startBreathAct()">Iniciar</button>`,
  grounding:`<div class="modal-title">Grounding 5-4-3-2-1</div><div class="modal-sub">Responda para ancorar-se no presente.</div><div class="grounding-step"><div class="gs-num">👁️ 5 coisas que você vê</div><input class="gs-input" placeholder="planta, janela, caneca..."></div><div class="grounding-step"><div class="gs-num">✋ 4 coisas que você toca</div><input class="gs-input" placeholder="mesa, roupa..."></div><div class="grounding-step"><div class="gs-num">👂 3 coisas que você ouve</div><input class="gs-input" placeholder="ventilador, vozes..."></div><button class="btn btn-primary btn-full" style="margin-top:12px;" onclick="toast('Exercício concluído!');closeModal('activity-modal');">Concluir ✓</button>`,
  relax:`<div class="modal-title">Relaxamento muscular</div><div class="modal-sub">Tensione por 5s, relaxe por 10s.</div><div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;"><div style="padding:10px 14px;border-radius:var(--rr);background:var(--b50);border-left:3px solid var(--b400);font-size:13px;">1. Pés e panturrilhas</div><div style="padding:10px 14px;border-radius:var(--rr);background:var(--s50);border-left:3px solid var(--s300);font-size:13px;">2. Coxas e glúteos</div><div style="padding:10px 14px;border-radius:var(--rr);background:var(--s50);border-left:3px solid var(--s300);font-size:13px;">3. Abdômen</div><div style="padding:10px 14px;border-radius:var(--rr);background:var(--s50);border-left:3px solid var(--s300);font-size:13px;">4. Mãos e braços</div><div style="padding:10px 14px;border-radius:var(--rr);background:var(--s50);border-left:3px solid var(--s300);font-size:13px;">5. Ombros e pescoço</div><div style="padding:10px 14px;border-radius:var(--rr);background:var(--s50);border-left:3px solid var(--s300);font-size:13px;">6. Rosto</div></div><button class="btn btn-primary btn-full" onclick="toast('Concluído! 🌿');closeModal('activity-modal');incrementMilestone('activities_done');">Concluir ✓</button>`,
  compassion:`<div class="modal-title">Autocompaixão</div><div class="modal-sub">Leia com gentileza.</div><div style="background:var(--r50);border-radius:var(--rl);padding:20px;margin-bottom:16px;text-align:center;"><p style="font-family:var(--fd);font-size:15px;color:var(--s800);line-height:1.9;font-style:italic;">"Que eu seja gentil comigo mesmo(a).<br>Que eu aceite que sofrimento faz parte da vida.<br>Que eu me dê o que preciso agora.<br>Que eu esteja bem."</p></div><textarea class="finput ftextarea" placeholder="O que você diria a um amigo nessa situação?" style="min-height:80px;margin-bottom:12px;"></textarea><button class="btn btn-primary btn-full" onclick="toast('Prática concluída 💙');closeModal('activity-modal');incrementMilestone('activities_done');">Concluir ✓</button>`,
  meditation:`<div class="modal-title">Meditação Guiada</div><div class="modal-sub">15 minutos de atenção plena.</div><div style="background:var(--p50);border-radius:var(--rl);padding:16px;margin-bottom:14px;font-size:13px;color:var(--p700);line-height:1.8;">1. Coluna ereta, corpo relaxado.<br>2. Feche os olhos.<br>3. Observe sua respiração.<br>4. Quando um pensamento surgir, note e volte.</div><div style="text-align:center;margin-bottom:16px;"><div style="font-family:var(--fd);font-size:36px;color:var(--s900);" id="med-timer">15:00</div><div style="font-size:12px;color:var(--s400);">tempo restante</div></div><button class="btn btn-primary btn-full" id="med-btn" onclick="startMeditation()">Iniciar meditação</button>`,
  journal:`<div class="modal-title">Escrita Terapêutica</div><div class="modal-sub">Escreva sem censura por 10-15 minutos.</div><div style="background:var(--t50);border-radius:var(--rr);padding:12px 14px;margin-bottom:14px;font-size:12px;color:var(--t700);border-left:3px solid var(--t500);">Prompt: "Descreva um sentimento que você ainda não colocou em palavras."</div><textarea class="finput ftextarea" placeholder="Escreva aqui livremente..." style="min-height:160px;margin-bottom:12px;"></textarea><button class="btn btn-primary btn-full" onclick="toast('Salvo! ✍️');closeModal('activity-modal');incrementMilestone('activities_done');">Salvar ✓</button>`
};
function openActivity(type){const b=document.getElementById('act-modal-body');if(b)b.innerHTML=activityContent[type]||'';openModal('activity-modal');}

/* ══ BREATHING ══ */
const PHASES=[{t:'inspirar',d:4},{t:'segurar',d:7},{t:'expirar',d:8},{t:'pausar',d:2}];
let breathState={active:false,idx:0,timer:null};
function runBreath(circId,timerId,phaseId){
  if(!breathState.active)return;
  const p=PHASES[breathState.idx];const c=document.getElementById(circId);const t=document.getElementById(timerId);const ph=document.getElementById(phaseId);
  if(!c)return;const sp=c.querySelector('span');if(sp)sp.textContent=p.t;else c.textContent=p.t;
  c.classList.toggle('exp',p.t==='inspirar'||p.t==='segurar');
  if(t)t.textContent=p.d;if(ph)ph.textContent=p.t.charAt(0).toUpperCase()+p.t.slice(1)+' por '+p.d+'s';
  let cd=p.d;const iv=setInterval(()=>{cd--;if(t&&t.isConnected)t.textContent=cd;if(cd<=0){clearInterval(iv);breathState.idx=(breathState.idx+1)%4;if(breathState.active)runBreath(circId,timerId,phaseId);}},1000);
  breathState.timer=iv;
}
function startBreathModal(){clearInterval(breathState.timer);breathState.active=true;breathState.idx=0;runBreath('bm-circ','bm-timer','bm-phase');}
function startBreathAct(){clearInterval(breathState.timer);breathState.active=true;breathState.idx=0;runBreath('act-circ','act-timer','act-phase');}
let emBreath={active:false,idx:0,timer:null};
function toggleEmBreath(){
  if(!emBreath.active){emBreath.active=true;emBreath.idx=0;runEmBreath();}
  else{emBreath.active=false;clearTimeout(emBreath.timer);const c=document.getElementById('em-circ');const t=document.getElementById('em-circ-txt');if(c)c.classList.remove('exp');if(t)t.textContent='clique para começar';}
}
function runEmBreath(){if(!emBreath.active)return;const p=PHASES[emBreath.idx];const el=document.getElementById('em-circ');const txt=document.getElementById('em-circ-txt');if(txt)txt.textContent=p.t;if(el)el.classList.toggle('exp',p.t==='inspirar'||p.t==='segurar');emBreath.idx=(emBreath.idx+1)%4;emBreath.timer=setTimeout(runEmBreath,p.d*1000);}
let medActive=false,medSec=900,medIv=null;
function startMeditation(){if(medActive)return;medActive=true;const btn=document.getElementById('med-btn');if(btn)btn.textContent='Em andamento...';medIv=setInterval(()=>{medSec--;const el=document.getElementById('med-timer');if(el){const m=Math.floor(medSec/60),s=medSec%60;el.textContent=m+':'+String(s).padStart(2,'0');}if(medSec<=0){clearInterval(medIv);medActive=false;toast('Meditação concluída! 🧘');closeModal('activity-modal');incrementMilestone('activities_done');}},1000);}

/* ══ MODALS ══ */
function openModal(id){const el=document.getElementById(id);if(el)el.classList.add('open');if(id==='breath-modal'){breathState.active=false;clearInterval(breathState.timer);const bt=document.getElementById('bm-timer');if(bt)bt.textContent='0';const bp=document.getElementById('bm-phase');if(bp)bp.textContent='Inspire 4 · segure 7 · expire 8';}}
function closeModal(id){const el=document.getElementById(id);if(el)el.classList.remove('open');breathState.active=false;clearInterval(breathState.timer);medActive=false;clearInterval(medIv);medSec=900;}

/* ══ TOAST ══ */
let toastTmr=null;
function toast(msg){const el=document.getElementById('toast-el');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(toastTmr);toastTmr=setTimeout(()=>el.classList.remove('show'),2800);}

/* ══ MEDICATIONS ══ */
function markMedTaken(){const btn=document.getElementById('med2-btn');const chip=document.getElementById('clona-chip');if(btn){btn.textContent='✓ Tomado';btn.classList.add('checked');}if(chip){chip.textContent='✓ 22:00 — tomada';chip.classList.add('taken');}toast('Medicação registrada! ✓');setTimeout(()=>celebrate('💊','Constância: 88% — quase lá!'),600);}
function addMedication(){const name=document.getElementById('new-med-name');closeModal('add-med-modal');toast((name?name.value||'Nova medicação':'Nova medicação')+' adicionada! 💊');}
function saveEffect(){closeModal('add-effect-modal');toast('Efeito enviado à Dra. Camila 📋');}
function selIntensity(btn){const btns=document.getElementById('intensity-btns');if(btns)btns.querySelectorAll('button').forEach(b=>{b.style.borderColor='var(--s200)';b.style.background='#fff';b.style.color='var(--s600)';});btn.style.borderColor='var(--b500)';btn.style.background='var(--b50)';btn.style.color='var(--b700)';}

/* ══ CELEBRATIONS ══ */
let celTmr=null;
function celebrate(emoji,msg){const el=document.getElementById('celebration-toast');const em=document.getElementById('cel-emoji');const ms=document.getElementById('cel-msg');if(!el)return;if(em)em.textContent=emoji;if(ms)ms.textContent=msg;el.classList.add('show');clearTimeout(celTmr);celTmr=setTimeout(()=>el.classList.remove('show'),4200);}
// celebrations triggered by user actions only


/* ══ MILESTONE TRACKER ══ */
// State stored in localStorage so it persists across pages
function getMilestoneState(){
  try{ return JSON.parse(localStorage.getItem('mm_milestones')||'{}'); }
  catch(e){ return {}; }
}
function saveMilestoneState(state){
  try{ localStorage.setItem('mm_milestones', JSON.stringify(state)); }
  catch(e){}
}

// Counter keys and their unlock thresholds
const MILESTONES = {
  diary_entries:   { key:'ms-cronista',    threshold:20,  emoji:'✍️',  name:'Cronista',         label:'entradas no diário' },
  activities_done: { key:'ms-pratica',     threshold:10,  emoji:'🧘',  name:'Prática constante', label:'atividades concluídas' },
  community_posts: { key:'ms-apoio',       threshold:10,  emoji:'💛',  name:'Apoio mútuo',       label:'respostas na comunidade' },
};

// Increment a counter and check if milestone is reached
function incrementMilestone(type){
  const ms = MILESTONES[type];
  if(!ms) return;
  const state = getMilestoneState();
  const current = (state[type] || 0) + 1;
  state[type] = current;
  saveMilestoneState(state);

  const pct = Math.min(100, Math.round((current / ms.threshold) * 100));

  // Update progress bar on milestones page if open
  const card = document.getElementById(ms.key);
  if(card){
    const fill = card.querySelector('.ms-prog-fill');
    const lbl  = card.querySelector('.ms-prog-lbl');
    if(fill) fill.style.width = pct + '%';
    if(lbl)  lbl.textContent = current + ' de ' + ms.threshold + ' ' + ms.label;

    if(current >= ms.threshold && card.classList.contains('locked')){
      unlockMilestone(card, ms);
    }
  }

  // Check unlock even if not on milestones page
  if(current >= ms.threshold){
    if(!state[ms.key + '_unlocked']){
      state[ms.key + '_unlocked'] = true;
      saveMilestoneState(state);
      celebrate(ms.emoji, '🎉 Conquista desbloqueada: ' + ms.name + '!');
    }
  } else if(current === ms.threshold - 2){
    celebrate(ms.emoji, 'Faltam só 2 para a conquista ' + ms.name + '!');
  } else if(current === ms.threshold - 1){
    celebrate(ms.emoji, 'Mais 1 para desbloquear ' + ms.name + '!');
  }
}

function unlockMilestone(card, ms){
  card.classList.remove('locked');
  card.classList.add('unlocked');
  // Replace progress bar with date
  const prog = card.querySelector('.ms-prog-bar');
  const lbl  = card.querySelector('.ms-prog-lbl');
  if(prog) prog.remove();
  if(lbl){
    const today = new Date();
    lbl.textContent = 'Conquistado hoje, ' + today.getDate() + '/' + String(today.getMonth()+1).padStart(2,'0');
    lbl.style.color = 'var(--a600)';
    lbl.style.fontWeight = '600';
    lbl.style.fontSize = '10px';
  }
}

// Load state and update milestones page on load
document.addEventListener('DOMContentLoaded', function(){
  const state = getMilestoneState();
  const page = window.location.pathname.split('/').pop();

  Object.entries(MILESTONES).forEach(function([type, ms]){
    const current = state[type] || 0;
    // Restore unlocked state
    if(state[ms.key + '_unlocked']){
      const card = document.getElementById(ms.key);
      if(card && card.classList.contains('locked')) unlockMilestone(card, ms);
      return;
    }
    // Restore progress
    if(current > 0){
      const card = document.getElementById(ms.key);
      if(!card) return;
      const fill = card.querySelector('.ms-prog-fill');
      const lbl  = card.querySelector('.ms-prog-lbl');
      const pct  = Math.min(100, Math.round((current / ms.threshold) * 100));
      if(fill) fill.style.width = pct + '%';
      if(lbl)  lbl.textContent = current + ' de ' + ms.threshold + ' ' + ms.label;
    }
  });
});
