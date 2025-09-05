import { jwtDecode } from 'jwt-decode';

// Get token from sessionStorage
export const getToken = () => sessionStorage.getItem('token');

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (err) {
    return true; // If token can't be decoded, treat as expired
  }
};

// Logout user
export const logout = () => {
  sessionStorage.removeItem('token');
  window.location.href = '/signin';
};

