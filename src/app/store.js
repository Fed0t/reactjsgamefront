import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux'
import allReducers from './reducers';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {setCurrentUser,logout} from './actions/AuthActions'
import {browserHistory} from "react-router";
import {addLocaleData} from 'react-intl';
import * as localeData from './locales/index';
import itLocaleData from 'react-intl/locale-data/it';
import roLocaleData from 'react-intl/locale-data/ro';
import bgLocaleData from 'react-intl/locale-data/bg';
import {updateIntl} from 'react-intl-redux';

addLocaleData(...roLocaleData);
addLocaleData(...itLocaleData);
addLocaleData(...bgLocaleData);

const routerMid = routerMiddleware(browserHistory);
const logger = createLogger();
const language = (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

const initialState = {
    intl: {
        defaultLocale: "en",
        locale: languageWithoutRegionCode,
        messages: messages
    },
};

// logger
const middleware = applyMiddleware(thunk, promise,  routerMid);
// const ReduxDev =  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
    allReducers,
    initialState,
    compose(
        middleware
    )
);

if (localStorage.apiToken && localStorage.userData && localStorage.apiToken != 'undefined') {

    setAuthorizationToken(localStorage.apiToken);
    store.dispatch(setCurrentUser(localStorage.userData));
    const currentUser = JSON.parse(localStorage.userData);

    const messages = localeData[currentUser.language] || localeData[language] || localeData.en;

    store.dispatch(updateIntl({
        locale: currentUser.language,
        messages,
    }));

}else{
    logout();
}


export default store;