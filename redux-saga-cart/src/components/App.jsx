import { getStore } from '../getStore';
import React from 'react';
import { Provider } from 'react-redux'
import { MainContainer } from '../components'
import { getCurrentUserInfo } from '../actions'
const store = getStore();
export const App = ()=>(
    <div>
        <Provider store={store}>
            <MainContainer/>
        </Provider>
    </div>
);

// dispatch getCurrentUserInfo action with ID
store.dispatch(getCurrentUserInfo(`U10000`));