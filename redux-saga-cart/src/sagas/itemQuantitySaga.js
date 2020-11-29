// select: returns a copy of the state in app
import { takeLatest, select, put, call } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    INCREASE_ITEM_QUANTITY, // action
    DECREASE_ITEM_QUANTITY, // action
    setItemQuantityFetchStatus, // ac
    decreaseItemQuantity, // ac
    FETCHING, // constant
    FETCHED // constant
} from './../actions'

import {
    currentUserSelector
} from '../selectors'

export function* handleIncreaseItemQuantity({id}) {
    // Start fetching - status
    yield put(setItemQuantityFetchStatus(FETCHING));
    // select
    const user = yield select(currentUserSelector);
    const response = yield call(fetch,`http://localhost:8081/cart/add/${user.get('id')}/${id}`);

    if (response.status !== 200) {
        yield put(decreaseItemQuantity(id, true));
        alert("Sorry, there weren't enough items in stock to complete your request.");
    }
    // No longer fetching - status
    yield put(setItemQuantityFetchStatus(FETCHED));
}

export function* handleDecreaseItemQuantity({id, local}) {
    if (local) {
        return;
    }
    yield put(setItemQuantityFetchStatus(FETCHING));
    const user = yield select(currentUserSelector);
    const response = yield call(fetch,`http://localhost:8081/cart/remove/${user.get('id')}/${id}`);
    if (response.status !== 200) {
        console.warn("Received non-200 status:: ", response);
    }
    yield put(setItemQuantityFetchStatus(FETCHED));
}


export function* itemQuantitySaga() {
    yield [
        takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
        takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
    ]
}