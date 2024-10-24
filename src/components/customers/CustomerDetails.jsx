import { Stack } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router-dom'

const CustomerDetails = () => {
    const {id}=useParams();
  console.log(id)
  return (
    <div>
      <Stack sx={{mt:15}}>

      </Stack>
    </div>
  )
}

export default CustomerDetails
