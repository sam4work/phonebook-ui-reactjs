import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";

interface ILink {
	label: string;
	url: string | null;
	active: boolean;
}

interface IPaginationProps {
	links: ILink[],
	extras: {
		// from: string,
		// first_page_url: string,
		// last_page: string,
		// last_page_url: string,
		// total: string,
		// current_page: string,
		// per_page: string,
		[key: string]: string
	}
}

const Pagination = (props: IPaginationProps): JSX.Element => {
	const filterUrl = (url: string | null) => {
		return (url ?? window.location.href)
			.replaceAll(
				import.meta.env.VITE_BASE_API_URL + "/api", // backend api path
				import.meta.env.VITE_BASE_URL + "/dashboard" // frontend ui path
			)
	};

	return (
		<>
			{props.links.length <= 3 ? null : (
				<div className="flex items-center justify-between border-t border-gray-200 dark:bg-gray-800 bg-white px-4 py-3 sm:px-6">
					<div className="flex flex-1 justify-between sm:hidden">
						<Link
							to={filterUrl(props.links[0].url)}
							className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Previous
						</Link>
						<Link
							to={filterUrl(props.links[props.links.length - 1].url)}
							className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Next
						</Link>
					</div>
					<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
						<div>
							<p className="text-sm text-gray-700">
								Showing{" "}
								<span className="font-medium">{props.extras.current_page}</span>{" "}
								to{" "}
								<span className="font-medium">
									{props.extras.total < props.extras.per_page
										? props.extras.total
										: props.extras.current_total}
								</span>{" "}
								of <span className="font-medium">{props.extras.total}</span>{" "}
								results
							</p>
						</div>
						<div>
							<nav
								className="isolate inline-flex -space-x-px rounded-md shadow-sm"
								aria-label="Pagination"
							>
								<Link
									to={filterUrl(props.extras.first_page_url)}
									className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
								>
									<span className="sr-only">Next</span>
									<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
								</Link>
								&nbsp;
								{props.links
									? props.links.map((link: ILink, idx: number) => {
										return idx === 0 ||
											idx === props.links.length - 1 ? null : (
											<Link
												to={`${filterUrl(link.url ?? window.location.href)}`}
												type="button"
												title={`${filterUrl(
													link.url ?? window.location.href
												)}`}
												key={`pagination-link-${idx}`}
												aria-current="page"
												className={`${" relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold " +
													(link.active === true
														? "text-green-300 dark:bg-gray-700 bg-white"
														: "dark:bg-gray-800 bg-green-400 text-white")
													}`}
											>
												{link.label.toString()}
											</Link>
										);
									})
									: null}
								&nbsp;
								<Link
									to={filterUrl(props.extras.last_page_url)}
									className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
								>
									<span className="sr-only">Next</span>
									<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
								</Link>
							</nav>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Pagination;
