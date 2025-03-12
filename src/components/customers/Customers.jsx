import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReusableTextfield from '../common/ReusableTextfield';
import CustomerCard from './CustomerCard';
const Customers = () => {
  const navigate =useNavigate();
  const [customerSearch,setCustomerSearch]=useState('');
  const handleChange =(event)=>{
    const newValue= event.target.value.trimStart();
    setCustomerSearch(newValue)

  }
  const navigationToAddActivity =()=>{
    navigate('customer/viewactivity/details')
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
  <CustomerCard searchText={customerSearch} viewActivity={navigationToAddActivity}/>
</Stack>
      </Box>
      
    </>
  )
}

export default Customers;
