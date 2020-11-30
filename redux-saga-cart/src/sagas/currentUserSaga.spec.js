import fetch from 'isomorphic-fetch';
import { take, call, put, apply } from 'redux-saga/effects'

// saga to test
import { currentUserSaga } from './currentUserSaga'

import {
    GET_CURRENT_USER_INFO,
    setCurrentUser
} from './../actions'

describe("The current user saga",()=>{
    test("It fetches and puts the current user's data",()=>{
        // mock id
        const id = `NCC1701`;
        // mock user
        const user = {name:"Jean Luc"};
        // mock json method
        const json = ()=>{};
        // mock json response
        const response = {json};
        // generator fn created using currentUserSaga
        const gen = currentUserSaga();

        // First saga call is expected to match GET_CURRENT_USER_INFO
        expect(gen.next().value).toEqual(take(GET_CURRENT_USER_INFO));
        // First step must return an id and Next saga step must call user info API
        expect(gen.next({id}).value).toEqual(call(fetch,`http://localhost:8081/user/${id}`));
        // Second step must return a response
        // We will use our mock response and send that to third saga call
        expect(gen.next(response).value).toEqual(apply(response, json));
        // Testing the last put value
        expect(gen.next(user).value).toEqual(put(setCurrentUser(user)));
    });
});