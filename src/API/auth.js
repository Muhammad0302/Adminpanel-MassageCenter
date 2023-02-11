import { axiosInstance } from './axiosInstances';

// sign-up Admin
// Comment for testing push with ssh
export const signUp = async (data) => {
  try {
    return await axiosInstance.post(`/admin/sign-up`, data);
  } catch (error) {
    return error;
  }
};

// login Admin
export const login = async (data) => {
  try {
    return await axiosInstance.post(`/admin/login`, data);
  } catch (error) {
    return error;
  }
};

// logout Admin
export const logout = async (id) => {
  try {
    // const userId = id.toString();
    // console.log(id);
    return await axiosInstance.post(`/admin/logout`, id);
  } catch (error) {
    return error;
  }
};
