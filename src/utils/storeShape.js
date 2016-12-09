import { PropTypes } from 'react';

export default PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.iRequired,
  getState: PropTypes.func.isRequired,
});

