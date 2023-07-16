import axios from 'axios';
import queryString from 'query-string';
import { MallInterface, MallGetQueryInterface } from 'interfaces/mall';
import { GetQueryInterface } from '../../interfaces';

export const getMalls = async (query?: MallGetQueryInterface) => {
  const response = await axios.get(`/api/malls${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMall = async (mall: MallInterface) => {
  const response = await axios.post('/api/malls', mall);
  return response.data;
};

export const updateMallById = async (id: string, mall: MallInterface) => {
  const response = await axios.put(`/api/malls/${id}`, mall);
  return response.data;
};

export const getMallById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/malls/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMallById = async (id: string) => {
  const response = await axios.delete(`/api/malls/${id}`);
  return response.data;
};
