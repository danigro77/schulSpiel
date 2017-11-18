import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './Reducers/index'
import {Provider} from 'react-redux'
import './index.scss';

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import CreateAccount from "./Containers/Auth/CreateAccount/create_account";
import LandingPage from "./Containers/Home/LandingPage/landing_page";
import Login from "./Containers/Auth/Login/login";


const createStoreWithThunk = applyMiddleware(thunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithThunk(reducers)}>
        <BrowserRouter>
            <Switch>
                <Route path="/createAccount" component={CreateAccount}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={LandingPage}/>
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
