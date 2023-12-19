import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import feathersClient from "../../client";
import { loginCheck } from "../../actions/loginCheck";

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

	const handleEmailInputChange = (event: { target: { value: any } }) => {
		setCredentials({ ...credentials, email: event.target.value });
	};
	const handlePasswordInputChange = (event: { target: { value: any } }) => {
		setCredentials({ ...credentials, password: event.target.value });
	};
	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
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
			throw Error(error);
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 align-middle">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" method="POST" onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
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
									className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={credentials.email}
									onChange={handleEmailInputChange}
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
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
									className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={credentials.password}
									onChange={handlePasswordInputChange}
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
