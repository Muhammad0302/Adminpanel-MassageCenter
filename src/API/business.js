import { axiosInstance } from './axiosInstances';

// Get all masseuse
export const getAllBusiness = async () => {
  try {
    console.log('ALL BUSINESS');
    return await axiosInstance.get(`/admin/getbusiness`);
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const addBusiness = async (richtext) => {
  //   console.log(richtext);
  //   const data = JSON.stringify({
  //     content: richtext,
  //   });

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  try {
    console.log('ALL BUSINESS');
    const res = await axiosInstance.post(`/admin/createbusiness`, richtext, config);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const editBusiness = async (id, richtext) => {
  console.log(richtext);

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  try {
    console.log('edit Business');
    const res = await axiosInstance.put(`/admin/editbusiness/${id}`, richtext, config);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const deleteBusiness = async (id) => {
  try {
    console.log('delete Business');
    const res = await axiosInstance.delete(`/admin/deletebusiness/${id}`);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};
