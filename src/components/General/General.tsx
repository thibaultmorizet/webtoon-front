import { useLocation } from "react-router-dom";
import { navigation } from "../../App";

export default function General() {
	const location = useLocation();
	const component = navigation.find((item) => item.href === location?.pathname)
		?.component;

	return <>{component && component()}</>;
}
