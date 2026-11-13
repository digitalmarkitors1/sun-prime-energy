# Self-serve "Publish to Live" — setup checklist

This makes your team able to push CMS changes live **without a developer**. It
uses a GitHub Action that pulls content from Supabase, builds the site, and
uploads it to Hostinger over SSH.

The workflow file is ready at `.github/workflows/deploy.yml`. To activate it,
these one-time steps are needed (require your GitHub account):

## 1. Put the project on GitHub
```bash
cd ~/Desktop/sun-prime-energy
gh repo create sun-prime-energy --private --source=. --remote=origin --push
```
(or create a repo in the GitHub UI and `git push`).

## 2. Add repository secrets
GitHub → repo → **Settings → Secrets and variables → Actions → New secret**, add:

| Secret name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ijjdwfhabetklwkcmdju.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_ZBtUOPck32CIDAxm9atmpw_VT55Hqfc` |
| `HOSTINGER_SSH_KEY` | contents of `~/.ssh/sunprime_hostinger` (the private key) |

## 3. Publish — three ways
- **Manual (instant):** GitHub → **Actions** tab → "Build & Deploy to Hostinger"
  → **Run workflow**. ~2 min later it's live. Anyone with repo access can do this.
- **Auto every 15 min:** uncomment the `schedule:` block in the workflow — saved
  changes then go live on their own, no clicks.
- **CMS "Publish" button (optional, later):** a Supabase Edge Function holds a
  GitHub token and calls the API on `repository_dispatch`. Needs a small extra
  setup so the token never touches the browser — ask me when you want it.

## Meanwhile
Until this is set up, deploys run from the dev machine with `npm run deploy`
(pull + build + rsync). Same result.
