# redux-saga-cart
A fully-functional shopping cart built with Redux Saga using Yield

## About
redux-saga-cart is a fully functional, non-trivial demo application meant to help intermediate and advanced users understand and use Redux Saga.
This project is the finished product that is built in the Pluralsight course redux-saga. (Link coming soon)
While running and studying this project is useful to anyone, it is strongly recommended that you build it while watching the Pluralsight course.

## Installation
* This application has a seperate back-end component available here: https://github.com/danielstern/redux-saga-shopping-cart-server . The back-end and front-end have been seperated to help make learning redux-saga easier. *
1. Clone and install the server application

2. Clone and install the application
`git@github.com:danielstern/redux-saga-cart.git && cd redux-saga-cart && npm install`

3. Install the babel CLI
`npm install -g babel babel-cli`

## Usage
1. Start the application with `npm start`
2. Open the url `http://localhost:8080`

## Troubleshooting
### The application hangs on load
Make sure the demo server is running on the correct port (`8081`). Make sure the permissions on your computer allow communication between the ports `8080` and `8081`. 
Still getting an error? Copy any errors that appear in dev tools and open an issue.

### I don't see anything / I see the wrong thing when navigating to `http://localhost:8080`
Make sure that the port `8080` is available before running `npm start`

### I get an error when running `npm start`
Make sure you're running the latest version of `node`. Make sure the following dependencies are installed globally as not all OS's respect global dependencies:
```javascript
{
    "babel-core": "^6.18.2",
    "babel-loader": "^6.2.8",
    "babel-plugin-transform-object-rest-spread": "^6.19.0",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.23.0",
    "babel-regenerator-runtime": "^6.5.0",
    "webpack": "^1.13.3",
    "webpack-dev-middleware": "^1.10.1",
    "webpack-hot-middleware": "^2.17.1",
    "webpack-dev-server": "^1.16.5"
}
```

## Concepts

### 1. Why Redux Saga?
1. Ideal for common real world apps.
2. Large, growing and contributing user base
3. Works on both client and server
4. https://github.com/redux-saga/redux-saga/
5. check things like: star to issues ratio, last commit etc

### 2. What is Redux Saga?
1. Redux middleware
2. More sophisticated than redux-thunk
3. Manages side-effects (viz api calls, db calls, manage interval timer etc)
4. Depends on `ES6` and `yield`
5. Consumes and emits actions
6. Works without Redux
7. Effective for async operations

### 3. Topics
1. Redux saga Effects
2. Effective use of yield
3. Forking and multithreaded processes
4. Building real world apps
5. Roadmap: Sagas ---> Async ES6 (Yield) ---> Redux Saga Effects ---> Channels ---> Testing

### 4. Redux Saga Defn
1. Redux Middleware
2. Consumes actions, dispatches actions and side-effects
3. Maintains continuously running processes called sagas

### 5. What is a Saga
1. Saga: A series of reversible transactions
2. Replaces single, locking transaction (Saga does tasks in smaller chunks and if anything fails: it reverses the whole action)
3. Uses a process manager to manage sub-processes
4. **Sagas in Redux**:
    * A long running background process
    * Responsible for application's side effects
    * Used in conjunction with ES6 yield (yield and generator helps write cleaner code)
    * Redux saga is the process manager
5. Summary: 
    * Listens for actions, dispatches other actions, (using effects)
    * Interact with external APIs or modify system files (using request, fs or other)

### 6. Why Redux Saga instead of Redux thunks?
1. Facilitates **side-effects** (API calls, db transactions) in ur redux app
2. **Advanced tools** (forking processes, yielding thread) cover almost all real-world use cases
3. More sophisticated than redux-thunk which is just a simple connector. Redux thunk puts a lot of logic in action creators. While redux saga helps this better. But is a little complex
    * Redux saga has more features

### 7. Redux Saga vs Redux Thunks
1. **Redux Thunk**
    * Common redux middleware
    * Created by Redux creator
    * Runs in JS context
    * Has no built-in-solution for async calls
    * No way to orchestrate side-effects b/w thunks
2. **Redux Saga**
    * Common redux middleware
    * Created by 3rd party dev
    * Only runs in ES6 environments that supports Yield
    * Uses yield and generator functions to simplify async
    * Uses effects and plain actions to coordinate sagas

### 8. Yield Topics
1. Yield
2. Generator fns
3. Yield and promises
4. Wrapping Generators

### 9. What is Yield
1. Special keyword that can delay the execution of subsequent code
2. Only works inside generator fns
3. Works with promises and condenses code surrounding them
4. Traditional async call:
    * pyramid of call backs
5. Promise
    * code must be placed in .then method
    * no pyramid but long chain of codes with many .then methods chained
6. Yield
    * No additional scope
    * Single line call - compact

