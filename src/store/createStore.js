import Store from './store';

export default (elmApp, initFlags = {}) => new Store(elmApp, initFlags);
