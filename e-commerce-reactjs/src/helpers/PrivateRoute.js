import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from './auth'

const PrivateRoute = ({ component: Component, ...restOfProps }) => (
    <Route
        {...restOfProps}
        render={props =>
            isAuthenticated() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/signin" }} />)
        }
    >
    </Route>
)

export default PrivateRoute
