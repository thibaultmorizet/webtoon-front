import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/Providers/AuthProvider";
import "./styles/tailwind.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
	<BrowserRouter>
		<AuthProvider />
		<ToastContainer />
	</BrowserRouter>
);
