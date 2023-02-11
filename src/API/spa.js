import { axiosInstance } from './axiosInstances';

// Get all spas
export const getAllSpa = async () => {
  try {
    return await axiosInstance.get(`/admin/spas/all`);
  } catch (error) {
    return error;
  }
};

// Approve spa
export const approveSpa = async (id) => {
  try {
    return await axiosInstance.get(`/admin/approve/spa/${id}`);
  } catch (error) {
    return error;
  }
};

// Delete spa
export const deleteSpa = async (id) => {
  try {
    return await axiosInstance.delete(`/admin/spa/${id}`);
  } catch (error) {
    return error;
  }
};

// Bulk deletion of all Spa
export const bulkDeletionSpa = async (arraysOfIds) => {
  try {
    return await axiosInstance.patch(`/admin/multiple/delete/spa`, arraysOfIds);
  } catch (error) {
    return error;
  }
};
