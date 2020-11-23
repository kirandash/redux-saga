import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import { createLogger } from 'redux-logger';
import { Iterable } from 'immutable'
// Create Saga Middleware
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'

import { getQuery } from './utility'
// Init all sagas
import { initSagas } from './initSagas';
import { reducer } from './combineReducers';
import { defaultState } from './defaultState'

const stateTransformer = (state) => {
    if (Iterable.isIterable(state)) return state.toJS();
    else return state;
};

const logger = createLogger({
    stateTransformer,
});

export const getStore = ()=>{
    // Creation of Saga middleware
    const sagaMiddleware = createSagaMiddleware();
    // Adding saga middleware to middleware chain
    const middleWares = [sagaMiddleware,thunk];
    if (getQuery()['logger']) { middleWares.push(logger)}
    const composables = [applyMiddleware(...middleWares)
    //    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ];
    const enhancer = compose(
        ... composables
);
    const store = createStore(
        reducer,
        defaultState,
        enhancer,
    );
    // Combne all sagas with saga middleware
    // Sagas can only be called after the middlware is placed
    initSagas(sagaMiddleware);
    return store;
};