import React, { useState, useRef } from 'react';
import { TextField, MenuItem, Select, Grid, InputAdornment } from '@mui/material';
import ReactCountryFlag from 'react-country-flag';
import { phoneData } from 'data/phone-data';

const PhoneInputWithCountry: React.FC = () => {
  const [country, setCountry] = useState(phoneData[0]);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Refs for Select and TextField
  const selectRef = useRef<HTMLInputElement>(null);
  const textFieldRef = useRef<HTMLInputElement>(null);

  // Handle country selection change
  const handleCountryChange = (event: any) => {
    const selectedCountry = phoneData.find((c) => c.dial_code === event.target.value);
    if (selectedCountry) setCountry(selectedCountry);
  };

  // Handle phone number input change
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    if (inputValue.startsWith(country.dial_code)) {
      setPhoneNumber(inputValue);
    } else {
      setPhoneNumber(country.dial_code + ' ' + inputValue);
    }
    console.log(inputValue);
  };

  // Function to focus both components when one is clicked
  const handleFocusBoth = () => {
    if (selectRef.current) selectRef.current.focus();
    if (textFieldRef.current) textFieldRef.current.focus();
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12}>
        <TextField
          sx={{
            width: '100%',
            borderRadius: '8px !important',
            '& .MuiOutlinedInput-root': {
              paddingLeft: '0px',
              height: '43px',
              borderRadius: '8px !important',
              overflow: 'hidden',
              borderColor: 'action.active',
              transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
            },
            '& .MuiFormLabel-root': {
              lineHeight: '25px',
              fontSize: '14px',
            },
          }}
          variant="outlined"
          value={phoneNumber} // Directly bind the phone number
          onChange={handlePhoneChange}
          onClick={handleFocusBoth} // Trigger focus on both components
          fullWidth
          inputRef={textFieldRef}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  value={country.dial_code}
                  onChange={handleCountryChange}
                  displayEmpty
                  disableUnderline
                  onClick={handleFocusBoth} // Trigger focus on both components
                  inputRef={selectRef}
                  renderValue={() => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{ marginRight: 8, width: 20, height: 15 }}
                      />
                    </div>
                  )}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderRadius: '0px',
                      borderTopLeftRadius: '8px',
                      borderBottomLeftRadius: '8px',
                    },
                  }}
                >
                  {phoneData.map((country) => (
                    <MenuItem key={country.code} value={country.dial_code}>
                      <ReactCountryFlag
                        countryCode={country.code}
                        svg
                        style={{ marginRight: 8, width: 20, height: 15 }}
                      />
                      {country.dial_code} - {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneInputWithCountry;
