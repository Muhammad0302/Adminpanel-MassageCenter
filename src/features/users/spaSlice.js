import { createSlice } from '@reduxjs/toolkit';
import { getAllSpa, approveSpa, deleteSpa, bulkDeletionSpa } from '../../API/spa';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  spas: [],
  status: STATUSES.IDLE,
};

const spaSlice = createSlice({
  name: 'spas',
  initialState,
  reducers: {
    setSpas: (state, { payload }) => {
      state.spas = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setSpas, setStatus } = spaSlice.actions;
export default spaSlice.reducer;

export function fetchSpas() {
  return async function fetchAllSpasThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getAllSpa();
      // const data = await res.json();
      dispatch(setSpas(res.data.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function approvedSpa(id) {
  return async function approveSpaThunk(dispatch, getState) {
    try {
      await approveSpa(id);
    } catch (err) {
      console.log(err);
    }
  };
}
export function deletedSpa(id) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await deleteSpa(id);
    } catch (err) {
      console.log(err);
    }
  };
}

export function deletedBulkSpas(arrayOfIds) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await bulkDeletionSpa(arrayOfIds);
    } catch (err) {
      console.log(err);
    }
  };
}
