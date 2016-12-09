# realm
> Realm is an alternate implementation of Redux using Elm. Actions are created in JavaScript with a payload, which is sent through ports into your Elm store.
> It is compatible with <a href="https://github.com/reactjs/react-redux">react-redux</a>.

## Usage

### JavaScript
```javascript

// createStore
const initialState = {} // initial state for your store 
const store = createStore(elmStore.Store, initialState);

// createAction
const INCREMENT = 'increment';
const increment = createAction(INCREMENT);

const SET_STRING = 'set_string';
const setString = createAction(SET_STRING, 'foo');
```

### Elm
See store.elm to see how the Elm store itself should be set up.
