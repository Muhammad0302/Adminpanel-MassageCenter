import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import BiggerLogo from '../components/BiggerLogo';
// sections
import { LoginForm } from '../sections/auth/login';

import { ForgotPassForm } from '../sections/auth/forgotPass';

import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    display: 'flex',
    backgroundColor: 'white',
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'white',
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#C8175D',
  borderRadius: '0px',
  marginLeft: '0px',
  marginTop: '0px',
  marginBottom: '0px',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: '50%',
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  const smUp = useResponsive('up', 'sm');
  const [isSecond, setIsSecond] = useState(true);
  const lgUp = useResponsive('up', 'lg');
  const [isForget, setIsForget] = useState(false);

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <BiggerLogo isSecond={isSecond} />

          {/* {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link style={{ color: '#C8175D' }} variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )} */}
        </HeaderStyle>

        {lgUp && (
          <SectionStyle>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  color: 'white',
                }}
              >
                <div
                  style={{
                    fontSize: '43.2px',
                    fontWeight: 700,
                  }}
                >
                  Welcome to Body Slides
                </div>

                <p
                  style={{
                    fontSize: '16.2px',

                    fontFamily: 'Open Sans',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    width: '480px',
                    lineHeight: '25px',
                  }}
                >
                  Biggest Massage Oriented Forums on the Planet - User Reviews, Recommendations and discussion forums of
                  massage parlours services & entertainment
                </p>
              </div>
            </div>
            <div style={{ position: 'absolute', right: '0px', bottom: '0px' }}>
              <img width={260} height={221} src="/static/userDetail-images/authScreenImage.png" alt="pic" />
            </div>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <ForgotPassForm isForget={isForget} setIsForget={setIsForget} />

            {/* {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link style={{ color: '#C8175D' }} variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )} */}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
