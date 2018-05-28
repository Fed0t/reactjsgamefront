import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import FlashMessages from './FlashMessages';
import {routerReducer} from 'react-router-redux';
import {intlReducer} from 'react-intl-redux';
import AuthReducer from './AuthReducer';
import KinoReducer from './KinoReducer';

import {reducer as notifications} from 'react-notification-system-redux';

const allReducers = combineReducers({
    users: UserReducer,
    routing: routerReducer,
    flashMessages: FlashMessages,
    intl: intlReducer,
    auth: AuthReducer,
    notifications,
    kino: KinoReducer
});

export default allReducers