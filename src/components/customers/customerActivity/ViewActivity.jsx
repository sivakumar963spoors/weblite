import { Box,Typography,Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const ViewActivity = () => {
  const [searchParams] = useSearchParams();
  const currentUser = searchParams.get('customerId'); 
  
    const { customerData } = useSelector((state) => state.CustomerModule);
  const currentUserExits = customerData.filter((each)=> each.customerId == currentUser);

  
  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >
          {
            currentUserExits && currentUserExits.map((each)=>
           
          
          <Stack
            sx={{
              width: "95%",
              backgroundColor: "#FFF",
              borderRadius: "5px",
              flexDirection: "row",
              justifyContent: "space-between",
              py: 1,
              px: 1,
              marginTop: -2,
              zIndex: 1000,
              border: "1px solid #C9C9C9",
              "& > *": { fontSize: {sm:'14px', xs:'12px'}, fontWeight:{sm:600, xs:500} },
              position: "fixed",
            }}
          >
            <Typography>{each.customerName}
            </Typography>
            <Typography>0 Activity</Typography>
          </Stack>
          )  }
          <Stack
            sx={{
              width: "90%",
              background: "#FFF",
              mt: 4,
              py: 1,
              borderRadius: "5px",
              border: "1px solid #C9C9C9",
            }}
          >
           
            <Typography sx={{ textAlign: "center" ,fontSize: {sm:'14px', xs:'12px'}}}>No data found</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  )
}

export default ViewActivity
