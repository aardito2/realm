import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, createAction } from '../src';
import elmStore from './store.elm';

const store = createStore(elmStore.Store, ({ value: 0, inputString: '' }));
console.log(store);

const InnerComponent = ({
  value,
  inputString,
  increment,
  decrement,
  setInput,
}) => (
  <div>
    {value}
    <button onClick={decrement}>-</button>
    <button onClick={increment}>+</button>
    <input onInput={setInput} />
    {inputString}
    {() => console.log('inputString: ', inputString)}
  </div>
)

InnerComponent.propTypes = {
  value: PropTypes.number.isRequired,
  inputString: PropTypes.string.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  setInput: PropTypes.func.isRequired,
};


const mapState = ({ value, inputString }) => ({ value, inputString });
const mapDispatch = dispatch => ({
  increment: () => dispatch(createAction('increment')),
  decrement: () => dispatch(createAction('decrement')),
  setInput: (evt) => dispatch(createAction('setString', evt.target.value)),
});
const OuterComponent = connect(mapState, mapDispatch)(InnerComponent);

render(
  <Provider store={store}>
    <OuterComponent />
  </Provider>,
  document.getElementById('app')
);

