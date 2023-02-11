import { axiosInstance } from './axiosInstances';

// Get all masseuse
export const getAllMasseuse = async () => {
  try {
    return await axiosInstance.get(`/admin/masseuse/all`);
  } catch (error) {
    return error;
  }
};

// Approve masseuse
export const approveMasseuse = async (id) => {
  try {
    return await axiosInstance.get(`/admin/approve/masseuse/${id}`);
  } catch (error) {
    return error;
  }
};

// Delete masseuse
export const deleteMasseuse = async (id) => {
  try {
    return await axiosInstance.delete(`/admin/masseuse/${id}`);
  } catch (error) {
    return error;
  }
};

// Bulk deletion of all Spa
export const bulkDeletionMasseuse = async (arraysOfIds) => {
  try {
    return await axiosInstance.patch(`/admin/multiple/delete/masseuse`, arraysOfIds);
  } catch (error) {
    return error;
  }
};

