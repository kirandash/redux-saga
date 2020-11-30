import fetch from 'isomorphic-fetch';
import { call, put, takeLatest, select } from 'redux-saga/effects'

// sagas to test
import {
    itemQuantitySaga,
    handleIncreaseItemQuantity,
    handleDecreaseItemQuantity
} from './itemQuantitySaga'

import {
    INCREASE_ITEM_QUANTITY,
    DECREASE_ITEM_QUANTITY,
    setItemQuantityFetchStatus,
    decreaseItemQuantity,
    increaseItemQuantity,
    FETCHING,
    FETCHED
} from './../actions'

// from JS
import { fromJS } from 'immutable'

import {
    currentUserSelector
} from '../selectors'

describe.only("the item quantity saga",()=>{
    let item;
    let user;
    beforeEach(()=>{
        item = {id:12345};
        user = fromJS({id:"ABCDE"});
    });
    describe("the saga root",()=>{
        test("the saga root should listen for the events",()=>{
            const gen = itemQuantitySaga();
            expect(gen.next().value).toEqual([
                takeLatest(DECREASE_ITEM_QUANTITY, handleDecreaseItemQuantity),
                takeLatest(INCREASE_ITEM_QUANTITY, handleIncreaseItemQuantity)
            ]);
        });
    });

    describe("handle decrease item quantity saga",()=>{
        test("decreasing the quantity of an item successfully",()=>{
            const gen = handleDecreaseItemQuantity(item);
            expect(gen.next().value).toEqual(put(setItemQuantityFetchStatus(FETCHING)));
            expect(gen.next().value).toEqual(select(currentUserSelector));
            expect(gen.next(user).value).toEqual(call(fetch,`http://localhost:8081/cart/remove/ABCDE/12345`));
            expect(gen.next({status:200}).value).toEqual(put(setItemQuantityFetchStatus(FETCHED)));
        });
    });

    describe("handle increase item quantity saga",()=>{
        let gen;
        beforeEach(()=>{
            // new instance of the generator
            gen = handleIncreaseItemQuantity(item);
            // expect status to be fetching
            expect(gen.next().value).toEqual(put(setItemQuantityFetchStatus(FETCHING)));
            // expect next yeild to be current user
            expect(gen.next().value).toEqual(select(currentUserSelector));
            // final yield to be API call
            expect(gen.next(user).value).toEqual(call(fetch,`http://localhost:8081/cart/add/ABCDE/12345`));
        });
        test("increasing the quantity of an item successfully",()=>{
            // once api call is made success status must match FETCHED
            expect(gen.next({status:200}).value).toEqual(put(setItemQuantityFetchStatus(FETCHED)));
        });

        test("increasing the quantity of an item unsuccessfully",()=>{
            // Test: failed status with 500 must decrease the item qty again
            expect(gen.next({status:500}).value).toEqual(put(decreaseItemQuantity(item.id, true)));
            // once api call is made success status must match FETCHED
            expect(gen.next().value).toEqual(put(setItemQuantityFetchStatus(FETCHED)));
        });
    });
});