import { axiosInstance } from './axiosInstances';

// Get user Detail
export const getUserDetail = async (id) => {
  try {
    return await axiosInstance.get(`/admin/users/${id}`);
  } catch (error) {
    return error;
  }
};
