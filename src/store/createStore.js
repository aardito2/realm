/* eslint-disable no-param-reassign */

import Store from './store';

const createStore = (elmApp, initialState = {}, enhancer) => {
  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
    enhancer = initialState;
    initialState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }
    return enhancer(createStore)(elmApp, initialState);
  }
  return new Store(elmApp, initialState);
};

export default createStore;
