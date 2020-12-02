# Redux Saga Tutorial

## 1. Installations
1. `npm i --save redux react-redux redux-saga reactstrap axios`

## 2. Project folders, axios setup, code cleanup
1. Organize files and folders
2. Dummy API used: 
    * rem rest api: https://rem-rest-api.herokuapp.com/
    * users api: http://rem-rest-api.herokuapp.com/api/users

## 3. Setting up users redux actions, reducers
1. actions/users.js
2. reducers/users.js
3. wire up redux in reducers/index.js and src/index.js

## 4. First saga - watchers, workers and takeEvery
1. The easiest way to implement saga is use `takeEvery` and listen to all the dispatches and respond accordingly.
2. But redux saga is more powerful. It allows us to control saga execution (By blocking a saga)
    * Ex: With: takeEvery if we have a watcher and worker: for a delete user button:
        * if we double click the button the watcher will be called twice and thus after the first worker is resolved the second worker will be 404 error. Since user is already deleted.
    * But with take and while(true) we can **block a saga**. So, if an action is dispatched: the saga is locked and watcher will not run any further code until the current worker is resolved.

## 5. Generator Fn and Gen fn with loop
1. Generator fn isn't like a normal fn which runs through a set of statements
2. A gen fn must yield something
    * a yield statement: runs a code, returns a value and waits for us to run it again
    * can hv one or multiple yield statements. But must write in such a way that code runs through at least one yield and in the end no more yield is left.
3. Steps:
    * GenTest.js
    * Create the **gen fn**
    * calling the **iterator** from generator fn
    * **next fn** can be used to extract the value yielded by the generator
    * along with value we will also receive a done flag to indicate if generator has completed
    * will run all the code from iterator till first yield
4. Thus, gen fn doesn't block the UI and allows us to enter and exit a fn based on our interest
5. Use while(true) to loop through a saga. So we enter a gen fn and keep yielding and when the last yield is executed the fn will return to first yield again.
6. All redux sagas run through this while(true) loop under the hood
    * Ex: takeEvery is running a while(true) loop under the hood
    * It means: it is constantly watching for any dispatched action.

## 6. Get users saga with call, fork and all
1. **call**:
    * It allows us to call a fn say promise and then it waits for it to be resolved.
    * No need to write callbacks
2. **fork**:
    * js is single threaded but saga can fork a process and run multiple processes in parallel. Thus, if any process fails other processes won't fail
3. **all**
    * allow all forked processes to create in parallel
