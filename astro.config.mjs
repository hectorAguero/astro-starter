import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { filterSitemapByDefaultLocale, i18n } from "astro-i18n-aut/integration";
import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/consts";
import icon from "astro-icon";

const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	trailingSlash: "always",
	build: {
		format: "directory",
	},
	vite: {
		logLevel: "error",
		define: {
			__DATE__: `'${new Date()}'`,
		},
	},
	integrations: [
		icon(),
		mdx(),
		sitemap({
			i18n: {
				locales,
				defaultLocale,
			},
			filter: filterSitemapByDefaultLocale({
				defaultLocale,
			}),
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		alpinejs(),
		i18n({
			locales,
			defaultLocale,
			exclude: [
				"pages/api/**/*",
				"pages/rss.xml.ts",
				"pages/[locale]/rss.xml.ts",
			],
		}),
	],
});
