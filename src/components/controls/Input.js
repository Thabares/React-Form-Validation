import React from 'react';
import { TextField } from '@material-ui/core';
export default function Input(props) {
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      onChange={onChange}
      {...other}
      {...(error && { error: true, helperText: error })} //returning this error and helper text on the outer components
    />
  );
}
