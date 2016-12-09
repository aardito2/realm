import isPlainObject from 'lodash/isPlainObject';

const _app = new WeakMap();
const _state = new WeakMap();
const _currentListeners = new WeakMap();
const _nextListeners = new WeakMap();

export default class Store {
  constructor(elmApp, initialState) {
    _app.set(this, elmApp.worker());
    _state.set(this, initialState);
    _currentListeners.set(this, []);
    _nextListeners.set(this, _currentListeners);

    _app.get(this).ports.nextState.subscribe((nextState) => {
      _state.set(this, nextState);

      const listeners = _nextListeners.get(this);
      _currentListeners.set(this, listeners);
      for (const listener of listeners) {
        listener();
      }

    });
  }

  getState = () => {
    return _state.get(this);
  }

  dispatch = (action) => {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      );
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      );
    }

    if (typeof action.payload === 'undefined') {
      action.payload = null;
    }

    const ports = _app.get(this).ports;

    if (!ports[action.type]) {
      throw new Error(`${action.type} port is not defined in Elm.`);
    }

    ports[action.type].send(action.payload);

    return action;
  }

  subscribe = (listener) => {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    const self = this;

    function ensureCanMutateNextListeners() {
      if (_nextListeners.get(self) === _currentListeners.get(self)) {
        _nextListeners.set(self, _currentListeners.get(self).slice());
      }
    }

    let isSubscribed = true;
    ensureCanMutateNextListeners();
    _nextListeners.set(self, [..._nextListeners.get(self), listener]);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = _nextListeners.get(self).indexOf(listener);
      const nextListeners = _nextListeners.get(self);
      nextListeners.splice(index, 1);
      _nextListeners.set(self, nextListeners);
    };
  }
}
