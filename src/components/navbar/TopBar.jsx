import { } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
const TopBar = () => {
  const [menuTitle,setMenuTitle]=useState("Home")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ position:'relative' }}>
      <Box sx={{bgcolor:'#2478FE', position:'fixed', width:'100%', top:0, color:'#FFF',boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"}}>
        <Toolbar variant="dense" sx={{py:4}}>
         <Stack sx={{flexDirection:'row', alignItems:'center', flexGrow:1}}
         >
         <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            {menuTitle}
          </Typography>
         </Stack>
        
         <Avatar   aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}/>
         <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Switch To web</MenuItem>
        <MenuItem onClick={handleClose}>light mode</MenuItem>
        <MenuItem onClick={handleClose}>Reset password</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
        </Toolbar>
      </Box>
      <Typography>hiigit</Typography>
    </Box>
  )
}

export default TopBar;
