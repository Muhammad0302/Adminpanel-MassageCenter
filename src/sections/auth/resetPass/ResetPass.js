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
import { updatePassword } from '../../../API/forgotPassword';

// ----------------------------------------------------------------------

export default function ResetPass({ smUp }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const LoginSchema = Yup.object().shape({
    newPassword: Yup.string().required('New password is required'),
    newPasswordAgain: Yup.string().required('Confirm password is required'),
  });
  let email = localStorage.getItem('emailIdentity');
  email = JSON.parse(email);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      if (data.newPassword === data.newPasswordAgain) {
        const password = data.newPassword;

        const res = await updatePassword({ email, password });
        // localStorage.clear();
        console.log(res);
        navigate('/login', { replace: true });
      } else {
        setErrorMessage('Passwords are not match');
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleShowPasswordAgain = () => {
    setShowPasswordAgain((show) => !show);
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
              autoComplete="off"
              style={{ width: '100%' }}
              type={showPassword ? 'text' : 'password'}
              label="New Password"
              {...getFieldProps('newPassword')}
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
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <TextField
              required
              size={smUp ? 'medium' : 'small'}
              fullWidth
              autoComplete="off"
              style={{ width: '100%' }}
              type={showPasswordAgain ? 'text' : 'password'}
              label="Confirm Password"
              {...getFieldProps('newPasswordAgain')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPasswordAgain} edge="end">
                      <Iconify icon={showPasswordAgain ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
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
              error={Boolean(touched.newPasswordAgain && errors.newPasswordAgain)}
              helperText={touched.newPasswordAgain && errors.newPasswordAgain}
            />
          </Stack>

          <br />
          {errorMessage && <h4 style={{ color: 'red', marginTop: '-10px', marginBottom: '10px' }}>{errorMessage}</h4>}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LoadingButton
              style={{ backgroundColor: '#C8175D', borderRadius: '33.3px', width: '126.9px', height: '45px' }}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
