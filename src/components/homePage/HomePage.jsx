import CallIcon from "@mui/icons-material/Call";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionRequiredAjax,
  actionRequiredAjax_GetApproval,
  actionRequiredAjax_Getleaves,
  actionRequiredAjax_Getworks,
} from "../../redux/slices/ActionRequiredSlice";
import { todayLeaveDetails } from "../../redux/slices/LeavesModule";
import ReusableTextfield from "../common/ReusableTextfield";
import TaskCard from "../task/TaskCard";
import { loggedInUser_get } from "../../redux/slices/HomePageSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    actionRequiredDetails,
    leavesList,
    approvalList,
    workList,
    isLoadingWork,
    isLoadingApproval,
    isLoadingLeaves,
  } = useSelector((state) => state.ActionRequired);
  const { onLeaveToday, isonLeaveTodayLoading } = useSelector(
    (state) => state.LeavesModule
  );
  const [userName] = useState();
  const [openActionRequird, setOpenActionRequird] = useState(true);
  const [openLeaveCount, setOpenLeaveCount] = useState(false);
  const [leaveCount] = useState(onLeaveToday?.length);
  const [zIndex, setZIndex] = useState(1000);
  const [searchText, setSearchText] = useState("");
  const loggedIn = localStorage.getItem("isAuthenticated");
  const nav = useNavigate();
 useEffect(() => {
    dispatch(loggedInUser_get());
  }, []);
  useEffect(() => {
    dispatch(actionRequiredAjax());
    console.log("Dispatched actionRequiredAjax:", actionRequiredDetails);
  }, []);
  useEffect(() => {
    dispatch(todayLeaveDetails());
  }, [openLeaveCount]);
  useEffect(() => {
    actionRequiredDetails.forEach((each) => {
      if (each.actionRequiredType === 2) {
        dispatch(actionRequiredAjax_Getworks());
      } else if (each.actionRequiredType === 3) {
        dispatch(actionRequiredAjax_Getleaves());
      } else if (each.actionRequiredType === 4) {
        dispatch(actionRequiredAjax_GetApproval());
      }
    });
  }, [openActionRequird, actionRequiredDetails]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
  const toggleActionRequird = () => {
    setOpenActionRequird(!openActionRequird);
  };
  const toggleLeaveCount = () => {
    setOpenLeaveCount(!openLeaveCount);
  };
  const navigateToDashBoard = () => {
    nav("/dashboard");
  };
  const handleChange = (e) => {
    const value = e.toLowerCase();
    setSearchText(value);
  };
  return (
    <Box sx={{ bgcolor: "#F0F3FA" }}>
      <Box sx={{ mt: 8 }}>
        <Stack gap={1}>
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
                <Stack sx={{ px: 2, py: { sm: 1.5, xs: 1 }, gap: 0.5 }}>
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: { sm: "16px", xs: "14px" },
                      }}
                    >
                      Hi, {userName}
                    </Typography>
                    <Stack sx={{ flexDirection: "row", gap: 1 }}>
                      {loggedIn === "false" && (
                        <LoginIcon sx={{ color: "green", cursor: "pointer" }} />
                      )}

                      {loggedIn === "true" && (
                        <LogoutIcon sx={{ color: "red", cursor: "pointer" }} />
                      )}
                    </Stack>
                  </Stack>

                  {loggedIn === "false" && (
                    <Typography
                      sx={{
                        color: "red",
                        fontSize: { sm: "12px", xs: "10px" },
                        fontWeight: 500,
                      }}
                    >
                      Not signed In
                    </Typography>
                  )}

                  {loggedIn === "true" && (
                    <Typography
                      sx={{
                        color: "green",
                        fontSize: { sm: "12px", xs: "10px" },
                        fontWeight: 500,
                      }}
                    >
                      Signed in 11 days ago at:01:16:23
                    </Typography>
                  )}
                  {loggedIn === "false" && (
                    <Typography
                      sx={{
                        fontSize: { sm: "11px", xs: "9px" },
                        fontWeight: 500,
                      }}
                    >
                      Note: system has detected mobile application access
                      against your profile. Kindly do the sign-in through the
                      mobile application.
                    </Typography>
                  )}
                  {loggedIn === "false" && (
                    <Typography
                      sx={{
                        color: "green",
                        fontSize: { sm: "12px", xs: "10px" },
                        fontWeight: 500,
                      }}
                    >
                      Last signed in 38 days ago at:01:16:23
                    </Typography>
                  )}
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
              <Stack sx={{ px: { sm: 2, xs: 1 }, py: 1 }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: { sm: 2, xs: 1 },
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={navigateToDashBoard}
                >
                  <IconButton
                    sx={{
                      border: "1px solid #4154f1",
                      width: { sm: "auto", xs: "35px" },
                      height: { sm: "auto", xs: "35px" },
                    }}
                  >
                    <WindowIcon sx={{ color: "#4154f1" }} />
                  </IconButton>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: { sm: "16px", xs: "14px" },
                    }}
                  >
                    Dashboard
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
                zIndex: 999,
                bgcolor: "#FFF",
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                borderBottomLeftRadius: openActionRequird ? "0px" : "5px",
                borderBottomRightRadius: openActionRequird ? "0px" : "5px",
              }}
            >
              <Stack sx={{ px: { sm: 2, xs: 1 } }}>
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
                      fontSize: { sm: "13px", xs: "12px" },
                    }}
                  >
                    Action Required
                  </Typography>
                  <IconButton onClick={toggleActionRequird}>
                    {openActionRequird ? (
                      <KeyboardArrowDownIcon
                        sx={{
                          color: "red",
                          fontSize: { sm: "22px", xs: "20px" },
                        }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{
                          color: "red",
                          fontSize: { sm: "22px", xs: "20px" },
                        }}
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
                <Stack sx={{ width: "100%", gap: 1 }}>
                  {/* Approval List */}

                  {isLoadingApproval ? (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        bgcolor: "#FAEBD7",
                        py: 0.7,
                        px: 0.5,
                        ml: 0.5,
                        mr: 0.5,
                        mt: 0.5,
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
                        Approval loadings
                      </Typography>
                    </Stack>
                  ) : approvalList && approvalList.length > 0 ? (
                    approvalList
                      .filter((item) => item.count > 0)
                      .map((item, index) => (
                        <Stack
                          key={`approval-${index}`}
                          sx={{
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            bgcolor: "#F0F8FF",
                            mx: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              bgcolor: "#F05119",
                              width: { sm: "30px", xs: "20px" },
                              borderTopLeftRadius: "5px",
                              borderBottomLeftRadius: "5px",
                              textAlign: "center",
                              py: 1,
                              color: "#FFF",
                              fontSize: { sm: "12px", xs: "8px" },
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography
                            sx={{
                              py: 1,
                              color: "#225683",
                              fontFamily: '"Poppins", sans-serif',
                              fontWeight: 600,
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            {item.formSpec}
                          </Typography>
                        </Stack>
                      ))
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No data
                    </Typography>
                  )}

                  {/* Leaves List */}
                  {isLoadingLeaves ? (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        bgcolor: "#FAEBD7",
                        py: 0.7,
                        px: 0.5,
                        ml: 0.5,
                        mr: 0.5,
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
                        Approval loadings
                      </Typography>
                    </Stack>
                  ) : leavesList && leavesList.length > 0 ? (
                    leavesList
                      .filter((item) => item.count > 0)
                      .map((item, index) => (
                        <Stack
                          key={`leave-${index}`}
                          sx={{
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            bgcolor: "#F0F8FF",
                            mx: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              bgcolor: "#F05119",
                              width: { sm: "30px", xs: "20px" },
                              borderTopLeftRadius: "5px",
                              borderBottomLeftRadius: "5px",
                              textAlign: "center",
                              py: 1,
                              color: "#FFF",
                              fontSize: { sm: "12px", xs: "8px" },
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography
                            sx={{
                              py: 1,
                              color: "#225683",
                              fontFamily: '"Poppins", sans-serif',
                              fontWeight: 600,
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            Leave Request
                          </Typography>
                        </Stack>
                      ))
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No data
                    </Typography>
                  )}

                  {/* Work List */}
                  {isLoadingWork ? (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                        bgcolor: "#FAEBD7",
                        py: 0.7,
                        px: 0.5,
                        ml: 0.5,
                        mr: 0.5,
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
                        works loadings
                      </Typography>
                    </Stack>
                  ) : workList && workList.length > 0 ? (
                    workList
                      .filter((item) => item.count > 0)
                      .map((item, index) => (
                        <Stack
                          key={`work-${index}`}
                          sx={{
                            flexDirection: "row",
                            gap: 1,
                            alignItems: "center",
                            bgcolor: "#F0F8FF",
                            mx: 0.5,
                          }}
                        >
                          <Typography
                            sx={{
                              bgcolor: "#F05119",
                              width: { sm: "30px", xs: "20px" },
                              borderTopLeftRadius: "5px",
                              borderBottomLeftRadius: "5px",
                              textAlign: "center",
                              py: 1,
                              color: "#FFF",
                              fontSize: { sm: "12px", xs: "8px" },
                            }}
                          >
                            {item.count}
                          </Typography>
                          <Typography
                            sx={{
                              py: 1,
                              color: "#225683",
                              fontFamily: '"Poppins", sans-serif',
                              fontWeight: 600,
                              fontSize: { sm: "12px", xs: "10px" },
                            }}
                          >
                            {item.workSpecTitle}
                          </Typography>
                        </Stack>
                      ))
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No data
                    </Typography>
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
              <Stack sx={{ px: { sm: 2, xs: 1 } }}>
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
                      fontSize: { sm: "13px", xs: "12px" },
                    }}
                  >
                    on leave today{" "}
                    <Typography component={"span"} sx={{ color: "gray" }}>
                      ({leaveCount})
                    </Typography>
                  </Typography>
                  <IconButton onClick={toggleLeaveCount}>
                    {openLeaveCount ? (
                      <KeyboardArrowDownIcon
                        sx={{
                          color: "red",
                          fontSize: { sm: "23px", xs: "20px" },
                        }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{
                          color: "red",
                          fontSize: { sm: "23px", xs: "20px" },
                        }}
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
                <Stack sx={{ px: { sm: 2, xs: 1 }, gap: 1, py: 1 }}>
                  {onLeaveToday && onLeaveToday.length < 0 ? (
                    <>
                      {isonLeaveTodayLoading ? (
                        <Typography>Loading ....</Typography>
                      ) : (
                        onLeaveToday.map((empDetails) => {
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
                                    fontSize: {
                                      sm: "14px",
                                      xs: "12px",
                                    },
                                  }}
                                >
                                  {empDetails.empname}
                                </Typography>
                              </Stack>
                              <Box sx={{ margin: "5px 10px" }}>
                                <CallIcon sx={{ fontSize: "15px" }} />
                              </Box>
                            </Stack>
                          </Stack>;
                        })
                      )}
                    </>
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      no data
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
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
            <ReusableTextfield
              placeholder={"search "}
              icon={<SearchIcon />}
              value={searchText}
              onChange={(e) => handleChange(e.target.value)}
            />
          </Stack>
        </Stack>
      </Box>

      <>
        <TaskCard searchInput={searchText} />
      </>
    </Box>
  );
};

export default HomePage;
