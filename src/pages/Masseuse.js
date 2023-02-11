/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import "./page.css"
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
  Tabs,
  Tab,
  AppBar,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';
// import { STATUSES, fetchUsers } from '../features/users/userSlice';
import { STATUSES, fetchMasseuse } from '../features/users/masseuseSlice';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListbarMasseuse,
  MasseuseMoreMenue,
  SingleUserBottom,
  SeeTimingMenue,
} from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/spa';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'Profile', label: '', alignRight: false },
  // { id: 'Checkbox', label: '', alignRight: false },
  { id: 'Masseuse', label: 'Masseuse', alignRight: false },
  // {
  //   id: 'Time',
  //   label: 'Time',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/time.png'
  // },
  // {
  //   id: 'Specialization',
  //   label: 'Specialization',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/specilization.png',
  // },
  // {
  //   id: 'phoneNumber',
  //   label: 'Phone Number',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/phoneNumber.png'
  // },
  // {
  //   id: 'City',
  //   label: 'City',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/city.png'
  // },
  {
    id: 'Location',
    label: 'Location',
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
    id: 'Actions',
    label: 'Actions',
    alignRight: false,

  },
  {
    id: 'View Pages',
    label: 'View Pages',
    alignRight: false,

  },
  { id: 'menue', label: '', alignRight: false },
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

export default function Masseuse() {
  const [page, setPage] = useState(0);
  const [user, setUser] = useState('Masseuse');
  const [isUserDetail, setUserDetail] = useState(false);
  const [order, setOrder] = useState('asc');

  const [refreshPage, setRefreshPage] = useState(0);
  const [userCheckBox, setUserCheckBox] = useState(true);
  const [selected, setSelected] = useState([]);

  const [timingId, setTimingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [typeUser, setTypeUser] = useState('Masseuse');
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
      const newSelecteds = masseuse.map((n) => n.id);
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

  const handleTime = (id) => {
    setTimingId(id);
    setIsOpen(true);
  };

  const { masseuse, status } = useSelector((state) => state.masseuse);

  useEffect(() => {
    dispatch(fetchMasseuse());
  }, [dispatch, refreshPage]);

  console.log(masseuse);

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

  const filteredUsers = masseuse?.filter((item) => {
    return filterName !== ''
      ? item.name.toLowerCase().includes(filterName.toLowerCase()) ||
      // item.specialization.toLowerCase().includes(filterName.toLowerCase()) ||
      item?.location?.toLowerCase().includes(filterName?.toLowerCase()) ||
      item.phone?.toString().includes(filterName?.toString())
      : item;
  });

  // console.log(filteredUsers);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="User">
      <Container style={{ maxWidth: '100%' }}>
        <Card style={{ borderRadius: '0px' }}>
          <UserListbarMasseuse
            user={user}
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selected={selected}
            setRefreshPage={setRefreshPage}
            typeUser={typeUser}
          />

          <TableContainer style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: '800' }}>
              <UserListHead
                isUserDetail={userCheckBox}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={masseuse?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody style={{ borderRight: '0.70432px solid #DEDDDD', borderLeft: '0.70432px solid #DEDDDD' }}>
                {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((masseus) => {
                  const isItemSelected = selected.indexOf(masseus.id) !== -1;

                  return (
                    <TableRow
                      key={masseus.id}
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
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, masseus.id)} />
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
                        {masseus.name}
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
                        scope="row"
                        padding="none"
                      >
                        <SeeTimingMenue Allspa={masseus} />
                      </TableCell> */}
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
                        {masseus.specialization.map((spec) => {
                          return <span>{spec} &nbsp; </span>;
                        })}
                      </TableCell> */}
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
                        {masseus.phone}
                      </TableCell> */}
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
                        {masseus.location}
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
                        {masseus.location}
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
                        {masseus.views}
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
                        <a
                          className='view-detail'
                          href={'https://bodyslides.ca/account/masseuse/edit?id=' + masseus.id}
                          target="_blank"

                        >
                          Edit Masseuse Details
                        </a>
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
                        <a
                          className='view-detail'
                          href={'https://bodyslides.ca/single-masseuse?id=' + masseus.id}
                          target="_blank"
                        >
                          View Published Page
                        </a>
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
                        <Label variant="ghost" color={masseus.isApproved === false ? 'error' : 'success'}>
                          {masseus.isApproved === false ? 'pending' : 'approved'}
                        </Label>
                      </TableCell> */}
                      <TableCell sx={{}} align="right">
                        <MasseuseMoreMenue
                          name={masseus.name}
                          setRefreshPage={setRefreshPage}
                          id={masseus.id}
                          isUserDetail={isUserDetail}
                        />
                      </TableCell>
                      <TableCell sx={{}} align="right"></TableCell>
                      {/* <TableCell sx={{}} align="right"></TableCell> */}
                    </TableRow>
                  );
                })}
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

          <TablePagination
            rowsPerPageOptions={[25, 50, 75, 100]}
            component="div"
            count={masseuse?.length}
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
