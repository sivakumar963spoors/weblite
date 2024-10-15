import { } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, IconButton, Stack, Switch, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
const TopBar = () => {
  const [menuTitle,setMenuTitle]=useState("Home")
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
        
         <Avatar/>
        </Toolbar>
      </Box>
    </Box>
  )
}

export default TopBar;
