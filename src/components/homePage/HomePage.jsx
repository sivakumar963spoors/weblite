import CallIcon from "@mui/icons-material/Call";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import { toggleMenuTitle } from '../../redux/slices/MenuSlice';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../task/TaskCard";

const HomePage = () => {
  const [userName, setUserName] = useState("vishakha");
  const [openActionRequird, setOpenActionRequird] = useState(true);
  const [openLeaveCount, setOpenLeaveCount] = useState(false);
  const [leave_count, setLeave_count] = useState(0);
  const [zIndex, setZIndex] = useState(1000);
  const dispatch = useDispatch();
  const [spinnerOpen, setSpinnerOpen] = useState(true);
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const nav = useNavigate();

    
  const actionTypeMap = {
    1: "Work Invitations Type",
    2: "Works Type",
    3: "Leaves Type",
    4: "Approval Type",
    5: "Day Plan Approvals Type",
  };
  const workspecData = useSelector(
    (state) => state.ActionRequired.workspecListdata
  );
  const actionReqireData = useSelector(
    (state) => state.ActionRequired.requiredData
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setZIndex(500);
      } else {
        setZIndex(1000);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setTimeout(() => {
      setSpinnerOpen(false);
    }, 5000);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleActionRequird = () => {
    setOpenActionRequird(!openActionRequird);
  };
  const toggleLeaveCount = () => {
    setOpenLeaveCount(!openLeaveCount);
  };
  const navigateToDashBoard = () => {
   var title = "Dashboard";
   dispatch(toggleMenuTitle(title));        
   nav("/dashboard");
  };

  return (
    <Box sx={{ bgcolor: "#F0F3FA" }}>
      <Box sx={{ mt: 8 }}>
        <Stack gap={1.5}>
          <Stack sx={{ position: "relative" }}>
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                mt: -1,
                zIndex: zIndex,
              }}
            >
              <Stack
                sx={{
                  width: "95%",
                  bgcolor: "#FFF",
                  border: "1px solid #C9C9C9",
                  borderRadius: "4px",
                }}
              >
                <Stack sx={{ px: 4, py: 2.5 }}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Hi, {userName}
                  </Typography>
                  <Stack sx={{ mt: 2.5, mb: 1, flexDirection: "row", gap: 1 }}>
                    <Button variant="contained">sign in</Button>
                    <Button>sign out</Button>
                  </Stack>
                  <Typography sx={{ fontSize: "10px" }}>
                    Note: system has detected mobile application access against
                    your profile. Kindly do the sign-in through the mobile
                    application.
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                border: "1px solid #c9c9c9",
                width: "95%",
                bgcolor: "#FFF",
                borderRadius: "4px",
              }}
            >
              <Stack sx={{ px: 4, py: 1 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={navigateToDashBoard}
                >
                  <IconButton sx={{ border: "1px solid #4154f1" }}>
                    <WindowIcon sx={{ color: "#4154f1" }} />
                  </IconButton>
                  <Typography sx={{ fontWeight: 500 }}>Dashboard</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                border: "1px solid #c9c9c9",
                width: "95%",
                zIndex: 999,
                bgcolor: "#FFF",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: openActionRequird ? "0px" : "5px",
                borderBottomRightRadius: openActionRequird ? "0px" : "5px",
              }}
            >
              <Stack sx={{ px: 4 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "red",
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 500,
                      letterSpacing: 0.1,
                    }}
                  >
                    Action Required
                  </Typography>
                  <IconButton onClick={toggleActionRequird}>
                    {openActionRequird ? (
                      <KeyboardArrowDownIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>

            {openActionRequird && (
              <Stack
                sx={{
                  borderRight: "1px solid #c9c9c9",
                  width: "95%",
                  borderLeft: "1px solid #c9c9c9",
                  borderBottom: "1px solid #c9c9c9",
                  maxHeight: "200px",
                  overflowY: "scroll",
                  bgcolor: "#FFFF",
                }}
              >
                <Stack sx={{ width: "100%" }}>
                  {actionReqireData.length > 0 ? (
                    <Stack sx={{ px: 3, gap: 1, py: 1 }}>
                      {actionReqireData.map((each, index) => {
                        const displayText =
                          actionTypeMap[each.actionRequiredType];
                        return (
                          <Box key={index}>
                            {spinnerOpen ? (
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  gap: 1,
                                  alignItems: "center",
                                  bgcolor: "#FAEBD7",
                                  py: 0.7,
                                  px: 0.5,
                                }}
                              >
                                <CircularProgress
                                  sx={{
                                    color: "black",
                                    height: "10px",
                                    width: "10px",
                                  }}
                                  size={15}
                                />
                                <Typography
                                  component={"span"}
                                  sx={{ fontWeight: "bold", fontSize: "12px" }}
                                >
                                  {displayText}
                                </Typography>
                              </Stack>
                            ) : (
                              <Stack sx={{ gap: 1 }}>
                                {workspecData.length > 0 ? (
                                  workspecData
                                    .filter(
                                      (workSpecEach) =>
                                        workSpecEach.count > 0 &&
                                        workSpecEach.count !== null
                                    )
                                    .map((workSpecEach) => (
                                      <Stack
                                        key={workSpecEach.id}
                                        sx={{
                                          flexDirection: "row",
                                          gap: 1,
                                          alignItems: "center",
                                          bgcolor: "#F0F8FF",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            bgcolor: "#F05119",
                                            width: "50px",
                                            borderTopLeftRadius: "5px",
                                            borderBottomLeftRadius: "5px",
                                            textAlign: "center",
                                            py: 1,
                                            color: "#FFF",
                                          }}
                                        >
                                          {workSpecEach.count}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            py: 1,
                                            color: "#225683",
                                            fontFamily: '"Poppins", sans-serif',
                                            fontWeight: 600,
                                            fontSize: {
                                              sm: "14px",
                                              xs: "12px",
                                            },
                                          }}
                                        >
                                          {workSpecEach.workSpecTitle}
                                        </Typography>
                                      </Stack>
                                    ))
                                ) : (
                                  <Typography>Data not found</Typography>
                                )}
                              </Stack>
                            )}
                          </Box>
                        );
                      })}
                    </Stack>
                  ) : (
                    <Typography>Data Not Found</Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
          <Stack
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                border: "1px solid #c9c9c9",
                width: "95%",
                zIndex: 999,
                bgcolor: "#FFF",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: openActionRequird ? "0px" : "5px",
                borderBottomRightRadius: openActionRequird ? "0px" : "5px",
              }}
            >
              <Stack sx={{ px: 4 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: "red",
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 500,
                      letterSpacing: 0.1,
                    }}
                  >
                    on leave today ({leave_count})
                  </Typography>
                  <IconButton onClick={toggleLeaveCount}>
                    {openLeaveCount ? (
                      <KeyboardArrowDownIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{ color: "red", fontSize: "30px" }}
                      />
                    )}
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
            {openLeaveCount && (
              <Stack
                sx={{
                  borderRight: "1px solid #c9c9c9",
                  width: "95%",
                  borderLeft: "1px solid #c9c9c9",
                  borderBottom: "1px solid #c9c9c9",
                  maxHeight: "200px",
                  overflowY: "scroll",
                  bgcolor: "#FFFF",
                }}
              >
                <Stack sx={{ px: 3, gap: 1, py: 1 }}>
                  <Stack sx={{ gap: 1 }}>
                    <Stack
                      sx={{
                        flexDirection: "row",

                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: "#F0F8FF",
                      }}
                    >
                      <Stack
                        sx={{
                          flexDirection: "row",
                          gap: 1,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            bgcolor: "#F05119",
                            width: "10px",
                            borderTopRightRadius: "5px",
                            borderBottomRightRadius: "5px",
                            textAlign: "center",
                            height: "35px",
                            color: "#FFF",
                          }}
                        ></Typography>
                        <Typography
                          sx={{
                            py: 1,
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: {
                              sm: "14px",
                              xs: "12px",
                            },
                          }}
                        >
                          sahana katta
                        </Typography>
                      </Stack>
                      <Box sx={{ margin: "5px 10px" }}>
                        <CallIcon sx={{ fontSize: "15px" }} />
                      </Box>
                    </Stack>
                  </Stack>{" "}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            marginTop:"10px"
          }}
        >
          <Stack
            sx={{
            
              width: "95%",
              zIndex: 999,
              bgcolor: "#FFF",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              borderBottomLeftRadius: openActionRequird ? "0px" : "5px",
              borderBottomRightRadius: openActionRequird ? "0px" : "5px",
            }}
          >
           <TextField
      variant="outlined"
      placeholder="Search"
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon />
          </IconButton>
        ),
        style: {
           // You can adjust padding as needed
        },
      }}
      sx={{
        // Customize width if needed
        '& .MuiOutlinedInput-root': {
          height: '40px', // Set the height of the input field
          '& fieldset': {
            border: '1px solid #E3E3E3', // Border color
            borderTop:"2px solid #E3E3E3 "
          },
          '&:hover fieldset': {
            border: '1px solid #E3E3E3', // Border color on hover
          },
          '&.Mui-focused fieldset': {
            border: '1px solid #E3E3E3', // Border color on focus
            boxShadow: '0px 0px 10px 1px rgba(140, 210, 233, 0.63)', 
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px', // Padding inside the input
          fontSize: '12px', // Font size inside the input
          // Adjust the height of the input text
        },
        '& .MuiInputAdornment-root': {
          color: 'green', // Customize the icon button color
        },
      }}
    />
           
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ mt: 2 }}>
        <TaskCard />
      </Box>
    </Box>
  );
};

export default HomePage;
