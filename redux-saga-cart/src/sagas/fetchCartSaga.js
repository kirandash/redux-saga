import { takeLatest, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    setCartItems
} from './../actions'

function* fetchCart({user}) {
    // Get id from request action
    const { id } = user;
    // make api call
    const response = yield fetch(`http://localhost:8081/cart/${id}`);
    // no need of apply
    const { items } = yield response.json();
    // put data in app
    yield put(setCartItems(items));
    console.info("Set cart items", items);
}

export function* fetchCartSaga() {
    // user is passed from SET_CURRENT_USER action
    yield takeLatest(SET_CURRENT_USER, fetchCart);
}