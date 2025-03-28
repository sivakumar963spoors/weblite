import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DialogContent from "@mui/joy/DialogContent";
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack, TextField, Typography,Dialog,Avatar} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getLeavesData } from "../../redux/slices/LeavesModule";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";
import ResuableCarousal from "../common/ResuableCarousalForLeave";
const AllLeaves_display = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { LeavesModuleMenu, status, data } = useSelector(
    (state) => state.LeavesModule
  );

  const [searchParams] = useSearchParams();
  const viewType = searchParams.get("viewType");
  const leaveMenuType = searchParams.get("leaveMenuType");
  const [layout, setLayout] = React.useState(undefined);
  const [isRejectClick, setIsRejectClick] = useState(false);
  const [isApproveClick, setIsApproveClick] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [toogleFormData, setToggleFormData] = useState({});
  useEffect(() => {
    dispatch(getLeavesData(viewType));
  }, [dispatch, viewType]);

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

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }

    return result;
  };

  const carousalItems = chunkArray(LeavesModuleMenu, itemsPerRow);

  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);
  const handleNavigateToAddLeave = () => {
    var menus = "Add Leave";
    dispatch(toggleMenuTitle(menus));
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
    dispatch(toggleMenuTitle(menus));
    navigate(`/leave/view/${entityid}`);
  };

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
  const popupclose = () => {
    setIsApproveClick(false);
    setIsRejectClick(false);
    setOpen(false)
  };
  const [open, setOpen] = useState(false);

  const handleOpen = (leavedetails) => {
    setOpen(true);
    setToggleFormData({
      id: leavedetails?.empId,
      name: leavedetails?.empName,
      form: leavedetails?.formDateTime,
      to: leavedetails?.toDateTime,
      days: leavedetails?.noOfDays,
      employeeComment: leavedetails?.employeeNote,
      managerName: leavedetails?.managerName,
      managerId: leavedetails?.managerId,
      leaveType: leavedetails?.leaveTypeName,
      status: leavedetails?.status,
      createdAt: leavedetails?.createTime,
      isVisible: leavedetails?.visibleApproveRejectButton,
    });
  };
  
  const handleClose = () => setOpen(false);
  return (
    <Stack sx={{ mt: 10 }}>
      <ResuableCarousal
        items={carousalItems}
        isActiveViewType={viewType}
        isActiveLeaveMenu={leaveMenuType}
      />

      {status == "loading" ? (
        <Typography>loading ......</Typography>
      ) : (
        <Stack
          sx={{ mt: 2, cursor: "pointer", width: "98%" }}
         
        >
          {data.leaveViewType == 2 &&
            data.viewType == 2 &&
            viewType == 2 &&
            leaveMenuType == 2 && (
              <Typography sx={{ px: 2, fontWeight: "bold" }}>
                Awaiting for you
              </Typography>
            )}

          {viewType == 4 && (
            <Typography sx={{ px: 2, fontWeight: "bold" }}>Approved</Typography>
          )}
          {viewType == 5 && (
            <Typography sx={{ px: 2, fontWeight: "bold" }}>Rejected</Typography>
          )}
          {viewType == 1 && (
            <Typography sx={{ px: 2, fontWeight: "bold" }}>
              pending from your manager
            </Typography>
          )}
 {viewType == 3 && (
            <Typography sx={{ px: 2, fontWeight: "bold" }}>
              Awaiting from your manager
            </Typography>
          )}
          {data.leaveViewType == 2 &&
            data.viewType == 2 &&
            viewType == 2 &&
            leaveMenuType == 2 &&
            data?.leaves?.map((each, i) => (
              <Stack key={i}  onClick={()=>handleOpen(each)}>
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
                    }}
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
                          width:{sm:'50px', xs:'46px'},
                          height: {sm:'50px', xs:'46px'},
                          color: "#FFF",
                          "& > *": {
                            fontSize: "10px",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <Typography>{each.noOfDays} </Typography>
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

                              fontSize: {sm:'10px', xs:'8px'},
                            },
                          }}
                        >
                          <Typography>
                            Applied on : {each.createTime}
                          </Typography>
                          <Typography>From: {each.formDateTime}</Typography>
                          <Typography>To: {each.toDateTime}</Typography>
                          {each.status == 0 &&
                          each.immediateManagerStatus == 2 ? (
                            <Typography>
                              Reporting to: {each.statusChangesByName}
                            </Typography>
                          ) : (
                            <Typography>
                              Reporting to: {each.managerName}
                            </Typography>
                          )}

                          {/* {data.isVstCompany == false && (
                            <Typography>
                              Reporting to: {each.managerName}
                            </Typography>
                          )} */}
                        </Stack>
                      </Stack>
                    </Stack>

                    {each.status == 0 && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "orange",
                          color: "orange",
                          fontSize: { md: "14px", xs: "10px", fontWeight: 400 },
                        }}
                      >
                        pending
                      </Button>
                    )}
                    {(each.status == 1 || viewType == 5) && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "#4BA78A",
                          color: "#4BA78A",
                          fontSize: { md: "14px", xs: "10px", fontWeight: 400 },
                        }}
                      >
                        Approved
                      </Button>
                    )}
                    {(each.status == 2 || viewType == 5) && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "tomato",
                          color: "tomato",
                          fontSize: { md: "14px", xs: "12px", fontWeight: 400 },
                        }}
                      >
                        Rejected
                      </Button>
                    )}
                    {(each.status == 2 || viewType == 4) && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",

                          fontSize: { md: "14px", xs: "12px", fontWeight: 400 },
                        }}
                      >
                        approved
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            ))}
          {data.leaveViewType == 5 &&
            viewType == 4 &&
            data?.leaves?.map((each, i) => (
              <Stack key={i}>
                <Stack sx={{ alignItems: "center", mt: 1 }} onClick={()=>handlenavigatToLeaveDetails(each.empId)}>
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
                    }}
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
                          width:{sm:'50px', xs:'46px'},
                          height: {sm:'50px', xs:'46px'},
                          color: "#FFF",
                          "& > *": {
                            fontSize: "10px",
                            fontWeight: "bold",
                          },
                        }}
                      >
                        <Typography>{each.noOfDays} </Typography>
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

                              fontSize: {sm:'10px', xs:'9px'},
                            },
                          }}
                        >
                          <Typography>
                            Applied on : {each.createTime}
                          </Typography>
                          <Typography>From: {each.formDateTime}</Typography>
                          <Typography>To: {each.toDateTime}</Typography>
                          {each.status == 0 &&
                          each.immediateManagerStatus == 2 ? (
                            <Typography>
                              Reporting to: {each.statusChangesByName}
                            </Typography>
                          ) : (
                            <Typography>
                              Reporting to: {each.managerName}
                            </Typography>
                          )}

                          {/* {data.isVstCompany == false && (
                            <Typography>
                              Reporting to: {each.managerName}
                            </Typography>
                          )} */}
                        </Stack>
                      </Stack>
                    </Stack>

                    {each.status == 0 && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "orange",
                          color: "orange",
                          fontSize: { md: "14px", xs: "12px", fontWeight: 400 },
                        }}
                      >
                        pending
                      </Button>
                    )}
                    {(each.status == 1 || viewType == 5) && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "#4BA78A",
                          color: "#4BA78A",
                          fontSize: { md: "14px", xs: "10px", fontWeight: 400 },
                        }}
                      >
                        Approved
                      </Button>
                    )}
                    {(each.status == 2 || viewType == 5) && (
                      <Button
                        variant="outlined"
                        sx={{
                          textTransform: "capitalize",
                          borderColor: "tomato",
                          color: "tomato",
                          fontSize: { md: "14px", xs: "12px", fontWeight: 400 },
                        }}
                      >
                        Rejected
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            ))}
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
      <Dialog fullScreen open={open} onClose={handleClose}>
        <>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "flex-end",
              cursor: "pointer",
              gap:1
            }}
            onClick={popupclose}
          >
            <Typography sx={{  textTransform: "capitalize" }}>
              close
            </Typography>
        <CloseIcon/>
          </Stack>

          <Stack sx={{p:2}}>

            
            <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
              <Avatar sx={{ width: "100px", height: "100px" }} />
              <Typography>{toogleFormData.name}</Typography>
              {!(isApproveClick || isRejectClick) && (
                <Stack
                  sx={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    mt: 4,

                    "& > * > :first-of-type": {
                      width: { md: "50%", xs: "100%" },

                      fontSize: { md: "14px", xs: "10px" },
                      fontWeight: 400,
                      color: "#333",
                    },
                    "& > * > :nth-of-type(2)": {
                      mb: 1,
                      width: { md: "100%", xs: "70%" },
                      fontSize: { md: "14px", xs: "10px" },
                      fontWeight: "bold",
                      color: "#011D45 !important",
                    },
                  }}
                >
                  <Stack>
                    <Typography>from</Typography>
                    <Typography>{toogleFormData?.form}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>To</Typography>
                    <Typography>{toogleFormData.to}</Typography>
                  </Stack>
                  <Stack>
                    <Typography>#Days</Typography>
                    <Typography>{toogleFormData.days}</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>

            <Stack sx={{ mt: 5 }}>
              <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                Employee reason/comments :
              </Typography>
              <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                {toogleFormData.employeeComment}
              </Typography>
            </Stack>
            {(isApproveClick || isRejectClick) && (
              <Stack sx={{ mt: 5 }}>
                <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                  Manager reason/comments :
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid #ccc",
                      },
                      "&:hover fieldset": {
                        border: "1px solid #ccc",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #ccc",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "16px",
                    },
                    "& .MuiInputAdornment-root": {},
                  }}
                />
              </Stack>
            )}
            {!(isApproveClick || isRejectClick) && (
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                <Button
                  sx={{
                    width: "50%",
                    color: "red",
                    borderColor: "red",
                    fontWeight: { md: "bold", xs: 400 },
                    fontSize: { md: "14px", xs: "12px" },
                  }}
                  variant="outlined"
                  onClick={handleIsReject}
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
                  variant="contained"
                  onClick={handleIsApprove}
                >
                  Approve
                </Button>
              </Stack>
            )}
            <Stack sx={{ alignItems: "center", mt: 2 }}>
              {isApproveClick && (
                <Button
                  sx={{
                    width: "50%",
                    background: "#4BA78A",
                    color: "#FFF",
                    fontWeight: { md: "bold", xs: 400 },
                    fontSize: { md: "14px", xs: "12px" },
                  }}
                  variant="contained"
                >
                  Approve leave
                </Button>
              )}
              {isRejectClick && (
                <Button
                  sx={{
                    width: { md: "30%", xs: "50%" },
                    color: "#FFF",
                    background: "red",
                    fontWeight: { md: "bold", xs: 400 },
                    fontSize: { md: "14px", xs: "12px" },
                  }}
                >
                  reject leave
                </Button>
              )}
            </Stack>
          </Stack>
        </>
      </Dialog>
    </Stack>
  );
};

export default AllLeaves_display;
