import { Button, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";
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
  "Audio",
];

const CustomerDetails = () => {
  const { id } = useParams();
  const { customerData } = useSelector((state) => state.CustomerModule);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [zIndex, setZIndex] = useState(1000);
  const navigation = useNavigate();
 
  const dispatch = useDispatch();

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
  const handleViewActivity = (id) => {
    navigation(`/customer/viewactivity?customerId=${id}`);
  };
  const handleActivity = (id, menus) => {
  
    
    dispatch(toggleMenuTitle(menus));  // 🔹 Update Redux store
  
    setTimeout(() => { // 🔹 Ensure Redux update happens before navigation
      navigation(`/customer/viewactivity/forms?customerId=${id}`);
    }, 100); 
  };
  
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
                      width: { sm: "95%", xs: "95%" },
                      flexDirection: "row",
                      bgcolor: "#FFFF",
                      p: { sm: 1, xs: 1 },
                      borderRadius: "10px",
                      border: "1px solid #EEEE",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{fontSize:{xs:'12px', sm:'14px'}}}>{each.customerName}</Typography>
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
                          fontSize: { sm: "12px", xs: "10px" },
                        }}
                      >
                        customer details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "97%", xs: "100%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{ width: "100%" }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "15px 0px",

                            "& > *": { width: "50%", marginBottom: "50px" },
                            "& > *> :first-child": {
                              color: "#7A7A7A",
                              fontWeight: "bold",
                              fontSize: { sm: "12px", xs: "10px" },
                            },
                            "& > * >: nth-child(2)": {
                              fontWeight: "bold",
                              fontSize: { sm: "12px", xs: "10px" },
                            },
                          }}
                        >
                          <Stack sx={{}}>
                            <Typography>Customer Id</Typography>
                            <Typography>sukeshini</Typography>
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
                        </Stack>
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#003366",

                            margin: "20px 0",
                            fontSize:{sm:'12px', xs:'10px'}
                          }}
                        >
                          Primary Contact
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "10px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              "& > *> :first-child": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-child(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            {personalDetails.map((otherdetails, i) => (
                              <Stack 
                              key={i}
                                sx={{
                                  flexDirection: "row",
                                  width: "100%",
                                  margin: "10px 0px",
                                }}
                              >
                                <Typography
                                  key={i}
                                  sx={{ width: { sm: "30%", xs: "55%" } }}
                                >
                                  {otherdetails}
                                </Typography>
                                <Typography>null</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                       
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            color: "#003366",

                            margin: "20px 0",
                            fontSize:{sm:'12px',xs:'10px'}
                          }}
                        >
                          Secondary Contact
                        </Typography>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "10px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              "& > *> :first-child": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-child(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            {personalDetails.map((otherdetails, i) => (
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  width: "100%",
                                  margin: "10px 0px",
                                }}
                              >
                                <Typography
                                  key={i}
                                  sx={{ width: { sm: "30%", xs: "55%" } }}
                                >
                                  {otherdetails}
                                </Typography>
                                <Typography>null</Typography>
                              </Stack>
                            ))}
                          </Stack>
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
                          fontSize: { sm: "12px", xs: "10px" },
                        }}
                      >
                        other details
                      </Typography>
                    </Stack>
                    <Stack
                      sx={{
                        width: { sm: "97%", xs: "100%" },
                        flexDirection: "row",
                        bgcolor: "#FFFF",
                        p: { sm: 1.5, xs: 1 },
                        borderRadius: "10px",
                        border: "1px solid #EEEE",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Stack sx={{ width: "100%" }}>
                        <Stack
                          sx={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            width: "100%",
                            display: "flex",
                            padding: "15px 0px",
                          }}
                        >
                          <Stack
                            sx={{
                              width: "100%",
                              "& > *> :first-child": {
                                color: "#7A7A7A",
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                              "& > * >: nth-child(2)": {
                                fontWeight: "bold",
                                fontSize: { sm: "12px", xs: "10px" },
                              },
                            }}
                          >
                            {otherDetails.map((otherdetails, i) => (
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  width: "100%",
                                  margin: "10px 0px",
                                }}
                              >
                                <Typography
                                  key={i}
                                  sx={{ width: { sm: "30%", xs: "55%" } }}
                                >
                                  {otherdetails}
                                </Typography>
                                <Typography>null</Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <Stack sx={{ width: "95%" }}>
                    <Stack
                      sx={{
                        flexDirection: "row",
                        width: "100%",
                        "& > *": {
                          width: "50%",
                          height: {sm:'45px', xs:'30px'},
                          fontWeight: "600",
                          fontSize:{
                            sm:'14px', xs:'10px'
                          }
                        },
                        gap: 1,
                      }}
                    >
                      <Button variant="outlined" onClick={()=>handleViewActivity(each.customerId)}>
                        view activities
                      </Button>
                      <Button variant="contained" onClick={()=>handleActivity(each.customerId, each.customerName)}>
                        activity
                      </Button>
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
