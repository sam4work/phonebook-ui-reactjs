import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Error404 from "@src/errors/Error404";
import App from "@src/App";
import Login from "./feature/auth/Login";
import Register from "./feature/auth/Register";
import PrivateRoute from "./feature/auth/components/PrivateRoute";
import Dashboard from "./feature/auth/ui/dashboard";
import AuthLayout from "./feature/auth/components/layouts/AuthLayout";

const AppRouter = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" errorElement={<Error404 />} >
				<Route index element={<App />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Route>

			<Route
				path="/dashboard"
				errorElement={<Error404 />}
				element={<PrivateRoute component={<AuthLayout />} />}>
				<Route index element={<Dashboard />} />
			</Route>
		</>


	)
);

export default AppRouter;
