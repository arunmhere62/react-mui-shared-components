import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoaderUiProps {
  size?: number; // Optional: size of the loader
}

const LoaderUi: React.FC<LoaderUiProps> = ({ size = 40 }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoaderUi;
