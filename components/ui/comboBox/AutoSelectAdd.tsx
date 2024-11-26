import React, { } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface AutoSelectAddUiProps {
  options: { label: string; value: any }[]; // Options for the autocomplete
  value: (string | { label: string; value: any })[]; // Selected options passed from parent
  label?: string; // Input label
  placeholder?: string; // Input placeholder
  helperText?: any; // Helper text for the form control
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // onBlur handler
  onChange?: (value: (string | { label: string; value: any })[]) => void; // Updated to handle both string and object
  freeSolo? : any;
}

const AutoSelectAddUi: React.FC<AutoSelectAddUiProps> = ({
  freeSolo = true,
  options,
  value,
  label = 'Select Tags',
  placeholder = 'Enter tags',
  helperText,
  onBlur,
  onChange,
}) => {
  // Use the passed value instead of internal state
  const handleChange = (_event: React.SyntheticEvent, value: (string | { label: string; value: any })[]) => {
    // Ensure unique values
    const uniqueValues = Array.from(new Set(value.map((item) => (typeof item === 'string' ? item : item.value)))).map((uniqueValue) =>
      typeof uniqueValue === 'string'
        ? { label: uniqueValue, value: uniqueValue }
        : (options.find((opt) => opt.value === uniqueValue) ?? { label: uniqueValue, value: uniqueValue })
    );

    if (onChange) onChange(uniqueValues); // Notify parent component
  };

  // Filter out selected options from dropdown
  const filteredOptions = options.filter(
    (option) => !value.some((selected) => (typeof selected === 'string' ? selected === option.value : selected.value === option.value))
  );

  return (
    <FormControl sx={{ width: '100%' }} variant="outlined">
      <Autocomplete
        multiple
        id="tags-input"
        options={filteredOptions}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
        value={value || []} // Use the value prop passed from the parent
        onChange={handleChange}
        onBlur={onBlur} // Trigger onBlur when the field loses focus
        filterSelectedOptions
        freeSolo ={freeSolo}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const label = typeof option === 'string' ? option : option.label;
            const { key, ...tagProps } = getTagProps({ index });
            return <Chip variant="outlined" label={label} key={key} {...tagProps} />;
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              borderRadius: '8px !important',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px !important',
                transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
              },
            }}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
      {helperText && <FormHelperText sx={{ color: 'error.main' }}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default AutoSelectAddUi;
