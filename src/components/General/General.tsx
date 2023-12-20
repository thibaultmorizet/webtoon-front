import { useLocation } from "react-router-dom";
import { screens } from "../../App";
import Navigation from "../Navigation/Navigation";

export default function General() {
	const location = useLocation();
	const component = screens.find(
		(item) => item.href === location?.pathname
	)?.component;

	return (
		<div className="min-h-screen bg-gray-900">
			<Navigation />
			{component && component()}
		</div>
	);
}
