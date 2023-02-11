import { axiosInstance } from './axiosInstances';

// forgot password
export const forgotPassword = async (data) => {
  try {
    return await axiosInstance.post(`/admin/forgot-password`, data);
  } catch (error) {
    return error;
  }
};

// resend code
export const resendCode = async (email) => {
  try {
    return await axiosInstance.post(`/admin/resend-code`, email);
  } catch (error) {
    return error;
  }
};

// verification of code
export const verificationOfCode = async (data) => {
  try {
    return await axiosInstance.post(`/admin/verify-code`, data);
  } catch (error) {
    return error;
  }
};

// update Password
export const updatePassword = async (data) => {
  try {
    return await axiosInstance.post(`/admin/update-password`, data);
  } catch (error) {
    return error;
  }
};

// verify email
export const verifyEmail = async (token) => {
  try {
    return await axiosInstance.get(`/admin/verifyToken/${token}`);
  } catch (error) {
    return error;
  }
};
