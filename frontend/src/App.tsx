import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { DashboardParamsForm } from './components/DashboardParamsForm';
import { DashboardView } from './components/DashboardView';
import { api } from './services/api';
import { DashboardData, DashboardParams } from './types';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Delete existing dashboard data
        await api.deleteDashboard();
        // Create new dashboard with default values
        const newData = await api.createDashboard({
          altitude: 0,
          his: 0,
          adi: 0
        });
        setDashboardData(newData);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, []);

  const handleCreateDashboard = async (params: DashboardParams) => {
    try {
      const data = await api.createDashboard(params);
      setDashboardData(data);
    } catch (error) {
      console.error('Error creating dashboard:', error);
    }
  };

  const handleAddData = async () => {
    if (!dashboardData) return;

    const newData = {
      ...dashboardData,
      altitude: Math.floor(Math.random() * 10000),
      his: Math.floor(Math.random() * 360),
      adi: Math.floor(Math.random() * 100)
    };

    try {
      const updatedData = await api.updateDashboard(newData);
      setDashboardData(updatedData);
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {!dashboardData ? (
          <DashboardParamsForm onSubmit={handleCreateDashboard} />
        ) : (
          <DashboardView data={dashboardData} onAddData={handleAddData} />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
