/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useRef } from 'react';
import "./page.css"
import { Link, Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Tabs,
  Tab,
  AppBar,
} from '@mui/material';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';
import { STATUSES, fetchUsers } from '../features/users/userSlice';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
  SingleUserBottom,
  SeeTimingMenue,
} from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/doubleUser';
import { positions } from '@mui/system';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'Profile', label: '', alignRight: false },

  { id: 'Spa', label: 'Spa', alignRight: false },
  {
    id: 'Time',
    label: 'Time',
    alignRight: false,
    // img: '/static/userDetail-images/time.png'
  },
  // {
  //   id: 'Services',
  //   label: 'Services',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/specilization.png',
  // },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    alignRight: false,
    // img: '/static/userDetail-images/phoneNumber.png'
  },
  {
    id: 'City',
    label: 'City',
    alignRight: false,
    // img: '/static/userDetail-images/city.png'
  },
  {
    id: 'Views',
    label: 'Views',
    alignRight: false,
    // img: '/static/userDetail-images/people.png'
  },
  {
    id: 'View Page',
    label: '',
    alignRight: false,

    // img: '/static/userDetail-images/file.png'
  },
  // { id: 'menue', label: '', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Spa({ spas, setRefreshPage }) {
  const [page, setPage] = useState(0);
  const [isUserDetail, setUserDetail] = useState(true);
  const [order, setOrder] = useState('asc');
  const [user, setUser] = useState('Massage Business');
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState([]);
  const [typeUser, setTypeUser] = useState('Spa');
  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [timingId, setTimingId] = useState(null);

  const [openTime, setOpenTime] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = spas?.spas?.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  console.log(spas?.spas);

  const handleTime = (id) => {
    setTimingId(id);
    setIsOpen(true);
  };

  const filteredUsers = spas?.spas?.filter((item) => {
    return filterName !== ''
      ? item.name.toLowerCase().includes(filterName.toLowerCase()) ||
      item.location.toLowerCase().includes(filterName.toLowerCase()) ||
      item.phone?.toString().includes(filterName?.toString())
      : item;
  });

  // console.log(filteredUsers);

  // console.log(spas.length);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <div>
      {/* <Scrollbar> */}
      <UserListToolbar
        user={user}
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
        selected={selected}
        setRefreshPage={setRefreshPage}
        typeUser={typeUser}
      />
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <UserListHead
            isUserDetail={isUserDetail}
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={spas?.spas?.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
          />
          <TableBody style={{ borderRight: '0.70432px solid #DEDDDD', borderLeft: '0.70432px solid #DEDDDD' }}>
            {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((spa) => {
              const isItemSelected = selected.indexOf(spa.id) !== -1;

              return (
                <TableRow
                  key={spa.id}
                  tabIndex={-1}
                  role="checkbox"
                  selected={isItemSelected}
                  aria-checked={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, spa.id)} />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                    scope="row"
                    padding="none"
                  >
                    {spa.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                    scope="row"
                    padding="none"
                  >
                    <SeeTimingMenue Allspa={spa} />
                  </TableCell>
                  {/* <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                  >
                    {spa?.services?.map((service) => {
                      return <span>{service} &nbsp; </span>;
                    })}
                  </TableCell> */}
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                  >
                    {spa.phone}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                  >
                    {spa.name}{' '}
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                  >
                    {spa.views}
                  </TableCell>
                  <TableCell
                    style={{
                      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#686868',
                    }}
                    align="center"
                  >
                    {/* <Link to={'/single-spa?id=' + spa.id}>View Page</Link> */}
                    <a
                      className='view-detail'
                      href={'https://bodyslides.ca/single-spa?id=' + spa.id}
                      target="_blank"
                    >
                      {' '}
                      View Page
                    </a>
                  </TableCell>
                  {/* <TableCell sx={{}} align="right">
                      <UserMoreMenu isUserDetail={isUserDetail} />
                    </TableCell> */}
                  {/* <TableCell sx={{}} align="right"></TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
          {spas?.spas?.length === 0 ? (
            ''
          ) : (
            <>
              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 75, 100]}
        component="div"
        count={spas?.spas?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
