import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/userSlice';
import spasReducer from './users/spaSlice';
import masseuseReducer from './users/masseuseSlice';
import userDetailReducer from './users/userDetailSlice';
import businessReducer from './users/businessSlice';
import homepageReducer from './users/homepageSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    spas: spasReducer,
    masseuse: masseuseReducer,
    userDetail: userDetailReducer,
    business: businessReducer,
    homepage: homepageReducer,
  },
});
