/* eslint-disable */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import RecentActivityBody from './RecentActivityBody';
import Scrollbar from '../../../components/Scrollbar';
import Time from './Time';

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

const card = (timingMenue, setTimingMenue) => (
  <React.Fragment>
    <CardContent>
      <Box
        style={{
          height: '60px',
          width: '100%',
          position: 'absolute',
          left: '0px',
          top: '0px',
          background: '#C8175D',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FFFFFF',
          fontFamily: 'Open Sans',
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: '21.6px',
          lineHeight: '29px',
        }}
      >
        <Box style={{ marginLeft: '57px' }}>
          <Typography
            style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '17px',
              lineHeight: '21px',
              color: '#FFFFFF',
            }}
          >
            Recent Activity:
          </Typography>
        </Box>
        <Box
          onClick={() => setTimingMenue(!timingMenue)}
          style={{
            display: 'flex',
            marginRight: '57px',
            justifyContent: 'space-between',
            gap: '20px',
            cursor: 'pointer',
          }}
        >
          {/* <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              style={{ marginRight: '5px', width: '17px', height: '17px' }}
              src="/static/userDetail-images/time.png"
              alt="icon"
            />
            <p> Time </p>
            <Box
              style={{
                marginLeft: '15px',
                color: '#9B9B9B',
                width: '49px',
                height: '22px',
                background: '#FFFFFF',
                padding: '3px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: '15px' }}>9:53</p>
            </Box>
            <Box
              style={{
                marginLeft: '15px',
                color: '#9B9B9B',
                width: '43.7px',
                height: '22px',
                background: '#FFFFFF',
                padding: '3px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '11px',
              }}
            >
              {' '}
              <p style={{ fontSize: '15px' }}>AM</p>
              <img
                style={{ marginRight: '5px', width: '13px', height: '13px', marginLeft: '3px' }}
                src="/static/userDetail-images/TimeDiff.png"
                alt="icon"
              />
            </Box>
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p> To </p>
            <Box
              style={{
                marginLeft: '15px',
                color: '#9B9B9B',
                width: '49px',
                height: '22px',
                background: '#FFFFFF',
                padding: '3px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {' '}
              <p style={{ fontSize: '15px' }}>10:00</p>
            </Box>
            <Box
              style={{
                marginLeft: '15px',
                paddingLeft: '10px',
                color: '#9B9B9B',
                width: '43.7px',
                height: '22px',
                background: '#FFFFFF',
                padding: '3px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '11px',
              }}
            >
              <p style={{ fontSize: '15px' }}>PM</p>
              <img
                style={{ marginLeft: '3px', marginRight: '5px', width: '13px', height: '13px' }}
                src="/static/userDetail-images/TimeDiff.png"
                alt="icon"
              />
            </Box>
          </Typography>
          <Typography style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {' '}
            <img
              style={{ marginRight: '5px', width: '17px', height: '17px' }}
              src="/static/userDetail-images/day.png"
              alt="icon"
            />
            <p>Days</p>
          </Typography> */}
        </Box>
      </Box>
      <br />
      <br />
      {/* render time open dialog box */}

      {/* <Time /> */}
      {/* Recent activity goes here */}
      <Box sx={{}}>
        <RecentActivityBody timingMenue={timingMenue} />
      </Box>
    </CardContent>
  </React.Fragment>
);

const RecentActivity = () => {
  const [timingMenue, setTimingMenue] = useState(false);
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        style={{
          minWidth: '830px',
          borderRadius: '0px',
          background: '#FFFFFF',
          boxShadow: '2.7px 2.7px 21.6px rgba(200, 23, 93, 0.15)',
        }}
        variant="outlined"
      >
        {card(timingMenue, setTimingMenue)}
      </Card>
    </Box>
  );
};

export default RecentActivity;
