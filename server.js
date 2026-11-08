const express = require('express');
const app = express();
app.use(express.json());

// CORS
app.use((req,res,next)=>{
 res.header('Access-Control-Allow-Origin','*');
 res.header('Access-Control-Allow-Headers','Content-Type, Authorization');
 res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS');
 if(req.method==='OPTIONS') return res.sendStatus(200);
 next();
});

// Память клиентов: телефон -> токены Google
const clients = new Map();

// 1. РЕГИСТРАЦИЯ ПО ТЕЛЕФОНУ
app.post('/api/register', (req,res)=>{
  const { phone, name } = req.body;
  if(!phone) return res.status(400).json({error:'Need phone'});
  const id = phone.replace(/\D/g,'');
  clients.set(id, { phone, name, created: new Date(), googleTokens: null });
  res.json({ok:true, clientId:id});
});

// 2. ТВОЙ INBOX.LV - РАБОЧИЙ
app.post('/api/inbox/caldav', async (req,res)=>{
  const {email,password,month} = req.body;
  if(!email || !password) return res.status(400).json({error:'Need email and password'});
  try{
    const auth = Buffer.from(email+':'+password).toString('base64');
    const user = email.split('@')[0];
    const m = month || new Date().toISOString().slice(0,7);
    const start = `${m}-01T00:00:00Z`;
    const end = `${m}-30T23:59:59Z`;
    const reportUrl = `https://m.inbox.lv/caldav/${user}/calendar/`;
    const reportBody = `<?xml version="1.0" encoding="utf-8"?><c:calendar-query xmlns:d="DAV:" xmlns:c="urn:ietf:params:xml:ns:caldav"><d:prop><d:getetag/><c:calendar-data/></d:prop><c:filter><c:comp-filter name="VCALENDAR"><c:comp-filter name="VEVENT"><c:time-range start="${start}" end="${end}"/></c:comp-filter></c:comp-filter></c:filter></c:calendar-query>`;
    const resp = await fetch(reportUrl, { method:'REPORT', headers:{'Authorization':'Basic '+auth,'Content-Type':'application/xml','Depth':'1'}, body: reportBody });
    const icsText = await resp.text();
    let events = [];
    let regex = /BEGIN:VEVENT[\s\S]*?SUMMARY:(.*?)[\r\n][\s\S]*?DTSTART[^:]*:(\d{4})(\d{2})(\d{2})/g;
    let match;
    while((match = regex.exec(icsText)) !== null){ events.push({day: parseInt(match[4],10), summary: match[1].trim()}); }
    if(events.length===0){
      let icsExport = await fetch(`https://m.inbox.lv/caldav/${user}/calendar/?export`,{ headers:{'Authorization':'Basic '+auth}});
      let txt = await icsExport.text();
      while((match = regex.exec(txt)) !== null){ events.push({day: parseInt(match[4],10), summary: match[1].trim()}); }
    }
    res.json({events, raw: icsText.slice(0,500)});
  }catch(e){ console.error(e); res.status(500).json({error:e.message}); }
});

// 3. GOOGLE КАЛЕНДАРЬ - ДЛЯ КЛИЕНТА
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://vzors-ai.vercel.app/api/google/callback';

app.get('/api/google/auth', (req,res)=>{
  const clientId = req.query.clientId || 'default';
  if(!GOOGLE_CLIENT_ID) return res.status(500).send('Set GOOGLE_CLIENT_ID in Vercel');
  const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent&state=${clientId}`;
  res.redirect(url);
});

app.get('/api/google/callback', async (req,res)=>{
  const { code, state } = req.query;
  try{
    const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
      method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'},
      body: new URLSearchParams({ code, client_id: GOOGLE_CLIENT_ID, client_secret: GOOGLE_CLIENT_SECRET, redirect_uri: REDIRECT_URI, grant_type: 'authorization_code' })
    });
    const tokens = await tokenResp.json();
    if(tokens.error) return res.status(400).json(tokens);
    clients.set(state, { phone: state, googleTokens: tokens });
    res.send(`<h1>✅ Google подключен!</h1><p>Клиент: ${state}</p><p>Вернитесь в приложение VZORS.</p><script>setTimeout(()=>window.close(),4000)</script>`);
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.get('/api/google/events', async (req,res)=>{
  const c = clients.get(req.query.clientId);
  const token = c?.googleTokens?.access_token || req.query.access_token;
  if(!token) return res.status(400).json({error:'Need Google auth first'});
  const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime`, { headers:{'Authorization':'Bearer '+token}});
  const data = await r.json();
  res.json(data);
});

// Health
app.get('/api/health', (req,res)=>res.json({ok:true, time: new Date()}));
app.get('/', (req,res)=>res.send('VZORS AI backend is running! Inbox + Google + Phone ready'));

module.exports = app;
