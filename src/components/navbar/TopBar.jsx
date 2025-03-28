import CloseIcon from "@mui/icons-material/Close";
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
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const dispatch = useDispatch();
  const { currentMenuTitle, menuItems } = useSelector((state) => state.menu);
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
    dispatch(toggleMenuTitle(menus));
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
        nav("dayplanner/customers");
        break;
      case "leaves":
        nav("/view/leaves/new?viewType=2&leaveMenuType=2");
        break;
      case "Knowledge Base":
        nav("knowledgebase/manage");
        break;
      case "My Approvals":
        nav("/view/approvals?sortBy=2");
        break;
      case "Reset password":
        nav("/password/update");
        break;
      default:
        console.warn("No navigation defined for this menu item");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250, zIndex: 100000000 }} role="presentation">
      <Stack sx={{ alignItems: "end", m: 1 }}>
        <IconButton
          onClick={toggleDrawerClose}
          sx={{
            bgcolor: "#2475F7",
            opacity: 1,
            ":hover": {
              animation: "spin 2s ",
            },
            "@keyframes spin": {
              from: {
                transform: "rotate(0deg)",
              },
              to: {
                transform: "rotate(360deg)",
              },
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "20px", color: "#FFF" }} />
        </IconButton>
      </Stack>

      <List sx={{ mt: -3 }}>
        {menuItems && menuItems.length > 0 ? (
          menuItems.map((eachMenu, index) => (
            <>
              <ListItem sx={{ p: 0, m: 0 }} key={index}>
                <Stack
                  sx={{
                    width: "90%",

                    "&: hover": {
                      bgcolor: "#FFF",
                      "& .MuiTypography-root": {
                        color: "blue",
                      },
                    },
                  }}
                >
                  <Stack
                    onClick={() => handlenavigateToMenuItem(eachMenu.menuTitle)}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sx={{
                      flexDirection: "row",
                      zIndex: 100000,
                      ml: 1,
                      gap: 1,
                      p: 1.3,
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
                        hoveredIndex === index
                          ? eachMenu.blueMenuIcon
                          : eachMenu.menuIcon
                      }
                      sx={{ width: "16px" }}
                    />
                    <Typography
                      sx={{
                        color: "#FFF",
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {eachMenu.menuTitle}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItem>
              <Divider sx={{ background: " #EEEE", width: "90%" }} />
            </>
          ))
        ) : (
          <Typography>No data fount</Typography>
        )}
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
            sx={{ width: "30px", height: "30px", cursor: "pointer" }}
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
            <MenuItem
              onClick={handleMenuClose}
              sx={{ fontSize: { sm: "14px", xs: "12px"} ,     minHeight: "0px !important"}}
            >
              Switch To web
            </MenuItem>
           
            <MenuItem
              onClick={handleMenuClose}
              sx={{ fontSize: { sm: "14px", xs: "12px" }, minHeight: "0px !important" }}
            >
              Reset password
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{ fontSize: { sm: "14px", xs: "12px" } , minHeight: "0px !important"}}
            >
              Logout
            </MenuItem>
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
              borderRadius: "10px",
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
