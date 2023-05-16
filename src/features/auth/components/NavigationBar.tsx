import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import useSettingsStore from "@/hooks/useSettingsStore";

const navigation = [
	{ name: "Dashboard", href: "/dashboard" },
	{ name: "Contacts", href: "/dashboard/contacts" },
];
const userNavigation = [
	{ name: "Profile", slug: "profile", href: "/dashboard/profile" },
	{ name: "Settings", slug: "settings", href: "#" },
	{ name: "Sign out", slug: "sign-out", href: "#" },
];


const NavigationBar = (): JSX.Element => {
	const { user, logout } = useAuth("auth");

	const { dark, toggleDark } = useSettingsStore();

	const navigateTo = useNavigate();

	const handleLogout = async () => {
		await logout();
	};

	return (
		<>
			<Disclosure as="nav" className="bg-gray-800 ">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
							<div className="flex h-16 items-center justify-between">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<Link to={"/"}>
											<svg
												className="w-8 text-white"
												viewBox="0 0 24 24"
												strokeLinejoin="round"
												strokeWidth="2"
												strokeLinecap="round"
												strokeMiterlimit="10"
												stroke="currentColor"
												fill="none"
											>
												<rect x="3" y="1" width="7" height="12" />
												<rect x="3" y="17" width="7" height="6" />
												<rect x="14" y="1" width="7" height="6" />
												<rect x="14" y="11" width="7" height="12" />
											</svg>
										</Link>
									</div>
									<div className="hidden md:block">
										<div className="ml-10 flex items-baseline space-x-4">
											{navigation.map((item) => (
												<NavLink
													to={item.href}
													end={["/dashboard"].includes(
														item.href
													)}
													key={item.name}
													className={({ isActive }) =>
														(isActive
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white") +
														" " +

														"px-3 py-2 rounded-md text-sm font-medium"

													}
												>
													{item.name}
												</NavLink>
											))}
										</div>
									</div>
								</div>
								<div className="hidden md:block">
									<div className="ml-4 flex space-x-2 items-center md:ml-6">
										<button
											type="button"
											title={`Switch to ${dark ? "light" : "dark"} mode.`}
											onClick={() => toggleDark()}
											className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										>
											<span className="sr-only">Toggle dark mode</span>
											{dark ? (
												<MoonIcon className="h-6 w-6" aria-hidden="true" />
											) : (
												<SunIcon className="h-6 w-6" aria-hidden="true" />
											)}
										</button>

										{/* Profile dropdown */}
										<Menu as="div" className="relative ml-3">
											<div>
												<Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
													<span className="sr-only">Open user menu</span>
													<UserCircleIcon className="h-8 w-8 text-gray-400" />
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
												<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													{userNavigation.map((item) => (
														<Menu.Item
															as={"div"}
															onClick={() =>
																item.slug === "sign-out"
																	? handleLogout()
																	: navigateTo(item.href)
															}
															key={item.name + 1}
														>
															{({ active }) => (
																<li
																	className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}

																>
																	{item.name}
																</li>
															)}
														</Menu.Item>
													))}
												</Menu.Items>
											</Transition>
										</Menu>
									</div>
								</div>
								<div className="-mr-2 flex md:hidden">
									{/* Mobile menu button */}
									<Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
										) : (
											<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
										)}
									</Disclosure.Button>
								</div>
							</div>
						</div>

						<Disclosure.Panel as="ul" className="md:hidden">
							<div className="space-y-2 px-2 pt-2 pb-3 sm:px-3 ">
								{navigation.map((item) => (
									<li key={item.name} className={"block"}>
										<NavLink
											to={item.href}
											end={["/dashboard"].includes(
												item.href
											)}
											className={({ isActive }) =>
												(isActive
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white") +
												" " +
												"px-3 py-2 rounded-md text-sm font-medium"
											}
										>
											{item.name}
										</NavLink>
									</li>
								))}
							</div>
							<div className="border-t border-gray-700 pt-4 pb-3">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<UserCircleIcon
											className="h-10 w-10 text-gray-400"
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-white">
											{user?.name}
										</div>
										<div className="text-sm font-medium leading-none text-gray-400">
											{user?.email}
										</div>
									</div>
									<button
										type="button"
										className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div className="mt-3 space-y-1 px-2">
									{userNavigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="li"
											onClick={() =>
												item.slug === "sign-out"
													? handleLogout()
													: navigateTo(item.href)
											}
											className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure >
		</>
	);
};

export default NavigationBar;
