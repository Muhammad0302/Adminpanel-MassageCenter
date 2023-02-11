import { createSlice } from '@reduxjs/toolkit';
import { getAllBusiness, addBusiness, editBusiness, deleteBusiness } from '../../API/business';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  business: [],
  status: STATUSES.IDLE,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setBusiness: (state, { payload }) => {
      state.business = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setBusiness, setStatus } = businessSlice.actions;
export default businessSlice.reducer;

export function fetchBusiness() {
  return async function fetchAllSpasThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getAllBusiness();
      dispatch(setBusiness(res.data.business_data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function addTextBusiness(data) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(data);
      const res = await addBusiness(data);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchBusiness());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function editTextBusiness(id, data) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(data);
      const res = await editBusiness(id, data);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchBusiness());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteTextBusiness(id) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(id);
      const res = await deleteBusiness(id);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchBusiness());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}
