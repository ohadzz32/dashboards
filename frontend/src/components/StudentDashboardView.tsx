import React, { useState, ReactElement } from 'react';
import { Box, Button, Paper, Typography, ToggleButtonGroup, ToggleButton, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';

interface DashboardData {
  _id?: string;
  altitude: number | string;
  his: number | string;
  adi: number | string;
}

interface Props {
  data: DashboardData;
  onAddData: (newData: DashboardData) => void;
}

export const StudentDashboardView: React.FC<Props> = ({ data, onAddData }): ReactElement => {
  const [viewMode, setViewMode] = useState<'text' | 'visual'>('visual');
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateValues, setUpdateValues] = useState<DashboardData>(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: ''
  });

  const getNumericValue = (value: number | string): number => {
    return typeof value === 'string' ? parseFloat(value) || 0 : value;
  };

  const validateInputs = (values: DashboardData): boolean => {
    const newErrors: { [key: string]: string } = {};
    let hasError = false;

    const altitudeNum = getNumericValue(values.altitude);
    if (isNaN(altitudeNum) || altitudeNum < 0 || altitudeNum > 3000) {
      newErrors.altitude = 'Altitude must be between 0 and 3000';
      setSnackbar({ open: true, message: 'גובה חייב להיות בין 0 ל-3000' });
      hasError = true;
    }

    const hisNum = getNumericValue(values.his);
    if (isNaN(hisNum) || hisNum < 0 || hisNum > 360) {
      newErrors.his = 'HIS must be between 0 and 360';
      setSnackbar({ open: true, message: 'כיוון חייב להיות בין 0 ל-360' });
      hasError = true;
    }

    const adiNum = getNumericValue(values.adi);
    if (isNaN(adiNum) || Math.abs(adiNum) > 100) {
      newErrors.adi = 'ADI must be between -100 and 100%';
      setSnackbar({ open: true, message: 'ADI חייב להיות בין 100- ל-100' });
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
    setUpdateValues(data);
  };

  const handleUpdateSubmit = () => {
    if (validateInputs(updateValues)) {
      onAddData(updateValues);
      setIsUpdateDialogOpen(false);
    }
  };

  const handleUpdateCancel = () => {
    setUpdateValues(data);
    setErrors({});
    setIsUpdateDialogOpen(false);
  };

  const handleInputChange = (field: keyof DashboardData, value: string) => {
    const numValue = parseFloat(value);
    const newValues = { ...updateValues, [field]: value === '' ? '' : numValue };
    setUpdateValues(newValues);

    const newErrors = { ...errors };

    if (field === 'altitude') {
      if (isNaN(numValue) || numValue < 0 || numValue > 3000) {
        newErrors.altitude = 'Altitude must be between 0 and 3000';
        setSnackbar({ open: true, message: 'גובה חייב להיות בין 0 ל-3000' });
      } else {
        delete newErrors.altitude;
      }
    }

    if (field === 'his') {
      if (isNaN(numValue) || numValue < 0 || numValue > 360) {
        newErrors.his = 'HIS must be between 0 and 360';
        setSnackbar({ open: true, message: 'כיוון חייב להיות בין 0 ל-360' });
      } else {
        delete newErrors.his;
      }
    }

    if (field === 'adi') {
      if (isNaN(numValue) || Math.abs(numValue) > 100) {
        newErrors.adi = 'ADI must be between -100 and 100%';
        setSnackbar({ open: true, message: 'ADI חייב להיות בין 100- ל-100' });
      } else {
        delete newErrors.adi;
      }
    }

    setErrors(newErrors);
  };

  const renderGauge = (value: number, max: number, title: string, unit: string, description: string) => (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#fff', borderRadius: 2 }}>
      <Box sx={{ position: 'relative', width: '100%', height: 200, mb: 2 }}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 150,
            height: 150,
            borderRadius: '50%',
            border: '2px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 1
          }}
        >
          {(title === 'HIS' || title === 'ADI') && (
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#1976d2',
                position: 'absolute'
              }}
            />
          )}
          <Typography variant="h4" color="text.primary" sx={{ mb: 1 }}>
            {value.toFixed(2)}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {unit}
          </Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${value / max * 180}deg)`,
            width: 150,
            height: 150,
            borderRadius: '50%',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '50%',
              left: '50%',
              width: '4px',
              height: '50%',
              backgroundColor: '#1976d2',
              transformOrigin: 'bottom',
              transform: 'translateX(-50%)',
              transition: 'transform 0.3s ease-in-out'
            }
          }}
        />
      </Box>
      <Typography variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );

  const renderVisualView = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
      {renderGauge(
        getNumericValue(data.altitude),
        10000,
        'Altitude',
        'ft',
        'Current aircraft height above sea level'
      )}
      {renderGauge(
        getNumericValue(data.his),
        360,
        'HIS',
        '°',
        'Heading Indicator System - Aircraft direction'
      )}
      {renderGauge(
        getNumericValue(data.adi) + 100,
        200,
        'ADI',
        '.',
        'Attitude Director Indicator'
      )}
    </Box>
  );

  const renderTextView = () => (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>Altitude</Typography>
          <Typography variant="h4">{data.altitude} ft</Typography>
          <Typography variant="body2" color="text.secondary">
            Current aircraft height above sea level
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>HIS</Typography>
          <Typography variant="h4">{data.his}°</Typography>
          <Typography variant="body2" color="text.secondary">
            Heading Indicator System - Aircraft direction
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" color="primary" gutterBottom>ADI</Typography>
          <Typography variant="h4">{data.adi}%</Typography>
          <Typography variant="body2" color="text.secondary">
            Attitude Director Indicator - Aircraft orientation
          </Typography>
        </Box>
      </Box>
    </Paper>
  );

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" color="primary">לוח מחוונים</Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="text">טקסט</ToggleButton>
            <ToggleButton value="visual">ויזואלי</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleUpdateClick}
          sx={{ textTransform: 'uppercase' }}
        >
          עדכן נתונים
        </Button>
      </Box>

      {viewMode === 'visual' ? renderVisualView() : renderTextView()}

      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateCancel} maxWidth="sm" fullWidth>
        <DialogTitle>עדכון פרמטרים</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box>
              <TextField
                label="גובה (רגל)"
                type="text"
                value={updateValues.altitude}
                onChange={(e) => handleInputChange('altitude', e.target.value)}
                fullWidth
                error={!!errors.altitude}
                helperText={errors.altitude}
              />
              <Typography 
                sx={{ 
                  color: '#1976d2',
                  fontSize: '0.75rem',
                  marginTop: '3px',
                  marginLeft: '14px'
                }}
              >
                גובה חייב להיות בין 0 ל-3000
              </Typography>
            </Box>
            <Box>
              <TextField
                label="כיוון (מעלות)"
                type="text"
                value={updateValues.his}
                onChange={(e) => handleInputChange('his', e.target.value)}
                fullWidth
                error={!!errors.his}
                helperText={errors.his}
              />
              <Typography 
                sx={{ 
                  color: '#1976d2',
                  fontSize: '0.75rem',
                  marginTop: '3px',
                  marginLeft: '14px'
                }}
              >
                כיוון חייב להיות בין 0 ל-360
              </Typography>
            </Box>
            <Box>
              <TextField
                label="ADI"
                type="text"
                value={updateValues.adi}
                onChange={(e) => handleInputChange('adi', e.target.value)}
                fullWidth
                error={!!errors.adi}
                helperText={errors.adi}
              />
              <Typography 
                sx={{ 
                  color: '#1976d2',
                  fontSize: '0.75rem',
                  marginTop: '3px',
                  marginLeft: '14px'
                }}
              >
                ADI חייב להיות בין 100- ל-100
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCancel}>ביטול</Button>
          <Button 
            onClick={handleUpdateSubmit} 
            variant="contained" 
            color="primary"
            disabled={Object.keys(errors).length > 0}
          >
            עדכן
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}; 