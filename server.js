<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vzors AI</title>
<style>
body{margin:0;background:#f3f6ff;font-family:Arial;display:flex;justify-content:center;min-height:100vh}
.wrap{width:390px;background:white;min-height:100vh;padding:24px;box-shadow:0 0 40px rgba(0,0,0,.06)}
h1{font-size:28px;margin:0} .pill{background:#eef2ff;padding:6px 12px;border-radius:20px;font-size:13px}
.card{border:1px solid #eee;border-radius:16px;padding:16px;margin-top:16px}
.btn{width:100%;background:#111;color:#fff;border:0;border-radius:12px;padding:14px;font-size:16px;cursor:pointer}
input{width:100%;box-sizing:border-box;padding:12px;border-radius:10px;border:1px solid #ddd;margin:8px 0}
#reg{position:fixed;inset:0;background:rgba(0,0,0,.4);display:none;align-items:center;justify-content:center;padding:20px}
#reg.open{display:flex} .box{background:white;border-radius:20px;padding:24px;width:100%;max-width:360px}
</style>
</head>
<body>
<div class="wrap">
<h1>Vzors AI</h1>
<div style="margin:8px 0"><span class="pill">14°C Рига</span> <span class="pill">LIVE Meta AI</span></div>
<p style="color:gray;font-size:14px">Твой личный AI: календарь, WA, FB, Gmail. Заметки голосом и текстом.</p>

<div class="card">
<b>Попробуй чат</b>
<div id="log" style="height:100px;overflow:auto;font-size:14px;margin:8px 0;background:#fafafa;padding:8px;border-radius:8px"></div>
<input id="q" placeholder="Напиши..."><button class="btn" onclick="go()">Отправить в Llama</button>
</div>

<button class="btn" style="margin-top:20px;background:#6c5cff" onclick="document.getElementById('reg').classList.add('open')">Войти / Регистрация →</button>
<p style="text-align:center;color:gray;font-size:12px;margin-top:20px">vzors-ai.vercel.app • СТРОГО вариант</p>
</div>

<div id="reg"><div class="box">
<h3>Регистрация Vzors</h3>
<p style="font-size:13px;color:gray">Телефон = синхронизация календаря, WA, FB, Gmail. Заметки голосом и текстом.</p>
<input placeholder="+371 2X XXX XXX"><input placeholder="Имя"><input placeholder="Gmail">
<button class="btn" onclick="document.getElementById('reg').classList.remove('open')">Продолжить</button>
<button onclick="document.getElementById('reg').classList.remove('open')" style="width:100%;margin-top:8px;background:none;border:none;color:gray">← Назад на фронт</button>
</div></div>

<script>
async function go(){
 let v=document.getElementById('q').value; let l=document.getElementById('log');
 if(!v) return; l.innerHTML+='<div>Ты: '+v+'</div>'; document.getElementById('q').value='';
 let r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:v})});
 let d=await r.json(); l.innerHTML+='<div><b>Vzors:</b> '+(d.reply||'нет ключа')+'</div>'; l.scrollTop=9999;
}
</script>
</body>
</html>
