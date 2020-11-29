import { select, put, takeLatest } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CART_ITEMS,
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    FETCHED,
    FETCHING,
    setShippingFetchStatus,
    setShippingCost
} from './../actions'

import {
    cartItemsSelector
} from '../selectors'

// shipping generator - process
function* shipping() {
    // set status
    yield put(setShippingFetchStatus(FETCHING));
    // get list of cart items
    const items = yield select(cartItemsSelector);

    // Turn all the item IDs into an API compatible string, and trim the last comma
    const itemRequestString = items.reduce((string,item)=>{
        for (let i = 0; i < item.get(`quantity`); i++) {
            string += item.get(`id`) + ",";
        }
        return string;
    },"").replace(/,\s*$/, '');

    console.info("Made item request string", itemRequestString);

    // fetch call with all items
    const response = yield fetch(`http://localhost:8081/shipping/${itemRequestString}`);
    const { total } = yield response.json();
    // set cost
    yield put(setShippingCost(total));
    // set status
    yield put(setShippingFetchStatus(FETCHED));
}

export function* shippingSaga() {
    // when any action is dispatched it will call shipping process. 
    // But if any of action is dispatched again, it will stop the process and restart it
    yield takeLatest([SET_CART_ITEMS, INCREASE_ITEM_QUANTITY, DECREASE_ITEM_QUANTITY], shipping);
}