import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import loader01 from "../../assets/lotties/loader01.json";
import feathersClient from "../../configs/feathers";
import { SearchContextType } from "../../interfaces/contextTypes";
import { Filters, Results } from "../../interfaces/types";
import "../../styles/tailwind.css";

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
	useEffect(() => {
		getFilters();
	}, []);

	const [filters, setFilters] = useState<Filters>();
	const [search, setSearch] = useState<string>();
	const [results, setResults] = useState<Results>();
	const getFilters = async () => {
		const languages = await feathersClient.service("languages").find();
		const status = await feathersClient.service("status").find();
		const trackSites = await feathersClient.service("tracksites").find();

		setFilters({
			language: {
				filterName: "Languages",
				filterValues: languages.data,
			},
			status: {
				filterName: "Status",
				filterValues: status.data,
			},
			trackSite: {
				filterName: "Track Sites",
				filterValues: trackSites.data.map((trackSite: any) => ({
					...trackSite,
					checked: true,
				})),
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
				console.log("status", status);

				const result = await fetch(
					`${trackSite.url}/manga/?limit=32&offset=0${title}${language}${status}`
				)
					.then((res) => res.json())
					.then((res) => res.data)
					.then((res) => console.log(res[0]));
			}
		});
	};

	return filters ? (
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
