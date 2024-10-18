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
import { useNavigate } from "react-router-dom";
import { menuItem } from "./TopBarData";

const TopBar = () => {
  const [menuTitle, setMenuTitle] = useState("Home");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [menuTab, setMenuTab] = useState("");
  const open = Boolean(anchorEl);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
    setMenuTitle(menus);
    setMenuTab(menus);
    setOpenDrawer(false);

    switch (menus) {
      case "Home":
        nav("/");
        break;
      case "Dashboard":
        nav("/dashboard");
        break;

      default:
        console.warn("No navigation defined for this menu item");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {menuItem.map((eachMenu, i) => (
          <>
            <ListItem
              key={i}
              onClick={() => handlenavigateToMenuItem(eachMenu.menuTitle)}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              <Stack
                sx={{
                  flexDirection: "row",

                  gap: 2,
                  py: 0.5,
                  px: 1,
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
                  sx={{ width: "20px" }}
                />
                <Typography sx={{ color: "#FFF" }}>
                  {eachMenu.menuTitle}
                </Typography>
              </Stack>
            </ListItem>
            <Divider sx={{ borderBottom: "1px solid solid #FFF" }} />
          </>
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
          zIndex: 1000,
          top: 0,
          color: "#FFF",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar variant="dense" sx={{ py: 1 }}>
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
              padding: 2,
              position: "absolute",
              top: "8%",
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
