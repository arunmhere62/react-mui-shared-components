import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface TextAreaUiProps {
  label?: string;
  helperText?: string | undefined | null;
  rows?: number;
  defaultValue?: string;
  size?: 'small' | 'medium' | undefined;
  error?: boolean | undefined;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  variant?: 'outlined' | 'standard' | 'filled';
  required?: boolean;
  disabled?: boolean;
  name: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
}

export default function TextAreaUi({
  type,
  error = false,
  disabled = false,
  required = false,
  variant = 'outlined',
  onChange,
  onBlur,
  value,
  size = 'small',
  defaultValue,
  label,
  name,
  helperText,
  rows = 4,
}: TextAreaUiProps) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <FormControl fullWidth error={error}>
        <TextField
          name={name}
          type={type}
          disabled={disabled}
          required={required}
          onChange={onChange} // Ensures onChange prop is set up properly
          onBlur={onBlur} // Ensures onBlur prop is set up properly
          size={size}
          // error={error}
          label={label}
          variant={variant}
          multiline
          rows={rows}
          defaultValue={defaultValue}
          value={value}
          InputProps={{
            sx: {
              fontSize: '14px',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
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
            },
          }}
          InputLabelProps={{
            sx: { fontSize: '14px' },
          }}
        />
        {helperText && <FormHelperText sx={{ color: error ? 'error.main' : 'text.secondary' }}>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}
