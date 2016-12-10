# realm
> Realm is an alternate implementation of Redux using Elm. Actions are created in JavaScript with a payload, which is sent through ports into your Elm store.
> It is compatible with <a href="https://github.com/reactjs/react-redux">react-redux</a>.

## Usage

### JavaScript

#### createStore
```javascript
const initialState = {};
const store = createStore(elmStore.Store, initialState);
```
#### createAction
```javascript
const INCREMENT = 'increment';
const increment = createAction(INCREMENT);

const SET_STRING = 'set_string';
const setString = createAction(SET_STRING, 'foo');
```

### Elm
See <a href="https://github.com/aardito2/realm/blob/master/example/store.elm">store.elm</a> to see how the Elm store itself should be set up.
