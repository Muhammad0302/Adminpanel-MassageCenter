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
import { RegisterForm } from '../sections/auth/register';
import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    display: 'flex',
    backgroundColor: 'white',
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'white',
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
  maxWidth: 690,
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
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const [isSecond, setIsSecond] = useState(true);
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <BiggerLogo isSecond={isSecond} />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account? {''}
              <Link style={{ color: '#C8175D' }} variant="subtitle2" component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
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
                    fontSize: '30.2px',
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
                    width: '360px',
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

        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Get started
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Enter your details below.</Typography>

            <RegisterForm />

            <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to Bodyslides&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>
              {''}and{''}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link style={{ color: '#C8175D' }} variant="subtitle2" to="/login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
