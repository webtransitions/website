# webtransitions.org

Static site, built with [Eleventy](https://www.11ty.dev/), with blog posts at
the site root and syndication to the [AT Protocol](https://atproto.com) via the
[standard.site](https://standard.site) lexicons.

## Layout

```
content/                 # site content (input dir)
  index.md               # homepage
  <slug>/                # one directory per blog post
    index.md              # -> https://webtransitions.org/<slug>/
    image.jpg             # -> https://webtransitions.org/<slug>/image.jpg
  404.md, tags.njk, tag-pages.njk, sitemap.xml.njk
  feed/                  # atom feed + stylesheet
  well-known/            # standard.site / atproto verification routes
_includes/layouts/       # base.njk, home.njk, post.njk
_data/                   # metadata.js, atproto.js (syndication config)
public/                  # copied verbatim to output: css/, servo-readiness/, CNAME
scripts/syndicate.mjs    # publishes posts to atproto as standard.site records
```

## Editing the homepage

The homepage is Markdown in `content/index.md`. Its title and subtitle wrapper
is `_includes/layouts/home.njk`; shared page chrome remains in
`_includes/layouts/base.njk`.

## Writing a post

Each post owns a directory containing its Markdown and images:

```sh
mkdir -p content/my-post-slug
$EDITOR content/my-post-slug/index.md
```

```markdown
---
layout: layouts/post.njk
title: My post
date: 2026-10-07
description: One-line summary, used in feeds and atproto records.
tags: ["posts", "browsers"]
---

Body in Markdown.

![Diagram](diagram.png)
```

Put `diagram.png` beside `index.md`. The folder name is the slug, so this
example publishes both:

- post: `https://webtransitions.org/my-post-slug/`
- image: `https://webtransitions.org/my-post-slug/diagram.png`

There is no `/posts/` URL prefix.

- `draft: true` hides a post from production builds; it stays in `npm start`
  locally and appears on staging
- `updated: 2026-10-09` marks a revision (feeds + atproto `updatedAt`)
- `atproto_rkey: custom-key` overrides the atproto record key (default: folder slug)
- `atproto_skip: true` keeps a post off atproto entirely

## Develop / build

```sh
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build to _site/
```

## Staging

Staging runs the full pipeline against a private URL before anything hits
production:

- **Branch `staging`** on Tangled → `.tangled/workflows/deploy-staging.yml`
  builds and pushes the output to the `gh-pages` branch of
  **github.com/webtransitions/staging**, served at
  **staging.webtransitions.org**.
- Staging builds differ from production: `SITE_ENV=staging` renders a banner
  on every page, `BUILD_DRAFTS=1` includes draft posts, feed/sitemap URLs use
  the staging domain, and `ATPROTO_DID` is never set — so staging pages never
  emit the standard.site verification routes or claim the atproto identity.

The flow:

```sh
git switch staging                # work here; commit as usual
git push origin staging           # → https://staging.webtransitions.org
# …test, iterate…
git switch main
git merge --ff-only staging       # ship exactly what you tested
git push origin main              # → production deploy
```

(Anything not fast-forwardable means main moved — rebase staging onto main
first and re-test.)

One-time staging setup already done:

- `webtransitions/staging` repo exists, Pages serves from `gh-pages`/(root),
  custom domain `staging.webtransitions.org` attached
- write deploy key added to the repo; private half at
  `~/.config/webtransitions-staging/id_ed25519` on the dev box
- `GITHUB_STAGING_KEY_B64` stored on `spindle.superflow.dev` via Tangled XRPC;
  the ready-to-restore value remains at
  `~/.config/webtransitions-staging/id_ed25519.b64`

Remaining manual step:

1. DNS: `staging.webtransitions.org. CNAME webtransitions.github.io.`
   (cert is provisioned automatically once it resolves; then enable
   "Enforce HTTPS" in the repo's Pages settings)

## Deployment

Tangled is the source of truth **and** the build system. On every push to
main, `.tangled/workflows/deploy.yml` builds with Eleventy and force-pushes
`_site/` to the `gh-pages` branch on GitHub (an orphan commit each time, so
deletions propagate). GitHub Pages serves `webtransitions.org` from that
branch — GitHub is only a static host; nothing is built there.

One-time setup on GitHub (repo Settings → Pages) — already done:

- Build and deployment → Source: **Deploy from a branch** → `gh-pages`, `/ (root)`
- Custom domain: `webtransitions.org` (the `CNAME` file in the output keeps it
  set; `.nojekyll` makes Pages serve dotfiles like `.well-known`)
- The build asserts `_site/CNAME` is the production domain before pushing, so
  a staging tree can never be wired to the prod repo

Tangled repo secrets:

- `GITHUB_MIRROR_KEY_B64` — base64 private half of a write-enabled GitHub
  deploy key (already set for the mirror; `deploy.yml` reuses it)
- `GITHUB_STAGING_KEY_B64` — same, for the `webtransitions/staging` repo (see
  Staging above)
- `ATPROTO_DID` — optional, emits the standard.site verification routes at build

`.tangled/workflows/mirror.yml` still mirrors all source branches to GitHub,
but that's backup/visibility only — serving doesn't depend on it.

## AT Protocol syndication (standard.site)

The site publishes two kinds of atproto records using the
[standard.site](https://standard.site) lexicons:

| Record | rkey | Points at |
|---|---|---|
| `site.standard.publication` | `self` | `https://webtransitions.org/` |
| `site.standard.document` | post slug | `https://webtransitions.org/<slug>/` |

Verification links domain and records, in both directions:

- `/.well-known/site.standard.publication` serves the publication AT-URI
- `/.well-known/atproto-did` serves the DID (optional, if the domain handle matters)
- every post page carries `<link rel="site.standard.document" href="at://…">`

### One-time setup

1. Create an app password for the account that will own the publication, e.g.
   at https://bsky.app/settings/app-passwords.
2. Set `ATPROTO_DID` to that account's DID (from the app password page or
   `did:web`/`did:plc` resolver). Add it as a Tangled repo secret with the same
   name so CI builds emit the verification routes; export it locally too when
   you want them in `npm start`.

### Publishing

```sh
ATPROTO_IDENTIFIER=your.handle ATPROTO_PASSWORD=xxxx-xxxx-xxxx-xxxx npm run syndicate
```

The script upserts the publication record and one document record per
non-draft post, and deletes document records whose posts no longer exist.
Useful flags: `--dry-run`, `--publication` (site record only),
`--include-drafts`.

> The document record fields follow the standard.site lexicons as published at
> https://standard.site. If a field changes there, update `documentRecord()` in
> `scripts/syndicate.mjs`.
