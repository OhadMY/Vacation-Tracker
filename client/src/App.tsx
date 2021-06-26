import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { me } from "./app/slices/userSlice";
import { BrowserRouter, Switch } from "react-router-dom";
import { AdminRoute, PrivateRoute, PublicRoute } from "./utils";

// Importing Pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Statistics } from "./pages/Statistics";

function App() {
  const loading = useAppSelector((state) => state.user.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  if (loading) return <div>loading</div>;
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <AdminRoute path="/statistics" component={Statistics} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
