import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Dialog, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loggedInUser_get } from "../../redux/slices/HomePageSlice";
import {
  fetchApprovedLeaves,
  fetchgetWithDrawLeave,
  fetchPendingApprovals,
  fetchRejectedLeaves,
  fetchTotalMyLeaves,
  fetchTotalTeamLeaves,
  getLeavesData,
  getLeavesDataForCount,
} from "../../redux/slices/LeavesModule";
import DottedSpinner from "../common/DottedSpinner";
import ResuableCarousal from "../common/ResuableCarousalForLeave";

const AllLeaves_display = () => {
  const {
    pendingApprovals,
    totalMyLeaves,
    totalTeamLeaves,
    approvedLeaves,
    rejectedLeaves,
    dataEmpCount,
    isdataEmpCount,
    status,
    data,
  } = useSelector((state) => state.LeavesModule);
  const { loggedInUser, isloggedInUser } = useSelector(
    (state) => state.HomePageModule
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPendingApprovals());
    dispatch(fetchTotalMyLeaves());
    dispatch(fetchTotalTeamLeaves());
    dispatch(fetchApprovedLeaves());
    dispatch(fetchRejectedLeaves());
  }, [dispatch]);
  useEffect(() => {
    dispatch(loggedInUser_get());
  }, [dispatch]);

  const [searchParams] = useSearchParams();
  const viewType = Number(searchParams.get("viewType"));
  const leaveViewType = Number(searchParams.get("leaveViewType"));
  const leaveMenuType = Number(searchParams.get("leaveMenuType"));
  const teamLeaves = Number(searchParams.get("teamLeaves"));
  const [isRejectClick, setIsRejectClick] = useState(false);
  const [isApproveClick, setIsApproveClick] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [toogleFormData, setToggleFormData] = useState({});
  useEffect(() => {
    if (
      leaveMenuType === 2 &&
      viewType === 3 &&
      teamLeaves === 2 &&
      leaveViewType === 3
    ) {
      dispatch(
        getLeavesDataForCount({
          leaveMenuType,
          viewType,
          teamLeaves,
          leaveViewType,
        })
      );
    } else if ((leaveMenuType, viewType, teamLeaves, leaveViewType)) {
      dispatch(
        getLeavesData({
          leaveMenuType,
          viewType,
          teamLeaves,
          leaveViewType,
        })
      );
    } else {
      dispatch(
        getLeavesData({
          leaveMenuType,
          viewType,

          leaveViewType,
        })
      );
    }
  }, [dispatch, leaveViewType, viewType, leaveMenuType]);

  const calculateItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 1440) {
      setItemsPerRow(4);
    } else if (width >= 768) {
      setItemsPerRow(3);
    } else {
      setItemsPerRow(2);
    }
  };
  const leavesModuleMenu = [
    {
      title: "pending from your manager ",
      count: pendingApprovals,
      leaveViewType: 1,
    },
    {
      title: "awaiting for you",
      count: totalMyLeaves,
      leaveViewType: 2,
    },
    {
      title: "awaiting from team",
      count: totalTeamLeaves,
      leaveViewType: 3,
    },

    {
      title: "Approved ",
      count: approvedLeaves,
      leaveViewType: 5,
    },
    {
      title: "Rejected ",
      count: rejectedLeaves,
      leaveViewType: 6,
    },
  ];
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  const carousalItems = chunkArray(leavesModuleMenu, itemsPerRow);

  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);
  const handleNavigateToAddLeave = () => {
    navigate("/leave/my/create");
  };
  const handleIsReject = () => {
    setIsRejectClick(true);
  };
  const handleIsApprove = () => {
    setIsApproveClick(true);
  };
  const handlenavigatToLeaveDetails = (entityid) => {
    var menus = "Leave Details";

    navigate(`/leave/view/${entityid}`);
  };

  const popupclose = () => {
    setIsApproveClick(false);
    setIsRejectClick(false);
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    let leaveMapString =
      data && data?.leavesMap.replaceAll("\n", "").replaceAll("\r", "");

    const leaveMap = JSON.parse(leaveMapString);

    setOpen(true);
    setToggleFormData({
      formDateTime: leaveMap[id].formDateTime,
      toDateTime: leaveMap[id].toDateTime,
      noOfDays: leaveMap[id].noOfDays,
      employeeNote: leaveMap[id].employeeNote,
      empName: leaveMap[id].empName,
      status: leaveMap[id].status,
      deleted: leaveMap[id].deleted,
      leavecancel: leaveMap[id].leavecancel,
      leaveTypeName: leaveMap[id].leaveTypeName,
      managerNote: leaveMap[id].managerNote,
      empMediaId: leaveMap[id].empMediaId,
      empLeaveId: leaveMap[id].empLeaveId,
    });
  };

  const handleClose = () => setOpen(false);

  const handleWithdraw = (leaveId, tzo) => {
    dispatch(
      fetchgetWithDrawLeave({
        leaveId,
        tzo,
        webActionToken: data?.webActionToken,
        isWebLiteView: true,
        leaveMenuType,
      })
    );
    setOpen(false);
    navigate("/home");
  };

  return (
    <Stack sx={{ mt: 10 }}>
      {((data && data?.webUserEmployee?.manager === true) ||
        (dataEmpCount && dataEmpCount?.isActionable === false)) && (
        <ResuableCarousal
          items={carousalItems}
          isActiveViewType={leaveViewType}
          // isActiveLeaveMenu={leaveMenuType}
        />
      )}

      <Stack sx={{ mt: 2 }}>
        {data.viewType === 1 && (
          <>
            {leaveViewType === 1 && (
              <Typography sx={{ px: 2, fontWeight: "bold" }}>
                pending from your manager
              </Typography>
            )}
          </>
        )}

        {leaveViewType === 2 && (
          <Typography sx={{ px: 2, fontWeight: "bold" }}>
            awaiting from you
          </Typography>
        )}

        {leaveViewType === 3 && (
          <Typography sx={{ px: 2, fontWeight: "bold" }}>
            awaiting from team
          </Typography>
        )}

        {leaveViewType === 5 && (
          <Typography sx={{ px: 2, fontWeight: "bold" }}>approved</Typography>
        )}
        {leaveViewType === 6 && (
          <Typography sx={{ px: 2, fontWeight: "bold" }}>rejected</Typography>
        )}
      </Stack>

      {leaveViewType === 3 && (
        <>
          {isdataEmpCount ? (
            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                textAlign: "center",
                mt: 10,
                flexDirection: "row",
              }}
            >
              <Typography>Loading ....</Typography>
              <DottedSpinner size={20} color="#1976d2" thickness={4} />
            </Stack>
          ) : (
            <>
              {dataEmpCount &&
              dataEmpCount.immediateEmployeesForLeave.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 12, sm: 14 },
                    py: 1.5,
                    background: "#fff",
                    mt: 1,
                    border: "1px solid #EBEBEB",
                  }}
                >
                  No records found
                </Typography>
              ) : (
                <>
                  {dataEmpCount &&
                    dataEmpCount.immediateEmployeesForLeave.map((employee) => (
                      <></>
                    ))}
                </>
              )}
            </>
          )}
        </>
      )}
      {status === "loading" ? (
        <Typography>loading ...... </Typography>
      ) : (
        <Stack sx={{ mt: 2, cursor: "pointer", width: "98%" }}>
          {data.leaveViewType === 1 && (
            <>
              {data?.leaves?.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 12, sm: 14 },
                    py: 1.5,
                    background: "#fff",
                    mt: 1,
                    border: "1px solid #EBEBEB",
                  }}
                >
                  No records found
                </Typography>
              ) : (
                data?.leaves?.map((each, i) => (
                  <Stack key={i}>
                    <Stack sx={{ alignItems: "center", mt: 1 }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "97%",
                          border: "1px solid #EBEBEB",
                          py: 3,
                          px: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f0f4ff", // light hover color
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={() => handleOpen(each.empLeaveId)}
                      >
                        <Stack
                          sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            sx={{
                              background: "#098FAF",
                              borderRadius: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              width: { sm: "50px", xs: "46px" },
                              height: { sm: "50px", xs: "46px" },
                              color: "#FFF",
                              "& > *": {
                                fontSize: "10px",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <Typography>{each.noOfDays}</Typography>
                            <Typography>Day</Typography>
                          </Stack>
                          <Stack
                            sx={{
                              "& > *": {
                                color: "#2e2e2e",
                                fontSize: { sm: "10px", xs: "8px" },
                              },
                            }}
                          >
                            <Typography>From: {each.formDateTime}</Typography>
                            <Typography>To: {each.toDateTime}</Typography>
                          </Stack>
                        </Stack>

                        {/* Status buttons */}

                        {each.deleted === 1 && (
                          <Button
                            variant="outlined"
                            sx={{ borderColor: "orange", color: "orange" }}
                          >
                            cancelled
                          </Button>
                        )}
                        {each.status === 0 && (
                          <Button
                            variant="outlined"
                            sx={{ borderColor: "orange", color: "orange" }}
                          >
                            Pending
                          </Button>
                        )}
                        {each.status === 1 && (
                          <Button
                            variant="outlined"
                            sx={{ borderColor: "#4BA78A", color: "#4BA78A" }}
                          >
                            Approved
                          </Button>
                        )}
                        {each.status === 2 && (
                          <Button
                            variant="outlined"
                            sx={{ borderColor: "tomato", color: "tomato" }}
                          >
                            Rejected
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              )}
            </>
          )}

          {data.leaveViewType === 2 && (
            <>
              {data?.leaves?.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 12, sm: 14 },
                    py: 1.5,
                    background: "#fff",
                    mt: 1,
                    border: "1px solid #EBEBEB",
                  }}
                >
                  No records found
                </Typography>
              ) : (
                data?.leaves?.map((each, i) => (
                  <Stack key={i}>
                    <Stack sx={{ alignItems: "center", mt: 1 }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "97%",
                          border: "1px solid #EBEBEB",
                          py: 3,
                          px: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f0f4ff", // light hover color
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={() => handleOpen(each.empLeaveId)}
                      >
                        <Stack
                          sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            sx={{
                              background: "#098FAF",
                              borderRadius: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              width: { sm: "50px", xs: "46px" },
                              height: { sm: "50px", xs: "46px" },
                              color: "#FFF",
                              "& > *": {
                                fontSize: "10px",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <Typography>{each.noOfDays}</Typography>
                            <Typography>Day</Typography>
                          </Stack>
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: {
                                  md: "14px",
                                  xs: "12px",
                                  fontWeight: 400,
                                },
                              }}
                            >
                              {each.empName}
                            </Typography>
                            <Stack
                              sx={{
                                "& > *": {
                                  color: "#2e2e2e",
                                  fontSize: { sm: "10px", xs: "8px" },
                                },
                              }}
                            >
                              <Typography>
                                Applied on : {each.createTime}
                              </Typography>
                              <Typography>From: {each.formDateTime}</Typography>
                              <Typography>To: {each.toDateTime}</Typography>
                              {each.status === 0 &&
                              each.immediateManagerStatus === 2 ? (
                                <Typography>
                                  Reporting to: {each.statusChangesByName}
                                </Typography>
                              ) : (
                                <Typography>
                                  Reporting to: {each.managerName}
                                </Typography>
                              )}
                            </Stack>
                          </Stack>
                        </Stack>

                        {/* Status buttons */}
                        {each.status === 0 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "orange",
                              color: "orange",
                              fontSize: {
                                md: "14px",
                                xs: "10px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Pending
                          </Button>
                        )}
                        {each.status === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "#4BA78A",
                              color: "#4BA78A",
                              fontSize: {
                                md: "14px",
                                xs: "10px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Approved
                          </Button>
                        )}
                        {each.status === 2 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "tomato",
                              color: "tomato",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Rejected
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              )}
            </>
          )}

          {data.leaveViewType === 5 && (
            <>
              {data?.leaves?.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 12, sm: 14 },
                    py: 1.5,
                    background: "#fff",
                    mt: 1,
                    border: "1px solid #EBEBEB",
                  }}
                >
                  No records found
                </Typography>
              ) : (
                data?.leaves?.map((each, i) => (
                  <Stack key={i}>
                    <Stack sx={{ alignItems: "center", mt: 1 }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "97%",
                          border: "1px solid #EBEBEB",
                          py: 3,
                          px: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f0f4ff", // light hover color
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={() => handleOpen(each.empLeaveId)}
                      >
                        {/* Avatar and name */}
                        <Stack
                          sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            sx={{
                              background: "#098FAF",
                              borderRadius: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              width: { sm: "50px", xs: "46px" },
                              height: { sm: "50px", xs: "46px" },
                              color: "#FFF",
                              "& > *": {
                                fontSize: "10px",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <Typography>{each.noOfDays}</Typography>
                            <Typography>Day</Typography>
                          </Stack>
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: {
                                  md: "14px",
                                  xs: "12px",
                                  fontWeight: 400,
                                },
                              }}
                            >
                              {each.empName}
                            </Typography>
                            <Stack
                              sx={{
                                "& > *": {
                                  color: "#2e2e2e",
                                  fontSize: { sm: "10px", xs: "9px" },
                                },
                              }}
                            >
                              <Typography>From: {each.formDateTime}</Typography>
                              <Typography>To: {each.toDateTime}</Typography>
                              <Typography>
                                Reporting to: {each.managerName}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        {/* Status buttons */}
                        {each.deleted === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "orange",
                              color: "orange",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            cancelled
                          </Button>
                        )}
                        {each.status === 0 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "orange",
                              color: "orange",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            pending
                          </Button>
                        )}
                        {each.status === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "#4BA78A",
                              color: "#4BA78A",
                              fontSize: {
                                md: "14px",
                                xs: "10px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Approved
                          </Button>
                        )}
                        {each.status === 2 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "tomato",
                              color: "tomato",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Rejected
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              )}
            </>
          )}
          {data.leaveViewType === 6 && (
            <>
              {data?.leaves?.length === 0 ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: 12, sm: 14 },
                    py: 1.5,
                    background: "#fff",
                    mt: 1,
                    border: "1px solid #EBEBEB",
                  }}
                >
                  No records found
                </Typography>
              ) : (
                data?.leaves?.map((each, i) => (
                  <Stack key={i}>
                    <Stack sx={{ alignItems: "center", mt: 1 }}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "97%",
                          border: "1px solid #EBEBEB",
                          py: 3,
                          px: 1,
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f0f4ff", // light hover color
                            cursor: "pointer",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        onClick={() => handleOpen(each.empLeaveId)}
                      >
                        {/* Avatar and name */}
                        <Stack
                          sx={{
                            flexDirection: "row",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Stack
                            sx={{
                              background: "#098FAF",
                              borderRadius: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              width: { sm: "50px", xs: "46px" },
                              height: { sm: "50px", xs: "46px" },
                              color: "#FFF",
                              "& > *": {
                                fontSize: "10px",
                                fontWeight: "bold",
                              },
                            }}
                          >
                            <Typography>{each.noOfDays}</Typography>
                            <Typography>Day</Typography>
                          </Stack>
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: {
                                  md: "14px",
                                  xs: "12px",
                                  fontWeight: 400,
                                },
                              }}
                            >
                              {each.empName}
                            </Typography>
                            <Stack
                              sx={{
                                "& > *": {
                                  color: "#2e2e2e",
                                  fontSize: { sm: "10px", xs: "9px" },
                                },
                              }}
                            >
                              <Typography>From: {each.formDateTime}</Typography>
                              <Typography>To: {each.toDateTime}</Typography>
                              <Typography>
                                Reporting to: {each.managerName}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>

                        {/* Status buttons */}
                        {each.deleted === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "orange",
                              color: "orange",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            cancelled
                          </Button>
                        )}
                        {each.status === 0 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "orange",
                              color: "orange",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            pending
                          </Button>
                        )}
                        {each.status === 1 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "#4BA78A",
                              color: "#4BA78A",
                              fontSize: {
                                md: "14px",
                                xs: "10px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Approved
                          </Button>
                        )}
                        {each.status === 2 && (
                          <Button
                            variant="outlined"
                            sx={{
                              textTransform: "capitalize",
                              borderColor: "tomato",
                              color: "tomato",
                              fontSize: {
                                md: "14px",
                                xs: "12px",
                                fontWeight: 400,
                              },
                            }}
                          >
                            Rejected
                          </Button>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              )}
            </>
          )}
        </Stack>
      )}
      <Stack sx={{ position: "fixed", bottom: 10, right: 10 }}>
        <Button
          startIcon={<AddCircleOutlineIcon sx={{}} />}
          sx={{
            borderRadius: "30px",
            background: "#2478FE",
            color: "#FFF",
            fontWeight: "bold",
            fontSize: { md: "13px", xs: "10px" },
          }}
          variant="outlined"
          onClick={handleNavigateToAddLeave}
        >
          Add Leave
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "600px", // your fixed width
            maxWidth: "none", // disable default maxWidth
          },
        }}
      >
        <>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              cursor: "pointer",
              textAlign: "center",
              gap: 0.3,
              p: 1,
            }}
            onClick={popupclose}
          >
            <Typography sx={{ textTransform: "capitalize" }}>close</Typography>
            <CloseIcon sx={{ fontSize: "15px" }} />
          </Stack>

          <Stack sx={{ p: 1 }}>
            <Stack
              sx={{ alignItems: "center", justifyContent: "center", gap: 1 }}
            >
              <Stack
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.2,
                  mb: 1,
                }}
              >
                <Avatar
                  sx={{ width: "100px", height: "100px", mt: 0.5 }}
                  src={toogleFormData.empMediaId}
                />
                <Typography sx={{ fontWeight: "bold" }}>
                  {toogleFormData.empName}
                </Typography>

                <Typography
                  sx={{
                    color:
                      toogleFormData.deleted === 1
                        ? " yellow"
                        : toogleFormData.status === 0
                        ? "orange"
                        : toogleFormData.status === 1
                        ? "#4BA78A"
                        : toogleFormData.status === 2
                        ? "red"
                        : "yellow",
                  }}
                >
                  {toogleFormData.leaveTypeName}
                </Typography>
              </Stack>
              {leaveViewType !== 5 && (
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 1,

                    "& > * > :first-of-type": {
                      width: { md: "50%", xs: "100%" },

                      fontSize: { md: "14px", xs: "10px" },
                      fontWeight: 400,
                      color: "#333",
                    },
                    "& > * > :nth-of-type(2)": {
                      mb: 0.3,
                      width: { md: "100%", xs: "70%" },
                      fontSize: { md: "14px", xs: "10px" },
                      fontWeight: "bold",
                      color: "#011D45 !important",
                    },
                  }}
                >
                  <Stack>
                    <Typography>from</Typography>
                    <Typography>{toogleFormData?.formDateTime}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>To</Typography>
                    <Typography>{toogleFormData?.toDateTime}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>#Days</Typography>
                    <Typography>{toogleFormData?.noOfDays}</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
            {leaveMenuType !== 5 && (
              <Stack sx={{ mt: 1.5 }}>
                <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                  Employee reason/comments :
                </Typography>
                <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                  {toogleFormData.employeeNote}
                </Typography>
              </Stack>
            )}

            {leaveMenuType === 1 && (
              <Stack sx={{ mt: 5 }}>
                <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                  managerNote reason/comments :
                </Typography>
                <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                  {toogleFormData.managerNote}
                </Typography>
              </Stack>
            )}
            <Stack
              sx={{ mt: 7, alignItems: "center", justifyContent: "center" }}
            >
              {(() => {
                if (leaveMenuType === 1) {
                  if (
                    toogleFormData.deleted !== 1 &&
                    toogleFormData.leavecancel &&
                    toogleFormData.status === 0
                  ) {
                    return (
                      <Button
                        sx={{
                          width: { sm: "50%", xs: "80%" },
                          border: "1px solid red",
                          color: "red",
                        }}
                        variant="outlined"
                        onClick={() =>
                          handleWithdraw(toogleFormData.empLeaveId, data?.tzo)
                        }
                      >
                        Withdraw My leave
                      </Button>
                    );
                  } else if (
                    toogleFormData.deleted !== 1 &&
                    toogleFormData.leavecancel &&
                    toogleFormData.status === 1
                  ) {
                    return (
                      <Button
                        sx={{ width: { sm: "50%", xs: "80%" } }}
                        variant="outlined"
                        onClick={handleClose}
                      >
                        Cancel
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        sx={{ width: { sm: "50%", xs: "80%" } }}
                        variant="outlined"
                        onClick={handleClose}
                      >
                        OK
                      </Button>
                    );
                  }
                }
                return null;
              })()}
            </Stack>

            {leaveMenuType !== 5 && (
              <Stack sx={{ mt: 6, flexDirection: "row", gap: 1 }}>
                {leaveMenuType === 2 && toogleFormData.status === 0 && (
                  <>
                    <Button
                      variant="outlined"
                      sx={{
                        width: "50%",
                        color: "red",
                        borderColor: "red",
                        fontWeight: { md: "bold", xs: 400 },
                        fontSize: { md: "14px", xs: "12px" },
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      sx={{
                        width: "50%",
                        background: "#4BA78A",
                        color: "#FFF",
                        fontWeight: { md: "bold", xs: 400 },
                        fontSize: { md: "14px", xs: "12px" },
                      }}
                    >
                      Approve
                    </Button>
                  </>
                )}

                {leaveMenuType === 2 && toogleFormData.status === 1 && (
                  <>
                    <Button>Reject Leave</Button>
                  </>
                )}

                {leaveMenuType === 2 && toogleFormData.status === 2 && (
                  <>
                    <Button>Approve Leave</Button>
                  </>
                )}
              </Stack>
            )}
          </Stack>
        </>
      </Dialog>
    </Stack>
  );
};

export default AllLeaves_display;

//   const openModalPopUp = ( str,leavedetails) => {
//     alert('hii')
//     if (!leavedetails || !Array.isArray(leavedetails.leaves)) {
//       console.error("leavedetails or leaves array is undefined:", leavedetails);
//       return;
//     }
//      setLayout(str);
// console.log(leavedetails.pendingLeaves)
//     leavedetails?.leaves.map((each, i) =>
//       setToggleFormData({
//         id: each?.empId,
//         form: each?.formDateTime,
//         to: each?.toDateTime,
//         days: each?.noOfDays,
//         employeeComment: each?.employeeNote,
//         name: each?.empName,
//       })

//     );
//     alert(toogleFormData.id)
//   };
