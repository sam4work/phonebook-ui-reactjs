import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar";

const AuthLayout = (): JSX.Element => {

	return (
		<>
			<NavigationBar />
			<div className="dark:bg-gray-900 min-h-screen overflow-x-hidden">

				<main className="overflow-x-hidden overflow-y-scroll">
					<div className="mx-auto max-w-7xl py-6">
						<div className="px-4 py-6 sm:px-0">
							<div className=" rounded-lg border-4 border-dashed border-transparent space-y-5">
								<Outlet />
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default AuthLayout;
