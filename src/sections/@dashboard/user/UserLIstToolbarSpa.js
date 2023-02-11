import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import {
    Toolbar,
    Tooltip,
    IconButton,
    Typography,
    OutlinedInput,
    InputAdornment,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Select,
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// component

import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import { deletedBulkUsers } from '../../../features/users/userSlice';
import { deletedBulkSpas } from '../../../features/users/spaSlice';
import { deletedBulkMasseuse } from '../../../features/users/masseuseSlice';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 440,
    height: 45,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    marginLeft: '30px',
    borderRadius: '40px',
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': { width: 440, boxShadow: theme.customShadows.z8 },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};

export default function UserListToolbar({
    numSelected,
    filterName,
    onFilterName,
    user,
    selected,
    setRefreshPage,
    typeUser,
}) {
    const [mainValue, setMainValue] = useState('');
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleChange = (event, SelectChangeEvent) => {
        setMainValue(event.target.value);
        // if (event.target.value == '') setData('User');
        // else setData(event.target.value);
    };

    const dispatch = useDispatch();

    // console.log(selected);

    const handleBulkDeletion = () => {
        if (typeUser === 'User') {
            dispatch(deletedBulkUsers({ ids: selected }));
        } else if (typeUser === 'Spa') {
            dispatch(deletedBulkSpas({ ids: selected }));
        } else if (typeUser === 'Masseuse') {
            dispatch(deletedBulkMasseuse({ ids: selected }));
        }
        setRefreshPage(3);
    };

    return (
        <RootStyle
            sx={{
                ...(numSelected > 0 && {
                    color: 'primary.main',
                    bgcolor: 'primary.lighter',
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <SearchStyle
                    value={filterName}
                    onChange={onFilterName}
                    placeholder={`Search ${user}`}
                    startAdornment={
                        <InputAdornment position="start">
                            <Iconify icon="eva:search-fill" sx={{ color: '#C8175D', width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handleBulkDeletion}>
                        <Iconify icon="eva:trash-2-fill" />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <a style={{
                        width: "fit-content",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "22px",
                        textTransform: "capitalize",
                        color: "#ffffff",
                        background: "#c8175d",
                        boxShadow: "2.7px 2.7px 7.2px 1.8px rgb(0 0 0 / 5%)",
                        borderRadius: "6.3px",
                        border: "none",
                        padding: "7px",
                        cursor: "pointer",
                        textDecoration: 'none'
                    }}
                        href={'https://bodyslides.ca/account/spa/add'}
                        target="_blank"
                        rel="noreferrer"
                    >
                        + Add/Register Massage Business
                    </a>

                </>
            )}
        </RootStyle>
    );
}
