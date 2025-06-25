import { LoginOutlined } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
import CircleIcon from "@mui/icons-material/Circle";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import WindowIcon from "@mui/icons-material/Window";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  actionRequiredAjax,
  actionRequiredAjax_GetApproval,
  actionRequiredAjax_Getleaves,
  actionRequiredAjax_Getworks,
} from "../../redux/slices/ActionRequiredSlice";
import { loggedInUser_get } from "../../redux/slices/HomePageSlice";
import { todayLeaveDetails } from "../../redux/slices/LeavesModule";
import DottedSpinner from "../common/DottedSpinner";
import ReusableTextfield from "../common/ReusableTextfield";
import TaskCard from "../task/TaskCard";
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
  const { loggedInUser, isloggedInUser } = useSelector(
    (state) => state.HomePageModule
  );
  const [openActionRequirdStack, setopenActionRequirdStack] = useState(false);
  const [openActionRequird, setOpenActionRequird] = useState(false);
  const [openLeaveCount, setOpenLeaveCount] = useState(true);
  const [zIndex, setZIndex] = useState(1000);
  const [searchText, setSearchText] = useState("");

  const [welcomeText, setwelcomeText] = useState(true);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const webLiteAccess = searchParams.get("webLiteAccess");
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const signInFrom = searchParams.get("signInFrom");
    const dayPlanId = searchParams.get("dayPlanId");
    const repeatSignIn = searchParams.get("repeatSignIn");
    const employeeSignIn = searchParams.get("employeeSignIn");
    if (
      webLiteAccess !== null ||
      latitude !== null ||
      longitude !== null ||
      signInFrom !== null ||
      dayPlanId !== null ||
      repeatSignIn !== null ||
      employeeSignIn !== null
    ) {
      dispatch(
        loggedInUser_get({
          webLiteAccess,
          latitude,
          longitude,
          signInFrom,
          dayPlanId,
          repeatSignIn,
          employeeSignIn,
        })
      );
    } else {
      dispatch(loggedInUser_get({ switchToWebLite: true }));
    }
  }, [dispatch, searchParams]);

  useEffect(() => {
    dispatch(actionRequiredAjax());
  }, [dispatch]);
  useEffect(() => {
    dispatch(todayLeaveDetails());
  }, [dispatch, openLeaveCount]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setwelcomeText(false);
    }, 2000); // 2 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openActionDialog = loggedInUser?.sessionData;
    const settingValue = loggedInUser?.setting?.value;

    if (openActionDialog) {
      if (settingValue) {
        actionRequiredDetails.map((each) => {
          each.enable === true
            ? setopenActionRequirdStack(true)
            : setopenActionRequirdStack(false);
        });
      } else {
        setopenActionRequirdStack(false);
      }
    } else {
    }

    if (openActionRequirdStack && actionRequiredDetails.length > 0) {
      actionRequiredDetails.forEach((each) => {
        if (each.actionRequiredType === 2) {
        
          dispatch(actionRequiredAjax_Getworks());
        } else if (each.actionRequiredType === 3) {
         
          dispatch(actionRequiredAjax_Getleaves());
        } else if (each.actionRequiredType === 4) {
         
          dispatch(actionRequiredAjax_GetApproval());
        }
      });
    }
  }, [loggedInUser, actionRequiredDetails, dispatch, openActionRequird]);

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

  const handleNavigationToSignIn = ({
    empId,
    employeeSignIn,
    signInFrom,
    repeatSignIn,
  }) => {
    const queryParams = new URLSearchParams({
      employeeSignIn,
      signInFrom,
      repeatSignIn,
    }).toString();

    nav(`/api/device/dashboard/signInreason/${empId}?${queryParams}`);
  };
  const handlenavigationfor = (count, formSpecId) => {
    if (count === 1) {

    } else if (count > 10) {
      nav(
        `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=5&approvalView=2`
      );
    } else {
      nav(
        `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=5&approvalView=2`
      );
    }
  };

  const worklistnavigation = (count, workSpecId) => {
    if (count === 1) {
   
    } else if (count > 10) {
      nav(
        `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=8&workView=1
`
      );
    } else {
      nav(
        `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=8&workView=1
`
      );
    }
  };
  const leavenavigation = () => {
    nav(
      "/view/leaves/new?leaveMenuType=2&viewType=2&teamLeaves=1&leaveViewType=2"
    );
  };
  return (
    <Box sx={{ bgcolor: "#F0F3FA" }}>
      <Box sx={{ mt: 8 }}>
        <Stack gap={1}>
          {/* user details */}

          {!isloggedInUser && (
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
                  {loggedInUser && (
                    <>
                      <Stack>
                        {loggedInUser.employeeSignIn === "-1" &&
                          loggedInUser.employeeSignInAfterSignOut === 0 &&
                          (loggedInUser.isSignInFrom ? (
                            <Stack>
                              <Stack
                                sx={{ px: 2, py: { sm: 1.5, xs: 1 }, gap: 0.5 }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    fontSize: { sm: "16px", xs: "14px" },
                                  }}
                                >
                                  Hi, {loggedInUser?.loginEmpName}
                                </Typography>

                                <Typography
                                  sx={{
                                    color: "red",
                                    fontSize: { sm: "12px", xs: "10px" },
                                    fontWeight: 500,
                                  }}
                                >
                                  Not signed In
                                </Typography>
                                {loggedInUser.lastSignedIn !== null && (
                                  <Typography
                                    sx={{
                                      color:"green",
                                      fontSize: { sm: "12px", xs: "10px" },
                                      fontWeight: 500,
                                    }}
                                  >
                                    Last signed in &nbsp;
                                    {loggedInUser.differenceInLastSignIn}&nbsp;
                                    at &nbsp;
                                    {loggedInUser.lastSignedIn.substring(
                                      11,
                                      19
                                    )}
                                  </Typography>
                                )}
                                {loggedInUser.noMobileAccess === false ? (
                                  <>
                                    <Stack
                                      sx={{
                                        flexDirection: "row",
                                        gap: 0.3,
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* need to work with pop up */}
                                      <HistoryIcon sx={{ color: "#011D45" }} />

                                      <Button
                                        size="small"
                                        startIcon={<LoginOutlined />}
                                        variant="outlined"
                                        sx={{
                                          color:"#fff",
                                          cursor: "not-allowed",
                                          borderColor: "green",
                                          fontSize: { xs: "9px", sm: "12px" },
                                          mt: 1,
                                        }}
                                      >
                                        signin
                                      </Button>
                                    </Stack>
                                    <Typography
                                      sx={{
                                        fontSize: { sm: "11px", xs: "9px" },
                                        fontWeight: 500,
                                      }}
                                    >
                                      Note: system has detected mobile
                                      application access against your profile.
                                      Kindly do the sign-in through the mobile
                                      application.
                                    </Typography>
                                  </>
                                ) : (
                                  <>
                                    <Stack
                                      sx={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 1,
                                      }}
                                    >
                                      <HistoryIcon sx={{ color: "#011D45" }} />
                                      <Button
                                        size="small"
                                        startIcon={<LoginOutlined />}
                                        variant="outlined"
                                        sx={{
                                          color:"#fff",
                                          cursor: "pointer",
                                          borderColor: "green",
                                          width: "110px",
                                          fontSize: { xs: "9px", sm: "12px" },
                                          mt: 1,
                                        }}
                                      >
                                        signin
                                      </Button>
                                    </Stack>
                                  </>
                                )}
                              </Stack>

                              <Typography></Typography>
                            </Stack>
                          ) : (
                            <Stack>
                              <Stack
                                sx={{ px: 2, py: { sm: 1.5, xs: 1 }, gap: 0.5 }}
                              >
                                <Stack sx={{ gap: 1 }}>
                                  <Typography
                                    sx={{
                                      fontWeight: "bold",
                                      fontSize: { sm: "16px", xs: "14px" },
                                    }}
                                  >
                                    Hi, {loggedInUser?.loginEmpName}
                                  </Typography>
{loggedInUser?.lastSignedIn && (
                                    <Typography
                                      sx={{
                                        color: "green",
                                        fontSize: { sm: "12px", xs: "10px" },
                                        fontWeight: 500,
                                      }}
                                    >
                                      Last signed in&nbsp;
                                      {loggedInUser?.differenceInLastSignIn ??
                                        "recently"}
                                      &nbsp;at&nbsp;
                                      {loggedInUser.lastSignedIn.substring(
                                        11,
                                        19
                                      )}
                                    </Typography>
                                  )}
                                 
                                  {loggedInUser.noMobileAccess === false ? (
                                    <>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          gap: 1,
                                          mt: 1,
                                          mb: 1,
                                          alignItems: "center",
                                        }}
                                      >
                                        {/* <HistoryIcon sx={{ color: "#011D45" }} /> */}

                                        <Button
                                          disabled
                                          size="small"
                                          startIcon={<LoginOutlined />}
                                          sx={{
                                            color:"green",
                                            cursor: "pointer",
                                            borderColor: "green",
                                            fontSize: { xs: "9px", sm: "12px" },
                                            background: "green",
                                          
                                            fontWeight: "bold",
                                          }}
                                          variant="contained"
                                        >
                                          login
                                        </Button>
                                        <Typography
                                          sx={{
                                            color: "red",
                                            fontSize: {
                                              xs: "10px",
                                              sm: "13px",
                                            },
                                          }}
                                        >
                                          {" "}
                                          <CircleIcon
                                            size="small"
                                            sx={{
                                              height: "10px",
                                              width: "10px",
                                            }}
                                          />
                                          Not sign in
                                        </Typography>
                                      </Stack>
                                      <Typography
                                        sx={{
                                          fontSize: { sm: "11px", xs: "9px" },
                                          fontWeight: 500,
                                        }}
                                      >
                                        Note: system has detected mobile
                                        application access against your profile.
                                        Kindly do the sign-in through the mobile
                                        application.
                                      </Typography>
                                    </>
                                  ) : (
                                    <Stack
                                      sx={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: 1,
                                        textAlign: "center",
                                      }}
                                    >
                                      <Button
                                        size="small"
                                        startIcon={<LoginOutlined />}
                                        sx={{
                                          
                                          cursor: "pointer",
                                          borderColor: "green",
                                          fontSize: { xs: "9px", sm: "12px" },
                                          background: "green",
                                        
                                          fontWeight: "bold",
                                        }}
                                        variant="contained"
                                        onClick={() =>
                                          handleNavigationToSignIn({
                                            empId: loggedInUser?.empId,
                                            employeeSignIn:
                                              loggedInUser?.employeeSignIn,
                                            signInFrom:
                                              loggedInUser?.signInFrom,
                                            repeatSignIn: "1",
                                          })
                                        }
                                      >
                                        signin
                                      </Button>
                                      <Typography
                                        sx={{
                                          color: "red",
                                          fontSize: { xs: "9px", sm: "13px" },
                                        }}
                                      >
                                        {" "}
                                        <CircleIcon
                                          size="small"
                                          sx={{ height: "10px", width: "10px" }}
                                        />
                                        Not sign in
                                      </Typography>
                                    </Stack>
                                  )}
                                </Stack>
                              </Stack>
                            </Stack>
                          ))}
                      </Stack>
                    </>
                  )}

                  {loggedInUser && (
                    <>
                      <Stack>
                        {loggedInUser.employeeSignIn === "1" && (
                          <>
                            {loggedInUser.signInFlag === true ? (
                              <Stack>
                                <Stack
                                  sx={{
                                    px: 2,
                                    py: { sm: 1.5, xs: 1 },
                                    gap: 0.5,
                                  }}
                                >
                                  {welcomeText ? (
                                    <Stack
                                      sx={{
                                        gap: 1,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontWeight: "bold",
                                          fontSize: { sm: "16px", xs: "14px" },
                                        }}
                                      >
                                        Hi, {loggedInUser?.loginEmpName}
                                      </Typography>
                                      <Typography sx={{ color: "green" }}>
                                        Great. Successfully Signedin.Have a
                                        great day!
                                      </Typography>
                                    </Stack>
                                  ) : null}
                                </Stack>
                              </Stack>
                            ) : null}

                            {welcomeText ? null : (
                              <>
                                {(loggedInUser.isSignOutFrom === true ||
                                  loggedInUser.isSignOutFrom === false) && (
                                  <Stack>
                                    <Stack
                                      sx={{
                                        px: 2,
                                        py: { sm: 1.5, xs: 1 },
                                        gap: 0.5,
                                      }}
                                    >
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
                                            fontSize: {
                                              sm: "16px",
                                              xs: "14px",
                                            },
                                          }}
                                        >
                                          Hi, {loggedInUser?.loginEmpName}
                                        </Typography>
                                      </Stack>

                                      <Typography
                                        sx={{
                                          
                                          fontWeight: { sm: 500, xs: 600 },
                                          fontSize: { sm: "13px", xs: "10px" },
                                        }}
                                      >
                                        signed in&nbsp;
                                        {loggedInUser.differenceInSignInDate}
                                        &nbsp;at &nbsp;{loggedInUser.signedTime}
                                      </Typography>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          gap: 0.5,
                                          mt: 0.7,
                                        }}
                                      >
                                        {loggedInUser.noMobileAccess ===
                                        false ? (
                                          <Button
                                            disabled
                                            size="small"
                                            startIcon={<LogoutIcon />}
                                            sx={{
                                              color: "tomato",
                                              borderColor: "tomato",
                                              fontSize: {
                                                xs: "9px",
                                                sm: "12px",
                                              },
                                              cursor: "not-allowed",
                                            }}
                                            variant="contained"
                                          >
                                            signout
                                          </Button>
                                        ) : (
                                          <Button
                                            size="small"
                                            startIcon={<LogoutIcon />}
                                            sx={{
                                              color: "#FFF",
                                              borderColor: "tomato",
                                              fontSize: {
                                                xs: "9px",
                                                sm: "12px",
                                              },
                                              fontWeight: "bold",
                                              background: "tomato",
                                            }}
                                            variant="contained"
                                            onClick={() =>
                                              handleNavigationToSignIn({
                                                empId: loggedInUser?.empId,
                                                employeeSignIn: "0",
                                                signInFrom: "1",
                                                repeatSignIn: "2",
                                              })
                                            }
                                          >
                                            signout
                                          </Button>
                                        )}
                                        <Button
                                          size="small"
                                          startIcon={<LoginOutlined />}
                                          sx={{
                                            color:"green",
                                            cursor: "not-allowed",
                                            fontSize: { xs: "9px", sm: "12px" },
                                          }}
                                        >
                                          signed in
                                        </Button>
                                      </Stack>
                                      {loggedInUser.noMobileAccess ===
                                        false && (
                                        <Typography
                                          sx={{
                                            fontSize: { sm: "11px", xs: "9px" },
                                            fontWeight: 500,
                                          }}
                                        >
                                          Note: system has detected mobile
                                          application access against your
                                          profile. Kindly do the sign-in through
                                          the mobile application.
                                        </Typography>
                                      )}
                                    </Stack>
                                  </Stack>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Stack>
                    </>
                  )}

                  {loggedInUser && (
                    <>
                      {(() => {
                        const matchingGroup =
                          loggedInUser.employeeSignIn === "-1" &&
                          loggedInUser.employeeSignInAfterSignOut === "1";

                        return (
                          <>
                            <Stack>
                              {matchingGroup ? (
                                loggedInUser.isSignInFrom ? (
                                  <>Need to add </>
                                ) : (
                                  <> need to add</>
                                )
                              ) : null}
                            </Stack>
                          </>
                        );
                      })()}
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>
          )}
          {/* dashboard */}
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
                cursor: "not-allowed",
              }}
            >
              <Stack sx={{ px: { sm: 2, xs: 1 }, py: 1,cursor: "not-allowed", }}>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: { sm: 2, xs: 1 },
                    alignItems: "center",
                    
                  }}
                 // onClick={navigateToDashBoard}
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

          {/* action required */}
          {openActionRequirdStack && (
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
                    ) : approvalList?.length > 0 ? (
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
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handlenavigationfor(item.count, item.formSpecId)
                            }
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
                                fontSize: { sm: "12px", xs: "9px" },
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
                    ) : null}

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
                          leave loadings
                        </Typography>
                      </Stack>
                    ) : leavesList?.length > 0 ? (
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
                              cursor: "pointer",
                            }}
                            onClick={leavenavigation}
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
                                fontSize: { sm: "12px", xs: "9px" },
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
                    ) : null}

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
                    ) : workList?.length > 0 ? (
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
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              worklistnavigation(item.count, item.workSpecId)
                            }
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
                                fontSize: { sm: "12px", xs: "9px" },
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
                    ) : null}
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
          {/* leaves */}
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
                borderBottomLeftRadius: openLeaveCount ? "0px" : "5px",
                borderBottomRightRadius: openLeaveCount ? "0px" : "5px",
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
                      fontFamily: '"Poppins", sans-serif',
                      fontWeight: 500,
                      letterSpacing: 0.1,
                      fontSize: { sm: "13px", xs: "12px" },
                      color: onLeaveToday?.length === 0 ? "gray" : "red",
                    }}
                  >
                    on leave today
                    <Typography
                      component={"span"}
                      sx={{
                        color: onLeaveToday?.length === 0 ? "gray" : "red",
                      }}
                    >
                      ({(onLeaveToday && onLeaveToday?.length) || 0})
                    </Typography>
                  </Typography>
                  <IconButton onClick={toggleLeaveCount}>
                    {openLeaveCount ? (
                      <KeyboardArrowDownIcon
                        sx={{
                          color: onLeaveToday?.length === 0 ? "gray" : "red",
                          fontSize: { sm: "23px", xs: "20px" },
                        }}
                      />
                    ) : (
                      <KeyboardArrowRightIcon
                        sx={{
                          color: onLeaveToday?.length === 0 ? "gray" : "red",
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
                  {isonLeaveTodayLoading ? (
                    <Stack
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        alignItems: "center",
                      }}
                    >
                      <DottedSpinner size={20} color="#1976d2" thickness={4} />
                    </Stack>
                  ) : onLeaveToday && onLeaveToday.length > 0 ? (
                    <>
                      {onLeaveToday.map((empDetails, index) => (
                        <Stack key={index} sx={{ gap: 1 }}>
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
                        </Stack>
                      ))}
                    </>
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No data found
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
        {/* search filed */}
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
