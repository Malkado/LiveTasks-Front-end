import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            cookies.get('Token') ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }

    />
);

export default PrivateRoute;