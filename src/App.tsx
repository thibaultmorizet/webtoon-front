import Cookies from "js-cookie";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import General from "./components/General/General";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import "./styles/tailwind.css";

export const navigation = [
	{ name: "Home", href: "/", component: Home },
	{
		name: "Webtoons",
		href: "/webtoon",
		component: () => <h1>Webtoons</h1>,
	},
];

export const userMenu = [
	{
		name: "Profile",
		href: "/profile",
		component: () => <h1>Profile</h1>,
	},
];

export const screens = [
	...navigation,
	...userMenu,
	{
		name: "Login",
		href: "/login",
		component: () => <Login />,
	},
];

export default function App() {
	const isLoggedIn = Cookies.get("loggedIn");

	return (
		<Router>
			{isLoggedIn ? (
				<>
					<Navigation />
					<General />
				</>
			) : (
				<Login />
			)}
		</Router>
	);
}
