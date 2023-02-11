// /* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import parse from 'html-react-parser';

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
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import { useDispatch, useSelector } from 'react-redux';
// import { STATUSES, fetchUsers } from '../features/users/userSlice';
// import { STATUSES, fetchMasseuse } from '../features/users/masseuseSlice';
import {
  STATUSES,
  fetchHomepage,
  addTextHomePage,
  editTextHomepage,
  deleteTextHomePage,
} from '../features/users/homepageSlice';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  BusinessMoreMenue,
  SingleUserBottom,
  SeeTimingMenue,
} from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/spa';
// import { editBusiness } from 'src/API/business';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  // { id: 'Profile', label: '', alignRight: false },
  // { id: 'Checkbox', label: '', alignRight: false },

  {
    id: 'Content',
    label: 'Content',
    alignRight: false,
    // img: '/static/userDetail-images/time.png'
  },
  { id: 'edit', label: 'Edit', alignRight: false },
  { id: 'delete', label: 'Delete', alignRight: false },
  //   { id: 'menue', label: '', alignRight: false },
  //   { id: 'menue', label: '', alignRight: false },
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
  const [addOpen, setaddOpen] = useState(false);
  const [imageUpload, setImage] = useState();
  const [value, setValue] = useState('');
  const [editOpen, seteditOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editId, setEditId] = useState();
  const [deleteId, setDeleteId] = useState();
  const [defaultContent, setDefaultContent] = useState();
  const [deleteOpen, setDeleteOpen] = useState();

  const [page, setPage] = useState(0);
  const [user, setUser] = useState('Masseuse');
  const [isUserDetail, setUserDetail] = useState(false);
  const [order, setOrder] = useState('asc');

  const [refreshPage, setRefreshPage] = useState(0);
  const [userCheckBox, setUserCheckBox] = useState(true);
  const [selected, setSelected] = useState([]);

  const [timingId, setTimingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [typeUser, setTypeUser] = useState('Business');
  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // ************************Add User Functions******************************** */

  const addhandleClickOpen = () => {
    console.log('Add handleclickopen');
    setaddOpen(true);
  };

  const addAdminAgree = () => {
    console.log('Add rich text');
    console.log(value);
    console.log(imageUpload);
    // console.log(imageUpload?.);
    if (value && imageUpload) {
      const formdata = new FormData();
      formdata.append('content', value);
      formdata.append('image', imageUpload);
      console.log('call api');
      console.log(formdata);
      dispatch(addTextHomePage(formdata));
      setaddOpen(false);
      setValue();
      setImage();
    } else {
      console.log('empty rich text');
    }
  };

  const addAdminDisagree = () => {
    console.log('Cancel');
    setValue();
    setImage();
    setaddOpen(false);
  };

  // Edit Business

  const edithandleClickOpen = () => {
    console.log('Edit handleclickopen');
    seteditOpen(true);
  };

  const editAdminAgree = () => {
    console.log('Edit Business');
    console.log(editValue);
    console.log(imageUpload);
    if (editValue || imageUpload) {
      const editdata = new FormData();
      editdata.append('content', editValue);
      if (imageUpload) {
        console.log('edited Image');
        editdata.append('image', imageUpload);
      }
      dispatch(editTextHomepage(editId, editdata));
      seteditOpen(false);
      setEditValue();
      setDefaultContent();
      setImage();
    } else {
      console.log('enter data');
      setEditValue();
      setDefaultContent();
      setImage();
    }
  };

  const editAdminDisagree = () => {
    seteditOpen(false);
    console.log('Cancel');
    // console.log(editId);
    // console.log(fullName);
  };

  const deletehandleClickOpen = () => {
    setDeleteOpen(true);
    console.log('handleclickopen');
    // console.log(getIndexSelectedRow);
  };

  const deleteAdminAgree = () => {
    setDeleteOpen(false);
    console.log('Delete Business');
    dispatch(deleteTextHomePage(deleteId));
    setDeleteId();
  };

  const deleteAdminDisAgree = () => {
    setDeleteOpen(false);
    console.log('Not Delete Business');
    setDeleteId();
    // console.log(getIndexSelectedRow);
  };

  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = homepage.map((n) => n.id);
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

  // REDUX TOOLKIT
  const { homepage, status } = useSelector((state) => state.homepage);

  // SEEFFECT
  useEffect(() => {
    dispatch(fetchHomepage());
  }, [dispatch, refreshPage]);

  console.log(homepage);

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

  const filteredUsers = homepage?.filter((item) => {
    return filterName !== ''
      ? item.heading.toLowerCase().includes(filterName.toLowerCase()) ||
          item.content.toLowerCase().includes(filterName.toLowerCase())
      : item;
  });

  // console.log(filteredUsers);

  const isUserNotFound = filteredUsers?.length === 0;

  return (
    <Page title="User">
      <Dialog
        open={addOpen}
        onClose={addAdminDisagree}
        sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center' }}
      >
        <DialogTitle
          sx={{
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Add HomePage Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter required Information in given fields to Add HomePage Data</DialogContentText>
          <ReactQuill
            // style={{ width: '200px', height: '100px' }}
            theme="snow"
            onChange={setValue}
            placeholder="Content goes here..."
          />

          <TextField
            type="file"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={addAdminDisagree}>Cancel</Button>
          <Button onClick={addAdminAgree}>Add HomePage Data</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={editAdminDisagree}
        sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center' }}
      >
        <DialogTitle sx={{ fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
          Edit HomePage Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter required Information in given fields</DialogContentText>

          <ReactQuill
            // style={{ width: '200px', height: '100px' }}
            theme="snow"
            onChange={setEditValue}
            defaultValue={editValue}
          />

          <TextField
            type="file"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />

          {/* <TextField
              margin="dense"
              id="name"
              label="FullName"
              required
              type="text"
              fullWidth
              variant="standard"
              defaultValue={fullName}
              onChange={(e) => {
                setfullName(e.target.value);
              }}
            /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={editAdminDisagree}>Cancel</Button>
          <Button onClick={editAdminAgree}>Edit</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onClose={deleteAdminDisAgree}
        sx={{ maxWidth: '100vw', display: 'flex', justifyContent: 'center' }}
      >
        <DialogTitle sx={{ fontSize: '20px', display: 'flex', justifyContent: 'center' }}>
          Delete HomePage Data
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Click Agree to delete HomePage Data</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteAdminDisAgree}>Disagree</Button>
          <Button onClick={deleteAdminAgree}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Container style={{ maxWidth: '100%' }}>
        <Card style={{ borderRadius: '0px' }}>
          <UserListToolbar
            user={user}
            numSelected={selected.length}
            // filterName={filterName}
            // onFilterName={handleFilterByName}
            selected={selected}
            setRefreshPage={setRefreshPage}
            typeUser={typeUser}
          />

          <Button
            onClick={
              // console.log('HERE ADD');
              addhandleClickOpen
            }
          >
            Add
          </Button>

          <TableContainer style={{ overflowX: 'auto' }}>
            <Table style={{ minWidth: '800' }}>
              <UserListHead
                isUserDetail={userCheckBox}
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={homepage?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody style={{ borderRight: '0.70432px solid #DEDDDD', borderLeft: '0.70432px solid #DEDDDD' }}>
                {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((homepage) => {
                  const isItemSelected = selected.indexOf(homepage.id) !== -1;

                  return (
                    <TableRow
                      key={homepage.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, homepage.id)} />
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
                        {parse(homepage.content)}
                      </TableCell>

                      <TableCell
                        sx={{}}
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
                        {/* { console.log(business.id)} */}

                        <Button
                          onClick={() => {
                            console.log(homepage.content);
                            setEditId(homepage.id);
                            // setDefaultContent(business.content);
                            setEditValue(homepage.content);
                            edithandleClickOpen();
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{}}
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
                        {/* {console.log(business.id)} */}

                        <Button
                          onClick={() => {
                            setDeleteId(homepage.id);
                            deletehandleClickOpen();
                            // console.log(business.id);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      <TableCell sx={{}} align="right" />
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={homepage?.length}
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
