import { createSlice } from '@reduxjs/toolkit';
import { getAllUser, deleteUser, bulkDeletionUsers } from '../../API/user';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});

const initialState = {
  users: [],
  status: STATUSES.IDLE,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setUsers, setStatus } = userSlice.actions;
export default userSlice.reducer;
// export const getAllUsers = (state) => state.users.users;

export function fetchUsers() {
  return async function fetchProductThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await getAllUser();
      // const data = await res.json();
      dispatch(setUsers(res.data.data));
      dispatch(setStatus(STATUSES.IDLE));
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deletedUser(id) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await deleteUser(id);
    } catch (err) {
      console.log(err);
    }
  };
}

export function deletedBulkUsers(arrayOfIds) {
  return async function deleteSpaThunk(dispatch, getState) {
    try {
      await bulkDeletionUsers(arrayOfIds);
    } catch (err) {
      console.log(err);
    }
  };
}
