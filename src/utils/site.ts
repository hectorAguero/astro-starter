/**
 * Concatenate page title and site title
 * @param pageTitle
 * @param siteTitle
 * @returns
 */
export function convertPageTitle(pageTitle: string, siteTitle: string): string {
	const titleSeparator = " - ";
	return pageTitle + titleSeparator + siteTitle;
}
