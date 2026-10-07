// Build environment. Staging builds set SITE_ENV=staging, which renders the
// banner in _includes/layouts/base.njk. See .tangled/workflows/deploy-staging.yml.
export default {
	staging: process.env.SITE_ENV === "staging",
};
