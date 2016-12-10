/* global document */

import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, createAction } from '../src';
import elmStore from './store.elm';

// STORE
const store = createStore(elmStore.Store, ({ value: 0, inputString: '' }));

// ACTIONS
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const SET_STRING = 'setString';

const increment = createAction(INCREMENT);
const decrement = createAction(DECREMENT);
const setString = createAction(SET_STRING);

const InnerComponent = ({
  value,
  inputString,
  incrementValue,
  decrementValue,
  setInput,
}) => (
  <div>
    {value}
    <button onClick={decrementValue}>-</button>
    <button onClick={incrementValue}>+</button>
    <input onInput={setInput} />
    {inputString}
    {() => console.log('inputString: ', inputString)}
  </div>
)

InnerComponent.propTypes = {
  value: PropTypes.number.isRequired,
  inputString: PropTypes.string.isRequired,
  incrementValue: PropTypes.func.isRequired,
  decrementValue: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
};


const mapState = ({ value, inputString }) => ({ value, inputString });
const mapDispatch = dispatch => ({
  incrementValue: () => dispatch(increment()),
  decrementValue: () => dispatch(decrement()),
  setInput: evt => dispatch(setString(evt.target.value)),
});

const OuterComponent = connect(mapState, mapDispatch)(InnerComponent);

render(
  <Provider store={store}>
    <OuterComponent />
  </Provider>,
  document.getElementById('app')
);

