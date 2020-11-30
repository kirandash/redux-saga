import { take, call, put, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

import {
    TOGGLE_CHECKING_OUT,
    setCheckoutPhase,
    QUANTITY_VERIFICATION_CHECKOUT_PHASE,
    CREDIT_VALIDATION_CHECKOUT_PHASE,
    ERROR_CHECKOUT_PHASE,
    PURCHASE_FINALIZATION_CHECKOUT_PHASE,
    SUCCESS_CHECKOUT_PHASE
} from './../actions'

import {
    currentUserSelector
} from '../selectors'

export function * executePurchase(user) {
    const response = yield fetch(`http://localhost:8081/card/charge/${user.get(`id`)}`);
    const { success } = yield response.json();
    return success;
}

export function * validateCart(user) {
    // validate cart
    const response = yield fetch(`http://localhost:8081/cart/validate/${user.get(`id`)}`);
    const { validated } = yield response.json();
    return validated;
}

export function * validateCreditCard(user) {
    const response = yield fetch(`http://localhost:8081/card/validate/${user.get(`id`)}`);
    const { validated } = yield response.json();
    return validated;
}

export function* checkout() {
    // Get current user using select
    const user = yield select(currentUserSelector);

    // verify quantity
    yield put(setCheckoutPhase(QUANTITY_VERIFICATION_CHECKOUT_PHASE));
    // validate cart
    const cartValidated = yield call(validateCart,user);
    if (!cartValidated) {
        // put error on app for user
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    console.info("Validated Cart!")

    // verify credit card
    yield put(setCheckoutPhase(CREDIT_VALIDATION_CHECKOUT_PHASE));
    const creditCardValidated = yield call(validateCreditCard,user);
    if (!creditCardValidated) {
        // put error on app for user
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    // execute purchase
    yield put(setCheckoutPhase(PURCHASE_FINALIZATION_CHECKOUT_PHASE));
    const purchaseSuccessful = yield call(executePurchase, user);
    if (!purchaseSuccessful) {
        // put error on app for user
        yield put(setCheckoutPhase(ERROR_CHECKOUT_PHASE));
        return;
    }

    // put success data on app
    yield put(setCheckoutPhase(SUCCESS_CHECKOUT_PHASE));
}
export function* checkoutSaga() {
    while (true) {
        // Call checkout method when user toggles check out
        const isCheckingOut = yield take(TOGGLE_CHECKING_OUT);
        if (isCheckingOut) {
            yield call(checkout);
        }
    }
}