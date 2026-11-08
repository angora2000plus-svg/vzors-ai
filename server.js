const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// CORS для фронта
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');
  if(req.method==='OPTIONS') return res.sendStatus(200);
  next();
});

// Inbox.lv CalDAV реальный прокси — обходит CORS браузера
app.post('/api/inbox/caldav', async (req,res)=>{
  const {email,password,month} = req.body;
  if(!email || !password) return res.status(400).json({error:'Need email and password'});
  try{
    const auth = Buffer.from(email+':'+password).toString('base64');
    const user = email.split('@')[0];
    const start = `${month}-01T00:00:00Z`;
    const end = `${month}-30T23:59:59Z`;
    
    // REPORT запрос к inbox.lv
    const reportUrl = `https://m.inbox.lv/caldav/${user}/calendar/`;
    const reportBody = `<?xml version="1.0" encoding="utf-8"?>
    <c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav">
      <d:prop><d:getetag/><c:calendar-data/></d:prop>
      <c:filter>
        <c:comp-filter name="VCALENDAR">
          <c:comp-filter name="VEVENT">
            <c:time-range start="${start}" end="${end}"/>
          </c:comp-filter>
        </c:comp-filter>
      </c:filter>
    </c:calendar-query>`;

    const resp = await fetch(reportUrl, {
      method:'REPORT',
      headers:{
        'Authorization':'Basic '+auth,
        'Content-Type':'application/xml',
        'Depth':'1'
      },
      body: reportBody
    });

    const icsText = await resp.text();
    
    // Простой парсер VEVENT
    let events = [];
    let regex = /BEGIN:VEVENT[\s\S]*?SUMMARY:(.*?)[\r\n][\s\S]*?DTSTART[^:]*:(\d{4})(\d{2})(\d{2})/g;
    let m;
    while((m = regex.exec(icsText)) !== null){
      events.push({day: parseInt(m[4],10), summary: m[1].trim()});
    }
    
    // Если пусто — попробуем .ics экспорт
    if(events.length===0){
      let icsExport = await fetch(`https://m.inbox.lv/caldav/${user}/calendar/?export`,{
        headers:{'Authorization':'Basic '+auth}
      });
      let txt = await icsExport.text();
      while((m = regex.exec(txt)) !== null){
        events.push({day: parseInt(m[4],10), summary: m[1].trim()});
      }
    }

    res.json({events, raw: icsText.slice(0,500)});
  }catch(e){
    console.error(e);
    res.status(500).json({error:e.message});
  }
});

// Health check для Vercel
app.get('/api/health', (req,res)=>res.json({ok:true, time: new Date()}));
app.get('/', (req,res)=>res.send('VZORS AI backend is running! Visit /api/health'));

module.exports = app;
