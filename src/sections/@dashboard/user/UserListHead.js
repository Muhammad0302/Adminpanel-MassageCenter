/* eslint-disable */
import PropTypes from 'prop-types';
// material
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';
import DialerSipSharpIcon from '@mui/icons-material/DialerSipSharp';
// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

UserListHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({
  isUserDetail,
  order,
  orderBy,
  rowCount,
  headLabel,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  // The following commented line are for sorting through specfic header like username or email etc
  return (
    <TableHead sx={{ display: 'table-header-group' }} style={{ backgroundColor: '#C8175D', height: '60px' }}>
      <TableRow>
        {isUserDetail && (
          <>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
          </>
        )}
        {headLabel.map((headCell) => (
          <TableCell
            style={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '26px',
              color: '#ffffff',
            }}
            key={headCell.id}
            // align={headCell.alignRight ? 'right' : 'left'}
            align="center"
            sx={headCell.id == 'Profile' && { borderBottom: 'none' }}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            > */}

            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {' '}
              {/* {headCell.id === 'phoneNumber' && <DialerSipSharpIcon fontSize="40px" style={{ marginRight: '4px' }} />} */}
              {headCell.img && (
                <>
                  <img
                    style={
                      headCell.id === 'phoneNumber'
                        ? { marginRight: '5px', marginBottom: '4px', width: '17px', height: '17px' }
                        : { marginRight: '5px', marginBottom: '4px', width: '22px', height: '22px' }
                    }
                    src={headCell.img}
                    alt="icon"
                  />
                </>
              )}
              {headCell.label}
            </span>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
