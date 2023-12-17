import { BrowserRouter as Router } from "react-router-dom";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import "./styles/tailwind.css";

export default function App() {
	return (
		<Router>
			<Navigation />
			<Home />
		</Router>
	);
}
