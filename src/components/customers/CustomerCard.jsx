import AddCircleTwoToneIcon from "@mui/icons-material/AddCircleTwoTone";
import CircleChecked from "@mui/icons-material/CheckCircleOutline";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import CircleUnchecked from "@mui/icons-material/RadioButtonUnchecked";
import { Button, Checkbox, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const CustomerCard = () => {
  const navigate = useNavigate();
  const { customerData } = useSelector((state) => state.CustomerModule);
  
  const navigateToCustomerDetails = (id) => {
    alert(id)
    navigate(`/customer/details/${id}`);
  
  };    

  return (
    <div>
      <Stack sx={{ alignItems: "center", justifyContent: "center" , gap:1}}>
        {customerData.length > 0 ? (
          customerData.map((customer) => (
            <Stack
              key={customer.customerId}
              sx={{
                border: "1px solid #EEEE",
                width: "95%",
                borderRadius: "10px",
              }}
            >
              <Stack sx={{ height: "auto", textTransform: "capitalize", p: 2 }}>
                <Typography
                  sx={{
                    color: "GrayText",
                    fontFamily: "'poppins', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  Not checked in
                </Typography>
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: -1,
                    justifyContent: "flex-start",
                    ml: -1.5,
                    mt: -1,
                  }}
                >
                  <Checkbox
                    icon={<CircleUnchecked />}
                    checkedIcon={<CircleChecked />}
                    defaultChecked
                    disabled
                  />
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: "#2375F7",
                      fontFamily: '"poppins"',
                      ml: -1,
                      cursor: "pointer",
                    }}
                    onClick={() => navigateToCustomerDetails(customer.customerId)}
                  >
                    {customer.customerName}
                  </Typography>
                </Stack>
                <Stack sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      color: "GrayText",
                      fontFamily: "'poppins', sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    customer type 1
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    not defined
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    mt: 2,
                    flexDirection: "row",
                    width: { xs: "80%", sm: "50%" },
                    justifyContent: "space-between",
                  }}
                >
                  <Stack>
                    <Typography
                      sx={{
                        color: "GrayText",
                        fontFamily: "'poppins', sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Location
                    </Typography>
                    <Typography>{customer.location !== null ? customer.location : "--"}</Typography>

                  </Stack>
                  <Stack>
                    <Typography
                      sx={{
                        color: "GrayText",
                        fontFamily: "'poppins', sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Phone
                    </Typography>
                    
                    <Typography>{customer.customerPhone !== null ? customer.customerPhone : "--"}</Typography>
                  </Stack>
                </Stack>
                <Stack sx={{ mt: 2, flexDirection: "row", gap: 1 }}>
                  <Button
                    sx={{
                      bgcolor: "#2375F7",
                      color: "#FFF",
                      textTransform: "capitalize",
                      px: 2,
                    }}
                    startIcon={<DirectionsWalkIcon />}
                  >
                    checkIn
                  </Button>
                  <Button
                    sx={{
                      border: "1px solid #2375F7",
                      color: "#2375F7",
                      textTransform: "capitalize",
                      px: 2,
                    }}
                    startIcon={<AddCircleTwoToneIcon />}
                  >
                    activity
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          ))
        ) : (
          <Typography>no data found</Typography>
        )}
      </Stack>
    </div>
  );
};




export default CustomerCard;
