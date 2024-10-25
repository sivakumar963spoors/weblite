import { Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const personalDetails = ["First Name", "Last Name", "Title", "Phone", "Email"];
const otherDetails = [
  "Outstanding Amount",
  "Total Calls",
  "Location(Lat, Long)",
  "Currency",
  "Date",
  "DateTime",
  "Number",
  "Text",
  "Time",
  "Email",
  "Location(Lat, Long)",
  "Phone",
  "URL",
  "Audio",
  "Document",
  "Image",
  "Signature",
  "Video",
  "Country",
  "Custom Entity",
  "Customer",
  "Employee",
  "Form",
  "YesOrNo",
  "Dropdown",
  "Multi Pick List",
  "Multi Select Dropdown",
  "Pick List",
  "From Date",
  "To Date",
  "Datespan",
  "Date",
  "2024-09-16",
  "Currency",
  "100.00",
  "Number",
  "Email",
  "Location(Lat, Long)",
  "Audio"
]

const CustomerDetails = () => {
  const { id } = useParams();
  const { customerData } = useSelector((state) => state.CustomerModule);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [zIndex, setZIndex] = useState(1000);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setZIndex(500);
      } else {
        setZIndex(1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Stack sx={{ mt: 8, bgcolor: "#F0F3FA" }}>
        {customerData && customerData.length > 0 ? (
          customerData
            .filter((each) => each.customerId == id)
            .map((each) => (
              <Stack key={each.id}>
                <Stack
                  sx={{
                    mt: -1,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: { zIndex },
                  }}
                >
                  <Stack
                    sx={{
                      width: { sm: "95%", xs: "90%" },
                      flexDirection: "row",
                      bgcolor: "#FFFF",
                      p: { sm: 1.5, xs: 1 },
                      borderRadius: "10px",
                      border: "1px solid #EEEE",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{each.customerName}</Typography>
                    <Switch {...label} />
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    width: "99%",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      p: { sm: 1.5, xs: 1 },
                      textTransform: "capitalize",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack sx={{ alignItems: "start", width: "97%" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: "13px",
                        }}
                      >
                        customer details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "95%", xs: "90%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{}}>
                        <Stack >
                          <Typography>Customer Id</Typography>
                          <Typography>{each.customerIds}</Typography>
                        </Stack>
                        <Stack>
                          <Typography>Phone</Typography>
                          <Typography>{each.customerPhone}</Typography>
                        </Stack>
                        <Stack>
                          <Typography>Location(Lat)</Typography>
                          <Typography>{each.customerLat}</Typography>
                        </Stack>
                        <Stack>
                          <Typography>Location(Long)</Typography>
                          <Typography>{each.customerLong}</Typography>
                        </Stack>
                        <Stack>
                          <Typography>crated by</Typography>
                          <Typography></Typography>
                        </Stack>
                        <Stack>
                          <Typography>crated Time</Typography>
                          <Typography></Typography>
                        </Stack>
                        <Stack>
                          <Typography>Territory</Typography>
                          <Typography></Typography>
                        </Stack>
                        <Typography sx={{fontWeight:'bold', color:"#003366", fontFamily:'poppins'}}>Primary Contact</Typography>
                        <Stack>
                          {personalDetails.map((details, i) => (
                            <Typography key={i}>{details}</Typography>
                          ))}
                        </Stack>
                        <Typography sx={{fontWeight:'bold', color:"#003366", fontFamily:'poppins'}}>Secondary Contact</Typography>
                        <Stack>
                          {personalDetails.map((details, i) => (
                            <Typography key={i}>{details}</Typography>
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    width: "99%",
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <Stack
                    sx={{
                      width: "100%",
                      p: { sm: 1.5, xs: 1 },
                      textTransform: "capitalize",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Stack sx={{ alignItems: "start", width: "97%" }}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "poppins",
                          fontSize: "13px",
                        }}
                      >
                        other details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "95%", xs: "90%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{}}>
                      
                       
                        <Stack>
                          {otherDetails.map((otherdetails, i) => (
                            <Typography key={i}>{otherdetails}</Typography>
                          ))}
                        </Stack>
                        
                       
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                
              
              </Stack>
            ))
        ) : (
          <Typography>No customer found</Typography>
        )}
      </Stack>
    </div>
  );
};

export default CustomerDetails;
