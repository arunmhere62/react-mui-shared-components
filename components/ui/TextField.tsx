import React, { useState } from 'react';
import { FormControl, InputAdornment, TextField, FormHelperText } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface TextFieldProps {
  label?: string;
  value?: string | number | null;
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
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth={fullWidth || true} error={error} disabled={disabled}>
      <TextField
        required={required}
        variant="outlined"
        size={size}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        name={name}
        type={type === 'password' && !showPassword ? 'password' : 'text'} // Toggle password visibility
        fullWidth={fullWidth || true}
        InputProps={{
          startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
          endAdornment: type === 'password' ? (
            <InputAdornment position="end">
              <span
                onClick={handleClickShowPassword}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </InputAdornment>
          ) : (
            endAdornment
          ),
        }}
        sx={{
          width: width ? width : '100%', // Ensure width is applied properly
          borderRadius: '8px !important',
          '& .MuiOutlinedInput-root': {
            height: size === 'medium' ? '56px' : '43px', // Default height for medium size
            ...sx,
            borderRadius: '8px !important',
            borderColor: 'action.active',
            transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
              // Add hover effect styles here if needed
            },
            '&.Mui-error': {
              borderColor: 'transparent', // Removing the outline color for error
            },
          },
          '& .MuiFormLabel-root': {
            lineHeight: '25px',
            fontSize: size === 'medium' ? '15px' : '14px', // Larger font size for medium
          },
        }}
      />
      {helperText && (
        <FormHelperText sx={{ color: error ? 'error.main' : 'text.secondary' }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextFieldUi;
