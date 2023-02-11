import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

BiggerLogo.propTypes = {
  sx: PropTypes.object,
};

export default function BiggerLogo({ sx, isSecond }) {
  return (
    <Box
      component="img"
      src={isSecond ? '/static/logoSecond.png' : '/static/logo.jpg'}
      sx={{ width: '185px', height: '130.1px', marginLeft: '-40px', marginTop: '-30px', ...sx }}
    />
  );
}
