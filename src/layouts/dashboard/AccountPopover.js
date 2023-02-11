import { useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
// components
import MenuPopover from '../../components/MenuPopover';
// mocks_
import account from '../../_mock/account';
import { logout } from '../../API/auth';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Account Settings',
    icon: 'eva:settings-2-fill',
    linkTo: '#',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover({ adminAuth }) {
  const anchorRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logOut = async () => {
    // Read data from local storage
    let userData = localStorage.getItem('adminAuth');
    userData = JSON.parse(userData);
    const userId = userData.id.toString();
    const res = await logout({ userId });
    if (res.status === 200) {
      localStorage.removeItem('adminAuth');
      navigate('/login', { replace: true });
    }

    setOpen(null);
  };
  const username = adminAuth.firstName;
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,

          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',

              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar style={{ height: '50px', width: '50px', backgroundColor: '#C8175D', fontSize: '22px' }} alt="photoURL">
          {username.charAt(0)}
        </Avatar>
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2
            // variant="subtitle2"
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: '550',
              fontSize: '16px',
              lineHeight: '29px',
              color: '#000000',
            }}
          >
            {`${adminAuth?.firstName} ${adminAuth?.lastName}`}
            {/* Admin */}
          </h2>
          <Typography
            style={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '16px',

              color: '#000000',
            }}
            noWrap
          >
            {adminAuth?.email}
          </Typography>
        </Box>

        <Stack sx={{ p: 0, marginTop: '-5px' }}>
          {/* <MenuItem onClick={handleClose} sx={{ m: 1, mt: 0 }}>
            <ListItemIcon style={{ marginRight: '-7px' }}>
              <SettingsIcon style={{ color: '#C8175D' }} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              style={{
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                textTransform: 'capitalize',
                color: '#000000',
              }}
              primary="Account Settings"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem> */}
          <MenuItem onClick={logOut} sx={{ m: 1, mt: 0 }}>
            <ListItemIcon style={{ marginRight: '-7px' }}>
              <LogoutIcon style={{ color: '#C8175D' }} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              style={{
                fontFamily: 'Open Sans',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16px',
                textTransform: 'capitalize',
                color: '#000000',
              }}
              primary="Logout"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}
