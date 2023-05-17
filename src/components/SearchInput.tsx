import { FormEvent, HTMLProps, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";

const SearchInput = (props: HTMLProps<HTMLInputElement>) => {
	const [isActive, setIsActive] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();

	const handleSearch = async (e: FormEvent<HTMLInputElement>) => {
		e.preventDefault();

		const searchString = e.currentTarget.value.trim();

		console.log(searchString.length);

		if (searchString.length >= 2) {
			const currentParams: { [key: string]: string } = {
				...Object.fromEntries(searchParams.entries()),
				search: searchString ?? "",
			};

			setSearchParams(currentParams);
		}

		if (searchString.length === 0 || searchString === "") {
			setSearchParams(undefined);
		}
	};

	return (
		<>
			<div className="relative flex justify-start items-center max-w-lg">
				<MagnifyingGlassIcon
					className={
						(isActive ? " text-green-600 " : "text-gray-300 ") +
						"absolute  block w-5 h-5 ml-2 "
					}
				/>
				<input
					type="text"
					name="search"
					{...props}
					onKeyUp={handleSearch}
					onFocus={() => setIsActive(true)}
					onBlur={() => setIsActive(false)}

					className={
						props.className +
						` dark:bg-gray-800 dark:text-gray-300 text-lg ` +
						"pl-10 w-[100%] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
					}
				/>
			</div>
		</>
	);
};

export default SearchInput;
