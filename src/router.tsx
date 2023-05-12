import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Error404 from "@src/errors/Error404";
import App from "@src/App";

const AppRouter = createBrowserRouter(
	createRoutesFromElements(
			<>
					<Route path="/" errorElement={<Error404 />} >
							<Route index element={<App />} />
					</Route>

			</>
	)
);

export default AppRouter;
