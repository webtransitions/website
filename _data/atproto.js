// AT Protocol / standard.site syndication settings.
//
// Set ATPROTO_DID (e.g. did:plc:xxxxxxxx) to enable the standard.site
// integration. When set, the build emits:
//
//   /.well-known/site.standard.publication   -> AT-URI of the publication record
//   /.well-known/atproto-did                 -> DID for domain verification
//   <link rel="site.standard.document">      -> in every post page <head>
//
// When unset, those pieces are skipped and the site builds normally.
// Records are published with `npm run syndicate` (scripts/syndicate.mjs).
//
// Lexicons: https://standard.site

export default {
	did: process.env.ATPROTO_DID || "",
	publicationCollection: "site.standard.publication",
	publicationRkey: "self",
	documentCollection: "site.standard.document",
};
