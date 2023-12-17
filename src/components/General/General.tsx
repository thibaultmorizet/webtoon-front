import { useLocation } from "react-router-dom";
import { screens } from "../../App";

export default function General() {
	const location = useLocation();
	const component = screens.find((item) => item.href === location?.pathname)
		?.component;

	return <>{component && component()}</>;
}
