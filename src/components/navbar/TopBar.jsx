import CloseIcon from "@mui/icons-material/Close";
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
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TopBar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const open = Boolean(anchorEl);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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

  const handleMenuClose = (val) => {
    setAnchorEl(null);
    if (val === 2) {
      nav("/password/update");
    } else if (val === 3) {
      onLogout();
      setTimeout(() => nav("/"), 100);
    }
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const toggleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const handlenavigateToMenuItem = (menus) => {
    setOpenDrawer(false);

    switch (menus) {
      case "Home":
        nav("/home");
        break;
      case "Dashboard":
        nav("/dashboard");
        break;
      case "Customers":
        nav("/view/all/customers?viewType=9");
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
        case "Reports":
        nav("mobile/reports/showAllReports");
        break ;
      case "Logout":
        onLogout();
        setTimeout(() => nav("/"), 100);
        break;

      default:
        console.warn("No navigation defined for this menu item");
        break;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 180, zIndex: 100000000 }} role="presentation">
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
                     
                    }}
                  >
                    <Box
                      component={"img"}
                      src={
                        hoveredIndex === index
                          ? eachMenu.blueMenuIcon
                          : eachMenu.menuIcon
                      }
                      sx={{ width: "15px" }}
                    />
                    <Typography
                      sx={{
                        color: "#FFF",
                        fontWeight: "bold",
                        fontSize: {sm:'12px', xs:'10px'},
                      }}
                    >
                      {eachMenu.menuTitle}
                    </Typography>
                  </Stack>
                </Stack>
              </ListItem>
              
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
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={toggleDrawer}
            >
              <MenuIcon sx={{ cursor: "pointer" }} />
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
            src="data:image/png;base64,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"
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
              onClick={() => handleMenuClose(1)}
              sx={{
                fontSize: { sm: "14px", xs: "12px" },
                minHeight: "0px !important",
              }}
            >
              Switch To web
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuClose(2)}
              sx={{
                fontSize: { sm: "14px", xs: "12px" },
                minHeight: "0px !important",
              }}
            >
              Reset password
            </MenuItem>
            <MenuItem
              onClick={() => handleMenuClose(3)}
              sx={{
                fontSize: { sm: "14px", xs: "12px" },
                minHeight: "0px !important",
              }}
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
              top: "7%",
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
