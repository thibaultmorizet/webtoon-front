import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { AuthData } from "../Auth/AuthWrapper";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const { login } = AuthData();

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		login(email, password);
	};

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const seePasswordIcon = () => {
		if (showPassword)
			return (
				<EyeIcon
					className="h-6 w-6 text-white/[0.7]"
					aria-hidden="true"
					onClick={() => setShowPassword(false)}
				/>
			);
		else
			return (
				<EyeSlashIcon
					className="h-6 w-6 text-white/[0.7]"
					aria-hidden="true"
					onClick={() => setShowPassword(true)}
				/>
			);
	};

	useEffect(() => {
		if (showPassword) {
			document.getElementById("password")!.setAttribute("type", "text");
		} else {
			document.getElementById("password")!.setAttribute("type", "password");
		}
	}, [showPassword]);
	
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
								Email
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
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
							<div className="mt-2 relative">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="h-full absolute top-0 right-0 flex items-center ">
									<div className="px-2 my-1 mr-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 cursor-pointer">
										{seePasswordIcon()}
									</div>
								</div>
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
					</form>
				</div>
			</div>
		</>
	);
}
