---
layout: layouts/home.njk
title: WebTransitions
subtitle: Supporting transitional change on the web platform and in browsers with funding, coordination and development.
description: Supporting transitional change on the web platform and in browsers with funding, coordination and development.
---

Changing the web is hard, and for good reasons. But it should not be impossible, or the web itself cannot grow and change with the needs of the people who use it.

Many want changes to the web and browsers, but the barriers are often too high and the process too long. Even experimentation can require decades of expertise and a lot of time and space.

**WebTransitions helps advance the web with:**

- Strategy / ecosystem shaping
- Feasibility assessments / threat modeling
- Ideation / exploration of new web features
- Architecture / design / integration planning
- Development from prototyping to production
- Browser product advising

## Initiatives

- **(2026)** EU Cyber Resilience Act [draft standard for Standalone and Embedded Browsers](https://labs.etsi.org/rep/stan4cra/en-304-617): Subject matter expert hired by Crab Nebula to participate in authoring, review, and comment resolution. Collaborated with stakeholders, policy makers and browser vendors to synthesize EU regulatory requirements and web standards into a document that balances the needs of each, while being as future-proof as possible.
- **(2026)** The [Servo Readiness Report](/servo-readiness/) ([PDF](/servo-readiness/servo-readiness-one-pager.pdf)), a report-in-progress evaluating how far Servo is from being a usable web engine, and what amount of funding would get it usable sooner, with an aim to inform planning for a non-US multi-stakeholder governed web engine for use by everyone.
- **(2018-∞)** Custom scheme support in browsers: Since co-creating the [Libdweb](https://github.com/mozilla/libdweb) project at Mozilla in 2018, over nearly 5yrs working on [P2P support in browsers](https://blog.ipfs.tech/?tags=browsers) at [Protocol Labs](https://www.protocol.ai/), and getting bugs fixed, standards revised, and even major refactors in Chromium, still pushing on reducing barriers to enabling a multi-protocol web. Kicked off while leading the Browsers & Platforms team at PL, currently advising Igalia and the IPFS Fdn on an ongoing initiative to get custom scheme support into web extension manifests, and to follow that with backing those schemes with byte streams, not just extension-bundled HTML pages.
- **(2022-5)** [Ed25519 support in the Web Cryptography API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API): Kicked this off while at Protocol Labs, continued advising the project generally and directly getting vendor movement over 3+ years before all three engines finally shipped it in release versions in 2025 ([Igalia post](https://blogs.igalia.com/jfernandez/2025/08/25/ed25519-support-lands-in-chrome-what-it-means-for-developers-and-the-web/), [IPFS Fdn post](https://blog.ipfs.tech/2025-08-ed25519/)).
- **(2024-5)** [Web Features Project](https://web-platform-dx.github.io/web-features/): Spent six months working in the W3C Web DX CG on behalf of Google, creating web feature definitions which let us reason about the web platform as ~1200 discrete features vs 15k+ unique pieces. These are used by MDN, Caniuse, Visual Studio, and many more.
- **(2016-∞)** [@Intenttoship](https://bsky.app/profile/intenttoship.dev): Bot that posts when browser makers announce an intent to ship, change or remove features in their web engines.

## Areas of work

- New web capabilities or browser features
- Non-HTTP protocols, multiprotocol support
- Decentralized/distributed web support
- IPFS / libp2p
- Browser extensions and APIs
- Web archiving / preservation
- P2P/Web3 integration and compat
- Web form factor / OS integration / webviews
- Experimental user agents
- Portable and resilient web apps
- Verifiability / provenance
- WebCrypto API
- Web sustainability

## Who

After many years working towards paradigmatic change on the web at Mozilla and Protocol Labs, WebTransitions was formed by [Dietrich Ayala](https://metafluff.com) as a not-for-profit organization (pending) to enable experimentation and innovation on the web platform.

It is a connector between those who want to see change on the web, and those who can help make it happen - or at least help understand whether it should or could happen at all.

Working or worked with these fine folks, among others:

Google, Mozilla, Apple, Igalia, CrabNebula, Protocol Labs, IPFS Foundation, Little Bear Labs, IPShipyard, Open Impact Foundation, Brave, Peergos and more.

{% if collections.posts.length %}
## Writing

{% set postslist = collections.posts %}
{% include "postslist.njk" %}
{% endif %}

## Let's work together

Do you need help getting a bug in a browser fixed? A new feature added to browsers or the web, or a web standards issue moved forward? Or want experienced advice on your browser product, feature idea or new web protocol? Something completely different but very relevant to everything you read so far?

Please email [hello@webtransitions.org](mailto:hello@webtransitions.org).
