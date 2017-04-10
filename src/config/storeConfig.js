import {
    AsyncStorage,
} from 'react-native';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import apolloClient from  './apolloConfig';

let middlewareApplied;
const logger = createLogger();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
process.env.NODE_ENV === 'production'
    ? middlewareApplied = applyMiddleware(apolloClient.middleware(), thunk, /*logger*/)
    : middlewareApplied = applyMiddleware(apolloClient.middleware(), thunk, logger);


const store = createStore(rootReducer, {},
    compose(
        autoRehydrate(),
        middlewareApplied,
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ));
persistStore(store, {
    storage: AsyncStorage,
    //debounce: 50,
    whitelist: ['apollo', 'autoRehydrated'],
    //blacklist: [ 'navigationState' ],
}).purge([]);

export default store;