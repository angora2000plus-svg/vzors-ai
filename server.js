<!DOCTYPE html>
<html lang="lv">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vzors AI Memory Manager</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<style>
:root{--bg:#f8f5ff;--card:#fff;--text:#1a1a2e;--accent:#7c5cff}
body{background:var(--bg);color:var(--text);margin:0;font-family:Inter,system-ui}
.app{max-width:420px;margin:0 auto;background:var(--card);min-height:100vh;padding-bottom:80px}
#map{height:320px;border-radius:16px;margin:0 16px}
.timeline{margin:12px 16px;background:#f8f5ff;border-radius:12px;padding:12px}
.timeline-item{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;border-bottom:1px solid #eee}
.bottom{position:fixed;bottom:0;left:50%;transform:translateX(-50%);max-width:420px;width:100%;background:#fff;display:flex;justify-content:space-around;padding:10px 0}
.bottom button.active{color:#7c5cff}
</style>
</head>
<body>
<div class="app">
<div style="display:flex;justify-content:space-between;padding:16px 20px">
<div>🌀 Vzors AI Memory Manager</div><div>LV EN</div></div>

<div style="margin:12px;background:#ede9ff;border-radius:16px;padding:14px;text-align:center">
<h2>Laipni lūdzam! Reģistrēties / Pieteikties</h2>
<button>Reģistrēties</button> <button>Pieteikties</button>
</div>

<h3 style="padding:0 16px">Ģeolokācija</h3>
<div id="map"></div>

<div class="timeline">
<div><b>Maršruta hronoloģija • Šodien, 12. okt</b></div>
<div class="timeline-item"><span>09:12 • Cafe Kluss</span><span>32 min • ☕</span></div>
<div class="timeline-item"><span>10:45 • Rīgas Doms</span><span>25 min • 📍</span></div>
<div class="timeline-item"><span>11:30 • Brīvības iela</span><span>15 min • 🔔</span></div>
<div>🔔 14:00 • Apmeklēt aptieku • 200 m • Atgādināt</div>
</div>

<div class="bottom"><button class="active">🏠 Sākums</button><button>💬 Čats</button><button>📝 Piezīmes</button><button>⚙️ Iestatījumi</button></div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
const map=L.map('map').setView([56.9496,24.1052],15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
const pts=[[56.951,24.097],[56.949,24.105],[56.9515,24.121]];
L.polyline(pts,{color:'#7c5cff',weight:4}).addTo(map);
L.marker(pts[0]).addTo(map).bindPopup("Cafe Kluss 09:12");
L.marker(pts[1]).addTo(map).bindPopup("Rīgas Doms 10:45");
L.marker(pts[2]).addTo(map).bindPopup("Brīvības iela 11:30");
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(p=>{
    L.marker([p.coords.latitude,p.coords.longitude]).addTo(map).bindPopup("Tu šeit - sinhronizēts").openPopup();
  });
}
</script>
</body>
</html>
