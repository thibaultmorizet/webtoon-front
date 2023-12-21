import Home from "../Home/Home";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

import { ReactElement } from "react";

export type RouteType = {
	path: string;
	name: string;
	element: JSX.Element;
	isNavBar: boolean;
	isMenu: boolean;
	isPrivate: boolean;
	icon?: ReactElement;
};

export const nav = [
	{
		path: "/",
		name: "Home",
		element: <Home />,
		isNavBar: true,
		isMenu: false,
		isPrivate: true,
	},
	{
		path: "/profile",
		name: "profile",
		element: <Profile />,
		isNavBar: false,
		isMenu: true,
		isPrivate: true,
	},
	{
		path: "/login",
		name: "Login",
		element: <Login />,
		isMenu: false,
		isNavBar: false,
		isPrivate: false,
	},
] as RouteType[];
