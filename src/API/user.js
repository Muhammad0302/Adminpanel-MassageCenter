import { axiosInstance } from './axiosInstances';

// Get all users
export const getAllUser = async () => {
  try {
    return await axiosInstance.get(`/admin/users/all`);
  } catch (error) {
    return error;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    return await axiosInstance.delete(`/admin/users/${id}`);
  } catch (error) {
    return error;
  }
};

// Bulk deletion of all Users
export const bulkDeletionUsers = async (arraysOfIds) => {
  try {
    return await axiosInstance.patch(`/admin/multiple/delete/users`, arraysOfIds);
  } catch (error) {
    return error;
  }
};
