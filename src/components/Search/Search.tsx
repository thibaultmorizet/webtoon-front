import { SearchData } from "../Providers/SearchProvider";
import SearchFilters from "./SearchFilters";

export default function Search() {
	const { results } = SearchData();

	return (
		<SearchFilters>
			<div className="bg-gray-900 ">
				<div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8 ">
					<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
						{results?.map((product) => (
							<div key={product.id} className="group relative">
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
									<img
										src={product.poster}
										alt={"image " + product.title}
										loading="lazy"
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div>
										<h3 className="text-sm text-white">
											<span aria-hidden="true" className="absolute inset-0" />
											{product.title}
										</h3>
										<p className="mt-1 text-sm text-gray-300">{`Last Chapter : ${product.lastChapter}`}</p>
										<p className="mt-1 text-sm text-gray-300">{`Status : ${product.status}`}</p>
										<p className="mt-1 text-sm text-gray-300">{`Language : ${product.language}`}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</SearchFilters>
	);
}
