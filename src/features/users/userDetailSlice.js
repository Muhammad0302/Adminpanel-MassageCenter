import { createSlice } from '@reduxjs/toolkit';
import { getUserDetail } from '../../API/userDetail';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  userDetail: [],
  status: STATUSES.IDLE,
};

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    setUserDetail: (state, { payload }) => {
      state.userDetail = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setUserDetail, setStatus } = userDetailSlice.actions;
export default userDetailSlice.reducer;
// export const getAllUsers = (state) => state.userDetail.userDetail;

export function fetchUserDetail(id) {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getUserDetail(id);
      // const data = await res.json();
      dispatch(setUserDetail(res.data.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
