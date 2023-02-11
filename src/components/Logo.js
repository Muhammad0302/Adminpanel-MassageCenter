import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx, isSecond }) {
  return (
    <Box
      component="img"
      src={isSecond ? '/static/logoSecond.png' : '/static/logo.jpg'}
      sx={{ width: 130.5, height: 101.7, ...sx }}
    />
  );
}
