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

export default function App() {
	return (
		<Router>
			<Navigation />
			<General />
		</Router>
	);
}
