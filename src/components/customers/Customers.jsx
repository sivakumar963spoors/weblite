import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack } from '@mui/material';
import React from 'react';
import ReusableTextfield from '../common/ReusableTextfield';
import CustomerCard from './CustomerCard';
const Customers = () => {
  return (
    <> 
      <Box sx={{mt:10}}>
<Stack sx={{mt:1,gap:2}}>
  <Box sx={{ display:'flex', alignItems:'center',justifyContent:"center"}}>
<Stack sx={{width:'95%'}}>
<ReusableTextfield placeholder={"search by customers"} icon={<SearchIcon/>}/>
</Stack>
  </Box>
  <CustomerCard/>
</Stack>
      </Box>
      
    </>
  )
}

export default Customers;
