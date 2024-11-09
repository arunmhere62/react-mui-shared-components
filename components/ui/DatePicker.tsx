import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerProps {
  value?: string | Dayjs;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  onClose?: () => void;
  error?: boolean;
  submitted?: boolean; // Add this prop to track form submission
  touched?: boolean;   // Add touched state to check if field has been touched
  errorText?: string;  // Add errorText for custom error messages
}

export default function DatePickerUi({
  label,
  value,
  disabled,
  required,
  onChange,
  helperText,
  error,
  submitted = false, // Default to false if not passed
  touched = false,  // Default to false if not passed
  errorText = 'Date is required',
}: DatePickerProps) {
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (typeof value === 'string') {
      const parsedDate = dayjs(value);
      setDateValue(parsedDate.isValid() ? parsedDate : null);
    } else if (dayjs.isDayjs(value)) {
      setDateValue(value);
    } else {
      setDateValue(null);
    }
  }, [value]);

  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    onChange(formattedDate);
    setDateValue(date);
  };

  // Check if the helper text should show
  const shouldShowHelperText =
    (dateValue === null || !dateValue.isValid()) && (touched || submitted);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth error={error} disabled={disabled}>
        <DatePicker
          closeOnSelect={false}
          value={dateValue}
          onChange={handleDateChange}
          onClose={() => {}}
          views={['year', 'month', 'day']}
          label={label}
          format="DD-MM-YYYY"
          sx={{
            width: '100%',
            '& .MuiOutlinedInput-root': {
              height: '43px',
              fontSize: '14px',
              borderRadius: '8px !important',
              overflow: 'hidden',
              borderColor: `action.active`,
              transition: `muiTheme.transitions.create(["border-color", "box-shadow"])`,
              '&:hover': {
                backgroundColor: `action.hover`,
              },
            },
            '& .MuiFormLabel-root': {
              lineHeight: '24px',
              fontSize: '14px',
            },
          }}
          slotProps={{
            textField: {
              variant: 'outlined',
              size: 'small',
            },
            field: { clearable: true },
          }}
        />
        {/* Show helper text if required conditions are met */}
        {shouldShowHelperText && (
          <FormHelperText sx={{ color: 'error.main' }}>
            {helperText || errorText}
          </FormHelperText>
        )}
      </FormControl>
    </LocalizationProvider>
  );
}
