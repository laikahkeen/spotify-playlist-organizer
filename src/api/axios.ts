import axios, { AxiosRequestConfig, CreateAxiosDefaults, isAxiosError } from 'axios';

export const AxiosMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export const createApiRequest = (config: CreateAxiosDefaults) => {
  const axiosInstance = axios.create(config);

  const request = async (options: AxiosRequestConfig) => {
    try {
      const response = await axiosInstance(options);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  return { request, axiosInstance };
};
