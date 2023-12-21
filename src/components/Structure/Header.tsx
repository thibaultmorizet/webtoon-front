import { AuthData } from "../Auth/AuthWrapper";
import { RenderMenu } from "./RenderNavigation";

export const RenderHeader = () => {
	const { user } = AuthData();
	if (!user?.isAuthenticated) return <></>;

	return <RenderMenu />;
};
