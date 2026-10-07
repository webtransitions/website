#!/usr/bin/env node
// Syndicate webtransitions.org to the AT Protocol using the standard.site
// lexicons: https://standard.site
//
// Publishes/updates two kinds of records:
//
//   site.standard.publication/self   the publication record for this site
//   site.standard.document/<rkey>    one record per non-draft post
//
// The canonical URL of a document is <SITE_URL> + <path>, which must match
// the live page. Verification back-links are emitted by the site build:
//
//   /.well-known/site.standard.publication   (content/well-known/)
//   /.well-known/atproto-did                 (content/well-known/)
//   <link rel="site.standard.document">      (_includes/layouts/base.njk)
//
// Records for posts removed from content/<slug>/index.md are deleted from the repo.
//
// Usage:
//   ATPROTO_IDENTIFIER=you.example ATPROTO_PASSWORD=app-password npm run syndicate
//
// Flags:
//   --dry-run        print what would be published, change nothing
//   --publication    only publish the site.standard.publication record
//   --include-drafts also syndicate posts with draft: true
//
// Environment:
//   ATPROTO_IDENTIFIER  handle of the account to publish as (required)
//   ATPROTO_PASSWORD    app password for that account (required)
//   ATPROTO_SERVICE     PDS to log in to (default: https://bsky.social)
//   SITE_URL            override site base URL (default: https://webtransitions.org/)
//   ATPROTO_DID         optional, verified against the logged-in DID
//
// NOTE: the document record fields below follow the standard.site lexicons.
// If the lexicon has evolved, adjust the `documentRecord()` mapping — and see
// https://standard.site for the current definitions.

import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";
import { Agent } from "@atproto/api";

const SITE_URL = (process.env.SITE_URL || "https://webtransitions.org/").replace(/\/?$/, "/");
const SITE_NAME = "WebTransitions";
const SITE_DESCRIPTION =
	"Supporting transitional change on the web platform and in browsers with funding, coordination and development.";

const PUBLICATION_COLLECTION = "site.standard.publication";
const DOCUMENT_COLLECTION = "site.standard.document";
const PUBLICATION_RKEY = "self";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const publicationOnly = args.includes("--publication");
const includeDrafts = args.includes("--include-drafts");

const identifier = process.env.ATPROTO_IDENTIFIER;
const password = process.env.ATPROTO_PASSWORD;
const service = process.env.ATPROTO_SERVICE || "https://bsky.social";

// ---------------------------------------------------------------- posts ----
async function loadPosts() {
	const contentDir = new URL("../content/", import.meta.url).pathname;
	const entries = await readdir(contentDir, { withFileTypes: true });
	const posts = [];

	for (const entry of entries) {
		if (!entry.isDirectory()) continue;

		const file = join(contentDir, entry.name, "index.md");
		let raw;
		try {
			raw = await readFile(file, "utf8");
		} catch (error) {
			if (error.code === "ENOENT") continue;
			throw error;
		}

		const { data, content } = matter(raw);
		const tags = Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []);
		if (data.layout !== "layouts/post.njk" && !tags.includes("posts")) continue;
		if (data.draft && !includeDrafts) continue;
		if (data.atproto_skip) continue;

		const slug = data.slug || entry.name;
		const rkey = data.atproto_rkey || slug;
		const createdAt = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
		const updatedAt = data.updated ? new Date(data.updated).toISOString() : createdAt;

		posts.push({
			rkey,
			path: `/${slug}/`,
			title: data.title || slug,
			description: data.description || "",
			content,
			lang: data.lang || "en",
			createdAt,
			updatedAt,
		});
	}

	return posts.sort((a, b) => a.path.localeCompare(b.path));
}

const publicationRecord = (existing) => ({
	url: SITE_URL,
	name: SITE_NAME,
	description: SITE_DESCRIPTION,
	createdAt: existing?.value?.createdAt || new Date().toISOString(),
	updatedAt: new Date().toISOString(),
});

const documentRecord = (post) => ({
	path: post.path,
	title: post.title,
	description: post.description,
	content: post.content,
	lang: post.lang,
	createdAt: post.createdAt,
	updatedAt: post.updatedAt,
});

