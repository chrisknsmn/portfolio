#!/usr/bin/env bash

# Random delay: 0–180 minutes (0–3 hours)
DELAY_MINUTES=$((RANDOM % 181))

echo "Delaying commit by $DELAY_MINUTES minutes..."
sleep "$((DELAY_MINUTES * 60))"

# Update activity file
echo "Automated activity at $(date -u)" >> activity.log

git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"

git add activity.log
git commit -m "chore: automated activity ($(date -u))"
