import { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, matchPath, useLocation, useNavigate } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, List, Collapse, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';
import "./main.css"
//
import Iconify from './Iconify';
import { logout } from '../API/auth';
// ----------------------------------------------------------------------

const ListItemStyle = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.func,
};

function NavItem({activeItem, setActiveItem,setHoverValue, item, active }) {
  const theme = useTheme();
 console.log(activeItem)
  const isActiveRoot = active(item.path);

  const { title, path, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const navigate = useNavigate();

  const logOutFunc = async (title) => {
    // Read data from local storage
    if (title === 'Logout') {
      let userData = localStorage.getItem('adminAuth');
      userData = JSON.parse(userData);
      const userId = userData.id.toString();
      const res = await logout({ userId });
      if (res.status === 200) {
        localStorage.removeItem('adminAuth');
        navigate('/login', { replace: true });
      }
    }
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(theme.palette.secondary.white, theme.palette.action.selectedOpacity),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={title} />
          {info && info}
          <Iconify
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
            sx={{ width: 16, height: 16, ml: 1 }}
          />
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item) => {
              const { title, path } = item;
              const isActiveSub = active(path);

              return (
                <ListItemStyle
                  key={title}
                  component={RouterLink}
                  to={path}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) => theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={title} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  const handleHover = (title) =>{
  
    if(title==="User Information"){
      setHoverValue("User Information")
    }else if(title==="Massage Business"){
      setHoverValue("Massage Business")
    }else if(title==="Masseuse"){
      setHoverValue("Masseuse")
    }
  }
  const handleClick = (title) =>{

    if(title==="User Information"){
      setActiveItem("User Information")
    }else if(title==="Massage Business"){
      setActiveItem("Massage Business")
    }else if(title==="Masseuse"){
      setActiveItem("Masseuse")
    }
  
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      onMouseEnter={()=>handleHover(title)}
      onMouseLeave={() => setHoverValue("")}
      onClick={() => handleClick(title)}
      style={{color: title===activeItem? "black" :  '#FFFFFF',backgroundColor:title===activeItem? "#FFFFFF" :  ''}}
      sx={
        title === 'Logout'
          ? {
              ...(isActiveRoot && activeRootStyle),

              position: 'absolute',
              left: '10px',
              bottom: '-315px',
            }
          : {
              ...(isActiveRoot && activeRootStyle),
              paddingLeft: '16%',
            }
      }
    >
 
 
      {/* <img
        style={{ marginRight: '7px', marginBottom: '4px', marginLeft: '6px' }}
        src={icon}
        alt="icon"
        width={22}
        height={22}
      /> */}


     
     {icon}


      <ListItemText
        disableTypography
        style={{
          fontStyle: 'normal',
          // color: '#FFFFFF',
          fontFamily: 'Open Sans',
          lineHeight: '22px',
          fontWeight: 400,
          fontSize: '14px',
        }}
        primary={title}
      />
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  navConfig: PropTypes.array,
};

export default function NavSection() {

  const [hovervalue,setHoverValue] = useState("")
  const [activeItem,setActiveItem] = useState("User Information")

  const navConfig = [
    {
      title: 'User Information',
      path: '/dashboard/user',
      icon: 
      <svg width="22" className={ (hovervalue==="User Information" || activeItem  ==="User Information") && "svg-icon"} height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7001 0.601562C8.59705 0.601562 5.62118 1.83423 3.42703 4.02847C1.23279 6.22254 0.00012207 9.19858 0.00012207 12.3016C0.00012207 15.4045 1.23279 18.3805 3.42703 20.5747C5.6211 22.7689 8.59714 24.0016 11.7001 24.0016C14.8031 24.0016 17.7791 22.7689 19.9732 20.5747C22.1675 18.3806 23.4001 15.4045 23.4001 12.3016C23.4001 9.19858 22.1675 6.22262 19.9732 4.02847C17.7791 1.83423 14.8031 0.601562 11.7001 0.601562ZM11.8452 18.2755C11.9476 18.3304 12.0705 18.3304 12.1728 18.2755C12.3749 18.1286 12.5588 17.9582 12.7203 17.7678C12.9544 17.4893 13.1602 17.1875 13.3918 16.8739L13.7171 17.0705C13.2491 17.852 12.7671 18.5773 12.0511 19.1202C11.675 19.4198 11.2229 19.6086 10.7454 19.6654C9.62931 19.7917 8.91553 19.0313 9.18241 17.9362C9.41648 16.9745 9.71355 16.0268 9.98499 15.0721C10.2564 14.1174 10.5302 13.1252 10.8063 12.1564C10.8285 12.0608 10.8448 11.964 10.8554 11.8664C10.8984 11.7011 10.8652 11.5251 10.7652 11.3867C10.6653 11.2483 10.5088 11.1616 10.3382 11.1504C10.1686 11.1353 9.99835 11.1291 9.82811 11.1316C9.83104 11.0754 9.83969 11.0198 9.8539 10.9654L9.8867 10.7314L13.9208 10.0855L13.64 11.0635L13.5769 11.2976C12.9917 13.3413 12.4044 15.3919 11.8147 17.4496C11.7546 17.6107 11.7161 17.7792 11.7001 17.9504C11.7 18.0746 11.7527 18.1929 11.8452 18.2757V18.2755ZM12.814 7.85551C12.4271 7.8529 12.0573 7.69653 11.7859 7.42086C11.5146 7.14517 11.3641 6.77268 11.3678 6.386C11.3678 5.86678 11.6448 5.38708 12.0945 5.12755C12.544 4.86786 13.098 4.86786 13.5475 5.12755C13.9972 5.38707 14.2742 5.86678 14.2742 6.386C14.2736 6.77382 14.1198 7.14583 13.8464 7.42103C13.573 7.69622 13.202 7.85242 12.814 7.85551H12.814Z" fill="#ffffff"/>
      </svg>,
    },
    {
      title: 'Massage Business',
      path: '/dashboard/spas',
      icon: <svg className={ (hovervalue==="Massage Business" || activeItem ==="Massage Business") && "svg-icon"} width="22" height="22" viewBox="0 0 33 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.1822 20.7273H31.0771C31.438 20.258 31.6348 19.6828 31.6367 19.0909V8.85617C31.6377 8.55202 31.5537 8.25372 31.3937 7.99515C31.234 7.7363 31.0048 7.52761 30.7323 7.39271L29.4549 6.75399V5.3543C29.9436 5.18214 30.3218 4.78815 30.4735 4.29262C30.6253 3.79709 30.5327 3.25892 30.2242 2.8425C29.9156 2.4261 29.4277 2.18091 28.9095 2.18184H27.8185V0.545461C27.8185 0.400817 27.7611 0.262014 27.6588 0.159742C27.5565 0.0574697 27.4177 0 27.2731 0H25.0912C24.79 0 24.5458 0.244242 24.5458 0.545461V2.18184H23.4548C22.9367 2.18087 22.4486 2.42608 22.1401 2.8425C21.8316 3.25891 21.7391 3.79703 21.8908 4.29262C22.0425 4.78821 22.4207 5.18219 22.9094 5.3543V6.75399L21.6319 7.39271C21.3595 7.52761 21.1303 7.7363 20.9706 7.99515C20.8106 8.25375 20.7266 8.55206 20.7276 8.85617V19.0909C20.7295 19.6828 20.9263 20.258 21.2872 20.7273H19.0771C19.438 20.258 19.6347 19.6828 19.6367 19.0909V16.909C19.6347 16.2126 19.3661 15.5435 18.8862 15.0389C18.406 14.5346 17.7509 14.2331 17.0555 14.1963C18.6712 13.0774 19.6355 11.2377 19.6367 9.27259C19.6367 9.12794 19.5792 8.98914 19.4769 8.88687C19.3747 8.7846 19.2359 8.72713 19.0912 8.72713H15.8184C15.0648 8.72688 14.318 8.86983 13.6176 9.14815C13.5275 6.89786 12.4646 4.79737 10.7047 3.39208C10.5055 3.23234 10.2221 3.23234 10.0228 3.39208C8.26304 4.79737 7.20011 6.89786 7.10996 9.14815C6.40966 8.86983 5.66278 8.72688 4.90911 8.72713H1.63634C1.33513 8.72713 1.09088 8.97137 1.09088 9.27259C1.09356 11.3497 2.17083 13.2776 3.93875 14.3682C3.42349 14.5645 2.97955 14.9123 2.66592 15.3659C2.3523 15.8196 2.18353 16.3575 2.18183 16.909V18.6387C1.86308 18.7519 1.58694 18.9611 1.39163 19.2372C1.19634 19.5136 1.09138 19.8436 1.0909 20.1818C1.0926 20.3681 1.12669 20.5526 1.19122 20.7272H0.545461C0.244242 20.7272 0 20.9715 0 21.2727C0.000974037 21.9957 0.288558 22.689 0.799676 23.2003C1.31104 23.7114 2.0043 23.999 2.7273 24H30.0003C30.7233 23.999 31.4166 23.7114 31.928 23.2003C32.4391 22.689 32.7266 21.9957 32.7276 21.2727C32.7276 21.1281 32.6702 20.9893 32.5679 20.887C32.4656 20.7847 32.3268 20.7272 32.1822 20.7272L32.1822 20.7273ZM21.8185 19.0909V8.85617C21.8185 8.64943 21.9353 8.46071 22.1202 8.36842L23.6986 7.5819C23.8844 7.48912 24.0015 7.29869 24.0003 7.09098V5.4546H24.5457V7.09098C24.5457 7.23563 24.6032 7.37443 24.7055 7.4767C24.8077 7.57897 24.9465 7.63644 25.0912 7.63644H27.273C27.4177 7.63644 27.5565 7.57897 27.6587 7.4767C27.761 7.37443 27.8185 7.23563 27.8185 7.09098V5.4546H28.364V7.09098C28.364 7.29772 28.4806 7.48669 28.6657 7.57922L30.2443 8.36842H30.2441C30.4289 8.46071 30.5458 8.64943 30.5458 8.85617V19.0909C30.5458 19.5248 30.3734 19.9412 30.0665 20.248C29.7597 20.5548 29.3433 20.7272 28.9094 20.7272H23.4548C23.0209 20.7272 22.6045 20.5548 22.2977 20.248C21.9909 19.9412 21.8185 19.5248 21.8185 19.0909H21.8185ZM13.6365 14.1817H12.3328L18.3694 10.5598C18.0862 11.5986 17.4699 12.5156 16.6147 13.1702C15.7597 13.8245 14.7134 14.1797 13.6366 14.1817H13.6365ZM15.8184 9.81805H17.4852L11.0182 13.6974C11.2551 12.5999 11.8605 11.6166 12.7338 10.9107C13.607 10.205 14.6955 9.81948 15.8183 9.81805H15.8184ZM10.9092 5.10028C11.9666 6.31831 12.5478 7.87777 12.5456 9.49077V9.70189C11.904 10.1244 11.3488 10.665 10.9092 11.2952V5.10028ZM8.18193 9.49077C8.17926 7.87727 8.76051 6.31713 9.81832 5.09885V11.2952C9.37878 10.665 8.82358 10.1244 8.18193 9.70185V9.49077ZM4.90917 9.81805C6.03201 9.81951 7.1205 10.205 7.99367 10.9107C8.86691 11.6166 9.47228 12.5999 9.70922 13.6974L3.24224 9.81805H4.90917ZM2.35816 10.5598L8.39476 14.1817H7.09101C6.01424 14.1798 4.96783 13.8245 4.11292 13.1702C3.2577 12.5156 2.64143 11.5986 2.35822 10.5598H2.35816ZM2.18186 20.1817C2.18186 19.8805 2.4261 19.6362 2.72732 19.6362H15.8184C16.403 19.6362 16.9431 19.3243 17.2356 18.818C17.5278 18.3118 17.5278 17.6879 17.2356 17.1816C16.9431 16.6754 16.403 16.3635 15.8184 16.3635H4.90916C4.60794 16.3635 4.3637 16.6077 4.3637 16.9089C4.3637 17.2101 4.60794 17.4544 4.90916 17.4544H15.8184C16.1196 17.4544 16.3638 17.6986 16.3638 17.9998C16.3638 18.3011 16.1196 18.5453 15.8184 18.5453H3.27278V16.9089C3.27278 16.475 3.44518 16.0586 3.75201 15.7518C4.05883 15.445 4.47526 15.2726 4.90913 15.2726H16.9093C17.3432 15.2726 17.7596 15.445 18.0664 15.7518C18.3732 16.0586 18.5456 16.475 18.5456 16.9089V19.0908C18.5456 19.5247 18.3732 19.9411 18.0664 20.2479C17.7596 20.5546 17.3431 20.7271 16.9093 20.7271H2.72729C2.42607 20.7271 2.18183 20.4829 2.18183 20.1816L2.18186 20.1817Z" fill="white"/>
      </svg>,
    },
    {
      title: 'Masseuse',
      path: '/dashboard/masseuse',
      icon: <svg className={ (hovervalue==="Masseuse" || activeItem ==="Masseuse") && "svg-icon"} width="22" height="22" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.07381 9.72047L9.42074 11.4246C9.6013 11.5544 9.81114 11.6177 10.0183 11.6177C10.3332 11.6177 10.6435 11.4719 10.8435 11.197C11.1736 10.7433 11.0712 10.1058 10.6177 9.77578L7.42853 7.46239C7.25698 7.3369 6.998 6.97761 6.9331 6.77494L6.35865 4.93921C6.70811 5.55564 7.29688 6.58271 7.47397 6.7686C7.60908 6.91088 7.93725 7.17682 8.21755 7.3973C8.47099 6.83081 8.7441 6.20908 9.0215 5.5546L12.3495 10.576C12.546 10.8712 12.8689 11.0313 13.1989 11.0313C13.3919 11.0313 13.5866 10.9771 13.76 10.8632C14.2286 10.5521 14.356 9.91967 14.0464 9.45271L9.893 3.1872C9.893 3.1872 9.10052 1.68594 7.56551 0.914792C6.99536 0.628387 4.99438 -0.619379 3.32326 2.41684C3.32326 2.41684 2.34855 4.3271 1.39151 6.26602C0.926382 7.20614 0.328813 8.84167 0.314453 10.9575C1.28035 10.7511 2.42146 10.5075 3.76957 10.2211C4.11228 10.1689 5.48802 9.95453 7.07381 9.72053L7.07381 9.72047Z" fill="white"/>
      </svg>,
    },
  
  ];



  const { pathname } = useLocation();

  const match = (path) => (path ? !!matchPath({ path, end: false }, pathname) : false);

  return (
    <Box >
      {/* <br /> */}
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem activeItem={activeItem} setActiveItem={setActiveItem}  setHoverValue={setHoverValue} key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
}
