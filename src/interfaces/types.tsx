export type User = {
	id: Number;
	email: string;
	firstname: string;
	lastname: string;
	isAuthenticated: boolean;
};

export type Language = {
	id: number;
	name: string;
	checked: boolean;
};

export type Category = {
	id: number;
	name: string;
	checked: boolean;
};

export type Status = {
	id: number;
	name: string;
	checked: boolean;
};

export type Author = {
	id: number;
	name: string;
	checked: boolean;
};

export type Artist = {
	id: number;
	name: string;
	checked: boolean;
};

export type Tag = {
	id: number;
	name: string;
	checked: boolean;
};

export type Filters = [
	{
		filterName: "language";
		filterValues: Language[] | undefined;
	},
	{
		filterName: "category";
		filterValues: Category[] | undefined;
	},
	{
		filterName: "status";
		filterValues: Status[] | undefined;
	},
	{
		filterName: "author";
		filterValues: Author[] | undefined;
	},
	{
		filterName: "artist";
		filterValues: Artist[] | undefined;
	},
	{
		filterName: "tag";
		filterValues: Tag[] | undefined;
	},
];
