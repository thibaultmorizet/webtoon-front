import Cookies from "js-cookie";
import feathersClient from "../client";

export const loginCheck = async (accessToken: string) => {
	try {
		const result = await feathersClient.authenticate({
			strategy: "jwt",
			accessToken: "accessToken",
		});
		const token = result.accessToken;

		Cookies.set("token", token);
		Cookies.set("loggedIn", "true");
		window.location.replace("/");
	} catch (error: any) {
		Cookies.remove("user");
		Cookies.remove("token");
		Cookies.remove("loggedIn");

		throw Error(error);
	}
};
