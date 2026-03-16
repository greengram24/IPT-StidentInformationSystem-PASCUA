import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

function Car() {
  const [formData, setFormData] = useState({ model: '', year: '', color: '' });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setResult(formData);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Cars Page
      </Typography>
      <Typography variant="h4" gutterBottom>
        Add Car
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Model"
              name="model"
              fullWidth
              value={formData.model}
              onChange={handleChange}
              error={errors.model}
              helperText={errors.model && "Please input the car's model."}
            />

            <TextField
              label="Year"
              name="year"
              type="number"
              fullWidth
              value={formData.year}
              onChange={handleChange}
              error={errors.year}
              helperText={errors.year && "Please input the car's year."}
            />

            <TextField
              label="Color"
              name="color"
              fullWidth
              value={formData.color}
              onChange={handleChange}
              error={errors.color}
              helperText={errors.color && "Please input the car's color."}
            />

            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              ADD CAR
            </Button>
          </form>
        </Paper>

        {result && (
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Car Preview
            </Typography>
            <Typography>Model: {result.model}</Typography>
            <Typography>Year: {result.year}</Typography>
            <Typography>Color: {result.color}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default Car;