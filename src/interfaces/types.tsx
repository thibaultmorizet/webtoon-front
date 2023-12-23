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
		filterKey: "language";
		filterName: "Languages";
		filterValues: Language[] | undefined;
	},
	{
		filterKey: "category";
		filterName: "Categories";
		filterValues: Category[] | undefined;
	},
	{
		filterKey: "status";
		filterName: "Status";
		filterValues: Status[] | undefined;
	},
	{
		filterKey: "author";
		filterName: "Authors";
		filterValues: Author[] | undefined;
	},
	{
		filterKey: "artist";
		filterName: "Artists";
		filterValues: Artist[] | undefined;
	},
	{
		filterKey: "tag";
		filterName: "Tags";
		filterValues: Tag[] | undefined;
	},
];
