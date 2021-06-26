import React, { FC } from "react";
import { RouteProps, Route, Redirect } from "react-router";
import { useAppSelector } from "../../../app/hooks";

export type AdminRouteProps = RouteProps;

export const AdminRoute: FC<AdminRouteProps> = ({
  children,
  ...routeProps
}) => {
  const isAdmin = useAppSelector(
    (state) => state.user.userData?.userType === 1
  );
  if (isAdmin) return <Route {...routeProps} />;
  return <Redirect to="/" />;
};
