# Archived homepage material

Unpublished material moved out of `content/index.html` when the homepage was converted to Markdown. Git history remains the source of truth for the original HTML.

## Initiatives / Collabs / WIP / Past

### Verification on the web

- [Draft plan for verifiability/provenance support in the web](https://docs.google.com/document/d/1-04c0tW03tj3_VG_OFkBQGdJ7lLYkAgrprl4tlAtidc/edit?hl=en)

### WebExtensions as first-class protocol handlers

- [Latest rollup from Igalia](https://hackmd.io/86Ei010jQ9WPnKCt0jLVfw)
- [API proposal doc for Chromium](https://docs.google.com/document/d/1sDyVpi8N0FgAfNoG4J-3JhZrSnmi9npXf1VEcjRDDQI/edit?hl=en)
- [Chromium tracking issue](https://issues.chromium.org/issues/40482153)
- [W3C WebExtensions CG tracking issue](https://github.com/w3c/webextensions/issues/365)
- [Draft spec by Robin Berjon](https://darobin.github.io/proto-handler-reqs/)
- [IPFS tracking issue](https://github.com/ipfs/in-web-browsers/issues/212)

### Multi-protocol support in web browsers

- [Igalia HOWTO on implementing custom protocols in Chromium](https://blogs.igalia.com/jfernandez/2022/11/14/discovering-chromes-pre-defined-custom-handlers/)
- [Igalia announces new custom protocol handlers for Chromium](https://blogs.igalia.com/jfernandez/2022/08/10/new-custom-handlers-component-for-chrome/)
- [New dweb scheme registered, localhost origin interop/compat and more with Igalia](https://blog.ipfs.tech/2021-01-15-ipfs-and-igalia-collaborate-on-dweb-in-browsers/)

### IPFS in web browsers

- [Little Bear Labs announces native multi-gateway verified IPFS support in Chromium](https://blog.ipfs.tech/2023-05-multigateway-chromium-client/)
- [IPFS support in Chromium via Igalia's refactor work](https://blog.ipfs.tech/14-11-2022-igalia-chromium/)
- [Brave announces IPFS full node support](https://brave.com/blog/brave-integrates-ipfs/)
- [IPFS in web browsers update 2019](https://blog.ipfs.tech/2019-10-08-ipfs-browsers-update/)

### Secure curves in WebCrypto API

- [Igalia's Javi Ferndandez on Ed25519 support](https://blogs.igalia.com/jfernandez/2023/06/20/secure-curves-in-the-web-cryptography-api/)

## Area descriptions

### Protocol Extensibility

HTTP is the default protocol for the web today but is constrained in many ways. Alternate protocols with different features and trade-offs are difficult to experiment with and not supported in most web user agents. This area of work covers alternate protocol support in browsers, from internal plumbing to user interface to extension APIs.

### IPFS, libp2p

Peer-to-peer networking and content-addressing of data are both concepts that the web has never embraced, but provide a number of advantages for people who want long-lived resilient applications. How can these approaches work inside HTTP web applications? What does the web look like when they're integrated? What barriers exist to using these on the web today? This area of work covers all of these questions and more.

### WebCrypto API

Developer needs for cryptography in web applications continues to grow but the web has not risen to meet them. This area of work has included lobbying for and adding support for new curves and fixing interop/compat issues.

### Web Archiving/Preservation

The web is in a constant state of decay—in some ways healthy and some not. We've worked with WebRecorder, Internet Archive, Flickr Foundation, Old Dominion University's [Web SciDL](https://twitter.com/WebSciDL) and others in capacities varying from research, tools and development, specifications, grant writing and advising.

### Verifiability/Provenance

The rapid growth of capabilities and availability of AI has compounded the dis/misinformation challenges publishers and users face on the web today. While the web security model allows resources to be verifiably served by their originating publisher over HTTP, it does not allow for verification of those resources in any other context. What would it look like to elevate verifiability as a value of the web itself? Let's answer that question through research, prototyping and community building.

### Experimental User Agents

The age of the one-size-fits-all browser is long past over. What do people need from the web today that the windows-and-tabs model can't provide? How might that application work?

### Alternative Economic Models

Surveillance capitalism is the dominant funding model for the web, and search and search placement is the primary funding source for web browsers. What other ways might the web be powered, browsers funded, standards made?

### Web Form Factor / OS Integration / Web-as-apps

PWA implementations are more browser-centric than application-, OS- or user-centric. Webviews are a horror show for developers and users. The landscape of "browser based applications" is fragmented and unstable. Nativefier is dead. Gluon is dead. Electron is a mixed back. Tauri is new. So much and so little and we haven't mentioned mobile yet.
