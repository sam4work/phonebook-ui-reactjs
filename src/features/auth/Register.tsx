import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Input from "@/components/Input";
import { isAxiosError } from "axios";

const Register = () => {

	const [isSubmitting, setIsSubmitting] = useState(false);


	const { register, errors } = useAuth("public", "/dashboard")


	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {

		e.preventDefault()
		setIsSubmitting(true);

		const data = new FormData(e.currentTarget)

		try {
			await register(data);
		} catch (error) {
			if (isAxiosError(error)) console.log(error.message)
		} finally {

			setIsSubmitting(false);
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
						Create new account
					</h2>
					<ul
						className={
							(Object.keys(errors).length > 0 ? " visible " : " invisible ") +
							" text-center text-sm border border-red-50 p-2 text-red-500 mt-2"
						}
					>
						{Object.values(errors).map((e, idx: number) => (
							<li key={'errors' + idx} className="block">{e}</li>
						)
						)}
					</ul>


				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
					<form onSubmit={handleRegister} className="space-y-6" >

						<div className="grid grid-cols-6 md:grid-cols-12 gap-4">

							<div className="col-span-6">

								<Input
									label="First Name *"
									name="first_name"
									placeholder="John"
									errors={errors.first_name}
								/>

							</div>

							<div className="col-span-6">
								<Input
									label="Last Name *"
									name="last_name"
									placeholder="Doe"
									errors={errors.last_name}
								/>

							</div>


						</div>

						<div>
							<Input
								label="Email *"
								name="email"
								type="email"
								placeholder="johndoe@example.com"
								errors={errors.email}
							/>
						</div>

						<div className="grid grid-cols-6 md:grid-cols-12 gap-4">

							<div className="col-span-6">
								<Input
									label="Password *"
									name="password"
									placeholder="Retype password"
									errors={errors.password}
								/>

							</div>

							<div className="col-span-6">
								<Input
									label="Password *"
									name="password_confirmation"
									placeholder="Retype password"
									errors={errors.password}

								/>

							</div>


						</div>


						<div>
							<button
								type="submit"
								disabled={isSubmitting}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>

								<span
									className={isSubmitting ? "animate-pulse text-gray-400" : ""}
								>
									{isSubmitting ? "Creating Account ..." : "Create Account"}
								</span>
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already a member?{' '}
						<Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							Log In
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}


export default Register;
