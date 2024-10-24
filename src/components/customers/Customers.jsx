import { Box, Stack } from '@mui/material';
import React from 'react'
import CustomerCard from './CustomerCard';

const Customers = () => {
  return (
    <> 
      <Box sx={{mt:10}}>
<Stack sx={{mt:1}}>
  <CustomerCard/>
</Stack>
      </Box>
      
    </>
  )
}

export default Customers;
