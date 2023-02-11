import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_HOST,
  // baseURL: 'http://localhost:4000/api',
  baseURL: 'https://bodyslides.ca/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // We getting it everytime
  /* eslint-disable no-param-reassign */
  config.headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': '*',
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 400 &&
      (!error.response.config || error.response.config.url !== '/')
    ) {
      // Unauthorized
    }
    return Promise.reject(error);
  }
);
