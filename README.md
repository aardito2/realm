# realm
> Realm is an alternate implementation of Redux using Elm. Actions are created in JavaScript with a payload, which is sent through ports into your Elm store.
> It is compatible with <a href="https://github.com/reactjs/react-redux">react-redux</a>.

## Usage

### JavaScript

#### createStore(elmStore, initialState={})
```javascript
import elmStore from './store.elm'; // using elm-webpack-loader

const initialState = {};
const store = createStore(elmStore.Store, initialState);
```
#### createAction(actionType) => payload => action
```javascript
const INCREMENT = 'increment';
const increment = createAction(INCREMENT);

const SET_STRING = 'set_string';
const setString = createAction(SET_STRING);
```
#### dispatch(action)
```javascript
dispatch(increment());
dispatch(setString('foo'));
```

### Elm
See <a href="https://github.com/aardito2/realm/blob/master/example/store.elm">store.elm</a> to see how the Elm store itself should be set up.
