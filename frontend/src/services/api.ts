import axios from 'axios';
import { DashboardData, DashboardParams } from '../types';

const API_URL = 'http://localhost:3006/api';

const defaultConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const api = {
  async createDashboard(params: DashboardParams): Promise<DashboardData> {
    try {
      console.log('Creating dashboard with params:', params);
      const response = await axios.post(`${API_URL}/dashboard`, params, defaultConfig);
      console.log('Create response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Create error:', error.response?.data || error.message);
      } else {
        console.error('Create error:', error);
      }
      throw error;
    }
  },

  async getDashboard(): Promise<DashboardData> {
    try {
      console.log('Fetching dashboard data');
      const response = await axios.get(`${API_URL}/dashboard`, defaultConfig);
      console.log('Get response:', response.data[0]);
      return response.data[0];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Get error:', error.response?.data || error.message);
      } else {
        console.error('Get error:', error);
      }
      throw error;
    }
  },

  async updateDashboard(data: DashboardData): Promise<DashboardData> {
    try {
      console.log('Updating dashboard with data:', data);
      const response = await axios.put(`${API_URL}/dashboard/${data._id}`, {
        altitude: data.altitude,
        his: data.his,
        adi: data.adi
      }, defaultConfig);
      console.log('Update response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update error:', error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || error.message;
        console.error('Update error details:', errorMessage);
      } else {
        console.error('Update error:', error);
      }
      throw error;
    }
  },

  async deleteDashboard(): Promise<void> {
    try {
      console.log('Deleting dashboard');
      const response = await axios.delete(`${API_URL}/dashboard`, defaultConfig);
      console.log('Delete response:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete error:', error.response?.data || error.message);
      } else {
        console.error('Delete error:', error);
      }
      throw error;
    }
  }
}; 