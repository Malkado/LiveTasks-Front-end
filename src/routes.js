import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/home/index';
import SigIn from './pages/singIn/index';
import SigOut from './pages/sigout/index';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={SigIn} />
                <Route path="/cadastro" component={SigOut} />

            </Switch>
        </BrowserRouter>
    );
}