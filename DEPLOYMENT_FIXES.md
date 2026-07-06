# Deployment Fixes — 06 July 2026

Record of every change made to fix the admin panel "Can't reach the server"
error on Netlify, plus related bugs found along the way.

---

## 1. The problems that were found

### Problem A — Deployed admin could not reach the backend
The admin at `https://kalyan-nayak-admin.netlify.app` showed
**"Can't reach the server"** on login. Two causes stacked on top of each other:

1. **Netlify never knew the backend URL.** `frontend/.env` and
   `admin/admin/.env` are gitignored (root `.gitignore` has `.env`), so no
   deployed build ever saw `VITE_API_URL`. The app fell back to the hardcoded
   default `http://localhost:3000/api` — i.e. the *visitor's own machine*.
2. **Mixed content.** Even with the correct URL, an HTTPS page (Netlify) is
   not allowed by browsers to call an `http://` API (the EC2 IP
   `http://13.126.4.35:3000`). The request is blocked before it leaves the
   browser, which looks exactly like "server unreachable".

The EC2 backend itself was **never down** — verified directly:
`http://13.126.4.35:3000/api/show/work` returns valid JSON with
`Access-Control-Allow-Origin: *`.

### Problem B — Deploys are done by drag-and-dropping `dist/`
The sites are deployed manually (dragging the `dist` folder into Netlify),
not from the git repo. This matters because `netlify.toml`
`[build.environment]` **only works when Netlify runs the build itself**.
The fix therefore uses `.env.production` + `public/_redirects`, which work
for manual deploys too.

### Problem C — Smaller bugs found on the way
- `frontend/.env` had `VITE_API_URL=http://13.126.4.35:3000/api`, but the
  frontend code appends `/api` itself → requests went to `/api/api/...`.
- `admin/.../Projects.jsx` had one hardcoded `http://localhost:3000/uploads/`
  image URL that ignored the env var.
- The admin error toast hardcoded "backend running on http://localhost:3000"
  regardless of the actual API URL — misleading during debugging.
- Refreshing a client-side route (e.g. `/login`) on Netlify returned 404
  because there was no SPA fallback redirect.

### Why ImageKit images always loaded anyway
Project images are stored as absolute `https://ik.imagekit.io/...` URLs and
are served straight from ImageKit's CDN over HTTPS. They never touch the
backend, so they load even when API calls fail.

---

## 2. How the fix works

In production the apps now call **their own Netlify domain** with relative
URLs (`/api/...`). A `_redirects` file (shipped inside `dist/`) makes Netlify
proxy those requests **server-side** to the EC2 backend. Server-to-server
traffic has no mixed-content restriction, so HTTPS pages work with the HTTP
backend.

```
Browser ──HTTPS──> Netlify (/api/login) ──HTTP──> EC2 13.126.4.35:3000/api/login
```

---

## 3. Files changed / created

### New files

| File | Purpose |
|---|---|
| `frontend/public/_redirects` | Netlify proxy for `/api`, `/uploads`, `/socket.io` → EC2, + SPA fallback. Copied into `dist/` on build; works with drag-and-drop deploys. |
| `admin/admin/public/_redirects` | Same for the admin (`/api`, `/uploads`, + SPA fallback). |
| `frontend/.env.production` | Sets `VITE_API_URL=/` for `npm run build` (relative, same-origin). Overrides `.env` in production builds only. |
| `admin/admin/.env.production` | Sets `VITE_API_URL=/api` for production builds. |
| `frontend/netlify.toml` | Same proxy + env config, but only active if the site is ever connected to the git repo (Netlify-run builds). Contains full Render migration steps as comments. |
| `admin/admin/netlify.toml` | Same, for the admin. |
| `DEPLOYMENT_FIXES.md` | This document. |

### Modified files

| File | Change |
|---|---|
| `frontend/src/config/api.js` | Normalizes `VITE_API_URL` (strips trailing `/`), so `"/"` in production means "same origin" and relative URLs are produced. |
| `frontend/src/features/portfolio/routes/PortfolioPage.jsx` | Socket.IO now connects to `API_BASE \|\| window.location.origin` so it works with a relative API base. |
| `frontend/.env` | Removed the wrong `/api` suffix (code appends `/api` itself). Added comments incl. Render option. Local-dev only file. |
| `admin/admin/.env` | Added comments documenting the rule: admin URL **must end with `/api`** (opposite of frontend). Local-dev only file. |
| `admin/admin/src/components/Projects.jsx` | Replaced hardcoded `http://localhost:3000/uploads/...` with the env-based URL (same pattern as the other components). |
| `admin/admin/src/utils/errorMessage.js` | Error toast no longer claims the backend is on `localhost:3000`. |

### URL rules cheat-sheet (cause of repeated confusion)

| App | `VITE_API_URL` format | Example |
|---|---|---|
| frontend | bare origin, **no** `/api` | `http://13.126.4.35:3000` or `/` |
| admin | **must end with** `/api` | `http://13.126.4.35:3000/api` or `/api` |

---

## 4. How to deploy (current manual workflow)

1. `cd frontend && npm run build` → drag **`frontend/dist`** into the
   Netlify site for the portfolio.
2. `cd admin/admin && npm run build` → drag **`admin/admin/dist`** into the
   Netlify site for the admin.
3. Always deploy a **freshly built** `dist` — an old one has old URLs baked in.

**Recommended instead:** connect the git repo to Netlify (base directory
`frontend` / `admin/admin`). Then `netlify.toml` takes over, every push
auto-deploys, and stale-dist mistakes become impossible.

---

## 5. If the backend moves to Render later

Render gives HTTPS (`https://your-app.onrender.com`), so the mixed-content
problem disappears and the proxy is no longer needed. Full step-by-step
instructions are written as comments inside:

- `frontend/netlify.toml` and `admin/admin/netlify.toml` (git-based deploys)
- `frontend/.env.production` and `admin/admin/.env.production` (manual deploys)
- both `public/_redirects` files (which lines to delete, which to keep)

Short version: point `VITE_API_URL` at the Render URL (frontend without
`/api`, admin with `/api`), delete the proxy lines from `_redirects`, keep
the SPA fallback line, rebuild, redeploy. Remember: Render's free tier
sleeps after ~15 min idle (first request takes 30–60 s), and its disk is
ephemeral — locally uploaded `/uploads` images are lost on restart, so
prefer ImageKit for all images there.

---

## 6. ⚠️ Still pending (do these!)

1. **Secrets are committed to git.** `backend/.env` is tracked and contains
   the MongoDB password, JWT secret, ImageKit private key and Gmail app
   password. Fix:
   ```
   git rm --cached backend/.env
   git commit -m "chore: stop tracking backend/.env"
   ```
   …then **rotate all of those credentials** (change DB password, new JWT
   secret, regenerate ImageKit keys and the Gmail app password). Anyone with
   repo access already has the current ones.
2. **Commit and push** all the changes listed in section 3 — as of this
   document none of them are committed yet.
3. Old `backend/b1-...zip` deleted / new `b2-...zip` untracked in the repo —
   decide whether these belong in git at all (zips usually don't).
