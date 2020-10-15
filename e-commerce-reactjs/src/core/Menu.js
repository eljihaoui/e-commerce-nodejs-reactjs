import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { API_URL, toastrOptions } from "../config";
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { isAdmin, isAuthenticated } from "../helpers/auth";
import { useSelector } from 'react-redux'
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#000", fontWeight: "bold" };
  } else {
    return { color: "#fff" };
  }
};
const Menu = (props) => {
  let countItem = useSelector(state=>state.cart.count);
  const signout = () => {
    fetch(`${API_URL}/signout`)
      .then(() => {
        toastr.info('user sign out ', 'Connexion ....', toastrOptions)
        localStorage.removeItem('jwt_info')
        props.history.push('/signin')
      })
      .catch()
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-info">
        <Link className="navbar-brand" to="/">
          E-Commerce
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <Fragment>
              <li className="nav-item active">
                <Link style={isActive(props.history, "/")} className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link style={isActive(props.history, "/shop")} className="nav-link" to="/shop">
                  Shopping <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item active">
                <Link
                  style={isActive(props.history, "/admin/dashboard")}
                  className="nav-link"
                  to={`${(isAuthenticated() && isAdmin()) ? '/admin' : ''}/dashboard`}>
                  Dashboard
                  </Link>
              </li>

              <li className="nav-item active">
                <Link style={isActive(props.history, "/products")} className="nav-link" to="/products">
                  Products <span className="sr-only">(current)</span>
                </Link>
              </li>

            </Fragment>



          </ul>
          <ul className="navbar-nav ml-auto">
            {
              !isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link style={isActive(props.history, "/signin")} className="nav-link" to="/signin" >Connexion </Link>
                  </li>
                  <li className="nav-item">
                    <Link style={isActive(props.history, "/signup")} className="nav-link" to="/signup">Register</Link>
                  </li>
                </Fragment>
              )}
            {
              isAuthenticated() && (
                <Fragment>
                  <li className="nav-item" style={{ cursor: 'pointer' }}>
                    <Link to ="/cart" style={isActive(props.history, "/cart")}>
                     <span className="nav-link">
                      <span><b>Cart</b></span> <span className="badge badge-warning  px-2 py-1">{countItem}</span>
                    </span>
                    </Link>
                   
                  </li>
                  <li className="nav-item" style={{ cursor: 'pointer' }}>
                    <span className="nav-link" style={isActive(props.history, "/signout")} onClick={signout}>SignOut</span>
                  </li>
                </Fragment>
              )}

          </ul>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Menu);
