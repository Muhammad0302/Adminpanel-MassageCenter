import React, { useState } from 'react';

const RecentActivityBody = ({ timingMenue }) => {
  const [flag, setflag] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: '0.9px dashed #C8175D',
        marginLeft: '20px',
        paddingLeft: '20px',
        marginTop: '15px',
        position: 'relative',
      }}
    >
      <div>
        <span style={{ display: 'flex' }}>
          <img
            style={{ marginLeft: '-33px', width: '26px', height: '26px', marginRight: '9px' }}
            src="/static/userDetail-images/activityTime.png"
            alt="icon"
          />
          <div style={{ display: 'flex', alignItems: 'center', width: '170px', justifyContent: 'space-between' }}>
            {' '}
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '22px',
                color: '#C8175D',
              }}
            >
              2 hrs ago
            </p>{' '}
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '10px',
                lineHeight: '12px',
                color: '#AEAEAE',
              }}
            >
              2022-07-15 8:10 PM
            </p>{' '}
          </div>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '18.6px',
              lineHeight: '29px',
              color: '#000000',
              marginTop: '12px',
              marginLeft: '3px',
            }}
          >
            Replied to Mike:
          </p>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '140px' }}>
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/Hide.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Hide
              </p>{' '}
            </div>{' '}
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/delete.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Delete
              </p>{' '}
            </div>{' '}
          </div>
        </div>

        <p
          style={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18.6px',
            lineHeight: '29px',
            color: '#989696',
            marginTop: '15px',
            marginLeft: '3px',
          }}
        >
          The Health Point Spa is the best massage center in the town, i really satisfied with all the services which
          they provide specially there swedish massage is best which make me fully relax.
        </p>
      </div>

      <div>
        <span style={{ display: 'flex', marginTop: '15px' }}>
          <img
            style={{ marginLeft: '-33px', width: '26px', height: '26px', marginRight: '9px' }}
            src="/static/userDetail-images/activityTime.png"
            alt="icon"
          />
          <div style={{ display: 'flex', alignItems: 'center', width: '170px', justifyContent: 'space-between' }}>
            {' '}
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '22px',
                color: '#C8175D',
              }}
            >
              3 hrs ago
            </p>{' '}
          </div>
        </span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '18.6px',
              lineHeight: '29px',
              color: '#000000',
              marginTop: '12px',
              marginLeft: '3px',
            }}
          >
            Added a comment on Bessie Copper Discussion forum
          </p>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '140px' }}>
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/Hide.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Hide
              </p>{' '}
            </div>{' '}
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/delete.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Delete
              </p>{' '}
            </div>{' '}
          </div>
        </div>

        <p
          style={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18.6px',
            lineHeight: '29px',
            color: '#989696',
            marginTop: '15px',
            marginLeft: '3px',
          }}
        >
          The Health Point Spa is the best massage center in the town, i really satisfied with all the services which
          they provide specially there swedish massage is best which make me fully relax.
        </p>
      </div>
      <div>
        <span style={{ display: 'flex', marginTop: '15px' }}>
          <img
            style={{ marginLeft: '-33px', width: '26px', height: '26px', marginRight: '9px' }}
            src="/static/userDetail-images/activityTime.png"
            alt="icon"
          />
          <div style={{ display: 'flex', alignItems: 'center', width: '170px', justifyContent: 'space-between' }}>
            {' '}
            <p
              style={{
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '18px',
                lineHeight: '22px',
                color: '#C8175D',
              }}
            >
              6 hrs ago
            </p>{' '}
          </div>
        </span>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p
            style={{
              fontFamily: 'Open Sans',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '18.6px',
              lineHeight: '29px',
              color: '#000000',
              marginTop: '12px',
              marginLeft: '3px',
            }}
          >
            Give rating on Beesie Cooper spa
          </p>
          <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', width: '140px' }}>
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/Hide.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Hide
              </p>{' '}
            </div>{' '}
            <div
              style={{
                width: '65.35px',
                height: '28.53px',
                background: '#C8175D',
                boxShadow: '1.9765px 1.9765px 5.27067px 1.31767px rgba(0, 0, 0, 0.05)',
                borderRadius: '7.24717px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {' '}
              <img
                style={{
                  width: '15px',
                  height: '14.48px',
                  marginRight: '-5px',
                }}
                src="/static/userDetail-images/delete.png"
                alt="img"
              />
              <p
                style={{
                  fontFamily: 'Open Sans',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '10.8px',
                  lineHeight: '15px',
                  textTransform: 'capitalize',

                  color: '#FFFFFF',
                }}
              >
                Delete
              </p>{' '}
            </div>{' '}
          </div>
        </div>
        <img
          style={{ width: '109.8px', height: '20.7px', borderRadius: '18px', marginTop: '15px', marginLeft: '4px' }}
          src="/static/userDetail-images/rating.png"
          alt="img"
        />
        <p
          style={{
            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18.6px',
            lineHeight: '29px',
            color: '#989696',
            marginTop: '15px',
            marginLeft: '3px',
          }}
        >
          The Health Point Spa is the best massage center in the town, i really satisfied with all the services which
          they provide specially there swedish massage is best which make me fully relax.
        </p>

        <img
          style={{ width: '170.4px', height: '165.9px', borderRadius: '18px', marginTop: '15px', marginLeft: '4px' }}
          src="/static/userDetail-images/activityPic.png"
          alt="img"
        />
      </div>
      {timingMenue && (
        <>
          <div
            style={{
              borderRadius: '55px',
              border: '5px solid #C8175D',
              width: '400px',
              height: '301px',
              position: 'absolute',
              top: '-22px',
              right: 30,
            }}
          >
            <div
              style={{
                height: '55px',
                background: '#C8175D',
                borderTopLeftRadius: '55px',
                borderTopRightRadius: '55px',
                marginTop: '-5px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '27px',
                fontWeight: 600,
                letterSpacing: '2px',
              }}
            >
              July
              <img
                style={{ width: '13px', height: '13px', marginLeft: '3px', marginTop: '6px' }}
                src="/static/pop-images/dropdown.png"
                alt="icon"
              />
            </div>
            <div
              style={{
                width: '100%',
                height: '242px',
                background: 'white',
                borderBottomLeftRadius: '55px',
                borderBottomRightRadius: '55px',
              }}
            >
              <div
                style={{
                  paddingTop: '12px',
                  borderBottom: '3px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '30px',
                  marginLeft: '50px',
                  marginRight: '50px',
                }}
              >
                <span style={{ fontWeight: 700, color: 'red' }}>S</span>
                <span style={{ fontWeight: 700 }}>M</span>
                <span style={{ fontWeight: 700 }}>T</span>
                <span style={{ fontWeight: 700 }}>W</span>
                <span style={{ fontWeight: 700 }}>T</span>
                <span style={{ fontWeight: 700 }}>F</span>
                <span style={{ fontWeight: 700 }}>S</span>
              </div>

              <div
                style={{
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '30px',
                  marginLeft: '50px',
                  marginRight: '50px',
                  lineHeight: '0.5rem',
                }}
              >
                <span style={{ fontWeight: 700, color: 'red' }}>1</span>
                <span style={{ fontWeight: 700 }}>2</span>
                <span style={{ fontWeight: 700 }}>3</span>
                <span style={{ fontWeight: 700 }}>4</span>
                <span style={{ fontWeight: 700 }}>5</span>
                <span style={{ fontWeight: 700 }}>6</span>
                <span style={{ fontWeight: 700 }}>7</span>
                <span style={{ fontWeight: 700, color: 'red' }}>8</span>
                <span style={{ fontWeight: 700 }}>9</span>
                <span style={{ fontWeight: 700 }}>10</span>
                <span style={{ fontWeight: 700 }}>11</span>
                <span style={{ fontWeight: 700 }}>12</span>
                <span style={{ fontWeight: 700 }}>13</span>
                <span
                  style={{
                    fontWeight: 700,
                    padding: '8px',
                    borderRadius: '50%',
                    background: '#C8175D',
                    color: 'white',
                  }}
                >
                  14
                </span>

                <span style={{ fontWeight: 700, color: 'red' }}>15</span>
                <span style={{ fontWeight: 700 }}>16</span>

                <span style={{ fontWeight: 700 }}>17</span>
                <span style={{ fontWeight: 700 }}>18</span>
                <span style={{ fontWeight: 700 }}>19</span>
                <span style={{ fontWeight: 700 }}>20</span>
                <span style={{ fontWeight: 700 }}>21</span>

                <span style={{ fontWeight: 700, color: 'red' }}>22</span>
                <span style={{ fontWeight: 700 }}>23</span>
                <span style={{ fontWeight: 700 }}>24</span>
                <span style={{ fontWeight: 700 }}>25</span>
                <span style={{ fontWeight: 700 }}>26</span>
                <span style={{ fontWeight: 700 }}>27</span>
                <span style={{ fontWeight: 700 }}>28</span>

                <span style={{ fontWeight: 700 }}>29</span>
                <span style={{ fontWeight: 700, color: 'red' }}>30</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecentActivityBody;
