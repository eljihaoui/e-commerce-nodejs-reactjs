import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from './auth'

const AdminRoute = ({ component: Component, ...restOfProps }) => (
    <Route
        {...restOfProps}
        render={props =>
            (isAuthenticated() && isAuthenticated().user.role === 1) ? (<Component {...props} />) : (<Redirect to={{ pathname: "/" }} />)
        }
    >
    </Route>
)

export default AdminRoute;
