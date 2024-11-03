import { InputAdornment, TextField } from '@mui/material';
import React from 'react';

interface TextFieldProps {
  label?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Added onBlur prop
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean | undefined;
  helperText?: any;
  name?: string;
  type: 'file' | 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
  fullWidth?: boolean;
  required?: boolean;
  width?: string;
  sx?: any;
  size?: 'small' | 'medium';
}

const TextFieldUi = ({
  sx,
  width,
  required,
  label,
  value,
  onChange,
  onBlur,
  disabled,
  endAdornment,
  startAdornment,
  error,
  helperText,
  name,
  type,
  fullWidth,
  size = 'medium', // Default to medium
}: TextFieldProps) => {
  return (
    <TextField
      required={required}
      variant="outlined"
      size={size}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      error={error}
      helperText={helperText}
      name={name}
      type={type}
      fullWidth={fullWidth || true}
      InputProps={{
        startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
        endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : undefined,
      }}
      sx={{
        width: `${width}`,
        borderRadius: '8px !important',
        '& .MuiOutlinedInput-root': {
          height: size === 'medium' ? '' : '43px',
          ...sx,
          borderRadius: '8px !important',
          overflow: 'hidden',
          borderColor: `action.active`,
          transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
          '&:hover': {
            // backgroundColor: `action.hover`,
          },
        },
        ' & .MuiFormLabel-root': {
          lineHeight: '25px',
          fontSize: size === 'medium' ? '15px' : '14px', // Larger font size for medium
        },
        ' & .MuiOutlinedInput-root': {
          fontSize: size === 'medium' ? '15px' : '14px', // Larger font size for medium
        },
        '& .css-1o5h54k-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
          fontSize: '15px',
        },
        '&.css-m9eh9o-MuiFormControl-root-MuiTextField-root .MuiFormLabel-root': {
          fontSize: '15px !important',
        },
      }}
    />
  );
};

export default TextFieldUi;
