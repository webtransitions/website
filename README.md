# webtransitions.org

Static site, built with [Eleventy](https://www.11ty.dev/), with blog posts at
the site root and syndication to the [AT Protocol](https://atproto.com) via the
[standard.site](https://standard.site) lexicons.

## Layout

```
content/                 # site content (input dir)
  index.html             # homepage
  posts/<slug>.md        # blog posts -> https://webtransitions.org/<slug>/
  404.md, tags.njk, tag-pages.njk, sitemap.xml.njk
  feed/                  # atom feed + stylesheet
  well-known/            # standard.site / atproto verification routes
_includes/layouts/       # base.njk, post.njk
_data/                   # metadata.js, atproto.js (syndication config)
public/                  # copied verbatim to output: css/, servo-readiness/, CNAME
scripts/syndicate.mjs    # publishes posts to atproto as standard.site records
```

## Writing a post

```sh
$EDITOR content/posts/my-post-slug.md
```

```markdown
---
title: My post
date: 2026-10-07
description: One-line summary, used in feeds and atproto records.
tags: ["posts", "browsers"]
---

Body in markdown.
```

- URL: `https://webtransitions.org/my-post-slug/` (filename = slug, metafluff-style but off the domain root, no `/posts/` prefix)
- `draft: true` hides a post from production builds but keeps it in `npm start`
- `updated: 2026-10-09` marks a revision (feeds + atproto `updatedAt`)
- `atproto_rkey: custom-key` overrides the atproto record key (default: slug)
- `atproto_skip: true` keeps a post off atproto entirely

## Develop / build

```sh
npm install
npm start        # dev server at http://localhost:8080
npm run build    # production build to _site/
```

## Deployment

Tangled is the source of truth; `.tangled/workflows/mirror.yml` mirrors to
GitHub, and `.github/workflows/deploy.yml` builds with Eleventy and deploys to
GitHub Pages. In GitHub repo settings, Pages must use **Source: GitHub
Actions** (custom domain `webtransitions.org` stays configured as before).

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
   `did:web`/`did:plc` resolver). Add it as a GitHub Actions secret with the
   same name so CI builds emit the verification routes; export it locally too
   when you want them in `npm start`.

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
