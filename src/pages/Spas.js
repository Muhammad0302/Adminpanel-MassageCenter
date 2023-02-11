/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import "./page.css"
// material
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import { Divider, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
// components
import MenuPopover from '../components/MenuPopover';

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

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserLIstToolbarSpa,
  SpaMoreMenue,
  SingleUserBottom,
  SeeTimingMenue,
} from '../sections/@dashboard/user';
import { STATUSES, fetchSpas } from '../features/users/spaSlice';

// mock
import USERLIST from '../_mock/spa';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'Profile', label: '', alignRight: false },
  // { id: 'Checkbox', label: '', alignRight: false },
  { id: 'Spa', label: 'Massage Name', alignRight: false },
  // {
  //   id: 'Time',
  //   label: 'Time',
  //   alignRight: false,
  //   // img: '/static/userDetail-images/time.png'
  // },
  // {
  //   id: 'Services',
  //   label: 'Services',
  //   alignRight: false,
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
    label: 'location',
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

export default function Spas() {
  const ref = useRef(null);
  const [user, setUser] = useState('Massage Business');
  const [page, setPage] = useState(0);
  const [isUserDetail, setUserDetail] = useState(false);
  const [order, setOrder] = useState('asc');
  const [timingId, setTimingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [userCheckBox, setUserCheckBox] = useState(true);
  const [open, setOpen] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [typeUser, setTypeUser] = useState('Spa');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [refreshPage, setRefreshPage] = useState(0);
  const dispatch = useDispatch();

  const { spas, status } = useSelector((state) => state.spas);

  // Get all spas api calling

  // console.log(spas?.length);

  // useEffect(() => {
  //   const getAllSpaData = async () => {
  //     const spas = await getAllSpa();
  //     console.log(spas.data.data[0]);
  //     console.log(spas);
  //   };
  //   getAllSpaData();
  // }, []);

  useEffect(() => {
    dispatch(fetchSpas());
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

  console.log(spas);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = spas.map((n) => n.id);
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

  // console.log(selected);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - spas.length) : 0;

  const handleTime = (id) => {
    setTimingId(id);
    setIsOpen(true);
  };

  const filteredUsers = spas?.filter((item) => {
    return filterName !== ''
      ? item.name.toLowerCase().includes(filterName.toLowerCase()) ||
      item.location.toLowerCase().includes(filterName.toLowerCase()) ||
      item.phone?.toString().includes(filterName?.toString())
      : item;
  });

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // console.log(filteredUsers);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="User">
      <Container style={{ maxWidth: '100%' }}>
        <Card style={{ borderRadius: '0px' }}>
          <UserLIstToolbarSpa
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
                rowCount={spas?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody style={{ borderRight: '0.70432px solid #DEDDDD', borderLeft: '0.70432px solid #DEDDDD' }}>
                {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((spa) => {
                  const isItemSelected = selected.indexOf(spa.id) !== -1;

                  return (
                    <>
                      <TableRow
                        key={spa.id}
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
                        {/* <TableCell
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
                          align="center"
                        >
                          <SeeTimingMenue Allspa={spa} />
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
                         

                          {spa?.services?.map((service) => {
                            return <span>{service} &nbsp; </span>;
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
                          {spa.location}
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
                          {spa.location}
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
                            href={'https://bodyslides.ca/account/spa/edit?id=' + spa.id}
                            target="_blank"
                            className='view-detail'

                          >
                            Edit Business Details
                          </a>
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
                            View Published Page
                          </a>
                        </TableCell>

                        <TableCell sx={{}} align="right">
                          <SpaMoreMenue
                            name={spa.name}
                            setRefreshPage={setRefreshPage}
                            id={spa.id}
                            isUserDetail={isUserDetail}
                          />
                        </TableCell>
                        <TableCell sx={{}} align="right"></TableCell>
                        {/* <TableCell sx={{}} align="right"></TableCell> */}
                      </TableRow>
                    </>
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
            count={spas?.length}
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
