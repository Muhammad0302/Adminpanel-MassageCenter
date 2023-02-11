import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Spa from '../../../pages/Spa';
import SubMasseuse from '../../../pages/SubMasseuse';
import RecentActivity from './RecentActivity';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SingleUserBottom({ userDetail, setRefreshPage }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(userDetail);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0, borderColor: '' }}>
        <Tabs
          value={value}
          sx={{
            '& .Mui-selected': {
              color: '#C8175D',
            },
          }}
          TabIndicatorProps={{ style: { background: 'white' } }}
          onChange={handleChange}
        >
          <Tab label="Spa" {...a11yProps(0)} />
          <Tab label="Masseuse" {...a11yProps(1)} />
          <Tab label="Posted Activity" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Spa setRefreshPage={setRefreshPage} spas={userDetail[0]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SubMasseuse setRefreshPage={setRefreshPage} masseuse={userDetail[0]} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RecentActivity />
      </TabPanel>
    </Box>
  );
}

export default SingleUserBottom;
