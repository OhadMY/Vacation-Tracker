import React, { FC } from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useAppSelector } from "../../../app/hooks";

export type PublicRouteProps = RouteProps;

export const PublicRoute: FC<PublicRouteProps> = ({
  children,
  ...routeProps
}) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  if (!isLoggedIn) return <Route {...routeProps} />;
  return <Redirect to="/" />;
};
