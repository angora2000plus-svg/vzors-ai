# Vzors AI — Novembris ir klāt — Organizer Patch

Moonwhite #fdfdff breathing, star upper left no frame, black text on amethyst #d8b4fe.

## Kas ir šis patch?

Originalais `index.html` — chat bija tikai viens teksts Vzors AI. Šis patch pārveido **sirenevo pole** (`.chat`) par **organaizeru**:

### 📓 Piezīmes
- Textarea + 🎙️ Nadiktovatj (Web Speech API, lv-LV)
- Saglabājas `localStorage` key `vzors_organizer_notes`
- Paliek kamēr pati neizdzēsīsi (Delete poga), pārlāde nenodzēš

### ✉️ Pasts — filtrs
- **Atjaunājumi / Updates — TIKAI šie iet uz organaizeru:**
  - Duolingo — Flvia pобила rekord
  - Opera — jauna uzskaites ieraksts
- **Pirkumi / Promocijas — salocītas `<details>`:**
  - Quora Digest — pārcelta uz Rassylki pēc pieprasījuma (from:quora.com → Promotions)
  - Meshy, Lovable

Gmail filtrs ieteikums:
```
from:(quora.com) → Skip Inbox, Apply label Rassylki, Category Promotions
```

### 📅 Kalendārs
- Google Calendar 07.11–14.11: Duolingo daily 08:00 + Tēva diena 08.11, Lāčplēša 11.11, Latvijas proklamēšana 18.11 (brīvdiena)

## Faili
- `index.html` — final versija (šis ir `index_organizer.html` pārdēvēts)
- `index_original.html` — originals pirms patch
- `PATCH_NOTES.txt` — kā tika taisīts

## Kā uzlikt
1. Nomaini `index.html` ar jauno
2. Atver Chrome/Edge (mikrofons strādā tikai tur)
3. Nospied 🎙️ un runā, tad + Saglabāt

## Kā tika uztaisīts
- `gmail_search newer_than:30d` + `gmail_read` — reāli e-pasti no angora2000plus@gmail.com
- `google_calendar.search` 07.11–14.11 — reāli eventi
- Aizvietots `chat-area` ar organizer HTML/CSS/JS

Beacon: steady()
vzors.smartyou.lv
