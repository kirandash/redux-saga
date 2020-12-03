 // takeEvery
 import {takeEvery, call, fork, put} from 'redux-saga/effects';
 // actions
 import * as actions from '../actions/users';
 // axios - apis
 import * as api from '../api/users';

function* getUsers() {
    try{
        const result = yield call(api.getUsers);
        // once the code above is resolved: code below will be run
        // console.log(result)
        // dispatch another action with put effect
        yield put(actions.getUsersSuccess({
            items: result.data.data
        }));
    }catch(e) {
        console.log(e)
    }
}

// generator fn - watcher saga
function* watchGetUsersRequest() {
    // watches when one particular redux actio is dispatched
    //  and acts upon it by calling a worker saga
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers); // has while(true) under hood
}

// Array of forked sagas from users
const usersSagas = [
    fork(watchGetUsersRequest)
];

export default usersSagas;
