import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button, Paper, FormControl, FormHelperText } from '@mui/material';

interface ValueProps {
  value: string | number;
  label: string;
}

interface SelectDropdownProps {
  options: ValueProps[];
  labelText?: string;
  value?: ValueProps | null;
  onChange: (value: ValueProps | null) => void;
  error?: boolean;
  helperText?: any;
  required?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  onBlur?: () => void;
  applySmallSizeStyle?: boolean;
  width?: string;
  size?: 'small' | 'medium';
}

export default function SelectDropdownUi({
  size = 'medium', // Default to medium

  applySmallSizeStyle = false,
  error,
  width,
  helperText,
  options,
  value,
  labelText,
  required,
  onBlur,
  variant,
  onChange,
  disabled,
}: SelectDropdownProps) {
  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <Autocomplete
        size={size}
        disablePortal
        options={options}
        value={value || null}
        onChange={(event, newValue) => {
          onChange(newValue);
        }}
        onClose={() => {
          // if (onBlur) onBlur();
        }}
        sx={{
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
          '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
            padding: '9px',
          },
          '& .css-m9eh9o-MuiFormControl-root-MuiTextField-root .MuiFormLabel-root': {
            fontSize: '15px !important',
          },
        }}
        onBlur={onBlur}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            // error={error}
            required={required}
            variant={variant}
            label={labelText}
          />
        )}
        PaperComponent={({ children }) => <Paper sx={{ '& .MuiAutocomplete-listbox': { fontSize: '13px' } }}>{children}</Paper>}
      />
      {helperText && <FormHelperText id="component-helper-text">{helperText}hello world</FormHelperText>}
    </FormControl>
  );
}
