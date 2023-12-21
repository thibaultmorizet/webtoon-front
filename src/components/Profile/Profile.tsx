import { AuthData } from "../Auth/AuthWrapper";

export default function Profile() {
	const { user } = AuthData();
	return (
		<div className="bg-gray-900">
			<div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
				<div className="mx-auto max-w-2xl">
					<form>
						<div className="space-y-12">
							<div className="pb-12">
								<h2 className="text-base font-semibold leading-7 text-white text-center">
									Personal Information
								</h2>

								<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-4 sm:col-start-2 justify-center">
											<div className="mt-2 flex flex-row items-center">
												<span className="mr-4  inline-block text-sm font-medium leading-6 text-white h-min">
													Email
												</span>
												<p className="bg-white/[0.04] block w-full border-0 rounded-md px-2 py-1.5 text-white/[0.7] ring-1 shadow-sm ring-inset ring-white/[0.07]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6">
													{user?.email}
												</p>
											</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="first-name"
											className="block text-sm font-medium leading-6 text-white"
										>
											First name
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="given-name"
												className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium leading-6 text-white"
										>
											Last name
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="last-name"
												id="last-name"
												autoComplete="family-name"
												className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-white"
										>
											Password
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="password"
												id="password"
												autoComplete="new-password"
												className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="sm:col-span-3">
										<label
											htmlFor="confirm-password"
											className="block text-sm font-medium leading-6 text-white"
										>
											Confirm Password
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="confirm-password"
												id="confirm-password"
												autoComplete="new-password"
												className="bg-white/[0.05] block w-full border-0 rounded-md px-2 py-1.5 text-white ring-1 shadow-sm ring-inset ring-white/[0.1]  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-6 flex items-center justify-end gap-x-6">
							<button
								type="submit"
								className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Update Profile
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
