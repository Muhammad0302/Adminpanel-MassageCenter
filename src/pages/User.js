/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { STATUSES, fetchUsers } from '../features/users/userSlice';
import "./page.css"
import PropTypes from 'prop-types';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

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
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userID', label: 'User ID', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    alignRight: false,
    // img: '/static/userDetail-images/phoneNumber.png'
  },
  { id: 'spa', label: 'Spa', alignRight: false },
  { id: 'masseuse', label: 'Masseuse', alignRight: false },
  { id: 'openProfile', label: 'Profile/Activity', alignRight: false },
  { id: 'menue', label: '', alignRight: false },
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

export default function User() {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState('User');
  const [isUserDetail, setUserDetail] = useState(true);
  const [order, setOrder] = useState('asc');
  const [refreshPage, setRefreshPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [typeUser, setTypeUser] = useState('User');

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(25);

  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.id);
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

  const { users, status } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, refreshPage]);

  if (status === STATUSES.LOADING) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItem: 'center',
          marginTop: '30px',
          height: '469px',
        }}
      >
        <Card sx={{ width: '100%', marginTop: '-10px' }}>
          <CardHeader
            title={
              <Skeleton
                animation="wave"
                height={65}
                width="38%"
                style={{ marginBottom: 4, marginLeft: '25px', borderRadius: '27px' }}
              />
            }
            subheader={<Skeleton animation="wave" height={80.51} style={{ marginTop: '-25px' }} width="100%" />}
          />
          {<Skeleton sx={{ height: 300, marginTop: '-5px' }} animation="wave" variant="rectangular" />}

          <CardContent>
            {
              <>
                {
                  <Skeleton
                    sx={{
                      height: '5px',
                      marginTop: '-8px',
                    }}
                    animation="wave"
                  />
                }
              </>
            }
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }

  // console.log(filterName);

  const filteredUsers = users?.filter((item) => {
    return filterName !== ''
      ? item.userName.toLowerCase().includes(filterName.toLowerCase()) ||
      item.email.toLowerCase().includes(filterName.toLowerCase()) ||
      item.phoneNumber?.toString().includes(filterName?.toString()) ||
      item.id?.toString().includes(filterName?.toString())
      : item;
  });

  // console.log(filteredUsers);

  const isUserNotFound = filteredUsers.length === 0;

  // console.log(users);

  return (
    <Page title="User">
      <Container style={{ maxWidth: '100%' }}>
        <Card style={{ borderRadius: '0px' }}>
          <UserListToolbar
            user={user}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selected={selected}
            setRefreshPage={setRefreshPage}
            typeUser={typeUser}
          />

          {/* <Scrollbar> */}
          <TableContainer style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: '800' }}>
              <UserListHead
                isUserDetail={isUserDetail}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={users?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((user) => {
                  const isItemSelected = selected.indexOf(user.id) !== -1;

                  return (
                    <TableRow
                      hover
                      key={user.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      style={{
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#686868',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, user.id)} />
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
                      <TableCell align="center">
                        <Link
                          style={{
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',

                          }}
                          to={`/dashboard/user-detail/${user.id}`}
                          className='view-detail'
                        >
                          see user profile
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <UserMoreMenu
                          name={user.userName}
                          setRefreshPage={setRefreshPage}
                          id={user.id}
                          isUserDetail={isUserDetail}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isUserNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {/* </Scrollbar> */}

          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            count={users?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
