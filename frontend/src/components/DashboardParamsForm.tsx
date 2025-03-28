import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { DashboardParams } from '../types';

interface Props {
  onSubmit: (params: DashboardParams) => void;
}

export const DashboardParamsForm: React.FC<Props> = ({ onSubmit }) => {
  const [params, setParams] = useState<DashboardParams>({
    altitude: 0,
    his: 0,
    adi: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(params);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Parameters
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Altitude"
          type="number"
          value={params.altitude}
          onChange={(e) => setParams({ ...params, altitude: parseFloat(e.target.value) })}
          required
        />
        <TextField
          label="HIS"
          type="number"
          value={params.his}
          onChange={(e) => setParams({ ...params, his: parseFloat(e.target.value) })}
          required
        />
        <TextField
          label="ADI"
          type="number"
          value={params.adi}
          onChange={(e) => setParams({ ...params, adi: parseFloat(e.target.value) })}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Update Dashboard
        </Button>
      </Box>
    </Paper>
  );
}; 