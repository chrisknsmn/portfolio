#!/usr/bin/env bash
set -e

# Verify we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: Not in a git repository"
  exit 1
fi

# Configure git for this commit
git config --local user.name "github-actions[bot]"
git config --local user.email "github-actions[bot]@users.noreply.github.com"

# Pull latest changes with rebase to avoid merge commits
git pull --rebase origin main || {
  echo "Failed to pull. Continuing anyway..."
}

# Update activity file
echo "Automated activity at $(date -u)" >> activity.log

# Check if there are changes to commit
if ! git diff --quiet activity.log || ! git diff --cached --quiet; then
  # Commit and push
  git add activity.log
  git commit -m "chore: automated activity ($(date -u))"
  git push origin main
  echo "Changes committed and pushed successfully"
else
  echo "No changes to commit"
fi
