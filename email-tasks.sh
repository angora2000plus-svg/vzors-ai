#!/bin/bash
# VZOR Smart Organizer v2 - Email Tasks Parser
# VZOR-26 PREMIUM - Upgraded

echo "VZOR Email Tasks Sync v2"
echo "Checking inbox..."

# Config
EMAIL_FILE="emails.txt"
TASKS_FILE="tasks.txt"
JSON_FILE="vzor_tasks.json"

# 1. Extract tasks
if [ -f "$EMAIL_FILE" ]; then
  echo "Found $EMAIL_FILE"
  grep "TASK:" "$EMAIL_FILE" | sed 's/TASK: //' > "$TASKS_FILE"
else
  echo "No $EMAIL_FILE found - creating sample"
  echo "Buy smart glasses battery" > "$TASKS_FILE"
  echo "Sync calendar with VZOR" >> "$TASKS_FILE"
  echo "Charge glasses case" >> "$TASKS_FILE"
fi

# 2. Create JSON for your index.html app
echo "[" > "$JSON_FILE"
first=1
while IFS= read -r task; do
  if [ $first -eq 1 ]; then
    first=0
  else
    echo "," >> "$JSON_FILE"
  fi
  echo -n "  {\"text\": \"$task\", \"source\": \"email\", \"date\": \"$(date +%Y-%m-%d)\"}" >> "$JSON_FILE"
done < "$TASKS_FILE"
echo "" >> "$JSON_FILE"
echo "]" >> "$JSON_FILE"

# 3. Stats
count=$(wc -l < "$TASKS_FILE")
echo "✓ Extracted $count tasks to $TASKS_FILE"
echo "✓ JSON ready for Vzors AI: $JSON_FILE"
echo ""
cat "$TASKS_FILE" | sed 's/^/ - /'
echo ""
echo "Done. AI Core: Ready (Online) | Sync to Manas piezīmes"
