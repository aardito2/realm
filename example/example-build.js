'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _src = require('../src');

var _store = require('./store.elm');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// STORE
var store = (0, _src.createStore)(_store2['default'].Store, { value: 0, inputString: '' });

// ACTIONS
/* global document */

var INCREMENT = 'increment';
var DECREMENT = 'decrement';
var SET_STRING = 'setString';

var increment = (0, _src.createAction)(INCREMENT);
var decrement = (0, _src.createAction)(DECREMENT);
var setString = (0, _src.createAction)(SET_STRING);

var InnerComponent = function InnerComponent(_ref) {
  var value = _ref.value,
      inputString = _ref.inputString,
      incrementValue = _ref.incrementValue,
      decrementValue = _ref.decrementValue,
      setInput = _ref.setInput;
  return _react2['default'].createElement(
    'div',
    null,
    value,
    _react2['default'].createElement(
      'button',
      { onClick: decrementValue },
      '-'
    ),
    _react2['default'].createElement(
      'button',
      { onClick: incrementValue },
      '+'
    ),
    _react2['default'].createElement('input', { onInput: setInput }),
    inputString,
    function () {
      return console.log('inputString: ', inputString);
    }
  );
};

InnerComponent.propTypes = {
  value: _react.PropTypes.number.isRequired,
  inputString: _react.PropTypes.string.isRequired,
  incrementValue: _react.PropTypes.func.isRequired,
  decrementValue: _react.PropTypes.func.isRequired,
  setInput: _react.PropTypes.func.isRequired
};

var mapState = function mapState(_ref2) {
  var value = _ref2.value,
      inputString = _ref2.inputString;
  return { value: value, inputString: inputString };
};
var mapDispatch = function mapDispatch(dispatch) {
  return {
    incrementValue: function incrementValue() {
      return dispatch(increment());
    },
    decrementValue: function decrementValue() {
      return dispatch(decrement());
    },
    setInput: function setInput(evt) {
      return dispatch(setString(evt.target.value));
    }
  };
};

var OuterComponent = (0, _reactRedux.connect)(mapState, mapDispatch)(InnerComponent);

(0, _reactDom.render)(_react2['default'].createElement(
  _reactRedux.Provider,
  { store: store },
  _react2['default'].createElement(OuterComponent, null)
), document.getElementById('app'));
