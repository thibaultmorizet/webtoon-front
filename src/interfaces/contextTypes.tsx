import { Filters, Results, User } from "./types";

export type AuthContextType = {
	user: User | undefined;
	login: (email: string, password: string) => void;
	logout: () => void;
	updateUser: (
		firstname?: string,
		lastname?: string,
		password?: string
	) => void;
};

export type SearchContextType = {
	filters: Filters | undefined;
	results: Results | undefined;
	updateFilters: (filters: Filters | undefined) => void;
	search: string | undefined;
	updateSearch: (search: string | undefined) => void;
};
