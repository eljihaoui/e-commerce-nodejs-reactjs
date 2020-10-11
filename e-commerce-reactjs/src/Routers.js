import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./components/admin/category/AddCategory";
import AddProduct from "./components/admin/product/AddProduct";
import Product from "./components/product/Product";
import AdminDashboard from "./components/user/AdminDashboard";
import Dashboard from "./components/user/Dashboard";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Home from "./core/Home";
import Menu from "./core/Menu";
import AdminRoute from "./helpers/AdminRoute";
import PrivateRoute from "./helpers/PrivateRoute";
const Routers = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/products' component={Product} />
        <PrivateRoute exact path="/" component={Home} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/category/create" component={AddCategory} />
        <AdminRoute exact path="/product/create" component={AddProduct} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
