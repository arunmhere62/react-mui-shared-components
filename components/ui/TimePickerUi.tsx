import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopTimePicker } from '@mui/x-date-pickers';
import { FormControl, FormHelperText } from '@mui/material';

interface TimePickerUiProps {
  label?: string;
  minutesStep?: number;
  shouldDisableTime?: (time: number, view: 'minutes' | 'hours') => boolean;
  initialValue?: Dayjs | null;
  validationMessage?: string;
  onTimeChange?: (value: Dayjs | null) => void;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  formSubmitted?: boolean;
  value?: Dayjs | null; // Removed undefined from type definition
}

const TimePickerUi: React.FC<TimePickerUiProps> = ({
  value: propValue,
  label = 'Select Time',
  minutesStep = 5,
  shouldDisableTime,
  initialValue = null,
  validationMessage = 'Selected time is invalid.',
  onTimeChange,
  minTime = dayjs().hour(11).minute(0).second(0),
  maxTime = dayjs().hour(18).minute(0).second(0),
  formSubmitted,
}) => {
  const [value, setValue] = useState<Dayjs | null>(initialValue);
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    setValue(propValue || null); // Ensure it's never undefined
  }, [propValue]);

  useEffect(() => {
    if (formSubmitted) {
      if (!value) {
        setError(true);
      } else {
        setError(false); // Clear error if there's a value
      }
    }
  }, [formSubmitted, value]);
  const handleChange = (newValue: Dayjs | null) => {
    if (newValue) {
      if (newValue.isBefore(minTime) || newValue.isAfter(maxTime)) {
        setError(true);
      } else {
        setError(false); // Clear error on valid selection
      }
    } else {
      setError(true); // Set error if no value is selected
    }
    setValue(newValue);
    onTimeChange?.(newValue);
  };

  const handleClose = () => {
    if (!value) {
      setError(true);
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      setValue(null); // Clear value on form submission
    }
  }, [formSubmitted]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth error={error}>
        <DesktopTimePicker
          label={label}
          minTime={minTime}
          maxTime={maxTime}
          minutesStep={minutesStep}
          onChange={handleChange}
          value={value} // Use the local state
          onClose={handleClose}
          onError={(error) => {
            if (error) {
              setError(true);
            }
          }}
        />
        <FormHelperText>{error ? validationMessage : ''}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};

export default TimePickerUi;
