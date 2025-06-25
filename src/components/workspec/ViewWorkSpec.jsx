import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  fetchCompletedWorks,
  fetchInactiveWorks,
  fetchloadForTeamNeedTodo,
  fetchPendingInvitationsByMe,
  fetchPendingInvitationsByTeam,
  fetchWorkSpecCards,
  Get_loadActionableWorksByMe,
} from "../../redux/slices/HomePageSlice";
import { fetchWorkdatanew } from "../../redux/slices/WorkSpec";
import DottedSpinner from "../common/DottedSpinner";
import ReusableForWork from "../common/ReusableForWork";
import ReusableTextfield from "../common/ReusableTextfield";
const ViewWorkSpec = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const workSpecId = Number(param.get("workSpecId"));
  const viewType = Number(param.get("viewType"));
  const workView = Number(param.get("workView"));

  const { worksDetailsnew, isloadingnew } = useSelector(
    (state) => state.WorkSpecModuleData
  );
  const {
    LoadHomeScreenCards,
    filteredHomePageData,
    loggedInUser,
    yesterdayCount,
    todayCount,
    loadActionableWorksByMe,
    fetchCompletedWorksData,
    isfetchCompletedWorks,
    isloadActionableWorksByMe,
    workSpecCards,
    isworkSpecCards,
    pendingByMe,
    pendingByTeam,
    inactiveWorks,
    isinactiveWorks,
    fetchloadForTeamNeedTodoData,
    isfetchloadForTeamNeedTodoData,
    loadFormApprovalsCountByMe_byMe,
    loadFormApprovalsCountByManager_byManager,
    fetchFormApprovedsCountByMe_byMe,
    isfetchFormApprovedsCountByMe_byMe,
    isfetchFormApprovalsCountByManager,
    isfetchFormApprovalsCountByMe,
    ispendingByTeamm,
    ispedingByMeCount,
  } = useSelector((state) => state.HomePageModule);
  const dispatch = useDispatch();
  useEffect(() => {
    //you
    dispatch(Get_loadActionableWorksByMe());
    //team
    dispatch(fetchWorkSpecCards());
    //invitation need to you
    dispatch(fetchPendingInvitationsByMe());
    // invitation team
    dispatch(fetchPendingInvitationsByTeam());
    // no prgoress
    dispatch(fetchInactiveWorks());
    //completed
    dispatch(fetchCompletedWorks());
  }, [dispatch]);
  useEffect(() => {
    if (workView === 2) {
      dispatch(
        fetchloadForTeamNeedTodo({
          workSpecId,
          viewType,
          workView,
        })
      );
    } else {
      dispatch(
        fetchWorkdatanew({
          workSpecId,
          viewType,
          workView,
        })
      );
    }
  }, [dispatch, workSpecId, viewType, workView]);

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
  // you need to do
  const matchingGroup = loadActionableWorksByMe?.find(
    (group) => group.workSpecId === workSpecId
  );

  // team need to do
  const teamNeedToDO =
    workSpecCards &&
    workSpecCards?.find((group) => group.workSpecId === workSpecId);
  // invitaions to me
  const pendingByMeeee =
    pendingByMe &&
    pendingByMe?.find((group) => group.workSpecId === workSpecId);
  // to team
  const pendingByTeammm =
    pendingByTeam &&
    pendingByTeam?.find((group) => group.workSpecId === workSpecId);
  // no progress

  const inactiveWorkss =
    inactiveWorks &&
    inactiveWorks?.find((group) => group.workSpecId === workSpecId);
  // completed
  const completedWorks =
    fetchCompletedWorksData &&
    fetchCompletedWorksData?.find((group) => group.workSpecId === workSpecId);

  const youNeedTodo = matchingGroup?.count;
  const teamNeedToDOcount = teamNeedToDO?.count;
  const pedingByMeCount = pendingByMeeee?.count;
  const pendingByTeamm = pendingByTeammm?.count;
  const inactiveWorkscount = inactiveWorkss?.count;
  const completedWorkCount = completedWorks?.count;

  //const approvedCount = approved?.approvedCount ?? 0;

  const newformForManagerTrue = [
    {
      id: 1,
      count:
        isloadActionableWorksByMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          youNeedTodo
        ),
      title: "You need todo",
    },
    {
      id: 2,
      count:
        isworkSpecCards === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          teamNeedToDOcount
        ),
      title: "Team need todo",
    },
    {
      id: 3,
      count:
        isinactiveWorks === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          inactiveWorkscount
        ),
      title: "No progress",
    },
    {
      id: 15,
      count:
        ispedingByMeCount === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          pedingByMeCount
        ),
      title: "Invitations need your action",
    },
    {
      id: 16,
      count:
        ispendingByTeamm === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          pendingByTeamm
        ),
      title: "Invitations for team action",
    },
    {
      id: 17,
      count:
        isfetchCompletedWorks === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          completedWorkCount
        ),
      title: " completed",
    },
  ];

  const newformForManagerFalse = [
    {
      id: 1,
      count:
        isloadActionableWorksByMe === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          youNeedTodo
        ),
      title: "You need todo",
    },

    {
      id: 3,
      count:
        isinactiveWorks === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          inactiveWorkscount
        ),
      title: "No progress",
    },
    {
      id: 15,
      count:
        ispedingByMeCount === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          pedingByMeCount
        ),
      title: "Invitations need your action",
    },
    {
      id: 16,
      count:
        ispendingByTeamm === true ? (
          <DottedSpinner size={16} color="#1976d2" thickness={4} />
        ) : (
          pendingByTeamm
        ),
      title: "Invitations for team action",
    },
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

  useEffect(() => {
    if (fetchloadForTeamNeedTodoData) {
      console.log(fetchloadForTeamNeedTodoData);
    }
  }, [fetchloadForTeamNeedTodoData]);

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
          {((worksDetailsnew && worksDetailsnew.fromMobile === false) ||
            fetchloadForTeamNeedTodoData.workView === 2) && (
            <>
              <ReusableForWork
                items={
                  worksDetailsnew?.webUserEmp?.manager === true ||
                  fetchloadForTeamNeedTodoData.workView === 2
                    ? carousalItems
                    : carousalItemsForTwo
                }
              />
              <Stack sx={{ mt: 1.5, px: { sm: 1.5, xs: 1 } }}>
                <Typography
                  sx={{
                    color: "#FFF",

                    fontSize: { sm: 20, xs: 15 },
                    fontWeight: { sm: 500, xs: 400 },
                    position: "absolute",
                    top: { sm: 17, xs: 20 },
                    zIndex: 9999,
                    left: 55,
                  }}
                >
                  {workView === 2 ? (
                    <>
                      {fetchloadForTeamNeedTodoData?.workSpec?.workSpecTitle
                        .length > 20
                        ? `${fetchloadForTeamNeedTodoData?.workSpec?.workSpecTitle.slice(
                            0,
                            20
                          )}...`
                        : fetchloadForTeamNeedTodoData?.workSpec
                            ?.workSpecTitle}{" "}
                      ({teamNeedToDOcount})
                    </>
                  ) : (
                    <>
                      {worksDetailsnew?.workSpec?.workSpecTitle} (
                      {worksDetailsnew?.actionableWorksCount})
                    </>
                  )}
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
                {(() => {
                  const getLabelText = (viewType) => {
                    switch (viewType) {
                      case 8:
                        return "You need todo";
                      case 9:
                        return "Team need todo";
                      case 10:
                        return "Invitations need your action";
                      case 11:
                        return "Invitations for team action";
                      case 12:
                        return "No progress for past 10 days";
                      default:
                        return null;
                    }
                  };

                  const label = getLabelText(viewType);

                  return label ? (
                    <Typography
                      sx={{
                        fontSize: { xs: 12, sm: 14 },
                        fontWeight: 500,
                        m: 1,
                      }}
                    >
                      {label}
                    </Typography>
                  ) : null;
                })()}

                {worksDetailsnew &&
                worksDetailsnew.groupByFieldUniqueId !== null ? (
                  <>
                    {worksDetailsnew.worksByGroupByFieldMap !== null ? (
                      <></>
                    ) : (
                      <>no data found</>
                    )}
                  </>
                ) : (
                  <>
                    {worksDetailsnew?.works.length === 0 ? (
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
                        No data available
                      </Typography>
                    ) : (
                      <>
                        {worksDetailsnew.works.map((work) => (
                          <>
                            {worksDetailsnew.fromMobile === false ? (
                              <>
                                <>
                                  <Stack
                                    sx={{
                                      flexDirection: "row",
                                      width: "100%",
                                      background: "#fff",
                                      "&: hover": {
                                        background: "#ddd",
                                      },
                                      px: 1.5,
                                      py: 5,
                                      border: "1px solid #EBEBEB",

                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Stack
                                      sx={{
                                        " & > * ": {
                                          flexDirection: "row",
                                        },

                                        "& > * >:nth-child(2)": {
                                          color: "#000",
                                          fontWeight: 500,
                                          fontSize: {
                                            sm: "12px",
                                            xs: "10px",
                                          },
                                        },
                                        "& > * >:nth-child(1)": {
                                          color: "#4B4B4B",
                                          fontSize: {
                                            sm: "12px",
                                            xs: "10px",
                                          },
                                        },
                                        "& > :nth-child(1)": {
                                          color: "#000",
                                          fontWeight: "bold",
                                          fontSize: {
                                            sm: "12px",
                                            xs: "10px",
                                          },
                                        },
                                      }}
                                    >
                                      <>
                                        {/* Work ID */}
                                        <Typography
                                          className="search_text"
                                          variant="h6"
                                        >
                                          Id: {work.workId}
                                        </Typography>

                                        {/* Work Name */}
                                        {work.workName && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>
                                              {worksDetailsnew.workNameLabel}:
                                            </Typography>
                                            <Typography>
                                              {work.workName}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* Description */}
                                        {work.description && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>
                                              {
                                                worksDetailsnew.workDesciptionLabel
                                              }
                                              :
                                            </Typography>
                                            <Typography>
                                              {work.description}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* External ID */}
                                        {work.externalId && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>ExternalId:</Typography>
                                            <Typography>
                                              {work.externalId}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* Assigned To */}
                                        {work.assignToName && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>AssignTo:</Typography>
                                            <Typography>
                                              {work.assignToName}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* Start Time */}
                                        {work.startTime && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>
                                              {worksDetailsnew.workStartLabel}:
                                            </Typography>
                                            <Typography>
                                              {work.startTime.substring(0, 19)}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* End Time */}
                                        {work.endTime && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>
                                              {worksDetailsnew.workEndLabel}:
                                            </Typography>
                                            <Typography>
                                              {work.endTime.substring(0, 19)}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* Next Activity */}
                                        {work.actionName && (
                                          <Stack
                                            direction="row"
                                            spacing={1}
                                            className="mb-6 search_text"
                                          >
                                            <Typography>
                                              NextActivity:
                                            </Typography>
                                            <Typography>
                                              {work.actionName}
                                            </Typography>
                                          </Stack>
                                        )}

                                        {/* Last Activity */}
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>LastActivity:</Typography>
                                          <Typography>
                                            {work.previousAction
                                              ? work.previousAction
                                              : "Yet To Start"}
                                          </Typography>
                                        </Stack>
                                      </>
                                    </Stack>
                                    <Stack direction="row" spacing={1}>
                                      {(() => {
                                        switch (work.status) {
                                          case 1:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-total-pending text-total-pending"
                                              >
                                                PENDING
                                              </Button>
                                            );

                                          case 2:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-unassigned text-unassigned"
                                              >
                                                UNASSIGNED
                                              </Button>
                                            );

                                          case 3:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-pending text-pending"
                                              >
                                                YET TO START
                                              </Button>
                                            );

                                          case 4:
                                            return (
                                              <Button
                                                variant="outlined"
                                                startIcon={
                                                  <DirectionsRunIcon />
                                                }
                                                sx={{
                                                  borderColor:
                                                    "#FF8C00!important",
                                                  color: "#FF8C00!important",
                                                  background:
                                                    "transparent!important",
                                                }}
                                              >
                                                IN PROGRESS
                                              </Button>
                                            );

                                          case 5:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-overdue text-overdue"
                                              >
                                                OVERDUE
                                              </Button>
                                            );

                                          case 6:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-reject text-reject"
                                              >
                                                REJECTED
                                              </Button>
                                            );

                                          case 7:
                                            return (
                                              <Button
                                                variant="outlined"
                                                className="bg-completed text-completed"
                                                sx={{
                                                  color: "#34A76F!important",
                                                  borderColor:
                                                    "#34A76F!important",
                                                  background: "#FFF",
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              >
                                                COMPLETED
                                              </Button>
                                            );

                                          case 8:
                                            return (
                                              <Button
                                                variant="outlined"
                                                startIcon={
                                                  <DirectionsRunIcon />
                                                }
                                                sx={{
                                                  background:
                                                    "transparent!important",
                                                  border:
                                                    "1px solid #ff2424!important",
                                                  color: "#ff2424!important",
                                                }}
                                              >
                                                IN PROGRESS
                                              </Button>
                                            );

                                          case 11:
                                            return (
                                              <Button
                                                variant="contained"
                                                className="bg-rejected text-invitation"
                                              >
                                                Invitation
                                              </Button>
                                            );

                                          default:
                                            return null;
                                        }
                                      })()}
                                    </Stack>
                                  </Stack>
                                </>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Stack
                                  sx={{
                                    flexDirection: "row",
                                    width: "100%",
                                    background: "#fff",
                                    "&: hover": {
                                      background: "#ddd",
                                    },
                                    px: 1.5,
                                    py: 5,
                                    border: "1px solid #EBEBEB",

                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Stack
                                    sx={{
                                      " & > * ": {
                                        flexDirection: "row",
                                      },

                                      "& > * >:nth-child(2)": {
                                        color: "#000",
                                        fontWeight: 500,
                                        fontSize: {
                                          sm: "12px",
                                          xs: "10px",
                                        },
                                      },
                                      "& > * >:nth-child(1)": {
                                        color: "#4B4B4B",
                                        fontSize: {
                                          sm: "12px",
                                          xs: "10px",
                                        },
                                      },
                                      "& > :nth-child(1)": {
                                        color: "#000",
                                        fontWeight: "bold",
                                        fontSize: {
                                          sm: "12px",
                                          xs: "10px",
                                        },
                                      },
                                    }}
                                  >
                                    <>
                                      {/* Work ID */}
                                      <Typography
                                        className="search_text"
                                        variant="h6"
                                      >
                                        Id: {work.workId}
                                      </Typography>

                                      {/* Work Name */}
                                      {work.workName && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>
                                            {worksDetailsnew.workNameLabel}:
                                          </Typography>
                                          <Typography>
                                            {work.workName}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* Description */}
                                      {work.description && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>
                                            {
                                              worksDetailsnew.workDesciptionLabel
                                            }
                                            :
                                          </Typography>
                                          <Typography>
                                            {work.description}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* External ID */}
                                      {work.externalId && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>ExternalId:</Typography>
                                          <Typography>
                                            {work.externalId}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* Assigned To */}
                                      {work.assignToName && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>AssignTo:</Typography>
                                          <Typography>
                                            {work.assignToName}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* Start Time */}
                                      {work.startTime && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>
                                            {worksDetailsnew.workStartLabel}:
                                          </Typography>
                                          <Typography>
                                            {work.startTime.substring(0, 19)}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* End Time */}
                                      {work.endTime && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>
                                            {worksDetailsnew.workEndLabel}:
                                          </Typography>
                                          <Typography>
                                            {work.endTime.substring(0, 19)}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* Next Activity */}
                                      {work.actionName && (
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          className="mb-6 search_text"
                                        >
                                          <Typography>NextActivity:</Typography>
                                          <Typography>
                                            {work.actionName}
                                          </Typography>
                                        </Stack>
                                      )}

                                      {/* Last Activity */}
                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        className="mb-6 search_text"
                                      >
                                        <Typography>LastActivity:</Typography>
                                        <Typography>
                                          {work.previousAction
                                            ? work.previousAction
                                            : "Yet To Start"}
                                        </Typography>
                                      </Stack>
                                    </>
                                  </Stack>

                                  <Stack direction="row" spacing={1}>
                                    {(() => {
                                      switch (work.status) {
                                        case 1:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-total-pending text-total-pending"
                                            >
                                              PENDING
                                            </Button>
                                          );

                                        case 2:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-unassigned text-unassigned"
                                            >
                                              UNASSIGNED
                                            </Button>
                                          );

                                        case 3:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-pending text-pending"
                                            >
                                              YET TO START
                                            </Button>
                                          );

                                        case 4:
                                          return (
                                            <Button
                                              variant="outlined"
                                              startIcon={<DirectionsRunIcon />}
                                              sx={{
                                                borderColor:
                                                  "#FF8C00!important",
                                                color: "#FF8C00!important",
                                                background:
                                                  "transparent!important",
                                              }}
                                            >
                                              IN PROGRESS
                                            </Button>
                                          );

                                        case 5:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-overdue text-overdue"
                                            >
                                              OVERDUE
                                            </Button>
                                          );

                                        case 6:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-reject text-reject"
                                            >
                                              REJECTED
                                            </Button>
                                          );

                                        case 7:
                                          return (
                                            <Button
                                              variant="outlined"
                                              className="bg-completed text-completed"
                                              sx={{
                                                color: "#34A76F!important",
                                                borderColor:
                                                  "#34A76F!important",
                                                background: "#FFF",
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              COMPLETED
                                            </Button>
                                          );

                                        case 8:
                                          return (
                                            <Button
                                              variant="outlined"
                                              startIcon={<DirectionsRunIcon />}
                                              sx={{
                                                background:
                                                  "transparent!important",
                                                border:
                                                  "1px solid #ff2424!important",
                                                color: "#ff2424!important",
                                              }}
                                            >
                                              IN PROGRESS
                                            </Button>
                                          );

                                        case 11:
                                          return (
                                            <Button
                                              variant="contained"
                                              className="bg-rejected text-invitation"
                                            >
                                              Invitation
                                            </Button>
                                          );

                                        default:
                                          return null;
                                      }
                                    })()}
                                  </Stack>
                                </Stack>
                              </>
                            )}
                          </>
                        ))}
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

export default ViewWorkSpec;
