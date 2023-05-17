import { Fragment, HTMLProps, ReactNode, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}
interface IOptionsProps extends HTMLProps<HTMLOptionElement> {
	description?: string;
}

interface ISelectProps {
	options: IOptionsProps[];
	name: string;
	errors?: string[];
	label: string | ReactNode;
	defaultValue?: string;
}

const DropdownList = (props: ISelectProps) => {
	const [selectedOption, setSelectedOption] = useState(props.defaultValue)

	return (
		<>
			{

				<Listbox name={props.name} value={selectedOption} onChange={setSelectedOption} >
					{({ open }) => (
						<>
							<Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
								{props.label}
							</Listbox.Label>
							<div className="relative mt-2">
								<Listbox.Button className="relative w-full cursor-default rounded-md dark:bg-gray-800 dark:text-gray-300 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 sm:text-sm sm:leading-6">
									<span className="flex items-center">
										<span className="ml-3 block truncate capitalize">
											{selectedOption} &nbsp;
										</span>
									</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
										<ChevronUpDownIcon
											className="h-5 w-5 text-gray-400"
											aria-hidden="true"
										/>
									</span>

								</Listbox.Button>

								<p className="text-sm text-red-500">
									{props.errors ? props.errors[0] : ""}
								</p>

								<Transition
									show={open}
									as={Fragment}
									leave="transition ease-in duration-100"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md dark:bg-gray-800 dark:text-gray-300 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

										{props.options.map((option, idx) => (
											<Listbox.Option
												key={idx}
												className={({ active }) =>
													classNames(
														active
															? "bg-green-600 text-white"
															: "text-gray-900 dark:text-gray-600",
														"relative cursor-default select-none py-2 pl-3 pr-9"
													)
												}
												disabled={option.value === ""}

												value={option.value}
											>
												{({ selected, active }) => (
													<>
														<div className="flex items-center">
															<span
																className={classNames(
																	selected ? "font-semibold" : "font-normal",
																	"ml-3 block truncate",
																	"capitalize"
																)}
															>
																{option.name}
															</span>
														</div>

														{selected ? (
															<span
																className={classNames(
																	active ? "text-white" : "text-indigo-600",
																	"absolute inset-y-0 right-0 flex items-center pr-4"
																)}
															>
																<CheckIcon className="h-5 w-5" aria-hidden="true" />
															</span>
														) : null}
													</>
												)}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</Transition>
							</div>
						</>
					)}
				</Listbox >
			}
		</>
	);
};

export default DropdownList;
