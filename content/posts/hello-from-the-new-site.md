---
title: "Hello from the new site"
date: 2026-10-07
draft: true
description: "webtransitions.org moved to Eleventy, with blog posts at /<slug>/ and syndication to the AT Protocol via standard.site."
tags: ["posts", "meta"]
---

This site is now built with [Eleventy](https://www.11ty.dev/).

Two things changed:

- **Posts live at the root of the domain.** A post written as `content/posts/my-post.md` is published at `https://webtransitions.org/my-post/`.
- **Syndication on the AT Protocol** via the [standard.site](https://standard.site) lexicons, so what gets published here can be followed in atproto clients.

This post is a `draft` — it won't be published until `draft: false` (or the key is removed) in its front matter.
