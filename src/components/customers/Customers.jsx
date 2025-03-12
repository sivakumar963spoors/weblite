import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import ReusableTextfield from '../common/ReusableTextfield';
import CustomerCard from './CustomerCard';
const Customers = () => {
  const [customerSearch,setCustomerSearch]=useState('');
  const handleChange =(event)=>{
    
    setCustomerSearch(event.target.value)

  }
  return (
    <> 
      <Box sx={{mt:10}}>
<Stack sx={{mt:1,gap:2}}>
  <Box sx={{ display:'flex', alignItems:'center',justifyContent:"center"}}>
<Stack sx={{width:'95%'}}>
<ReusableTextfield placeholder={"search by customers"} icon={<SearchIcon/>} value={customerSearch} onChange={handleChange}/>
</Stack>
  </Box>
  <CustomerCard searchText={customerSearch}/>
</Stack>
      </Box>
      
    </>
  )
}

export default Customers;
