import { axiosInstance } from './axiosInstances';

// Get all masseuse
export const getAllHomePage = async () => {
  try {
    console.log('ALL BUSINESS');
    return await axiosInstance.get(`/admin/gethomepage`);
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const addHomePageHtml = async (richtext) => {
  //   console.log(richtext);
  //   const data = JSON.stringify({
  //     content: richtext,
  //   });

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  try {
    console.log('ALL BUSINESS');
    const res = await axiosInstance.post(`/admin/createhomepagehtml`, richtext, config);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const editHomePageHtml = async (id, richtext) => {
  console.log(richtext);

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  try {
    console.log('edit Business');
    const res = await axiosInstance.put(`/admin/edithomepage/${id}`, richtext, config);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};

export const deletehomepage = async (id) => {
  try {
    console.log('delete Business');
    const res = await axiosInstance.delete(`/admin/deletehomepage/${id}`);
    return res;
  } catch (error) {
    console.log('ERROR');
    return error;
  }
};
