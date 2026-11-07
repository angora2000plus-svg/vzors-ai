<!DOCTYPE html>
<html lang="lv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vzors AI</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0f0f0f;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;min-height:100vh}
.top{height:56px;display:flex;align-items:center;justify-content:center;font-weight:800;letter-spacing:3px;background:#111;border-bottom:1px solid #222;font-size:18px}
.main{display:flex;flex:1}
.left{flex:1;padding:20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;align-content:start}
.note{background:#1c1c1c;border:1px solid #2a2a2a;border-radius:16px;padding:16px;min-height:140px;outline:none}
.note:focus{border-color:#555}
.right{width:320px;background:#141414;border-left:1px solid #222;padding:20px;display:flex;flex-direction:column;gap:20px}
.card{background:#1c1c1c;border:1px solid #2a2a2a;border-radius:16px;padding:16px}
.card h3{font-size:13px;opacity:.6;margin-bottom:10px;letter-spacing:1px}
.btn{width:100%;padding:12px;border-radius:12px;border:0;background:#fff;color:#000;font-weight:700;cursor:pointer}
.calendar{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;font-size:12px;text-align:center}
</style>
</head>
<body>

<div class="top">Vzors AI</div>

<div class="main">
  <div class="left">
    <div class="note" contenteditable="true">📌 Jauna piezīme... raksti šeit. Balss: spied 🎤</div>
    <div class="note" contenteditable="true"></div>
    <div class="note" contenteditable="true"></div>
    <div class="note" contenteditable="true"></div>
  </div>

  <div class="right">
    <div class="card">
      <h3>👓 BRILLES: Premium</h3>
      <p style="font-size:13px;opacity:.7">Nav savienotas</p>
      <button class="btn" style="margin-top:12px">Savienot brilles</button>
    </div>

    <div class="card">
      <h3>📅 KALENDĀRS</h3>
      <div class="calendar">
        <div>P</div><div>O</div><div>T</div><div>C</div><div>P</div><div>S</div><div>Sv</div>
        <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div>
      </div>
    </div>

    <div class="card">
      <h3>🎤 BALSS</h3>
      <button class="btn" onclick="startVoice()">🎤 Diktēt piezīmi</button>
    </div>
  </div>
</div>

<script>
function startVoice(){
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang='lv-LV';
  rec.onresult=e=>{
    document.querySelector('.note').innerText += ' ' + e.results[0][0].transcript;
  };
  rec.start();
}
</script>
</body>
</html>
