import * as React from 'react';
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@mui/material';

interface SwitchUiProps {
  checked: boolean;
  onChange: (event: any) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
}

export default function SwitchUi({ checked, onChange, label, helperText, error = false, disabled = false }: SwitchUiProps) {
  return (
    <FormControl component="fieldset" error={error} disabled={disabled}>
      <FormControlLabel control={<Switch checked={checked} onChange={onChange} inputProps={{ 'aria-label': 'controlled' }} />} label={label} />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
