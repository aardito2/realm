/* global document */

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, createAction, applyMiddleware } from '../lib';
import createLogger from 'redux-logger';
import elmStore from './store.elm';

// STORE
const store = createStore(
  elmStore.Store,
  ({ value: 0, inputString: '', user: null }),
  applyMiddleware(createLogger())
);

// ACTIONS
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const SET_STRING = 'setString';
const SET_USER = 'setUser';

const increment = createAction(INCREMENT);
const decrement = createAction(DECREMENT);
const setString = createAction(SET_STRING);
const setUser = createAction(SET_USER);

const InnerComponent = ({
  value,
  inputString,
  incrementValue,
  decrementValue,
  setInput,
  userSet,
  user,
}) => (
  <div>
    {value}
    <button onClick={decrementValue}>-</button>
    <button onClick={incrementValue}>+</button>
    <input onInput={setInput} />
    {inputString}
    <button onClick={userSet}>SET TEST USER</button>
    {user && user.username}
    {user && user.age}
  </div>
)

InnerComponent.propTypes = {
  value: PropTypes.number.isRequired,
  inputString: PropTypes.string.isRequired,
  incrementValue: PropTypes.func.isRequired,
  decrementValue: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
};


const mapState = ({ value, inputString, user }) => ({ value, inputString, user });
const mapDispatch = dispatch => ({
  incrementValue: () => dispatch(increment()),
  decrementValue: () => dispatch(decrement()),
  setInput: evt => dispatch(setString(evt.target.value)),
  userSet: () => dispatch(setUser({ username: 'username', age: 42 }))
});

const OuterComponent = connect(mapState, mapDispatch)(InnerComponent);

render(
  <Provider store={store}>
    <OuterComponent />
  </Provider>,
  document.getElementById('app')
);

