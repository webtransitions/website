import { copyFile, mkdir, readdir } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";

import { IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

import pluginFilters from "./_config/filters.js";

const imageExtensions = new Set([".avif", ".svg", ".webp", ".png", ".jpg", ".jpeg", ".gif"]);

async function copyPostImages(sourceRoot, outputRoot, current = sourceRoot) {
	for(const entry of await readdir(current, { withFileTypes: true })) {
		const source = join(current, entry.name);
		if(entry.isDirectory()) {
			await copyPostImages(sourceRoot, outputRoot, source);
			continue;
		}
		if(!imageExtensions.has(extname(entry.name).toLowerCase())) continue;

		const destination = join(outputRoot, relative(sourceRoot, source));
		await mkdir(dirname(destination), { recursive: true });
		await copyFile(source, destination);
	}
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
	// Drafts, see also _data/eleventyDataSchema.js
	// BUILD_DRAFTS=1 includes drafts even in production-style builds (staging).
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build" && !process.env.BUILD_DRAFTS) {
			return false;
		}
	});

	// Skip the standard.site verification routes when no DID is configured,
	// so the site builds fine before atproto syndication is set up.
	// (Templates that set `gateAtproto: true` in their front matter.)
	eleventyConfig.addPreprocessor("atproto-gate", "*", (data, content) => {
		if(data.gateAtproto && !data.atproto?.did) {
			return false;
		}
	});

	// Copy the contents of the `public` folder to the output folder
	// For example, `./public/css/` ends up in `_site/css/`
	eleventyConfig
		.addPassthroughCopy({
			"./public/": "/"
		})
		.addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

	// Run Eleventy when these files change:
	// https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

	// Colocated images are copied only for pages Eleventy actually rendered.
	// This keeps content/<slug>/image.jpg at /<slug>/image.jpg without leaking
	// assets from draft posts into production. Referenced images are also
	// optimized by eleventy-img below.
	eleventyConfig.on("eleventy.after", async ({ results }) => {
		for(const result of results || []) {
			const inputPath = result.inputPath?.replaceAll("\\", "/");
			if(!inputPath?.match(/(?:^|\/)content\/[^/]+\/index\.md$/) || !result.outputPath) continue;
			await copyPostImages(dirname(result.inputPath), dirname(result.outputPath));
		}
	});

	// Watch colocated images for the image pipeline and copy hook.
	eleventyConfig.addWatchTarget("content/**/*.{avif,svg,webp,png,jpg,jpeg,gif}");

	// Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
	// Adds the {% css %} paired shortcode
	eleventyConfig.addBundle("css", {
		toFileDirectory: "dist",
	});

	// Official plugins
	eleventyConfig.addPlugin(pluginSyntaxHighlight, {
		preAttributes: { tabindex: 0 }
	});
	eleventyConfig.addPlugin(pluginNavigation);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed/feed.xml",
		stylesheet: "pretty-atom-feed.xsl",
		collection: {
			name: "posts",
			limit: 10,
		},
		metadata: {
			language: "en",
			title: "WebTransitions",
			subtitle: "Supporting transitional change on the web platform and in browsers with funding, coordination and development.",
			base: process.env.SITE_URL || "https://webtransitions.org/",
			author: {
				name: "Dietrich Ayala",
			}
		}
	});

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "auto"],
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
			}
		},
		sharpOptions: {
			animated: true,
		},
	});

	// Filters
	eleventyConfig.addPlugin(pluginFilters);

	eleventyConfig.addPlugin(IdAttributePlugin);

	eleventyConfig.addShortcode("currentBuildDate", () => {
		return (new Date()).toISOString();
	});
};

export const config = {
	templateFormats: [
		"md",
		"njk",
		"html",
		"liquid",
		"11ty.js",
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: "njk",

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: "njk",

	dir: {
		input: "content",          // default: "."
		includes: "../_includes",  // default: "_includes" (`input` relative)
		data: "../_data",          // default: "_data" (`input` relative)
		output: "_site"
	},
};
