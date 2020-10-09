import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
const Routers = () => {
  return (
    <BrowserRouter>
    <Menu/>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
