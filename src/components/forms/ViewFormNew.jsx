import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchFormdatanew } from "../../redux/slices/FormsSlice";
import {
  fetchFormApprovalsCountByManager,
  fetchFormApprovalsCountByMe,
  fetchFormApprovedsCountByMe,
} from "../../redux/slices/HomePageSlice";
import DottedSpinner from "../common/DottedSpinner";
import ReusableCarousalForFromNew from "../common/ReusableCarousalForFromNew";
import ReusableTextfield from "../common/ReusableTextfield";

const ViewFormNew = () => {
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);

  const navigate = useNavigate();
  const [param] = useSearchParams();
  const empId = Number(param.get("empId"));
  const viewType = Number(param.get("viewType"));
  const formSpecId = Number(param.get("formSpecId"));
  const approvalView = Number(param.get("approvalView"));
  const splitTeamWise = Number(param.get("splitTeamWise"));
  const byMe = param.get("byMe");
  const statusMessage = param.get("statusMessage");

  const { formsDetailsnew, isloadingnew } = useSelector(
    (state) => state.FormsModule
  );
  const {
    LoadHomeScreenCards,
    filteredHomePageData,
    loggedInUser,
    yesterdayCount,
    todayCount,
    loadActionableWorksByMe,
    workSpecCards,
    pendingByMe,
    pendingByTeam,
    inactiveWorks,
    loadFormApprovalsCountByMe_byMe,
    loadFormApprovalsCountByManager_byManager,
    fetchFormApprovedsCountByMe_byMe,
    isfetchFormApprovedsCountByMe_byMe,
    isfetchFormApprovalsCountByManager,
    isfetchFormApprovalsCountByMe,
    isLoadHomeScreenCards,
  } = useSelector((state) => state.HomePageModule);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFormApprovalsCountByManager());

    dispatch(fetchFormApprovalsCountByMe());
    dispatch(fetchFormApprovedsCountByMe(formSpecId));
  }, [dispatch, formSpecId]);
  useEffect(() => {
    if ((empId, viewType, formSpecId, approvalView, splitTeamWise)) {
      dispatch(
        fetchFormdatanew({
          formSpecId: formSpecId,
          empId: empId,
          viewType: viewType,
          approvalView: approvalView,
          splitTeamWise: splitTeamWise,
          statusMessage,
        })
      );
    } else if ((empId, viewType, formSpecId, approvalView, byMe)) {
      dispatch(
        fetchFormdatanew({
          formSpecId: formSpecId,
          empId: empId,
          viewType: viewType,
          byMe: byMe,
          approvalView: approvalView,
        })
      );
    } else {
      dispatch(
        fetchFormdatanew({
          formSpecId: formSpecId,
          empId: empId,
          viewType: viewType,
          approvalView: approvalView,
        })
      );
    }
  }, [
    dispatch,
    formSpecId,
    empId,
    viewType,
    approvalView,
    byMe,
    splitTeamWise,
  ]);

  const [itemsPerRow, setItemsPerRow] = useState(3);
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
  const pendingfromanger =
    loadFormApprovalsCountByMe_byMe &&
    loadFormApprovalsCountByMe_byMe?.find(
      (group) => group.formSpecId === formSpecId
    );

  const awaitingforu =
    loadFormApprovalsCountByManager_byManager &&
    loadFormApprovalsCountByManager_byManager?.find(
      (group) => group.formSpecId === formSpecId
    );

  const approved =
    fetchFormApprovedsCountByMe_byMe &&
    fetchFormApprovedsCountByMe_byMe?.find(
      (group) => group.formSpecId === formSpecId
    );

  const pedning = pendingfromanger?.pendingCount ?? 0;
  const sizeforawaitingforu = awaitingforu?.formApprovalByTeam ?? 0;
  const formApprovalByMe = awaitingforu?.formApprovalByMe ?? 0;
  const rejectcount = approved?.rejectedCount ?? 0;
  const approvedCount = approved?.approvedCount ?? 0;

  const newformForManagerTrue = [
    {
      id: 1,
      count:
        isfetchFormApprovalsCountByManager === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          pedning
        ),
      title: "Pending from your manager",
    },
    {
      id: 2,
      count:
        isfetchFormApprovalsCountByMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          formApprovalByMe
        ),
      title: "Awaiting for you",
    },
    {
      id: 3,
      count:
        isfetchFormApprovalsCountByMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          sizeforawaitingforu
        ),
      title: "Awaiting From Team",
    },
    {
      id: 15,
      count:
        isfetchFormApprovedsCountByMe_byMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          approvedCount
        ),
      title: "Approved(past 30 Days )",
    },
    {
      id: 16,
      count:
        isfetchFormApprovedsCountByMe_byMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          rejectcount
        ),
      title: "rejected(past 30 Days)",
    },
  ];

  const newformForManagerFalse = [
    { id: 1, count: 0, title: "Pending from your manager" },

    { id: 4, count: 0, title: "Approved(past 30 Days )" },
    { id: 5, count: 0, title: "rejected(past 30 Days)" },
  ];
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const carousalItems = useMemo(() => {
    return newformForManagerTrue
      ? chunkArray(newformForManagerTrue, itemsPerRow)
      : [];
  }, [newformForManagerTrue, itemsPerRow]);

  const carousalItemsForTwo = useMemo(() => {
    return newformForManagerFalse
      ? chunkArray(newformForManagerFalse, itemsPerRow)
      : [];
  }, [newformForManagerFalse, itemsPerRow]);

  useEffect(() => {
    calculateItemsPerRow();
    window.addEventListener("resize", calculateItemsPerRow);

    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
    };
  }, []);

  return (
    <Box sx={{ mt: 10 }}>
      {isloadingnew ? (
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
          Loading....
        </Typography>
      ) : (
        <>
          {formsDetailsnew && formsDetailsnew.fromMobile === false && (
            <>
              {(formsDetailsnew?.approvalFormFlag === false ||
                formsDetailsnew?.approvalFormFlag === "false") && (
                <Typography
                  sx={{
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: 400,
                    ml: 0.7,
                  }}
                >
                  Note: Past 10 Day's Of Forms Data Are Displayed From Current
                  Date
                </Typography>
              )}
              <ReusableCarousalForFromNew
                items={
                  formsDetailsnew.emp.manager === true
                    ? carousalItems
                    : carousalItemsForTwo
                }
              />
              <Stack sx={{ mt: 1.5, px: { sm: 1.5, xs: 1 } }}>
                <Typography
                  sx={{
                    color: "#FFF",

                    fontSize: { sm: 20, xs: 15 },
                    fontWeight: { sm: 600, xs: 600 },
                    position: "absolute",
                    top: { sm: 17, xs: 22 },
                    zIndex: 9999,
                    left: 45,
                  }}
                >
                  {approvalView === 1 &&
                    `${formsDetailsnew?.formSpec?.formTitle.length > 20
                ? `${formsDetailsnew?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetailsnew?.formSpec?.formTitle} (${pedning})`}
                  {approvalView === 2 &&
                    `${formsDetailsnew?.formSpec?.formTitle.length > 20
                ? `${formsDetailsnew?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetailsnew?.formSpec?.formTitle} (${formApprovalByMe})`}
                  {approvalView === 3 &&
                    `${formsDetailsnew?.formSpec?.formTitle.length > 20
                ? `${formsDetailsnew?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetailsnew?.formSpec?.formTitle} (${sizeforawaitingforu})`}
                  {approvalView === 15 &&
                    `${formsDetailsnew?.formSpec?.formTitle.length > 20
                ? `${formsDetailsnew?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetailsnew?.formSpec?.formTitle} (${approvedCount})`}
                  {approvalView === 16 &&
                    `${formsDetailsnew?.formSpec?.formTitle.length > 20
                ? `${formsDetailsnew?.formSpec?.formTitle.slice(0, 20)}...`
                : formsDetailsnew?.formSpec?.formTitle} (${rejectcount})`}
                </Typography>
              </Stack>
            </>
          )}
          <Stack>
            {" "}
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <Stack sx={{ width: "98%" }}>
                <ReusableTextfield
                  placeholder="search by identifier"
                  icon={<SearchIcon />}
                />
              </Stack>
            </Stack>
            <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
              <Stack sx={{ width: "98%" }}>
                <Typography
                  sx={{ fontSize: { xs: 12, sm: 14 }, fontWeight: 500, m: 1 }}
                >
                  {viewType === 2
                    ? formsDetailsnew.byMe === true
                      ? "Pending From Your Manager"
                      : "Awaiting From Team"
                    : viewType === 5
                    ? "Awaiting for you"
                    : viewType === 3
                    ? "approved"
                    : viewType === 4
                    ? "rejected"
                    : "filled today"}
                </Typography>

                {formsDetailsnew &&
                  formsDetailsnew.approvalFormFlag === true && (
                    <>
                      {formsDetailsnew.fromMobile === false &&
                      formsDetailsnew.splitTeamWise !== 1 ? (
                        formsDetailsnew.allApprovalRequsitionForms.length ===
                        0 ? (
                          <>
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
                              No data found
                            </Typography>
                          </>
                        ) : (
                          <Stack sx={{ gap: 1 }}>
                            {formsDetailsnew.allApprovalRequsitionForms.map(
                              (form) => (
                                <Stack sx={{ background: "#FFF", mt: 1 }}>
                                  <Stack
                                    sx={{
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      flexDirection: "row",
                                      px: 1,
                                      py: 2,
                                    }}
                                  >
                                    <Stack
                                      sx={{
                                        flexDirection: "row",
                                        gap: 1,
                                        alignItems: "center",
                                      }}
                                    >
                                      <Typography>
                                        <DescriptionIcon
                                          sx={{ color: "gray" }}
                                        />
                                      </Typography>
                                      <Stack sx={{ cursor: "pointer" }}>
                                        <Typography
                                          sx={{
                                            color:
                                              form.statusMessage === "Approved"
                                                ? "green"
                                                : "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {form.statusMessage}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "12px",
                                            color: "#000",
                                          }}
                                        >
                                          {form.formId}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: "10px",
                                            color: "#2e2e2e",
                                          }}
                                        >
                                          {form.createdTime} |{" "}
                                          {form.filledByName}
                                        </Typography>
                                      </Stack>
                                    </Stack>

                                    <>
                                      {approvalView !== 3 &&
                                        (formsDetailsnew.approvalFormFlag ===
                                          true ||
                                          formsDetailsnew.approvalFormFlag ===
                                            "true") &&
                                        form.isInGroup === 1 &&
                                        form.statusMessage !== "Rejected" && (
                                          <Button
                                            variant="outlined"
                                            sx={{
                                              border: "1px solid #FF7271",
                                              color: "#FF7271",
                                            }}
                                          >
                                            Approve/Reject
                                          </Button>
                                        )}
                                      {approvalView !== 3 &&
                                        (formsDetailsnew.approvalFormFlag ===
                                          true ||
                                          formsDetailsnew.approvalFormFlag ===
                                            "true") &&
                                        form.isInGroup === 1 &&
                                        form.statusMessage === "Rejected" && (
                                          <Button>Resubmit/cancel</Button>
                                        )}
                                    </>
                                    <>
                                      <EditIcon
                                        sx={{
                                          color: "gray",
                                          fontSize: "20px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </>
                                  </Stack>
                                </Stack>
                              )
                            )}
                          </Stack>
                        )
                      ) : (
                        <>
                          {formsDetailsnew.teamWiseWorkFlowFormStatusList
                            .length === 0 ? (
                            <>
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
                                No data found
                              </Typography>
                            </>
                          ) : (
                            <>
                              {formsDetailsnew.teamWiseWorkFlowFormStatusList.map(
                                (each) => (
                                  <Stack sx={{ gap: 1 }}>
                                    {each.pendingFormsCount !== 0 && (
                                      <>
                                        {each.groupEmployees !== 0 ? (
                                          <Stack
                                            sx={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              p: 2,
                                              background: "#FFF",
                                            }}
                                          >
                                            <Typography
                                              sx={{
                                                color: "#333",
                                                fontSize: "10px",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              {each.pendingFrom} -
                                              {each.groupEmployees}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                color: "blue",
                                              }}
                                            >
                                              <Typography>
                                                {each.pendingFormsCount}
                                              </Typography>
                                              <NavigateNextIcon />
                                            </Stack>
                                          </Stack>
                                        ) : (
                                          <Stack
                                            sx={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                            }}
                                          >
                                            <Typography>
                                              {each.pendingFrom}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Typography>
                                                {each.pendingFormsCount}
                                              </Typography>
                                              <NavigateNextIcon />
                                            </Stack>
                                          </Stack>
                                        )}
                                      </>
                                    )}
                                  </Stack>
                                )
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
              </Stack>
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ViewFormNew;
