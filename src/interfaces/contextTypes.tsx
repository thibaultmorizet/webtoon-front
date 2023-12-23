import { Filters, User } from "./types";

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
};
