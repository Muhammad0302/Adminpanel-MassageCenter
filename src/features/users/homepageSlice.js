import { createSlice } from '@reduxjs/toolkit';
import { getAllHomePage, addHomePageHtml, editHomePageHtml, deletehomepage } from '../../API/homepagehtml';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  homepage: [],
  status: STATUSES.IDLE,
};

const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    setHomepage: (state, { payload }) => {
      state.homepage = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setHomepage, setStatus } = homepageSlice.actions;
export default homepageSlice.reducer;

export function fetchHomepage() {
  return async function fetchAllSpasThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getAllHomePage();
      dispatch(setHomepage(res.data.homepage_data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function addTextHomePage(data) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(data);
      const res = await addHomePageHtml(data);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchHomepage());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function editTextHomepage(id, data) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(data);
      const res = await editHomePageHtml(id, data);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchHomepage());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function deleteTextHomePage(id) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      console.log(id);
      const res = await deletehomepage(id);
      console.log('Response is ');
      console.log(res);
      if (res?.data?.success) {
        dispatch(fetchHomepage());
      } else {
        console.log('Error');
      }
    } catch (err) {
      console.log(err);
    }
  };
}
