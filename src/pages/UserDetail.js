/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { STATUSES, fetchUserDetail } from '../features/users/userDetailSlice';
// material
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
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu, SingleUserBottom } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/singleUser';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Profile', label: '', alignRight: false },
  { id: 'userID', label: 'User ID', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phoneNumber', label: 'Phone Number', alignRight: false, img: '/static/userDetail-images/phoneNumber.png' },
  { id: 'spa', label: 'Spa', alignRight: false },
  { id: 'masseuse', label: 'Masseuse', alignRight: false },
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

export default function UserDetail() {
  const [page, setPage] = useState(0);
  const [isUserDetail, setUserDetail] = useState(false);
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [refreshPage, setRefreshPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
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

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  const { id } = useParams();
  // console.log(id);
  const { userDetail, status } = useSelector((state) => state.userDetail);
  useEffect(() => {
    dispatch(fetchUserDetail(id));
  }, [dispatch, refreshPage]);

  if (status === STATUSES.LOADING) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItem: 'center', marginTop: '50px' }}>
        <CircularProgress sx={{ color: '#C8175D' }} />
      </Box>
    );
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  console.log(userDetail);

  return (
    <Page title="User">
      <Container style={{ maxWidth: '100%' }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead
                isUserDetail={isUserDetail}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userDetail?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody style={{ borderRight: '0.70432px solid #DEDDDD', borderLeft: '0.70432px solid #DEDDDD' }}>
                {userDetail?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((user) => {
                  const isItemSelected = selected.indexOf(user.id) !== -1;

                  return (
                    <TableRow
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell style={{ paddingLeft: '25px' }} component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2} style={{ marginTop: '-50px' }}>
                          <Avatar
                            sx={{
                              height: '75px',
                              width: '75px',
                              border: '5px solid white',
                              backgroundColor: ' #C8175D',
                            }}
                            alt={user.firstName}
                            // src={avatarUrl}
                          >
                            M
                          </Avatar>
                        </Stack>
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
                        {user.id}
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
                        {user.userName}
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
                        {user.email}
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
                        {user.phoneNumber === null ? '...' : user.phoneNumber}
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
                        {user.spas.length}
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
                        {user.masseuses.length}
                      </TableCell>
                      {/* <TableCell sx={{}} align="right">
                        <UserMoreMenu isUserDetail={isUserDetail} />
                      </TableCell> */}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <SingleUserBottom setRefreshPage={setRefreshPage} userDetail={userDetail} />
        </Scrollbar>
      </Container>
    </Page>
  );
}
