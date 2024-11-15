import axios from 'axios';
import { Registration } from '../types/Registration';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getRegistrations = () => api.get<Registration[]>('/registration');
export const addRegistration = (data: Registration) => api.post('/registration', data);
export const updateRegistration = (id: number, data: Registration) => api.put(`/registration/${id}`, data);
export const deleteRegistration = (id: number) => api.delete(`/registration/${id}`);
export default api;
