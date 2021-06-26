import React, { FC } from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useAppSelector } from "../../../app/hooks";

export type PrivateRouteProps = RouteProps;

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  ...routeProps
}) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  if (isLoggedIn) return <Route {...routeProps} />;
  return <Redirect to="/login" />;
};
