import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
const arrayList = [
  "111",
  "11qwdsdc",
  "qwsxawx",
  "wqswwaea",
  "2wsaw",
  "edadcescse",
  "ewdwaca",
];

const ViewDeatilsActivity = () => {
  const [searchParams] = useSearchParams();
  const currentUser = searchParams.get('customerId'); 
  const { customerData } = useSelector((state) => state.CustomerModule);
  const currentUserExits = customerData.filter((each)=> each.customerId == currentUser);
    useEffect(()=>{
  console.log(currentUserExits)
    },[])
    const nav =useNavigate();
    const handleOnClickgetForm =()=>{
nav('/add/form/100');
    }
  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >  {
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
            <Typography>complete {each.customerName} activity</Typography>
          </Stack>)}
          <Stack
            sx={{
              width: "97%",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "space-between",
              mt: 5,
            }}
          >
            {arrayList.map((each, i) => (
              <Stack
                key={i}
                sx={{
                  width: "calc(50% - 8px)",
                  alignItems: "center",
                  background: "#FFF",
                  py: 1,
                  borderRadius: "5px",
                  py: 4,
                }}
              >
                <Button startIcon={<AddCircleOutlineIcon sx={{fontSize: {sm:'14px', xs:'12px'}}} />} variant="outlined"   onClick={handleOnClickgetForm} sx={{fontSize: {sm:'14px', xs:'12px'}}}
>                 Add
                </Button>
                <Typography sx={{mt:2,textTransform:'capitalize',   fontSize: {sm:'14px', xs:'12px'}, fontWeight:{sm:500, xs:500} }}
                >{each}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default ViewDeatilsActivity;
