// apply is similar to call but it changes the scope of call method
import { take, put, call, apply  } from 'redux-saga/effects'
// fetch is used to make api calls
import fetch from 'isomorphic-fetch';

import {
    GET_CURRENT_USER_INFO, // constant
    setCurrentUser // action creator
} from './../actions'

// function* represents a generator
// saga: currentUserSaga
export function* currentUserSaga() {
    // retrieve id from the dispatched action
    const { id } = yield take(GET_CURRENT_USER_INFO);
    console.log('User ID: ', id)
    const response = yield call(fetch,`http://localhost:8081/user/${id}`);
    // Need to use .apply since response.json has scope from response
    const data = yield apply(response, response.json); // apply(context, method)
    console.log('get user api data:', data);
    // put the data to the app
    yield put(setCurrentUser(data));
}