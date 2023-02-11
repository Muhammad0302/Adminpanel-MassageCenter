import { createSlice } from '@reduxjs/toolkit';
import { getAllMasseuse, approveMasseuse, deleteMasseuse, bulkDeletionMasseuse } from '../../API/masseuse';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  masseuse: [],
  status: STATUSES.IDLE,
};

const masseuseSlice = createSlice({
  name: 'masseuse',
  initialState,
  reducers: {
    setMasseuse: (state, { payload }) => {
      state.masseuse = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setMasseuse, setStatus } = masseuseSlice.actions;
export default masseuseSlice.reducer;

export function fetchMasseuse() {
  return async function fetchAllSpasThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getAllMasseuse();
      // const data = await res.json();
      dispatch(setMasseuse(res.data.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function approvedMasseuse(id) {
  return async function approveSpaThunk(dispatch, getState) {
    try {
      await approveMasseuse(id);
    } catch (err) {
      console.log(err);
    }
  };
}
export function deletedMasseuse(id) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await deleteMasseuse(id);
    } catch (err) {
      console.log(err);
    }
  };
}

export function deletedBulkMasseuse(arrayOfIds) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await bulkDeletionMasseuse(arrayOfIds);
    } catch (err) {
      console.log(err);
    }
  };
}
