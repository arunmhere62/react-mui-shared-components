import { FormControl, InputAdornment, TextField, FormHelperText } from '@mui/material';
import React from 'react';

interface TextFieldAmountUiProps {
  value: number | null; // Accept a number or null for value
  onChange: (value: number | null) => void; // Function to handle value change
  label?: string; // Label for the input field
  helperText?: string; // Helper text to show when the field is touched and empty
  required?: boolean; // Whether the field is required
  error?: boolean; // Whether the field is in an error state
  startAdornment?: React.ReactNode; // Start adornment (e.g., "$")
  size?: 'small' | 'medium'; // Input field size
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const TextFieldAmountUi: React.FC<TextFieldAmountUiProps> = ({
  value,
  onChange,
  label = 'Amount',
  helperText,
  required = false,
  error = false,
  startAdornment,
  size = 'medium',
  name,
  onBlur,
}) => {
  // Format the amount with commas
  const formatAmount = (amount: string) => {
    if (!amount) return '';
    const numericValue = parseFloat(amount.replace(/,/g, ''));
    return isNaN(numericValue) ? '' : new Intl.NumberFormat().format(numericValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    if (inputValue === '') {
      onChange(null);
    } else {
      const numericValue = parseFloat(inputValue);
      onChange(isNaN(numericValue) ? null : numericValue);
    }
  };

  return (
    <FormControl fullWidth error={error}>
      <TextField
        name={name}
        onBlur={onBlur}
        required={required}
        variant="outlined"
        size={size}
        label={label}
        value={value !== null ? formatAmount(value.toString()) : ''}
        onChange={handleInputChange}
        type="text"
        InputProps={{
          startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : undefined,
        }}
        sx={{
          width: '100%',
          borderRadius: '8px !important',
          '& .MuiOutlinedInput-root': {
            height: size === 'medium' ? '56px' : '43px',
            borderRadius: '8px !important',
            '&:hover': {
              borderColor: 'action.active',
            },
            '&.Mui-error': {
              borderColor: 'transparent',
            },
          },
          '& .MuiFormLabel-root': {
            lineHeight: '25px',
            fontSize: size === 'medium' ? '15px' : '14px',
          },
        }}
      />
      {helperText && <FormHelperText sx={{ color: error ? 'error.main' : 'text.secondary' }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default TextFieldAmountUi;
