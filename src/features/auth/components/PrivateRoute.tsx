import React from "react";
import useAuth from "@/features/auth/hooks/useAuth";

interface IPrivateRouteProps {
	component: React.ReactNode;
}

const PrivateRoute = ({ component }: IPrivateRouteProps): JSX.Element => {
	const { user } = useAuth("auth");

	return <>{user ? component : null}</>;
};

export default PrivateRoute;
