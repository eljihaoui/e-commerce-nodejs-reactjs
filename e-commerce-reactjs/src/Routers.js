import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./components/admin/category/AddCategory";
import AddProduct from "./components/admin/product/AddProduct";
import Product from "./components/admin/product/Product";
import AdminDashboard from "./components/user/AdminDashboard";
import Dashboard from "./components/user/Dashboard";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Cart from "./core/Cart";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Shop from "./core/Shop";
import SingleProduct from "./core/SingleProduct";
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
        <PrivateRoute exact path="/shop" component={Shop} />

        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/category/create" component={AddCategory} />
        <AdminRoute exact path="/product/create" component={AddProduct} />
        <PrivateRoute exact path="/product/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
