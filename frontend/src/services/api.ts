import axios from 'axios';
import type { Item, CreateItemDto, UpdateItemDto } from '../types/item';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const getItems = async (): Promise<Item[]> => {
  const response = await apiClient.get<Item[]>('/api/items');
  return response.data;
};

export const getItem = async (id: string): Promise<Item> => {
  const response = await apiClient.get<Item>(`/api/items/${id}`);
  return response.data;
};

export const createItem = async (dto: CreateItemDto): Promise<Item> => {
  const response = await apiClient.post<Item>('/api/items', dto);
  return response.data;
};

export const updateItem = async (id: string, dto: UpdateItemDto): Promise<Item> => {
  const response = await apiClient.put<Item>(`/api/items/${id}`, dto);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await apiClient.delete(`/api/items/${id}`);
};

export const triggerUnhandledError = async (): Promise<void> => {
  await apiClient.get('/api/error/unhandled');
};

export const triggerHandledError = async (): Promise<void> => {
  await apiClient.get('/api/error/handled');
};

export const getHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export default apiClient;
