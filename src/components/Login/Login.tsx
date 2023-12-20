import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { loginCheck } from "../../actions/loginCheck";
import feathersClient from "../../client";

export default function Login() {
	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) return;
		loginCheck(token);
	}, []);

	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const [error, setError] = useState(null);

	const handleEmailInputChange = (event: { target: { value: any } }) => {
		setCredentials({ ...credentials, email: event.target.value });
	};
	const handlePasswordInputChange = (event: { target: { value: any } }) => {
		setCredentials({ ...credentials, password: event.target.value });
	};
	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			setError(null);

			const result = await feathersClient.authenticate({
				strategy: "local",
				...credentials,
			});
			const token = result.accessToken;

			Cookies.set("token", token);
			Cookies.set("loggedIn", "true");
			Cookies.set("user", JSON.stringify(result.user));

			window.location.replace("/");
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 align-middle bg-gray-900">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
						Login to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" method="POST" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-white"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={credentials.email}
									onChange={handleEmailInputChange}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-white"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={credentials.password}
									onChange={handlePasswordInputChange}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
						{error && <div className="text-red-500 text-center">{error}</div>}
					</form>
				</div>
			</div>
		</>
	);
}
