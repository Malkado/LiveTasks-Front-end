import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './helpers/PrivateRoute';

import Home from './pages/home/index';
import SigIn from './pages/singIn/index';
import SigOut from './pages/sigout/index';
import Dashboard from './pages/dashboard/index';

export default function Routes() {
    // contructor(props){
    //     super(props);
    //     this.state = { value: "" };
    // }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={SigIn} />
                <Route path="/cadastro" component={SigOut} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
}