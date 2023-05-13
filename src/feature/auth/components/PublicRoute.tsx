import React from "react";
import useAuth from "@src/feature/auth/hooks/useAuth";

interface IPublicRouteProps {
  component: React.ReactNode;
}

const PublicRoute = ({ component }: IPublicRouteProps): JSX.Element => {
  const { user } = useAuth("public");

  return <>{!user ? component : null}</>;
};

export default PublicRoute;
