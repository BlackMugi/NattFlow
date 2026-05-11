import axios from 'axios';

const axiosInstance = axios.create();

// On injecte le JWT 
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Gestion des erreurs
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
       if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
       }
    }
    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      'Une erreur est survenue.';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;