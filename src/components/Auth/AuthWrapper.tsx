import { jwtDecode } from "jwt-decode";
import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import loader01 from "../../assets/lotties/loader01.json";
import feathersClient from "../../configs/feathers";
import "../../styles/tailwind.css";
import { RenderHeader } from "../Structure/Header";
import { RenderRoutes } from "../Structure/RenderNavigation";

export type User = {
	email: string;
	isAuthenticated: boolean;
};

export type ContextType = {
	user: User | undefined;
	login: (email: string, password: string) => void;
	logout: () => void;
};

// CREATE AUTH CONTEXT AND DEFAULT VALUE
const AuthContext = createContext<ContextType>({
	user: { email: "", isAuthenticated: false },
	login: () => {},
	logout: () => {},
});

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
	// USER STATE PASSED TO APP CONTEXT
	const [user, setUser] = useState<User>();

	//RECONNECTER L'UTILISATEUR SI IL A UN TOKEN VALIDE
	useEffect(() => {
		const accessToken = localStorage.getItem("feathers-react-jwt");
		if (accessToken) {
			(async () => {
				try {
					const decodedToken = jwtDecode(accessToken);
					if ((decodedToken.exp || 0) * 1000 < Date.now()) {
						setUser({ email: "", isAuthenticated: false });
					} else {
						const data = await feathersClient.authenticate({
							strategy: "jwt",
							accessToken,
						});
						toast.success("Welcome back " + data.user.email, {
							icon: "👋",
						});
						setUser({ email: data.user.email, isAuthenticated: true });
					}
				} catch (error) {
					console.log(error);
					setUser({ email: "", isAuthenticated: false });
				}
			})();
		} else {
			setUser({ email: "", isAuthenticated: false });
		}
	}, []);

	// LOGIN & LOGOUT FUNCTIONS
	const login = async (email: string, password: string) => {
		try {
			const data = await feathersClient.authenticate({
				strategy: "local",
				email,
				password,
			});

			setUser({ email: data.user.email, isAuthenticated: true });
			// window.location.replace("/");
		} catch (error) {
			toast.error("Invalid credentials", { icon: "🔑" });
		}
	};
	const logout = async () => {
		if (!user) return;
		await feathersClient.logout();

		setUser({ email: "", isAuthenticated: false });
	};

	return user ? (
		<AuthContext.Provider value={{ user, login, logout }}>
			<>
				<RenderHeader />
				<RenderRoutes />
			</>
		</AuthContext.Provider>
	) : (
		<div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
			<Lottie animationData={loader01} />
		</div>
		// TODO LOADER SPINNER COMPONENT
	);
};
