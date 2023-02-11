import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid grey',
  borderRadius: '14.4872px',
  boxShadow: 24,
  p: 3,

  height: '100px',
  background: '#FFFFFF',
};

export default function MenuePop({ setOpen, open, setRefreshPage, name, isApproved }) {
  const handleClose = () => {
    setOpen(false);
    setRefreshPage(2);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}
          >
            {' '}
            <span style={{ paddingTop: '14px' }}>
              {' '}
              {name} account has been {isApproved === false ? 'deleted' : 'approved'}{' '}
            </span>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
