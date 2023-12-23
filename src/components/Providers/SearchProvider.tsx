import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import loader01 from "../../assets/lotties/loader01.json";
import feathersClient from "../../configs/feathers";
import { SearchContextType } from "../../interfaces/contextTypes";
import { Filters, Results } from "../../interfaces/types";
import { AuthData } from "./AuthProvider";

// CREATE AUTH CONTEXT AND DEFAULT VALUE
const SearchContext = createContext<SearchContextType>({
	filters: undefined,
	results: undefined,
	updateFilters: () => {},
	search: undefined,
	updateSearch: () => {},
});

export const SearchData = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children?: JSX.Element }) => {
	const { user } = AuthData();

	useEffect(() => {
		getFilters();
	}, [user]);

	const [filters, setFilters] = useState<Filters>();
	const [search, setSearch] = useState<string>();
	const [results, setResults] = useState<Results>();
	const getFilters = async () => {
		if (!user?.isAuthenticated) return;
		const languages = await feathersClient.service("languages").find();
		const status = await feathersClient.service("status").find();
		const trackSites = await feathersClient.service("tracksites").find();

		setFilters({
			language: {
				filterName: "Languages",
				filterValues: languages.data.map((language: any, index: number) => {
					return { ...language, checked: index === 0 ? true : false };
				}),
			},
			status: {
				filterName: "Status",
				filterValues: status.data.map((statut: any, index: number) => {
					return { ...statut, checked: index === 0 ? true : false };
				}),
			},
			trackSite: {
				filterName: "Track Sites",
				filterValues: trackSites.data.map((trackSite: any, index: number) => {
					return { ...trackSite, checked: index === 0 ? true : false };
				}),
			},
		});
	};

	const updateFilters = async (filters?: Filters) => {
		if (!filters) return;
		setFilters(filters);
		getResults(filters, search);
	};

	const updateSearch = async (search?: string) => {
		if (!search) return;
		setSearch(search);
		getResults(filters, search);
	};

	const getResults = async (filters?: Filters, search?: string) => {
		if (!filters) return;
		console.log(filters);

		const checkedLanguages = filters.language.filterValues?.filter(
			(language) => language.checked
		);

		if (!checkedLanguages?.[0]) return;
		const checkedTracksites = filters.trackSite.filterValues?.filter(
			(trackSite) => trackSite.checked
		);

		checkedTracksites?.forEach(async (trackSite) => {
			if (trackSite.name === "mangadex") {
				const searchParams = {
					title: "title",
					language: "availableTranslatedLanguage[]",
					statut: "status[]",
				};
				const statusName = {
					onGoing: "ongoing",
					finished: "completed",
					canceled: "cancelled",
					pausing: "hiatus",
				};

				const title = search ? `&${searchParams.title}=${search}` : ``;
				const language = filters.language.filterValues
					?.filter((language) => language.checked)
					.map((language) => `&${searchParams.language}=${language.key}`)
					.join("");

				const status = filters.status.filterValues
					?.filter((statut) => statut.checked)
					.map(
						(statut) =>
							`&${searchParams.statut}=${statusName?.[
								statut.name as keyof typeof statusName
							]}`
					)
					.join("");

				const result = await fetch(
					`${trackSite.url}/manga/?limit=32&offset=0&includes[]=cover_art${title}${language}${status}`
				)
					.then((res) => res.json())
					.then((res) => res.data)
					.then((res) => {
						const result = res.map((manga: any) => {
							const mangaCoverFilename = manga.relationships.filter(
								(relationship: any) => relationship.type === "cover_art"
							)[0].attributes.fileName;

							const statusName = {
								ongoing: "On Going",
								completed: "Finished",
								cancelled: "Cancelled",
								hiatus: "Pausing",
							};

							const language = filters.language.filterValues?.filter(
								(language) => language.checked
							)?.[0]?.name;

							const mangaId = manga.id;
							const mangaTitle = manga.attributes.title.en;
							const mangaStatus =
								statusName?.[
									manga.attributes.status as keyof typeof statusName
								];
							const mangaLanguage = language;
							const mangaLastChapter = manga.attributes.lastChapter;

							const mangacover = `https://uploads.mangadex.org/covers/${mangaId}/${mangaCoverFilename}`;
							return {
								id: mangaId,
								title: mangaTitle,
								poster: mangacover,
								status: mangaStatus,
								language: mangaLanguage,
								lastChapter: mangaLastChapter,
							};
						});
						return result;
					});
				setResults(result);
			}
		});
		return;
	};

	return (user?.isAuthenticated && filters) || !user?.isAuthenticated ? (
		<SearchContext.Provider
			value={{ filters, results, updateFilters, search, updateSearch }}
		>
			{children}
		</SearchContext.Provider>
	) : (
		<div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
			<Lottie animationData={loader01} />
		</div>
	);
};
