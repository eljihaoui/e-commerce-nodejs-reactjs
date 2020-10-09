import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Home from "./core/Home";
const Routers = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/singin" component={Signin} />
        <Route exact path="/singup" component={Signup} />
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
