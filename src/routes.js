/* eslint-disable */
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { useState } from 'react';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Masseuse from './pages/Masseuse';
import Business from './pages/business';
import HomePageHtml from './pages/homepageHtml';
import User from './pages/User';
import UserDetail from './pages/UserDetail';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmailVerification from './pages/EmailVerification';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Spas from './pages/Spas';
import City from './pages/City';

// ----------------------------------------------------------------------

export default function Router() {
  let userData = localStorage.getItem('adminAuth');
  userData = JSON.parse(userData);
  const isVerifyUser = userData?.isVerified;

  return useRoutes([
    {
      path: '/dashboard',
      element: !isVerifyUser ? <Navigate to="/login" /> : <DashboardLayout />,
      children: [
        { path: 'city', element: <City /> },
        { path: 'user', element: <User /> },
        { path: 'user-detail/:id', element: <UserDetail /> },
        { path: 'spas', element: <Spas /> },
        { path: 'masseuse', element: <Masseuse /> },
        { path: 'business', element: <Business /> },
        { path: 'homepagehtml', element: <HomePageHtml /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: isVerifyUser ? <Navigate to="/dashboard/user" /> : <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'forgot-pass', element: <ForgotPassword /> },
        { path: 'reset-pass', element: <ResetPassword /> },
        { path: 'signup', element: <EmailVerification /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
