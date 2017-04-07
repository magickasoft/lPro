'use strict';

import { combineReducers } from 'redux'
import apolloClient from  '../config/apolloConfig'
import { autoRehydrated } from './persist'
import { netinfo } from './netinfo'
// import { nav } from './nav'

const rootReducer = combineReducers({
    apollo: apolloClient.reducer(),
    autoRehydrated,
    netinfo,
    //nav,
});

export default rootReducer;
