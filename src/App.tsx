import { BrowserRouter as Router } from "react-router-dom";
import General from "./components/General/General";
import Home from "./components/Home/Home";
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
	{
		name: "Sign Out",
		href: "/signout",
		component: () => <h1>Sign Out</h1>,
	},
];

export const screens = [
	...navigation,
	...userMenu,
	{
		name: "Login",
		href: "/login",
		component: () => <h1>Login</h1>,
	},
];

export default function App() {
	return (
		<Router>
			<Navigation />
			<General />
		</Router>
	);
}
