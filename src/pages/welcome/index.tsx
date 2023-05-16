import useAuth from "@/features/auth/hooks/useAuth";
import useSettingsStore from "@/hooks/useSettingsStore";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


export default function Welcome() {
	const { dark, toggleDark } = useSettingsStore()
	const { user } = useAuth("admin")

	return (
		<div className="h-screen flex flex-col justify-center items-center space-y-10 dark:bg-gray-900">
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<section className="bg-gradient-to-tr from-blue-500 to-pink-600 bg-clip-text">
					<h2 className="text-sm md:text-4xl lg:text-7xl text-transparent font-black ">
						GetInnitized
					</h2>
				</section>
			</motion.div>

			<div className="mx-auto max-w-2xl">

				<div className="text-center">
					<h3 className="text-2xl font-bold tracking-tight dark:text-gray-300 text-gray-900 sm:text-5xl">
						PhoneBook
					</h3>
					<p className=" text-lg leading-8 text-gray-600">
						Your favourite provider, for secure online contact storage.
					</p>

				</div>
			</div>


			<section className="flex justify-around space-x-5 max-w-lg">
				<button
					type="button"
					onClick={() => toggleDark()}
					className="inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
				>
					{dark ?

						<span className="flex justify-center items-center gap-1">
							<MoonIcon className="h-4 w-4" />
							Dark
						</span>

						:
						<span className="flex justify-center items-center gap-1">
							<SunIcon className="h-4 w-4" />
							Light
						</span>
					}
				</button>
			</section>

			<section className="flex justify-around space-x-5 max-w-lg">
				{
					user ?
						<div className=" flex flex-col justify-center space-y-2">
							<p className="text-gray-400 text-center ">You are logged in as</p>
							<Link
								to={"/dashboard"}
								className="inline-flex  justify-center gap-1 items-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
							>

								<UserCircleIcon className="h-6 w-6 text-white" />
								<span className="capitalize">{user.name}</span>
							</Link>
						</div>
						:
						<>
							<Link
								to={"/login"}
								className="inline-flex w-56 justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
							>
								Login
							</Link>

							<Link
								to={"/login"}
								className="inline-flex w-56 justify-center rounded-md border border-transparent border-pink-600 py-2 px-4 text-sm font-medium text-pink-600 shadow-sm hover:text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
							>
								Get Started
							</Link>
						</>
				}
			</section>
		</div>
	)
}
