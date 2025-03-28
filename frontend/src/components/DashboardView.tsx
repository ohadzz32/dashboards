import React, { useState } from 'react';
import { Box, Button, Paper, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { DashboardData } from '../types';

interface Props {
  data: DashboardData;
  onAddData: () => void;
}

export const DashboardView: React.FC<Props> = ({ data, onAddData }) => {
  const [viewMode, setViewMode] = useState<'text' | 'visual'>('visual');

  const renderVisualView = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
      {/* Altitude Gauge */}
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4">{data.altitude}</Typography>
            <Typography variant="subtitle1">ft</Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${(data.altitude / 10000) * 360}deg)`,
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #1976d2',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>Altitude</Typography>
      </Paper>

      {/* HIS Gauge */}
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4">{data.his}</Typography>
            <Typography variant="subtitle1">°</Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${data.his}deg)`,
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #1976d2',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>HIS</Typography>
      </Paper>

      {/* ADI Gauge */}
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4">{data.adi}</Typography>
            <Typography variant="subtitle1">%</Typography>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${(data.adi / 100) * 360}deg)`,
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '4px solid #1976d2',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
            }}
          />
        </Box>
        <Typography variant="h6" gutterBottom>ADI</Typography>
      </Paper>
    </Box>
  );

  const renderTextView = () => (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <Box>
          <Typography variant="h6" gutterBottom>Altitude</Typography>
          <Typography variant="h4">{data.altitude} ft</Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>HIS</Typography>
          <Typography variant="h4">{data.his}°</Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>ADI</Typography>
          <Typography variant="h4">{data.adi}%</Typography>
        </Box>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4">Flight Dashboard</Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="text">Text</ToggleButton>
            <ToggleButton value="visual">Visual</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Button variant="contained" color="primary" onClick={onAddData}>
          Update Data
        </Button>
      </Box>

      {viewMode === 'visual' ? renderVisualView() : renderTextView()}
    </Box>
  );
}; 