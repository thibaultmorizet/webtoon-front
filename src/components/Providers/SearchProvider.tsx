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
		const categories = await feathersClient.service("categories").find();
		const status = await feathersClient.service("status").find();
		const tags = await feathersClient.service("tags").find();
		const trackSites = await feathersClient.service("tracksites").find();

		setFilters({
			language: {
				filterName: "Languages",
				filterValues: languages.data,
			},
			category: {
				filterName: "Categories",
				filterValues: categories.data,
			},
			status: {
				filterName: "Status",
				filterValues: status.data,
			},
			tag: {
				filterName: "Tags",
				filterValues: tags.data,
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
		const numberOfTrackSitesChecked = filters.trackSite.filterValues?.filter(
			(trackSite) => trackSite.checked
		).length;
		if (numberOfTrackSitesChecked === 0) return;
		console.log(filters, search);

		filters.trackSite.filterValues?.forEach((trackSite) => {
			if (trackSite.checked) {
				console.log(trackSite.name);
			}
		});

		// const result = await fetch(`http://localhost:3030/search?search=${search}`);

		// setResults(results);
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
