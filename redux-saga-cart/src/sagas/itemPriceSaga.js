import { take, all, fork, put, call } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    SET_CURRENT_USER,
    SET_CART_ITEMS,
    SET_ITEM_DETAILS,
    setItemPrice
} from '../actions'

function* fetchItemPrice(id,currency){
    // call api
    const response = yield fetch(`http://localhost:8081/prices/${currency}/${id}`);
    const json = yield response.json();
    const price = json[0].price;
    // put data on app
    yield put(setItemPrice(id,price));
}

export function* itemPriceSaga() {
    // yielding all actions
    const [{user}, {items}] = yield all([
        take(SET_CURRENT_USER),
        take(SET_CART_ITEMS)
    ]); // dispatched data will return user and items property
    // will execute only if all actions are dispatched
    yield items.map(item=>call(fetchItemPrice, item.id, user.country));
}
