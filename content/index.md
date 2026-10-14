---
layout: layouts/home.njk
title: WebTransitions
subtitle: Research and development exploring the web, AI and what comes after browsers.
description: Research and development exploring the web, AI and what comes after browsers.
---

Changing the web is difficult and slow, and experimentation on the web has long required decades of expertise, and immense amounts of funding. Today, the future of the web is determined mostly by the few companies with the resources to do so.

But making the web should not be impossible, or the web itself cannot grow and change with the needs of the people who use it.

Today, the future of the web is less certain than ever, as AI becomes more central to both publishing and consumption. In such times, change on the web can't be left to the few small groups who've concentrated that power.

WebTransitions explores alternate futures for the web through experiments reenvisioning the web with radical agency - user agents shaped by users, web platform features addressing the needs of the few vs privileged target audiences of publishers, and making web rendering engines available to everyone instead of just three US companies.

## Projects

- **[Peek](https://tangled.org/burrito.space/peek)**: An experimental web user agent. It started as a browser extension exploring persistent versus transient task modeling (tabs versus panels), and is now a workbench for exploring what comes after browsers in many different ways. What is using the web like with no tabs? With AI, but no model prompt?
- **[Singular](https://tangled.org/burrito.space/singular)**: How can web pages be made *weightless*? Every page carries load that has nothing to do with its content: cognitive and emotional load, trust decisions at several levels, maintenance costs, install decisions. Experiments include:
  - Opening pages without any browser branding at all, because the cognitive and emotional load of browser choice is not zero.
  - Opening pages from the point of view of the *publisher*, the way they would want them to be opened.
  - Opening pages that run as standalone apps.
  - Opening pages as standalone apps that are never installed, and disappear completely when closed.
- **[Szzt](https://szzt.app)**: Drag and drop publishing of web pages on [atproto](https://atproto.com), openable by any renderer or gateway, with different render contexts. How might a page be created and published without needing a domain name? An experiment in being discovered, verified and served through an atproto identity.
- **[Bez](https://tangled.org/burrito.space/bez)**: An experiment in creating a web rendering engine entirely from the rich data of [Browser Compat Data](https://github.com/mdn/browser-compat-data), [W3C Web Specs repo](https://github.com/w3c/browser-specs) and [WebRef](https://github.com/w3c/webref), [Web Platform Tests](https://web-platform-tests.org/) and the [Web Features Project](https://web-platform-dx.github.io/web-features-project/), authored entirely by local AI models on the Userandagents.org folknet.
- **EU Cyber Resilience Act**: Subject matter expert hired by Crab Nebula in 2026 for drafting, review, and comment resolution of the [CRA draft standard for Standalone and Embedded Browsers](https://labs.etsi.org/rep/stan4cra/en-304-617). Collaborated with stakeholders, policy makers and browser vendors to synthesize EU regulatory requirements and web standards into a document that balances the needs of each, while being as future-proof as possible.
- **Servo Readiness Report**: The [Servo Readiness Report](/servo-readiness/) ([PDF](/servo-readiness/servo-readiness-one-pager.pdf)) is a report-in-progress published early 2026 which evaluates how far Servo is from being a usable web engine, and what amount of funding would get it usable sooner, with an aim to inform planning for a non-US multi-stakeholder governed web engine for use by everyone.
- **Custom scheme support in browsers**: Since co-creating the [Libdweb](https://github.com/mozilla/libdweb) project at Mozilla in 2018, over nearly 5yrs working on [P2P support in browsers](https://blog.ipfs.tech/?tags=browsers) at [Protocol Labs](https://www.protocol.ai/), and getting bugs fixed, standards revised, and even major refactors in Chromium, still pushing on reducing barriers to enabling a multi-protocol web. Kicked off while leading the Browsers & Platforms team at PL, currently advising Igalia and the IPFS Fdn on an ongoing initiative to get custom scheme support into web extension manifests, and to follow that with backing those schemes with byte streams, not just extension-bundled HTML pages.
- **Ed25519** [Ed25519 support in the Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): Kicked this off while at Protocol Labs, continued advising the project generally and directly getting vendor movement over 3+ years before all three engines finally shipped it in release versions in 2025 ([Igalia post](https://blogs.igalia.com/jfernandez/2025/08/25/ed25519-support-lands-in-chrome-what-it-means-for-developers-and-the-web/), [IPFS Fdn post](https://blog.ipfs.tech/2025-08-ed25519/)).
- **Web Features data set**: [Web Features Project](https://web-platform-dx.github.io/web-features/): Spent half of 2024 working in the W3C Web DX CG on behalf of Google, creating web feature definitions which let us reason about the web platform as ~1200 discrete features vs 15k+ unique pieces. These are used by MDN, Caniuse, Visual Studio, and many more.
- **Intent to Ship**: Created in 2016, and running continuously since, [@Intenttoship](https://bsky.app/profile/intenttoship.dev) bot posts when browser makers announce an intent to ship, change or remove features in their web engines.

## Areas of research

- Experimental user agents and post-browser interfaces
- Task modeling: tabs, panels, and what replaces them
- AI in the user agent, beyond the chat prompt
- Reducing the cost of opening, trusting and keeping web pages
- Publishing and identity without domain names
- atproto, decentralized and distributed web
- Non-HTTP protocols, multiprotocol support
- Spec-driven and AI-authored web engines
- Portable and resilient web apps
- Verifiability / provenance
- Web form factor / OS integration / webviews

## Who

After many years working towards paradigmatic change on the web at Mozilla and Protocol Labs, WebTransitions was formed by [Dietrich Ayala](https://metafluff.com) as a not-for-profit organization (pending) to enable experimentation and innovation on the web platform.

Working or worked with these fine folks, among others:

Google, Mozilla, Apple, Igalia, CrabNebula, Protocol Labs, IPFS Foundation, Little Bear Labs, IPShipyard, Open Impact Foundation, Brave, Peergos and more.

{#
{% if collections.posts.length %}
## Writing

{% set postslist = collections.posts %}
{% include "postslist.njk" %}
{% endif %}
#}

## Collaborate

Interested in these experiments, running one of your own, or connecting with others working on what comes after browsers? See [userandagents.org](https://userandagents.org) for how to connect and collaborate.

Or email [hello@webtransitions.org](mailto:hello@webtransitions.org).
