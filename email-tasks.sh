#!/bin/bash
# VZOR Smart Organizer - Email Tasks Parser
# VZOR-26 PREMIUM

echo "VZOR Email Tasks Sync"
echo "Checking inbox..."

if [ -f "emails.txt" ]; then
  echo "Found emails.txt"
  cat emails.txt | grep "TASK:" > tasks.txt
  echo "Tasks extracted to tasks.txt"
else
  echo "No emails.txt found - creating sample"
  echo "TASK: Buy smart glasses battery" > tasks.txt
  echo "TASK: Sync calendar with VZOR" >> tasks.txt
fi

echo "Done. AI Core: Ready (Offline)"
