import axios from 'axios';
import { DashboardData, DashboardParams } from '../types';

const API_URL = 'http://localhost:3001/api';

const defaultConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  }
};

export const api = {
  async createDashboard(params: DashboardParams): Promise<DashboardData> {
    const response = await axios.post(`${API_URL}/dashboard`, params, defaultConfig);
    return response.data;
  },

  async getDashboard(): Promise<DashboardData> {
    const response = await axios.get(`${API_URL}/dashboard`, defaultConfig);
    return response.data;
  },

  async updateDashboard(data: DashboardData): Promise<DashboardData> {
    const response = await axios.put(`${API_URL}/dashboard/${data.id}`, data, defaultConfig);
    return response.data;
  },

  async deleteDashboard(): Promise<void> {
    const config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API_URL}/dashboard`,
      headers: {
        ...defaultConfig.headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      },
      data: ''
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}; 