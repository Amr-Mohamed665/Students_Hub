import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('learnova_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('learnova_token');
      localStorage.removeItem('learnova_authenticated');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const authAPI = {
  login: async (email, password) => {
    await delay(800);
    return { success: true, token: 'mock_jwt_token', user: null };
  },
  signup: async (userData) => {
    await delay(800);
    return { success: true, token: 'mock_jwt_token', user: null };
  },
  logout: async () => {
    await delay(300);
    return { success: true };
  },
};

export const coursesAPI = {
  getAll: async () => {
    await delay(500);
    const { courses } = await import('../data/mockData');
    return { data: courses };
  },
  getById: async (id) => {
    await delay(300);
    const { courses } = await import('../data/mockData');
    return { data: courses.find((c) => c.id === id) };
  },
};

export const notificationsAPI = {
  getAll: async () => {
    await delay(400);
    const { notifications } = await import('../data/mockData');
    return { data: notifications };
  },
};

export default api;
