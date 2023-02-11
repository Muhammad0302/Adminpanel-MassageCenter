/* eslint-disable */
import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, ErrorMessage } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { login } from '../../../API/auth';

// ----------------------------------------------------------------------

export default function LoginForm({ smUp }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      console.log(data);
      try {
        const res = await login(data);
        console.log(res);
        if (res.data.success) {
          console.log('login successful');
          localStorage.setItem('adminAuth', JSON.stringify(res.data.data));
          navigate('/dashboard/user', { replace: true });
        }
      } catch {
        console.log('Error got catched');
        setErrorMessage('No user found with this email');
      }

      // if (res.response.data.message) {
      //   console.log(res.response.data.message);
      //   setErrorMessage(res.response.data.message);
      // }

      // if (res.response.data.message === 'No user found with this email.') {
      //   setErrorMessage('Invalid email or password');
      //   console.log('Invalid email or password');
      // } else if (res.response.data.message === 'Email is not verified.') {
      //   setErrorMessage('Email is not verified.');
      //   console.log('Email is not verified');

      // if (res.data.data.success === true) {
      //   // localStorage.setItem('adminAuth', JSON.stringify(res.data.data));
      //   console.log('you are login successfully');
      // } else {
      //   setErrorMessage('Email is not verified.');
      //   console.log('Email is not verified');
      // }
      // navigate('/dashboard/app', { replace: true });
      // }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Stack spacing={3}>
            <TextField
              required
              size={smUp ? 'medium' : 'small'}
              fullWidth
              style={{ width: '100%', height: '63.16px' }}
              autoComplete="username"
              type="email"
              label="Email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& > fieldset': {
                    borderColor: '#C8175D',
                  },
                },
              }}
            />

            <TextField
              required
              fullWidth
              size={smUp ? 'medium' : 'small'}
              style={{ width: '100%', height: '63.16px' }}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root.Mui-focused': {
                  '& > fieldset': {
                    borderColor: '#C8175D',
                  },
                },
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2, marginRight: '-145px' }}
          >
            <Link
              style={{ color: '#C8175D', marginLeft: 'auto' }}
              to="/forgot-pass"
              component={RouterLink}
              variant="subtitle2"
              underline="hover"
            >
              Forgot Password?
            </Link>
          </Stack>
          {errorMessage && (
            <h4 style={{ color: 'red', marginTop: '-10px', marginBottom: '10px', marginLeft: '30px' }}>
              {errorMessage}
            </h4>
          )}
          <div style={{}}>
            <LoadingButton
              style={{
                backgroundColor: '#C8175D',
                borderRadius: '33.3px',
                width: '126.9px',
                height: '45px',
              }}
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Sign In
            </LoadingButton>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
