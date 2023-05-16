import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Error404 from "@src/errors/Error404";
import App from "@src/App";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import PrivateRoute from "./features/auth/components/PrivateRoute";
import Dashboard from "./features/auth/ui/dashboard";
import AuthLayout from "./features/auth/components/layouts/AuthLayout";
import Contacts from "./features/contacts/ui";
import ContactCreate from "./features/contacts/ui/create";
import ContactEdit from "./features/contacts/ui/edit";

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
				<Route path="contacts" element={<Contacts />} />
				<Route path="contacts/:slug/edit" element={<ContactEdit />} />
				<Route path="contacts/create" element={<ContactCreate />} />

			</Route>
		</>


	)
);

export default AppRouter;
