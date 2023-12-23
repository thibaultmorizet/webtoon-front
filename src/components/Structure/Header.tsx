import { AuthData } from "../Providers/AuthProvider";
import { RenderMenu } from "./RenderNavigation";

export const RenderHeader = () => {
	const { user } = AuthData();
	if (!user?.isAuthenticated) return <></>;

	return <RenderMenu />;
};
