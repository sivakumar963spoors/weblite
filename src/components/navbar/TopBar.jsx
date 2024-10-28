import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMenuTitle } from '../../redux/slices/MenuSlice';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const  {currentMenuTitle,menuItems} = useSelector((state) => state.menu) 
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const nav = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };
  const toggleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handlenavigateToMenuItem = (menus) => {
    setOpenDrawer(false);
    dispatch(toggleMenuTitle(menus))
    switch (menus) {
      case "Home":
        nav("/");
        break;
      case "Dashboard":
        nav("/dashboard");
        break;
      case "Customers":
          nav("/Allcustomers");
          break;
      case "Day Plans":
          nav("/daaa");
          break;
      default:
        console.warn("No navigation defined for this menu item");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 , zIndex:1000}} role="presentation">
      <Stack sx={{alignItems:'end', m:1}}>
      <IconButton 
      onClick={toggleDrawerClose}
      sx={{
        bgcolor:'#2475F7',
        opacity:1,
  ":hover": {
    animation: 'spin 2s ',
    
  },
  '@keyframes spin': {
    from: {
      transform: 'rotate(0deg)' 
    },
    to: {
      transform: 'rotate(360deg)' 
    }
  }
}}>
  <CloseIcon sx={{ fontSize: '20px', color: '#FFF' }} />
</IconButton>

      </Stack>

      <List sx={{mt:-3}}>
        {menuItems && menuItems.length > 0 ?  
        menuItems.map((eachMenu, i) => (
          <>
           <ListItem
           sx={{p:0,m:0}}
              key={i} 
            >
              <Stack
              onClick={() => handlenavigateToMenuItem(eachMenu.menuTitle)}
              onMouseEnter={() => handleMouseEnter(i)}

              onMouseLeave={handleMouseLeave} sx={{
                width:'83%',
              
                "&: hover": {
                  bgcolor: "#FFF",
                  "& .MuiTypography-root": {
                    color: "blue",
                  },
                },
              }}>
              <Stack
               
                sx={{
                  flexDirection: "row",
                  zIndex:100000,
                  ml:1,
                  gap: 1,
                  p:1.3,
                  alignItems: "center",
                  cursor: "pointer",
                  "&: hover": {
                    bgcolor: "#FFF",
                    "& .MuiTypography-root": {
                      color: "blue",
                    },
                  },
                  width: "95%", 
                 
                }}
              >
           
                  <Box
                  component={"img"}
                  src={
                    hoveredIndex === i
                      ? eachMenu.blueMenuIcon
                      : eachMenu.menuIcon
                  }
                  sx={{ width: "16px" }}
                />
                <Typography sx={{ color: "#FFF" , fontFamily: '"Poppins", sans-serif', fontWeight:'bold', fontSize:'12px'}}>
                  {eachMenu.menuTitle}
                </Typography>
              </Stack>
              </Stack>
             
            </ListItem>
            <Divider sx={{ background: " #EEEE" , width:'90%'}} />
          </>
        )) :<Typography>No data fount</Typography>}
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          bgcolor: "#2478FE",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          top: 0,
          color: "#FFF",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar variant="dense" sx={{ py: 1.5 }}>
          <Stack
            sx={{ flexDirection: "row", alignItems: "center", flexGrow: 1 }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              {currentMenuTitle}
            </Typography>
          </Stack>
          <Avatar
            sx={{ width: "30px", height: "30px" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Switch To web</MenuItem>
            <MenuItem onClick={handleMenuClose}>Light mode</MenuItem>
            <MenuItem onClick={handleMenuClose}>Reset password</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
        <Drawer
          open={openDrawer}
          onClose={toggleDrawerClose}
          elevation={1}
          BackdropProps={{ invisible: true }}
          transitionDuration={{ enter: 1000, exit: 900 }}
          PaperProps={{
            sx: {
              backgroundColor: "#2478FE",
              position: "absolute",
              top: "9%",
              borderRadius:'10px'
            },
          }}
        >
          {DrawerList}
        </Drawer>
      </Box>
    </Box>
  );
};

export default TopBar;
