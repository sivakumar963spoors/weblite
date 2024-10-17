import MenuIcon from "@mui/icons-material/Menu";
import {
  Avatar,
  Box,
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
import { useNavigate } from "react-router-dom";
const menuItem = ["Home", "Dashboard", "Reset password "];
const TopBar = () => {
  const [menuTitle, setMenuTitle] = useState("Home");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menuTab, setMenuTab] = useState("");
  const open = Boolean(anchorEl);
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
    setMenuTitle(menus);
    setMenuTab(menus);
    setOpenDrawer(false);

    switch(menus) {
        case 'Home':
          nav('/');
            break;
        case 'Dashboard':
            nav('/dashboard');
            break;
        
        
        default:
            console.warn('No navigation defined for this menu item');
            break;
    }
};


 

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItem.map((eachMenu, i) => (
          <ListItem key={i} onClick={() => handlenavigateToMenuItem(eachMenu)}>
            <Typography>{eachMenu}</Typography>
          </ListItem>
        ))}
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
          top: 0,
          color: "#FFF",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar variant="dense" sx={{ py: 4 }}>
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
              {menuTitle}
            </Typography>
          </Stack>

          <Avatar
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
              padding: 2,
              position: "absolute",
              top: "14%",
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
