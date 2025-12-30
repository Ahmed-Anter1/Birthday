import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/auth/login');

    if (error.response?.status === 401 && !isAuthRoute) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);


export const login = (credentials) => api.post('/auth/login', credentials);
export const getMe = () => api.get('/auth/me');
export const updateCredentials = (data) => api.put('/auth/credentials', data);
export const toggleFriendMode = (userId, enable) => api.post('/auth/toggle-friend-mode', { userId, enable });

export const uploadMedia = (formData) => api.post('/media/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const getMedia = (type) => api.get('/media', { params: { type } });
export const deleteMedia = (id) => api.delete(`/media/${id}`);
export const toggleMediaVisibility = (id) => api.patch(`/media/${id}/visibility`);

export const createMessage = (data) => api.post('/messages', data);
export const getMessages = () => api.get('/messages');
export const updateMessage = (id, data) => api.put(`/messages/${id}`, data);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// Memory Timeline APIs
export const createMemory = (formData) =>
  api.post('/memories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  export const getMemories = () => api.get('/memories');
export const getMemoryById = (id) => api.get(`/memories/${id}`);
export const updateMemory = (id, data) => api.put(`/memories/${id}`, data);
export const deleteMemory = (id) => api.delete(`/memories/${id}`);

// Future Messages APIs
export const createFutureMessage = (data) => api.post('/future-messages', data);
export const getFutureMessages = () => api.get('/future-messages');
export const getFutureMessageById = (id) => api.get(`/future-messages/${id}`);
export const updateFutureMessage = (id, data) => api.put(`/future-messages/${id}`, data);
export const deleteFutureMessage = (id) => api.delete(`/future-messages/${id}`);
export const markMessageAsOpened = (id) => api.patch(`/future-messages/${id}/open`);

export default api;