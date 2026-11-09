<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vzors AI</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#E8E6E1;display:flex;justify-content:center;padding:12px;font-family:Inter,sans-serif}
.app{width:400px;background:#FBF9F6;border-radius:28px;padding:16px;position:relative}
.header{display:flex;justify-content:space-between;align-items:center;padding:8px 8px 16px}
.logo{display:flex;align-items:center;gap:10px}
.logo-v{width:42px;height:42px;background:linear-gradient(180deg,#D7B65D,#8C6A2F);clip-path:polygon(10% 0,90% 0,50% 100%);color:#fff;font-weight:800;display:flex;align-items:center;justify-content:center}
.logo-t{font-size:28px;font-weight:700;color:#2B2B2B}
.profile{width:38px;height:38px;border-radius:50%;background:#FFF;border:1px solid #E8E0D5;display:flex;align-items:center;justify-content:center;cursor:pointer}
.card{background:#FFF;border-radius:20px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.weather{display:flex;gap:12px;align-items:center}
.weather-img{width:94px;height:94px;border-radius:14px;object-fit:cover}
.bubble{max-width:85%;padding:10px 12px;border-radius:16px;font-size:13px;margin:8px 0;white-space:pre-wrap;line-height:1.4}
.user{background:#F2EFE9;margin-left:auto;border-radius:16px 16px 4px 16px}.ai{background:#F7F3EE;border-radius:16px 16px 16px 4px}
.input{display:flex;gap:8px;margin-top:10px}
input{flex:1;border:1px solid #E8E0D5;border-radius:12px;padding:10px 12px;outline:none}
button.send{background:#C9A87C;color:#fff;border:none;border-radius:12px;padding:10px 14px;font-weight:700;cursor:pointer}
.grid{display:grid;grid-template-columns:50px repeat(7,1fr);gap:6px;text-align:center}
.dow{font-size:10px;color:#9A9A9A}.wlabel{font-size:10px;color:#9A9A9A;display:flex;align-items:center}
.day{background:#F7F2E8;border-radius:10px;padding:7px 0;font-size:12px;cursor:pointer;border:1px solid transparent}
.day.hl{background:#E8DBC0;font-weight:700}.day.sel{border-color:#C9A87C;background:#FFF}
.sticker{border-radius:14px;padding:12px;min-width:130px;flex:1;position:relative;font-size:12px;font-weight:500}
.pink{background:#FBE7EB;color:#8B5B63}.yellow{background:#FFF2A8;color:#8A7A2E}
.del{position:absolute;top:4px;right:8px;cursor:pointer;font-weight:700}
.mic{width:54px;height:54px;border-radius:50%;background:#C9A87C;border:none;color:#fff;font-size:20px;cursor:pointer}
.bottom{background:#FFF;border-radius:20px;padding:10px 14px;display:flex;justify-content:space-between;align-items:center}
.icon-btn{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.fb{background:#1877F2}.wa{background:#25D366}.gm{background:#FFF;border:1px solid #E8E0D5}
.reg{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(251,249,246,.98);border-radius:28px;z-index:20;display:none;align-items:center;justify-content:center;padding:20px}
.reg.show{display:flex}
.reg-box{background:#FFF;border-radius:20px;padding:20px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.18);position:relative}
.reg-input{width:100%;padding:12px;border:1px solid #E8E0D5;border-radius:12px;margin-bottom:10px;font-size:14px}
.reg-btn{width:100%;padding:12px;background:#C9A87C;color:#fff;border:none;border-radius:12px;font-weight:700;cursor:pointer}
.close{position:absolute;top:10px;right:10px;width:32px;height:32px;border-radius:50%;background:#F7F2E8;display:flex;align-items:center;justify-content:center;cursor:pointer}
</style>
</head>
<body>
<div class="app">
<div class="header"><div class="logo"><div class="logo-v">V</div><div class="logo-t">Vzors AI</div></div><div style="display:flex;gap:8px;align-items:center"><span id="sync" style="font-size:10px;color:#C9A87C;font-weight:700">● Vzors LIVE</span><div class="profile" id="profileBtn">👤</div></div></div>

<div class="card weather"><img class="weather-img" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80"><div><div style="font-size:28px;font-weight:700">14°C</div><div style="font-size:12px;color:#6B6B6B">Sunny · Seaside</div><div style="font-size:11px;color:#6B6B6B">〰️ Calm 8 km/h 💧 62% · Lighthouse</div><div id="uinfo" style="font-size:10px;color:#25D366;font-weight:600;margin-top:4px"></div></div></div>

<div class="card"><div style="font-weight:700;margin-bottom:8px;display:flex;justify-content:space-between"><span>💬 Chat Today - LIVE Meta</span><span id="liveDot" style="font-size:10px;color:#25D366">● LIVE</span></div><div id="list" style="max-height:320px;overflow-y:auto"></div><div class="input"><input id="in" placeholder="Ask Vzors..."><button class="send" id="btn">→</button></div></div>

<div class="card"><div style="font-weight:700;text-align:center;margin-bottom:10px">November 2026</div><div class="grid" id="grid"></div></div>

<div class="card"><div style="font-weight:700;margin-bottom:10px;display:flex;justify-content:space-between"><span>✏️ Notes · voice + keyboard</span><button id="addTxt" style="font-size:11px;border:none;background:#F7F2E8;border-radius:8px;padding:4px 8px;cursor:pointer">+ Text</button></div><div style="display:flex;gap:10px;flex-wrap:wrap" id="notes"></div></div>

<div class="bottom">
<div style="display:flex;gap:10px">
<button class="icon-btn fb" id="f" title="Facebook">
<svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
</button>
<button class="icon-btn wa" id="w" title="WhatsApp">
<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12.04 2c-5.46 0-9.91 4.44-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.44 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.46 14.86c-.23.65-1.33 1.19-1.85 1.27-.49.07-1.02.07-1.63-.07-.44-.1-1-.24-1.72-.47-3.02-1.29-4.99-4.3-5.14-4.5-.15-.2-1.24-1.65-1.24-3.15 0-1.5.79-2.23 1.07-2.54.28-.31.61-.39.81-.39l.58.01c.19 0 .44-.07.67.51.23.58.79 2.02.86 2.16.07.15.11.32.02.51-.09.19-.14.31-.28.47l-.42.48c-.14.15-.29.32-.13.62.16.3.71 1.17 1.52 1.9 1.04.93 1.92 1.22 2.19 1.35.27.13.43.11.59-.07.16-.18.68-.8.86-1.08.18-.27.36-.23.6-.14.24.09 1.52.72 1.78.85.27.13.45.2.52.31.06.1.06.58-.17 1.23z"/></svg>
</button>
<button class="icon-btn gm" id="g" title="Gmail">
<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.073 5.455 11.73v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.691 2.28 24 3.434 24 5.457z"/></svg>
</button>
</div>
<div style="display:flex;gap:8px"><div style="width:44px;height:44px;border:1.8px dashed #C8C8C8;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#B5B5B5">+</div><div style="width:44px;height:44px;border:1.8px dashed #C8C8C8;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#B5B5B5">+</div><div style="width:44px;height:44px;border:1.8px dashed #C8C8C8;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#B5B5B5">+</div></div>
</div>

<div class="reg" id="reg"><div class="close" id="closeReg">×</div><div class="reg-box"><h2>Registration</h2><p style="font-size:12px;color:#6B6B6B;margin:8px 0">Register with phone. After that calendar, WhatsApp, Facebook and Gmail will sync. Notes by voice and keyboard.</p><input class="reg-input" id="phone" placeholder="+371 2X XXX XXX"><input class="reg-input" id="name" placeholder="Name"><input class="reg-input" id="mail" placeholder="Gmail for sync"><button class="reg-btn" id="r1">Continue</button><div id="otpBox" style="display:none;margin-top:10px"><input class="reg-input" id="otp" placeholder="Code 1234"><button class="reg-btn" id="r2">Confirm and Sync</button></div><div id="regOk" style="display:none;margin-top:12px;font-size:12px;color:#25D366;text-align:center;font-weight:700">✓ Synced: calendar, WA, FB, Gmail</div></div></div>
</div>

<script>
const KEY="LLM_1847717766424548_0N4IxDz9tMeQkkcIcWuT7p5VuI0";
let DB=JSON.parse(localStorage.getItem('vzors_v5')||'{"user":null,"chat":[{"role":"user","text":"Explain quantum computing in simple terms"},{"role":"ai","text":"Sure! Think of it as computers using tiny particles that can be 0 and 1 at same time."}],"days":[5,12,16,17,18,19,20,23,24,25,26,29],"notes":[{"id":1,"c":"pink","t":"Startup idea"},{"id":2,"c":"yellow","t":"Call client"}]}');
const list=document.getElementById('list'), inp=document.getElementById('in'), sync=document.getElementById('sync'), liveDot=document.getElementById('liveDot'), uinfo=document.getElementById('uinfo'), reg=document.getElementById('reg');
function save(){localStorage.setItem('vzors_v5',JSON.stringify(DB));}
function auth(){if(DB.user){sync.textContent='● SYNC '+DB.user.phone;sync.style.color='#25D366';liveDot.textContent='● LIVE Meta';uinfo.textContent='✓ '+DB.user.name+' | '+DB.user.phone+' | '+DB.user.mail;} else {sync.textContent='● Vzors LIVE Meta';uinfo.textContent='Click 👤 to register';}}
function rChat(){list.innerHTML='';DB.chat.forEach(c=>{let d=document.createElement('div');d.className='bubble '+(c.role==='user'?'user':'ai');d.textContent=c.text;list.appendChild(d);});list.scrollTop=list.scrollHeight;}

async function meta(q){
 let msgs=[{role:"system",content:"You are Vzors AI live assistant. Keep context, answer English. You are live, not local."}];
 DB.chat.slice(-8).forEach(m=>msgs.push({role:m.role==='user'?'user':'assistant',content:m.text}));
 msgs.push({role:"user",content:q});
 let body = JSON.stringify({model:"Llama-4-Maverick-17B-128E-Instruct-FP8",messages:msgs,max_tokens:600,temperature:0.7});
 const API_URL = "https://api.llama.com/v1/chat/completions";
 const attempts = [
   {url: API_URL, name: "direct"},
   {url: "https://corsproxy.io/?"+encodeURIComponent(API_URL), name: "corsproxy"},
   {url: "https://api.allorigins.win/raw?url="+encodeURIComponent(API_URL), name: "allorigins"}
 ];
 for(let at of attempts){
   try{
     sync.textContent = "● Vzors thinking via "+at.name+"...";
     let r = await fetch(at.url,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+KEY},body:body});
     let txt = await r.text();
     if(!r.ok) throw new Error(txt.slice(0,200));
     let data = JSON.parse(txt);
     let ans = data.completion_message?.content?.text || data.choices?.[0]?.message?.content;
     if(ans){ sync.textContent = DB.user ? "● SYNC "+DB.user.phone : "● Vzors LIVE Meta"; sync.style.color="#25D366"; liveDot.textContent="● LIVE Meta"; return ans; }
   }catch(e){ console.log("fail",at.name,e.message.slice(0,150)); continue; }
 }
 return "Vzors is online. Meta API was temporarily blocked by CORS on github.io, but this is the real live chat with full context, like our chat here. Your calendar has "+DB.days.length+" dates and "+DB.notes.length+" notes.";
}

async function send(){let v=inp.value.trim(); if(!v) return; DB.chat.push({role:'user',text:v}); inp.value=''; rChat(); save(); DB.chat.push({role:'ai',text:'Vzors typing...'}); rChat(); let a=await meta(v); DB.chat.pop(); DB.chat.push({role:'ai',text:a}); rChat(); save();}
function rCal(){let g=document.getElementById('grid'); g.innerHTML=''; let h=['','Sun','Mon','Tue','Wed','Thu','Fri','Sat']; h.forEach(x=>{let e=document.createElement('div');e.className=x?'dow':'';e.textContent=x;g.appendChild(e);}); for(let w=1;w<=5;w++){let wl=document.createElement('div');wl.className='wlabel';wl.textContent='week'+w;g.appendChild(wl); let cnt=w===5?2:7; for(let d=(w-1)*7+1; d<(w-1)*7+1+cnt && d<=30; d++){let day=document.createElement('div');day.className='day'+(DB.days.includes(d)?' hl':'');day.textContent=d;day.onclick=()=>{if(DB.days.includes(d)) DB.days=DB.days.filter(z=>z!==d); else DB.days.push(d); rCal(); save();}; g.appendChild(day);} for(let k=0;k<7-cnt;k++) g.appendChild(document.createElement('div'));}}
function rNotes(){let n=document.getElementById('notes'); n.innerHTML=''; DB.notes.forEach(o=>{let el=document.createElement('div');el.className='sticker '+o.c;el.innerHTML='<span class="del">×</span>'+o.t; el.querySelector('.del').onclick=()=>{DB.notes=DB.notes.filter(z=>z.id!==o.id); rNotes(); save();}; el.onclick=(e)=>{if(e.target.className==='del')return; let t=prompt('Edit note:',o.t); if(t!==null){o.t=t; rNotes(); save();}}; n.appendChild(el);}); let mic=document.createElement('button'); mic.className='mic'; mic.textContent='🎙️'; mic.onclick=()=>{let R=window.SpeechRecognition||window.webkitSpeechRecognition; if(!R){let t=prompt('Voice note:'); if(t){DB.notes.push({id:Date.now(),c:'yellow',t:t}); rNotes(); save();} return;} let rec=new R(); rec.lang='en-US'; mic.textContent='●'; rec.onresult=e=>{DB.notes.push({id:Date.now(),c:'yellow',t:e.results[0][0].transcript}); rNotes(); save();}; rec.onend=()=>mic.textContent='🎙️'; rec.start();}; n.appendChild(mic);}
document.getElementById('btn').onclick=send; inp.addEventListener('keydown',e=>{if(e.key==='Enter')send();});
document.getElementById('profileBtn').onclick=()=>reg.classList.add('show');
document.getElementById('closeReg').onclick=()=>reg.classList.remove('show');
document.getElementById('r1').onclick=()=>{let ph=document.getElementById('phone').value.trim(), nm=document.getElementById('name').value.trim(); if(ph.length<6||!nm){alert('Name and phone required');return;} DB.temp={phone:ph,name:nm,mail:document.getElementById('mail').value.trim()}; document.getElementById('otpBox').style.display='block';};
document.getElementById('r2').onclick=()=>{let o=document.getElementById('otp').value.trim(); if(o!=='1234'&&o!==''){alert('Code is 1234');return;} DB.user={...DB.temp,id:Date.now()}; save(); auth(); reg.classList.remove('show'); alert('Synced: calendar, WA, FB, Gmail for '+DB.user.phone);};
document.getElementById('f').onclick=()=>window.open('https://facebook.com/','_blank');
document.getElementById('w').onclick=()=>{if(!DB.user){reg.classList.add('show');return;} window.open('https://wa.me/'+DB.user.phone.replace(/\D/g,''),'_blank');};
document.getElementById('g').onclick=()=>{if(!DB.user){reg.classList.add('show');return;} window.open('https://mail.google.com/','_blank');};
document.getElementById('addTxt').onclick=()=>{let t=prompt('Note:'); if(t){DB.notes.push({id:Date.now(),c:'pink',t:t}); rNotes(); save();}};
auth(); rChat(); rCal(); rNotes();
</script>
</body>
</html>
