//packages
import React, {Component} from 'react'
import {Router, Route, browserHistory, IndexRoute} from "react-router";
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {IntlProvider, intlReducer} from 'react-intl-redux'
import store from '../store';

//components
import GenericNotFound from '../components/GenericNotFound';
import App from '../components/App';
import TodoApp from './TodoApp/TodoApp';
import Login from './login/Login';
import SignUp from './signup/SignUp';
import Welcome from '../components/Welcome';
import Members from '../components/Members';
import Dashboard from '../components/Dashboard';
import AppKino from '../components/kino/AppKino';
import requiredAuth from '../utils/requireauth';
import AllGames from '../components/kino/AllGames';
import CheckTicket from '../components/kino/CheckTicket';

//constants
const history = syncHistoryWithStore(browserHistory, store);

export default class Root extends Component {
    render() {
        return (
                <Provider store={store}>
                    <IntlProvider>
                        <Router history={history}>
                            <Route path={"/"} component={App}>
                                <IndexRoute component={AppKino}/>
                                <Route path={"/login"} component={Login}/>
                                <Route path={"/sign-up"} component={SignUp}/>
                                <Route path={"/all-draws"} component={AllGames}/>
                                <Route path={"/check-ticket"} component={CheckTicket}/>
                                <Route path={"/todo"} component={requiredAuth(TodoApp)}/>
                                <Route path={"*"} component={GenericNotFound}/>
                            </Route>
                            {/*<Route path={"/users"} component={Members} >*/}
                            {/*<IndexRoute component={Members} />*/}
                            {/*</Route>*/}
                        </Router>
                    </IntlProvider>
                </Provider>
        );
    }
}