import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true // Important for sending cookies
});

// Flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Check if the response indicates a token refresh is needed
    if (error.response?.data?.shouldRefresh && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // The new access token is already created in the middleware response
        const { newAccessToken } = error.response.data;

        // Update localStorage with new token
        localStorage.setItem('accessToken', newAccessToken);

        // Update the original request's authorization header
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        processQueue(refreshError);
        
        // Redirect to login or dispatch logout action
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle other authentication errors
    if (error.response?.data?.shouldReAuthenticate) {
      // Redirect to login or dispatch logout action
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;