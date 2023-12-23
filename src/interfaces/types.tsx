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
	key: string;
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

export type Tag = {
	id: number;
	name: string;
	checked: boolean;
};

export type TrackSite = {
	id: number;
	name: string;
	url: string;
	checked: boolean;
};

export type Filters = {
	language: {
		filterName: "Languages";
		filterValues: Language[] | undefined;
	};
	status: {
		filterName: "Status";
		filterValues: Status[] | undefined;
	};
	trackSite: {
		filterName: "Track Sites";
		filterValues: TrackSite[] | undefined;
	};
};

export type Results = {
	id: number;
	title: string;
	description: string;
	poster: string;
	releaseDate: string;
}[];
