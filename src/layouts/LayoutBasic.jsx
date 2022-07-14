import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import UserGuest from "../pages/UserGuest";
import useAuth from "../hooks/useAuth";

export default function LayoutBasic(props) {
  const { routes } = props;
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/login" component={UserGuest} />
        <Redirect to="/login" />
      </>
    );
  }

  return (
    <>
      <LoadRoutes routes={routes} />
    </>
  );
}

function LoadRoutes(props) {
  const { routes } = props;

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
