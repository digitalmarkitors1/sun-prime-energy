#!/usr/bin/env bash
# One-command deploy to Hostinger over SSH (key-based).
#
#   npm run deploy
#
# Pulls latest content from Supabase (if configured), builds the static export,
# injects the production .htaccess, then rsyncs out/ to the live web root —
# removing stale files so the server exactly matches the build.
#
# A timestamped backup of the current live site is taken on the server first.

set -euo pipefail

HOST="145.223.17.220"
PORT="65002"
USER="u698055513"
KEY="$HOME/.ssh/sunprime_hostinger"
REMOTE_ROOT="~/domains/sunpesolutions.com/public_html"
SSH="ssh -i $KEY -p $PORT -o BatchMode=yes"

cd "$(dirname "$0")/.."

echo "▸ Building site…"
npm run pull >/dev/null 2>&1 || true
next build >/dev/null 2>&1 || npx next build

echo "▸ Injecting .htaccess…"
cp deploy/.htaccess out/.htaccess

echo "▸ Backing up current live site on server…"
$SSH "$USER@$HOST" "tar -czf ~/backup-public_html-\$(date +%Y%m%d-%H%M).tar.gz -C $REMOTE_ROOT . && echo '  backup ok'"

echo "▸ Uploading (rsync, mirroring build)…"
rsync -az --delete \
  --exclude '.well-known' \
  -e "$SSH" \
  out/ "$USER@$HOST:$REMOTE_ROOT/"

echo "▸ Verifying live site…"
code=$(curl -s -o /dev/null -w '%{http_code}' https://sunpesolutions.com/blog/ || echo "000")
echo "  https://sunpesolutions.com/blog/ → HTTP $code"

echo "✔ Deploy complete."
