import React from 'react';

import './FormInput.scss';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className='form'>
    {label && <label className='form-input-label label-color'>{label}</label>}
    <input className='form-input' onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;
