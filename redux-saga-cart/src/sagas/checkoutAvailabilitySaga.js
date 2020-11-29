import { take, actionChannel, put } from 'redux-saga/effects'

import {
    SET_SHIPPING_FETCH_STATUS, // action
    setCanCheckOut, // ac
    FETCHED // status constant
} from './../actions'

export function* checkoutAvailabilitySaga() {
    // define action channel - to make sure that no actions are missed during checkout
    const checkoutAvailabilityChannel = yield actionChannel(SET_SHIPPING_FETCH_STATUS);
    while (true) {
        // taking status from the channel
        const {status} = yield take(checkoutAvailabilityChannel);
        // every time SET_SHIPPING_FETCH_STATUS is set, create an action setCanCheckOut given status is FETCHED
        yield put(setCanCheckOut(status === FETCHED));
    }
}