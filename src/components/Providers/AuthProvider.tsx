import { Id } from "@feathersjs/client";
import { jwtDecode } from "jwt-decode";
import Lottie from "lottie-react";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import loader01 from "../../assets/lotties/loader01.json";
import feathersClient from "../../configs/feathers";
import { AuthContextType } from "../../interfaces/contextTypes";
import { User } from "../../interfaces/types";
import "../../styles/tailwind.css";
import { RenderHeader } from "../Structure/Header";
import { RenderRoutes } from "../Structure/RenderNavigation";
import { SearchProvider } from "./SearchProvider";

// CREATE AUTH CONTEXT AND DEFAULT VALUE
const AuthContext = createContext<AuthContextType>({
	user: {
		id: 0,
		email: "",
		firstname: "",
		lastname: "",
		isAuthenticated: false,
	},
	login: () => {},
	logout: () => {},
	updateUser: () => {},
});

export const AuthData = () => useContext(AuthContext);

export const AuthProvider = () => {
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
						setUser({
							id: 0,
							email: "",
							firstname: "",
							lastname: "",
							isAuthenticated: false,
						});
					} else {
						const data = await feathersClient.authenticate({
							strategy: "jwt",
							accessToken,
						});
						toast.success("Welcome back " + data.user.email, {
							icon: "👋",
						});
						setUser({
							id: data.user.id,
							email: data.user.email,
							firstname: data.user.firstname,
							lastname: data.user.lastname,
							isAuthenticated: true,
						});
					}
				} catch (error) {
					console.log(error);
					setUser({
						id: 0,
						email: "",
						firstname: "",
						lastname: "",
						isAuthenticated: false,
					});
				}
			})();
		} else {
			setUser({
				id: 0,
				email: "",
				firstname: "",
				lastname: "",
				isAuthenticated: false,
			});
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

			setUser({
				id: data.user.id,
				email: data.user.email,
				firstname: data.user.firstname,
				lastname: data.user.lastname,
				isAuthenticated: true,
			});
		} catch (error) {
			toast.error("Invalid credentials", { icon: "🔑" });
		}
	};

	const logout = async () => {
		if (!user) return;
		await feathersClient.logout();

		setUser({
			id: 0,
			email: "",
			firstname: "",
			lastname: "",
			isAuthenticated: false,
		});
	};

	const updateUser = async (
		firstname?: string,
		lastname?: string,
		password?: string
	) => {
		try {
			const data = await feathersClient.service("users").patch(user?.id as Id, {
				firstname,
				lastname,
				password,
			});
			console.log(data);

			setUser({
				id: data.id,
				email: data.email,
				firstname: data.firstname,
				lastname: data.lastname,
				isAuthenticated: true,
			});
			toast.success("User Updated");
		} catch (error) {
			toast.error("An Error Occured : " + error, { icon: "❌" });
		}
	};

	return user ? (
		<AuthContext.Provider value={{ user, login, logout, updateUser }}>
			<SearchProvider>
				<div className="min-h-screen flex flex-1 flex-col">
					<RenderHeader />
					<RenderRoutes />
				</div>
			</SearchProvider>
		</AuthContext.Provider>
	) : (
		<div style={{ height: "80vh", display: "flex", alignItems: "center" }}>
			<Lottie animationData={loader01} />
		</div>
		// TODO LOADER SPINNER COMPONENT
	);
};
