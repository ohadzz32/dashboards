import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Alert, Snackbar } from '@mui/material';
import { DashboardView } from './components/DashboardView';
import { StudentDashboardView } from './components/StudentDashboardView';
import { DashboardData } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({ altitude: 0, his: 0, adi: 0 ,_id:""});
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboard();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to fetch dashboard data. Please try again.');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddData = async (newData: DashboardData) => {
    try {
      const updatedData = await api.updateDashboard(newData);
      setDashboardData(updatedData);
      setError(null);
    } catch (err) {
      setError('Failed to update dashboard. Please try again.');
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>


      {activeTab === 0 ? (
        <DashboardView data={dashboardData} onAddData={handleAddData} />
      ) : (
        <StudentDashboardView data={dashboardData} onAddData={handleAddData} />
      )}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
