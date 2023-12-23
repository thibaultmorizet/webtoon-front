export const API_URL = "https://webtoon-app.thibaultmorizet.fr";

export function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export function firstLetterToUpperCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}