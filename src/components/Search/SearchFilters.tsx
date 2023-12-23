import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { classNames, firstLetterToUpperCase } from "../../utils/statics";
import { SearchData } from "../Providers/SearchProvider";

export default function SearchFilters({
	children,
}: {
	children?: JSX.Element;
}) {
	const [selectedSort, setSelectedSort] = useState("Most Popular");
	const sortOptions = [
		{ name: "Most Popular" },
		{ name: "Best Rating" },
		{ name: "Newest" },
	];

	const { filters } = SearchData();

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<div className="bg-gray-900 flex-1">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-white">Filters</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-gray-700 p-2 text-white"
											onClick={() => setMobileFiltersOpen(false)}
										>
											<span className="sr-only">Close menu</span>
											<XMarkIcon className="h-6 w-6" aria-hidden="true" />
										</button>
									</div>

									{/* Filters */}
									<form className="mt-4 border-t border-gray-400">
										{filters?.map((section) => (
											<Disclosure
												as="div"
												key={section.filterName}
												className="border-t border-gray-400 px-4 py-6"
											>
												{({ open }) => (
													<>
														<h3 className="-mx-2 -my-3 flow-root">
															<Disclosure.Button className="flex w-full items-center justify-between rounded-lg bg-gray-700 px-2 py-3 text-white hover:text-gray-400">
																<span className="font-medium text-white">
																	{firstLetterToUpperCase(section.filterName)}
																</span>
																<span className="ml-6 flex items-center">
																	{open ? (
																		<MinusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	) : (
																		<PlusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	)}
																</span>
															</Disclosure.Button>
														</h3>
														<Disclosure.Panel className="pt-6">
															<div className="space-y-6">
																{section?.filterValues?.map(
																	(option, optionIdx) => (
																		<div
																			key={option.name}
																			className="flex items-center"
																		>
																			<input
																				id={`filter-mobile-${section.filterName}-${optionIdx}`}
																				name={`${section.filterName}[]`}
																				defaultValue={option.name}
																				type="checkbox"
																				defaultChecked={option.checked}
																				className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
																			/>
																			<label
																				htmlFor={`filter-mobile-${section.filterName}-${optionIdx}`}
																				className="ml-3 min-w-0 flex-1 text-white"
																			>
																				{option.name}
																			</label>
																		</div>
																	)
																)}
															</div>
														</Disclosure.Panel>
													</>
												)}
											</Disclosure>
										))}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-400 pb-6 pt-24">
						{/* Search bar */}
						<div className="min-w-5" />
						<div className="flex-1 max-w-xl">
							<label htmlFor="search" className="sr-only">
								Search
							</label>
							<div className="relative text-gray-400 focus-within:text-gray-600">
								<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
									<MagnifyingGlassIcon className="h-6 w-6" />
								</div>
								<input
									id="search"
									name="search"
									className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
									placeholder="Search"
									type="search"
								/>
							</div>
						</div>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-white hover:text-gray-300">
										Sort
										<ChevronDownIcon
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-white group-hover:text-gray-300"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-0">
											{sortOptions.map((option, index) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<button
															onClick={() => setSelectedSort(option.name)}
															className={classNames(
																option.name === selectedSort
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																active ? "bg-gray-100" : "",
																"inline-block px-4 py-2 text-sm w-full ",
																index === 0 ? "rounded-t-md" : "",
																index === sortOptions.length - 1
																	? "rounded-b-md"
																	: ""
															)}
														>
															{option.name}
														</button>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="-m-2 ml-4 p-2 text-white hover:text-gray-300 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon className="h-5 w-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pb-24 pt-6">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							{/* Filters */}
							<form className="hidden lg:block">
								{filters?.map((section, index) => (
									<Disclosure
										as="div"
										key={section.filterName}
										className={classNames(
											"border-b border-gray-400 py-6",
											index === filters.length - 1 ? "border-b-0" : ""
										)}
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 bg-gray-700 py-3 text-sm text-white hover:text-gray-400">
														<span className="font-medium text-white">
															{section.filterName}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															) : (
																<PlusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-4">
														{section?.filterValues?.map((option, optionIdx) => (
															<div
																key={option.name}
																className="flex items-center"
															>
																<input
																	id={`filter-${section.filterName}-${optionIdx}`}
																	name={`${section.filterName}[]`}
																	defaultValue={option.name}
																	type="checkbox"
																	defaultChecked={option.checked}
																	className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500"
																/>
																<label
																	htmlFor={`filter-${section.filterName}-${optionIdx}`}
																	className="ml-3 text-sm text-white"
																>
																	{option.name}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className="lg:col-span-3">{children}</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
