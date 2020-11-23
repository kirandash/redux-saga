// Import all sagas from sagas/index.js
import * as sagas from './sagas';

// Run sagamiddleware on all sagas to make sure the context is correct
export const initSagas = (sagaMiddleware)=>{
    Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};