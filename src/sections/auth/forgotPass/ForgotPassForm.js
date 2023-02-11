/* eslint no-use-before-define: 0 */ // --> OFF
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider, ErrorMessage } from 'formik';
import ReactCodeInput from 'react-code-input';
import { styled } from '@mui/material/styles';

// material
import {
  Link,
  Stack,
  Typography,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../../../hooks/useResponsive';
// component
import Iconify from '../../../components/Iconify';
import { forgotPassword, resendCode, verificationOfCode } from '../../../API/forgotPassword';

// ----------------------------------------------------------------------

export default function ForgotPassForm({ isForget, setIsForget }) {
  const smUp = useResponsive('up', 'sm');
  const [verificationData, setVerificationData] = useState({
    email: '',
    code: null,
  });
  const [count, setCount] = useState(23);
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState('');
  const [valid, setValid] = useState(true);
  const [emailer, setEmail] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const handleValueInput = (e) => {
    setMessage('');
    setValid(true);
    if (String(e).replace(/[A-Za-z]/g, '').length === 4) {
      setVerificationData({ code: e, email: emailer.email });
      // setVerificationData({ email: emailer });
      // console.log(e);
      // if (e !== '222222') {
      //   setValid(false);
      // } else {
      //   setValid(true);
      // }
    }
  };

  useEffect(() => {
    // increment the count by 1
    if (count && active > 0) {
      const countTimer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
        // every 1000 milliseconds
      }, 1000);

      // and clear this timer when the component is unmounted
      return function cleanup() {
        clearInterval(countTimer);
      };
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (data) => {
      // setVerificationData({ email: data });
      setEmail(data);
      const res = await forgotPassword(data);
      console.log(res);

      if (res.status === 200) {
        // eslint-disable-next-line
        setIsForget(true);
        setActive(true);
      }

      if (res.response.data.message === 'No user found with this email.') {
        setErrorMessage('No user found with this email.');
      } else if (res.response.data.message === 'Email is not verified.') {
        setErrorMessage('Email is not verified.');
        console.log('Email is not verified');
      }

      // The given below commented code is for getting issue while displaying response of api

      // setIsForget(true);
      // if (res.response.data.message === 'No user found with this email.') {
      //   console.log('No user found with this email.');
      //   // setErrorMessage('');
      //   // setIsForget(true);
      // }
      // if (res.data.message === 'Forgot passowrd email sent') {
      //   console.log('Forgot passowrd email sent');
      //   // setErrorMessage('No user found with this email.');
      // }

      // forgotPassword(data)
      //   .then((res) => {
      //     console.log(res);
      //     setIsForget(true);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setErrorMessage('No user found with this email.');
      //   });

      // navigate('/dashboard/app', { replace: true });
      // if (res.response.data.message === 'No user found with this email.') {
      //   setErrorMessage('Invalid email or password');
      // } else {
      //   // localStorage.setItem('adminAuth', JSON.stringify(res.data.data));
      //   setErrorMessage('Email is not verified.');
      //   navigate('/dashboard/app', { replace: true });
      // }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const resendAgain = async () => {
    console.log(emailer);
    const res = await resendCode(emailer);
    setCount(23);
    setMessage('Code Resended');
    console.log(res);
  };
  const verifyMethod = async () => {
    localStorage.setItem('emailIdentity', JSON.stringify(verificationData.email));
    setMessage('');
    const res = await verificationOfCode(verificationData);
    console.log(res);
    // navigate('/reset-pass', { replace: true });
    if (res.response.data.message === 'Valid code.') {
      setValid(true);
      navigate('/reset-pass', { replace: true });
    } else {
      setValid(false);
    }
  };
  return (
    <>
      {isForget ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '30px',
              width: '420.9px',
              height: '500.7px',

              background: '#FFFFFF',
              boxShadow: smUp && '0px 3.6px 18px rgba(0, 0, 0, 0.13)',
              borderRadius: '30.6px',
            }}
          >
            <div>
              <Typography
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '30px',
                  lineHeight: '49px',
                  textAlign: 'center',
                  color: '#000000',
                }}
                gutterBottom
              >
                Verification
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '21px',
                  textAlign: 'center',
                  color: '#323233',
                }}
              >
                Please enter the verification code we <br /> have sent to your email address
              </Typography>
              <br />

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ReactCodeInput
                  name="resetPassword"
                  inputMode="numeric"
                  fields={4}
                  type="text"
                  onChange={(e) => handleValueInput(e)}
                  isValid={valid}
                />
              </div>
              <Stack direction="column" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                <p style={{ textAlign: 'center' }}>
                  {' '}
                  Resend code in 00:{count}&nbsp;
                  <Link
                    style={{ color: '#C8175D', pointerEvents: !count < 1 && 'none' }}
                    // style={count === 0 ? { pointerEvents: 'true' } : { pointerEvents: 'none' }}
                    to="#"
                    onClick={resendAgain}
                    component={RouterLink}
                    variant="subtitle2"
                    underline="hover"
                  >
                    Resend
                  </Link>
                </p>
                {message && <h4 style={{ color: '#C8175D' }}>{message}</h4>}
              </Stack>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoadingButton
                  style={{ backgroundColor: '#C8175D', borderRadius: '33.3px', width: '126.9px', height: '45px' }}
                  onClick={verifyMethod}
                  size="large"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Verify
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '30px',
                width: '420.9px',
                height: '500.7px',

                background: '#FFFFFF',
                boxShadow: smUp && '0px 3.6px 18px rgba(0, 0, 0, 0.13)',
                borderRadius: '30.6px',
              }}
            >
              <Typography
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '25px',
                  lineHeight: '49px',
                  textAlign: 'center',
                  color: '#000000',
                }}
                gutterBottom
              >
                Forgot your Password?
              </Typography>
              <Typography
                style={{
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  textAlign: 'center',
                  color: '#323233',
                }}
              >
                Enter your email address to receive
                <br /> a verification code
              </Typography>
              <br />
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      required
                      size={smUp ? 'medium' : 'small'}
                      fullWidth
                      autoComplete="username"
                      type="email"
                      label="Email address"
                      style={{ width: '100%' }}
                      {...getFieldProps('email')}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused': {
                          '& > fieldset': {
                            borderColor: '#C8175D',
                          },
                        },
                      }}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Stack>
                  <br />
                  {errorMessage && <h4 style={{ color: 'red' }}>{errorMessage}</h4>}
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton
                      style={{
                        backgroundColor: '#C8175D',
                        borderRadius: '33.3px',
                        width: '126.9px',
                        height: '45px',
                        marginLeft: '14px',
                      }}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Send
                    </LoadingButton>
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </div>
        </>
      )}
    </>
  );
}
