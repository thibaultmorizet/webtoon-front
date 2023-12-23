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
				filterName: "language",
				filterValues: languages.data,
			},
			{
				filterName: "category",
				filterValues: categories.data,
			},
			{
				filterName: "status",
				filterValues: status.data,
			},
			{
				filterName: "author",
				filterValues: authors.data,
			},
			{
				filterName: "artist",
				filterValues: artists.data,
			},
			{
				filterName: "tag",
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
