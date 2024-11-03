import React from 'react';
import { MuiTelInput, MuiTelInputProps } from 'mui-tel-input';
import { FormHelperText, FormControl, TextFieldProps, SxProps, Theme } from '@mui/material';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  helperText?: any;
  error?: boolean;
  required?: boolean;
  sx?: any;
  variant?: TextFieldProps['variant']; // Accepts 'outlined', 'filled', 'standard'
  name?: string;
  label?: string;
  width?: string;
  size?: 'small' | 'medium';
}

const PhoneInputUi: React.FC<PhoneInputProps> = ({
  size,
  width,
  name,
  label,
  value,
  onChange,
  onBlur,
  helperText = '',
  error = false,
  required = false,
  sx,
  variant = 'outlined', // Default to 'outlined'
}) => {
  return (
    <FormControl error={error} required={required} fullWidth sx={sx}>
      <MuiTelInput
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
        defaultCountry="IN"
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant={variant} // Pass variant to MuiTelInput
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default PhoneInputUi;
