import UsersSagas from './users';
import {all} from 'redux-saga/effects';

// root saga
export default function* rootSaga() {
    yield all([
        ...UsersSagas
    ]) // all - allow all forked processes to create in parallel
}
