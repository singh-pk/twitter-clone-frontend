import React from 'react';

import './withSpinner.scss';

const withSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) =>
  isLoading ? (
    <div className='with-spinner' />
  ) : (
    <WrappedComponent {...otherProps} />
  );

export default withSpinner;
