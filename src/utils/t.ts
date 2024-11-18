/**
 * From https://github.com/trktml/lotusforafrica/blob/main/src/utils/translationTools.ts
 */

import { DEFAULT_LOCALE, LOCALES } from "@src/consts";
import { getLocale } from "astro-i18n-aut";

import es from "@locales/es.json";
import pt from "@locales/pt.json";

const handler = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	get(target: any, prop: any, receiver: any) {
		return target[prop].replaceAll("\n", "<br/>");
	},
};

const es_proxy = new Proxy(es, handler);
const pt_proxy = new Proxy(pt, handler);

export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;

/**
 * Return the locale object with all the translations for a specific locale
 * @param astroUrl
 * @returns
 */
export default function t(astroUrl: URL): Locales {
	const locale = getLocale(astroUrl);

	switch (locale) {
		case "pt":
			return pt_proxy as Locales;
		default:
			return es_proxy as Locales;
	}
}

export function tFn(astroUrl: URL) {
	const locale = getLocale(astroUrl);
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let translations: any;

	switch (locale) {
		case "pt":
			translations = pt_proxy;
			break;
		default:
			translations = es_proxy;
			break;
	}

	return (key: string): string => {
		if (key in translations) {
			return translations[key];
		}
		console.warn(`Missing translation key: ${key}`);
		return key;
	};
}

/**
 *
 * @param link Localize a specific path
 * @param astroUrl
 * @returns
 */
export function localizePath(
	link: string | URL,
	astroUrl: string | URL,
): string {
	const locale = getLocale(astroUrl);
	let localizedLink = "";
	if (locale && locale !== defaultLocale) {
		const localeLink =
			`/${getLocale(astroUrl) ?? ""}/${link}`.replaceAll("//", "/") ?? "";
		localizedLink = localeLink;
	} else {
		localizedLink = String(link);
	}

	// localizedLink add last slash
	if (!localizedLink.endsWith("/")) {
		localizedLink += "/";
	}

	return localizedLink;
}