### 10. Advantages and Disadvantages of Yield
1. Advantages:
    * Significantly fewer lines of codes
    * Sig. less indentation
    * Easy to read quickly, reason about
    * Easier to debug (with try and catch)
    * Execution stops on handled error (we are aware of the error easily)
2. Disadvantages:
    * Only works inside generator fns
    * Requries additional babel plugins
    * Erros must be handled explicitly (or app will crash)
    * Unfamiliar to novice developers
    * Execution stops on handled error (disadv since error cause app to fail)

### 11. Generator Fns
1. Special JS fn denoted by *
2. Calling fn returns a generator
3. Actually code is executed by calling "next" method
4. can yield/return multiple values (unlike a regular fn that returns only one value)
5. Two steps:
    * create generator obj
    * get value using .next method
6. If we have multiple yields:
    * calling .next will return first value and then keep returning the next one with each call. done variable will stay false until the last yield is returned.
7. Learn more with: Redux saga sandbox: https://github.com/danielstern/redux-saga-sandbox

## 12. Yield and Promises
1. Fn call that follows yield keyword must return a promise (or object, or other valid structure)
2. Code execution resumes when promise is resolved
3. If promise throws an error, code stops at yield line

## 13. Wrapping Generators
1. Yielding promises must still be called manually by some code
    * wrapper code still needs .then somewhere to capture the response from API and pass it to the generator
2. Redux saga wraps generators automatically (no need of .then() every time)
    * Sagas are wrapped by redux saga, .then() is never manually called
3. Co.js can wrap generators outside of redux-saga app

## 14. Wrapping Generators with Redux Saga and Co
1. Run generator with Redux saga
2. Note that promises are resolved automatically.
3. Implement co for similar effect
    * co allows us to wrap generator fn so that .then method can be implemented.

## 15. Effects
1. Utility method provided by Redux saga
2. Returns an object containing instructions for redux saga
3. Redux saga generates the side effects, not the effect itself
4. Categories of effect:
    * thread management: call, fork, spawn, apply, cancel
    * action creation: put
    * data seeding: select
    * Flow control: take, takeEvery, takeLatest

## 16. Take
1. Pauses b/w concurrent lines of code
2. Code resumes when specific action is dispatched
3. Only one thread - multiple actions do not lead to multiple responses
4. Properties of action are passed as yielded variable

## 17. Put
1. Immediately dispatches an action to the rest of the app
2. Code execution does not pause
3. Like calling dispatch in Redux-Thunk or React-Redux

## 18. Call
1. Calls the specific method
2. Equivalent to invoking the method directly
3. Used for testing

## 19. Implementing Take, Call and Put in app
1. `currentUserSaga` waits for `GET_CURRENT_USER_INFO` action with take
2. Current user information only ever needs to be fetched once
3. Update current user status saga to call Redux Cart server API
4. User saga to `put` action containing returned information to the app
5. Trigger reducers and update display components

## 20. Fork
1. Invokes the specified method (like call)
2. Can't access yielded variables
3. Caller continues without pausing execution
4. If parent process errors or is cancelled, all forked processes are cancelled
5. `finally` block of forked method is invoked during cancellation

## 21. Implementing Fork
1. User's list of items in cart (as IDs) returned from AJAX call
2. Saga forks one process each to fetch item details for each item
3. Item details are displayed to user as they arrive from server
4. Ex: 
    * `fetchCartSaga` to get cart data for a user using API
    * `itemDetailsSaga` to get individual items data

## 22. TakeEvery effect
1. Works like take, except forks the specified method every time specific action is dispatched
2. Code execution resumes immediately in main thread
3. Ex:
    * Create a saga that invokes a method each time a specified action is dispatched
    * multiple threads can be created in conjuction with TakeEvery

## 23. Cancel and Cancelled effect
1. **Cancel**
    1. Stops a forked process
    2. Stopped process will be cut off at most recent yield
    3. `finally{}` is invoked in forked process
2. **Cancelled**:
    * Method that returns true if callee process has been cancelled by caller
    * Used in finally block to determine if cancellation (not error) is cause of termination

## 23. TakeLatest
1. Combination of fork, takeEvery and cancel
2. Forks child process each time specified action is dispatched, while keeping exactly one instance of the child process running.
3. Flow:
    * Specified action is dispatched
    * Child process is forked in response
    * Child process runs in own thread
    * Specified action is dispatched again
    * Child process is cancelled
    * Go to step 2
4. Ex: 
    * `itemQuantitySaga` will only take the latest dispatch of `INCREASE_ITEM_QUANTITY` action
    * Each time user adds or removes an item, the existing process will be cancelled and a new one forked

## 24. Select
1. Returns a copy of the application's state when yielded to
2. Any passed selectors are invoked
