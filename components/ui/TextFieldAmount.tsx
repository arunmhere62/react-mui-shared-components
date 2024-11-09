import { FormControl, InputAdornment, TextField, FormHelperText } from '@mui/material';
import React, { useState } from 'react';

interface TextFieldAmountUiProps {
  value: number | null; // Accept a number or null for value
  onChange: (value: number | null) => void; // Function to handle value change
  label?: string; // Label for the input field
  helperText?: string; // Helper text to show when the field is touched and empty
  required?: boolean; // Whether the field is required
  error?: boolean; // Whether the field is in an error state
  startAdornment?: React.ReactNode; // Start adornment (e.g., "$")
  size?: 'small' | 'medium'; // Input field size
  touched?: boolean; // Whether the field has been touched
  metaError?: string; // Error message from Formik meta
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
  touched = false,
  metaError = '',
}) => {
  const [isTouched, setIsTouched] = useState<boolean>(false); // Track whether the field has lost focus

  // Format the amount with commas
  const formatAmount = (amount: string) => {
    if (!amount) return '';
    const numericValue = parseFloat(amount.replace(/,/g, ''));
    return isNaN(numericValue) ? '' : new Intl.NumberFormat().format(numericValue);
  };

  // Handle input change by allowing only numeric values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    if (inputValue === '') {
      onChange(null); // Set to null if the input is empty
    } else {
      const numericValue = parseFloat(inputValue);
      onChange(isNaN(numericValue) ? null : numericValue);
    }
  };

  // Handle onBlur event to set the touched state
  const handleBlur = () => {
    setIsTouched(true); // Set touched to true when the field loses focus
  };

  // Determine if the helper text should be shown (either error or empty value on blur)

  return (
    <FormControl fullWidth error={error}>
      <TextField
        required={required}
        variant="outlined"
        size={size}
        label={label}
        value={value !== null ? formatAmount(value.toString()) : ''} // Only format the value as string for display
        onChange={handleInputChange}
        onBlur={handleBlur} // Add onBlur to track when field loses focus
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
      {/* Show helper text only after the field is touched and there's an error or the value is empty */}
      {(isTouched || touched) && !value && (
        <FormHelperText sx={{ color: 'error.main'}}>
          {metaError || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextFieldAmountUi;
