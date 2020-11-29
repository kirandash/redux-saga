import { take, fork, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    setItemDetails
} from './../actions'

// The following method will be forked for all items and then shown to user based on what loads first
export function* loadItemDetails(item){
    console.info("Item?", item);
    const { id } = item;
    // make api call
    const response = yield fetch(`http://localhost:8081/items/${id}`)
    const data = yield response.json();
    const info = data[0];
    // put data into api
    yield put(setItemDetails(info));
}

export function* itemDetailsSaga() {
    // get all items
    const { items } = yield take(SET_CART_ITEMS);
    // fork method for all items
    yield items.map(item=>fork(loadItemDetails,item));
}
