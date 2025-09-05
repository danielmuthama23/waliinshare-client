import axios from 'axios';
import { getToken, isTokenExpired, logout } from './auth';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    if (isTokenExpired(token)) {
      logout(); // If token is expired, logout user
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => Promise.reject(error));

export default instance;