// ------------------------------------------------------------------ run ----

const posts = await loadPosts();
console.log(`Loaded ${posts.length} post(s) from content/<slug>/index.md`);

if (dryRun) {
	console.log("\n--dry-run: would publish this publication record:");
	console.log(JSON.stringify({ $type: PUBLICATION_COLLECTION, rkey: PUBLICATION_RKEY, ...publicationRecord() }, null, 2));
	for (const post of posts) {
		console.log(`\nWould publish ${DOCUMENT_COLLECTION}/${post.rkey} (${post.path}):`);
		console.log(JSON.stringify({ $type: DOCUMENT_COLLECTION, ...documentRecord(post) }, null, 2));
	}
	process.exit(0);
}

if (!identifier || !password) {
	console.error("Set ATPROTO_IDENTIFIER and ATPROTO_PASSWORD (app password) to syndicate.");
	process.exit(1);
}

console.log(`Logging in to ${service} as ${identifier}...`);
const agent = new Agent(service);
await agent.login({ identifier, password });
const did = agent.assertDid;
console.log(`Authenticated as ${did}`);

if (process.env.ATPROTO_DID && process.env.ATPROTO_DID !== did) {
	console.error(`ATPROTO_DID (${process.env.ATPROTO_DID}) does not match logged-in DID (${did}).`);
	console.error("Fix the env var, or the site's verification routes will point at the wrong account.");
	process.exit(1);
}

// Publication record, preserving the original createdAt across re-runs.
let existingPublication = null;
try {
	existingPublication = await agent.com.atproto.repo.getRecord({
		repo: did,
		collection: PUBLICATION_COLLECTION,
		rkey: PUBLICATION_RKEY,
	});
} catch {
	// not published yet
}

await agent.com.atproto.repo.putRecord({
	repo: did,
	collection: PUBLICATION_COLLECTION,
	rkey: PUBLICATION_RKEY,
	record: publicationRecord(existingPublication),
	...existingPublication?.uri ? { swapRecord: existingPublication.uri } : {},
});
console.log(`Published ${PUBLICATION_COLLECTION}/${PUBLICATION_RKEY}`);
console.log(`  AT-URI: at://${did}/${PUBLICATION_COLLECTION}/${PUBLICATION_RKEY}`);
console.log(`  Serve this at ${SITE_URL}.well-known/site.standard.publication (done automatically by the build).`);

if (publicationOnly) process.exit(0);

// Document records: upsert everything in content/posts/...
for (const post of posts) {
	let existing = null;
	try {
		existing = await agent.com.atproto.repo.getRecord({
			repo: did,
			collection: DOCUMENT_COLLECTION,
			rkey: post.rkey,
		});
	} catch {
		// not published yet
	}

	await agent.com.atproto.repo.putRecord({
		repo: did,
		collection: DOCUMENT_COLLECTION,
		rkey: post.rkey,
		record: documentRecord(post),
		...existing?.uri ? { swapRecord: existing.uri } : {},
	});
	console.log(`Published ${DOCUMENT_COLLECTION}/${post.rkey} -> ${SITE_URL}${post.path.replace(/^\//, "")}`);
}

// ...and delete records for posts that no longer exist locally.
const kept = new Set(posts.map(p => p.rkey));
const listed = await agent.com.atproto.repo.listRecords({
	repo: did,
	collection: DOCUMENT_COLLECTION,
	limit: 100,
});
for (const record of listed.records) {
	const rkey = record.uri.split("/").pop();
	if (!kept.has(rkey)) {
		await agent.com.atproto.repo.deleteRecord({
			repo: did,
			collection: DOCUMENT_COLLECTION,
			rkey,
		});
		console.log(`Deleted ${DOCUMENT_COLLECTION}/${rkey} (no local post)`);
	}
}

console.log("\nDone. Verification checks:");
console.log(`  curl ${SITE_URL}.well-known/site.standard.publication`);
console.log(`  curl ${SITE_URL}.well-known/atproto-did`);
console.log(`Each post page <head> carries a <link rel="site.standard.document"> back to its record.`);
