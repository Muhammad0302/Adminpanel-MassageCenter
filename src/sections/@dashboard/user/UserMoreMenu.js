/* eslint-disable */
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import Alert from 'react-popup-alert';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import MenuePop from './MenuePop';
import Swal from 'sweetalert2';
import { deletedUser } from '../../../features/users/userSlice';
import { useDispatch, useSelector } from 'react-redux';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({ isUserDetail, openTime, id, setRefreshPage, name }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [flag, setFlag] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleStatuses = (id) => {
    setIsApproved(true);
    setFlag(true);
    setIsOpen(false);
    setOpen(true);
    dispatch(approvedSpa(id));
  };
  const handleDelete = (id) => {
    setFlag(true);
    setIsOpen(false);
    setOpen(true);
    dispatch(deletedUser(id));
  };

  return (
    <>
      {flag && (
        <>
          <MenuePop name={name} isApproved={isApproved} setRefreshPage={setRefreshPage} setOpen={setOpen} open={open} />
        </>
      )}

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => {
          setIsOpen(false);
        }}
        PaperProps={
          isUserDetail
            ? {
                sx: { width: 200, maxWidth: '100%' },
              }
            : { sx: { width: 160, maxWidth: '100%' } }
        }
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {isUserDetail && (
          <>
            {/* <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <img src="/static/pop-images/openProfile.png" alt="profile" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Open Profile" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
            <Divider />
            <MenuItem sx={{ color: 'text.secondary' }}>
              <ListItemIcon>
                <img src="/static/pop-images/recentActivites.png" alt="activites" width={24} height={24} />
              </ListItemIcon>
              <ListItemText primary="Recent Activities" primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
            <Divider /> */}
          </>
        )}

        <MenuItem onClick={() => handleDelete(id)} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <img src="/static/pop-images/block.png" alt="delete" width={20} height={20} />
          </ListItemIcon>
          <ListItemText primary="Block user" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
