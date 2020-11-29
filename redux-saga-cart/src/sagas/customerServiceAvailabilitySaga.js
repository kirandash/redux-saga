import {  take, put } from 'redux-saga/effects'
// Event Channel
import { eventChannel } from 'redux-saga'
import { connect } from '../createSocketConnection'
import {
    setCustomerServiceAvailability
} from './../actions'

// Saga
export function* customerServiceAvailabilitySaga() {
    // Calling socket
    const socket = connect();
    // New event channel
    const chan = new eventChannel(emit=>{
        // Event to enable support
        const enableSupportMessage = ()=>{
            emit(true)
        };

        // Event to enable support
        const disableSupportMessage = ()=>{
            emit(false)
        };

        // handle events
        socket.on(`SUPPORT_AVAILABLE`,enableSupportMessage);
        socket.on(`SUPPORT_NOT_AVAILABLE`,disableSupportMessage);

        // return object to remove events/listeners
        return ()=>{
            socket.off(`SUPPORT_AVAILABLE`,enableSupportMessage);
            socket.off(`SUPPORT_NOT_AVAILABLE`,disableSupportMessage());
        }
    });

    while (true){
        // take from channel and put appropriate actions
        let supportAvailable = yield take(chan);
        yield put(setCustomerServiceAvailability(supportAvailable));
    }
}