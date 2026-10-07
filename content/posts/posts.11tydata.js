// Blog posts live at the site root: content/posts/<slug>.md is published at
// https://webtransitions.org/<slug>/ — no /posts/ prefix.
export default {
	layout: "layouts/post.njk",
	tags: ["posts"],
	permalink: "/{{ page.fileSlug }}/",
};
