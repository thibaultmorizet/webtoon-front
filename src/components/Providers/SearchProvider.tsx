import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import loader01 from "../../assets/lotties/loader01.json";
import feathersClient from "../../configs/feathers";
import { SearchContextType } from "../../interfaces/contextTypes";
import { Filters } from "../../interfaces/types";
import "../../styles/tailwind.css";

// CREATE AUTH CONTEXT AND DEFAULT VALUE
const SearchContext = createContext<SearchContextType>({
	filters: undefined,
});

export const SearchData = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children?: JSX.Element }) => {
	// USER STATE PASSED TO APP CONTEXT
	const [filters, setFilters] = useState<Filters>();

	const getFilters = async () => {
		const languages = await feathersClient.service("languages").find();
		const categories = await feathersClient.service("categories").find();
		const status = await feathersClient.service("status").find();
		const authors = await feathersClient.service("authors").find();
		const artists = await feathersClient.service("artists").find();
		const tags = await feathersClient.service("tags").find();

		setFilters([
			{
				filterKey: "language",
				filterName: "Languages",
				filterValues: languages.data,
			},
			{
				filterKey: "category",
				filterName: "Categories",
				filterValues: categories.data,
			},
			{
				filterKey: "status",
				filterName: "Status",
				filterValues: status.data,
			},
			{
				filterKey: "author",
				filterName: "Authors",
				filterValues: authors.data,
			},
			{
				filterKey: "artist",
				filterName: "Artists",
				filterValues: artists.data,
			},
			{
				filterKey: "tag",
				filterName: "Tags",
				filterValues: tags.data,
			},
		]);
	};

	useEffect(() => {
		getFilters();
	}, []);

	return filters ? (
		<SearchContext.Provider value={{ filters }}>
			{children}
		</SearchContext.Provider>
	) : (
		<div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
			<Lottie animationData={loader01} />
		</div>
	);
};
