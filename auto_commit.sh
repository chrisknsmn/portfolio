#!/usr/bin/env bash
set -e

# Verify we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: Not in a git repository"
  exit 1
fi

# Update activity file
echo "Automated activity at $(date -u)" >> activity.log

# Configure git for this commit
git config --local user.name "github-actions[bot]"
git config --local user.email "github-actions[bot]@users.noreply.github.com"

# Commit and push
git add activity.log
git commit -m "chore: automated activity ($(date -u))"
git push
