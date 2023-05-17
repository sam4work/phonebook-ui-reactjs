import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const Login = () => {

	const [errors, setErrors] = useState<string>();

	const { login } = useAuth("public", "/dashboard")


	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {

		e.preventDefault()

		const data = new FormData(e.currentTarget)
		const email = data.get("email")?.toString() ?? "";
		const password = data.get("password")?.toString() ?? "";

		if (email !== "" || password !== "") {

			await login({
				email: email,
				password: password,
			}, setErrors)

		}


	}



	return (
		<>
			<div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="flex items-center  justify-center">
						<div className="flex-shrink-0 ">
							<Link to={"/"}>
								<svg
									className="w-10 "
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

					</div>
					<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-300">
						Sign in to your account
					</h2>
					<p
						className={
							(errors ? " visible " : " invisible ") +
							" text-center text-sm bg-red-50 p-2 text-red-500 mt-2"
						}
					>
						{errors}
					</p>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleLogin} className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									defaultValue={"sam4work10@gmail.com"}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								<div className="text-sm">
									<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
										Forgot password?
									</a>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									defaultValue={"sam4work10@gmail.com"}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?{' '}
						<Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Register
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}


export default Login;
