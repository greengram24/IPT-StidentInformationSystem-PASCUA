import React from 'react';
import { Box, Typography } from '@mui/material';

function Home() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Typography variant="body1">
        This is home.
      </Typography>
    </Box>
  );
}

export default Home;