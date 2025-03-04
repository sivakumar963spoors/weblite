import { IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const ReusableTextfield = ({ 
  placeholder, 
  value, 
  onChange, 
  icon, 
  sx = {} 
}) => {
  return (
    <TextField
     autoComplete='off'
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: icon ? (
          <InputAdornment position="end">
            <IconButton>{icon}</IconButton>
          </InputAdornment>
        ) : null,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '40px',
          '& fieldset': {
            border: '1px solid #E3E3E3',
            borderTop: "2px solid #E3E3E3"
          },
          '&:hover fieldset': {
            border: '1px solid #E3E3E3',
          },
          '&.Mui-focused fieldset': {
            border: '1px solid #E3E3E3',
            boxShadow: '0px 0px 10px 1px rgba(140, 210, 233, 0.63)',
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px',
          fontSize: '12px',
          textTransform: 'capitalize'
        },
        '& .MuiInputAdornment-root': {
          color: 'green',
        },
        ...sx,
      }}
    />
  );
};

export default ReusableTextfield;
