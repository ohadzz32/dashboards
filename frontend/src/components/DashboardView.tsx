import React, { useState } from 'react';
import { Box, Button, Paper, Typography, ToggleButtonGroup, ToggleButton, TextField, Dialog, DialogContent, DialogActions } from '@mui/material';
import { DashboardData } from '../types';
interface Props {
  data: DashboardData;
  onAddData: (newData: DashboardData) => void;
}
export const DashboardView: React.FC<Props> = ({ data, onAddData }) => {
  const [viewMode, setViewMode] = useState<'text' | 'visual'>('visual');
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateValues, setUpdateValues] = useState<DashboardData>(data);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
    setUpdateValues(data);
  };
  const handleUpdateSubmit = () => {
    if (validateInputs(updateValues)) {
      onAddData(updateValues);
      setIsUpdateDialogOpen(false);
      setErrors({});
    }
  };
  const handleUpdateCancel = () => {
    setUpdateValues(data);
    setIsUpdateDialogOpen(false);
  };
  const handleInputChange = (field: keyof DashboardData, value: string) => {
    if (value === '' || value === '-') {
      setUpdateValues({ ...updateValues, [field]: value });
      return;
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setUpdateValues({ ...updateValues, [field]: numValue });
    }
  };
  const validateInputs = (values: DashboardData): boolean => {
    const newErrors: { [key: string]: string } = {};
    const altitudeNum = typeof values.altitude === 'string' ? parseFloat(values.altitude) : values.altitude;
    const hisNum = typeof values.his === 'string' ? parseFloat(values.his) : values.his;
    const adiNum = typeof values.adi === 'string' ? parseFloat(values.adi) : values.adi;
    if (isNaN(altitudeNum) || altitudeNum < 0 || altitudeNum > 3000) {
      newErrors.altitude = 'Altitude must be between 0 and 3000 ft';
    }
    if (isNaN(hisNum) || hisNum < 0 || hisNum > 360) {
      newErrors.his = 'HIS must be between 0 and 360 degrees';
    }
    if (isNaN(adiNum) || adiNum < -100 || adiNum > 100) {
      newErrors.adi = 'ADI must be between -100 and 100%';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const getNumericValue = (value: number | string): number => {
    return typeof value === 'string' ? parseFloat(value) || 0 : value;
  };
  const renderGauge = (value: number, maxValue: number, title: string, unit: string) => {
    const actualAdiValue = title === 'ADI' ? value - 100 : value;
    const circleColor = title === 'ADI' ? 
      (Math.abs(actualAdiValue) === 100 ? '#1976d2' :  
       actualAdiValue === 0 ? '#4CAF50' :  
       '#ccc') : 
      '#ccc';
    const bgColor = title === 'ADI' ? 
      (Math.abs(actualAdiValue) === 100 ? 'rgba(25, 118, 210, 0.1)' :  
       actualAdiValue === 0 ? 'rgba(76, 175, 80, 0.1)' :  
       'transparent') : 
      'transparent';
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#fff', borderRadius: 2 }}>
        <Box sx={{ position: 'relative', width: '100%', height: 200, mb: 2 }}>
          <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 150,height: 150,borderRadius: '50%',border: `2px solid ${circleColor}`,backgroundColor: bgColor}}>
            {title === 'HIS' && (
              <>
                <Box sx={{position: 'absolute',top: '50%',left: '50%',width: '4px',height: '35px',backgroundColor: 'black',transform: 'translate(-50%, -50%)','&::before': {content: '""',position: 'absolute',top: 0,left: '50%',transform: 'translate(-50%, -50%)',width: 0,height: 0,borderLeft: '6px solid transparent',borderRight: '6px solid transparent',borderBottom: '10px solid black'}}}/>
                <Box sx={{position: 'absolute',top: '50%',left: '50%',width: '6px',height: '6px',backgroundColor: 'black',borderRadius: '50%',transform: 'translate(-50%, -50%)'}}/>
              </>
            )}
            {title === 'ADI' ? 
              [-100, -50, 0, 50].map((value) => (
                <Typography key={value} sx={{position: 'absolute',left: '50%',top: '50%',transform: `rotate(${((value + 100) / 200) * 360}deg) translate(0, -60px) rotate(-${((value + 100) / 200) * 360}deg)`,transformOrigin: 'center',fontSize: '0.75rem',color: '#666'}}></Typography>
              )) :
              [0, 90, 180, 270].map((degree) => (
                <Typography key={degree} sx={{position: 'absolute',left: '50%',top: '50%',transform: `rotate(${degree}deg) translate(0, -60px) rotate(-${degree}deg)`,transformOrigin: 'center',fontSize: '0.75rem',color: '#666'}}>{degree}</Typography>
              ))
            }
          </Box>
          <Box sx={{position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',zIndex: 1}}>
            <Typography variant="h6" color="text.secondary">{unit}</Typography>
          </Box>
          {title === 'ADI' ? <></> :
          <Box sx={{position: 'absolute',top: '50%',left: '50%',width: '4px',height: '75px',backgroundColor: title === 'HIS' ? '#ff9800' : circleColor,transformOrigin: 'bottom center',transform: `translate(-50%, -100%) rotate(${(value / maxValue) * 360}deg)`,transition: 'transform 0.3s ease-in-out'}}/>}
        </Box>
        <Typography variant="h6" gutterBottom>{title}</Typography>
      </Paper>
    );
  };
  const renderAltitudeGauge = () => (
    <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#fff', borderRadius: 2 }}>
      <Box sx={{ position: 'relative', width: '100%', height: 200, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 60, height: '100%', border: '1px solid #ccc', position: 'relative' }}>
            {[0, 1000, 2000, 3000].map((value) => (
              <Box key={value} sx={{position: 'absolute',left: 0,right: 0,bottom: `${(value / 3000) * 100}%`,display: 'flex',alignItems: 'center',pl: 1}}>
                <Typography variant="caption" sx={{ position: 'absolute', right: 'calc(100% + 4px)' }}>{value}</Typography>
                <Box sx={{ flex: 1, height: 1, bgcolor: '#ccc' }}/>
              </Box>
            ))}
            <Box sx={{position: 'absolute',left: 0,right: 0,bottom: `${(getNumericValue(data.altitude) / 3000) * 100}%`,height: 2,bgcolor: '#1976d2',transition: 'bottom 0.3s ease-in-out'}}/>
          </Box>
        </Box>
      </Box>
      <Typography variant="h6" gutterBottom>Altitude</Typography>
    </Paper>
  );
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" color="primary">לוח מחוונים</Typography>
          <ToggleButtonGroup value={viewMode} exclusive onChange={(_, newMode) => newMode && setViewMode(newMode)} size="small">
            <ToggleButton value="text">טקסט</ToggleButton>
            <ToggleButton value="visual">ויזואלי</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Button variant="contained" color="primary" onClick={handleUpdateClick} sx={{ textTransform: 'uppercase' }}>עדכן נתונים</Button>
      </Box>
      {viewMode === 'visual' ? (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {renderAltitudeGauge()}
          {renderGauge(getNumericValue(data.his), 360, 'HIS', 'deg')}
          {renderGauge(getNumericValue(data.adi) + 100, 200, 'ADI', '%')}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography>Altitude: {data.altitude} ft</Typography>
          <Typography>HIS: {data.his}°</Typography>
          <Typography>ADI: {data.adi}%</Typography>
        </Box>
      )}
      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateCancel} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box>
              <TextField label="גובה (רגל)" type="text" value={updateValues.altitude} onChange={(e) => handleInputChange('altitude', e.target.value)} fullWidth error={!!errors.altitude} helperText={errors.altitude}/>
              <Typography sx={{color: '#1976d2',fontSize: '0.75rem',marginTop: '3px',marginLeft: '14px'}}>גובה חייב להיות בין 0 ל-3000</Typography>
            </Box>
            <Box>
              <TextField label="כיוון (מעלות)" type="text" value={updateValues.his} onChange={(e) => handleInputChange('his', e.target.value)} fullWidth error={!!errors.his} helperText={errors.his}/>
              <Typography sx={{color: '#1976d2',fontSize: '0.75rem',marginTop: '3px',marginLeft: '14px'}}>כיוון חייב להיות בין 0 ל-360</Typography>
            </Box>
            <Box>
              <TextField label="ADI" type="text" value={updateValues.adi} onChange={(e) => handleInputChange('adi', e.target.value)} fullWidth error={!!errors.adi} helperText={errors.adi}/>
              <Typography sx={{color: '#1976d2',fontSize: '0.75rem',marginTop: '3px',marginLeft: '14px'}}>ADI חייב להיות בין 100- ל-100</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateCancel}>ביטול</Button>
          <Button onClick={handleUpdateSubmit} variant="contained" color="primary" disabled={Object.keys(errors).length > 0}>עדכן</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};