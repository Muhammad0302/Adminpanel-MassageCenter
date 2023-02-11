import { Link as RouterLink, useLocation } from 'react-router-dom';
// @mui
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';

// sections
import { verifyEmail } from '../API/forgotPassword';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
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
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  alignItem: 'center',
}));

// ----------------------------------------------------------------------

export default function EmailVerification() {
  const [isVarfied, setIsVarfied] = useState();
  const [successMsge, setSucessMsge] = useState('');
  const [failMsge, setFailMsge] = useState('');
  const url = window.location;
  const accesstoken = new URLSearchParams(url.search).get('token');
  const verificationOfEmail = async () => {
    const res = await verifyEmail(accesstoken);

    if (res.request.status === 200) {
      setSucessMsge('Your email varified, Go back and login on bodySlide');
      console.log(res);
    } else {
      setFailMsge('Your email varification failed');
    }
  };
  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>

        <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
          <ContentStyle>
            <Link
              onClick={verificationOfEmail}
              style={{ marginLeft: '80px', cursor: 'pointer' }}
              variant="h5"
              gutterBottom
            >
              Verify email
            </Link>

            <Typography sx={{ color: 'green' }}>{successMsge}</Typography>

            <Typography sx={{ color: 'red' }}>{failMsge} </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Click on above link to verify your email.</Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
