import { Route, Routes } from "react-router-dom";
import { AuthData } from "../../components/Auth/AuthWrapper";
// import MenuIcon from "../MenuIcon/MenuIcon";
import Navigation from "../Navigation/Navigation";
import NotFound from "../NotFound/NotFound";
import { nav } from "./Navigation";

export const RenderRoutes = () => {
	const { user } = AuthData();
	return (
		<Routes>
			{nav.map((r, i) => {
				if (r.isPrivate && user?.isAuthenticated) {
					return <Route key={i} path={r.path} element={r.element} />;
				} else if (!r.isPrivate && !user?.isAuthenticated) {
					return <Route key={i} path={r.path} element={r.element} />;
				} else return false;
			})}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export const RenderMenu = () => {
	return <Navigation />;
};
