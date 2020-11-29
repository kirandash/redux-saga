import { take, put} from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    setTaxRate
} from './../actions'

export function* taxRateSaga() {
    const { user } = yield take(SET_CURRENT_USER);
    // Get country property of user
    const { country } = user;
    // api call
    const response = yield fetch(`http://localhost:8081/tax/${country}`);
    // tax rate
    const { rate } = yield response.json();
    // put tax rate on api
    yield put(setTaxRate(rate));
}