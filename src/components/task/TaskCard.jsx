import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import WorkActionFormIcon from "../../assets/svg_new/actionWorkProcess.svg";
import BlueCustomersIcon from "../../assets/svg_new/customers.svg";
import dayPlan from "../../assets/svg_new/day-planner.svg";
import fromRequition from "../../assets/svg_new/form_requistion.svg";
import KnowledgeBaseIcon from "../../assets/svg_new/KB.svg";
import FormsIcon from "../../assets/svg_new/leaves.svg";
import webliteFormSvg from "../../assets/svg_new/weblite_Form.svg";
import {
  loadMetPast30DaysPercentage_get,
  loadNotMetPast30Days_get,
  loadNotMetPast30DaysByTeam_get,
  loadTodaysCustomerVisitsByTeam_get,
  loadtotalsCustomersCountUnderEmployees_get,
  loadYesterdayCustomerVisitsByTeam_get,
  setTitleForCustomerView,
  todaysCustomerVisits_get,
  totalCustomersSize_get,
} from "../../redux/slices/CustomerModule";
import {
  fetchActualCustomerVisitsCount,
  fetchPlannedCustomersCount,
  fetchTeamPlannedCustomersCount,
  fetchTeamUnplannedCustomerVisitsCount,
  fetchUnplannedCustomerVisitsCount,
} from "../../redux/slices/DayPalneModule";
import {
  fetchFormApprovalsCountByManager,
  fetchFormApprovalsCountByMe,
  fetchInactiveWorks,
  fetchPendingInvitationsByMe,
  fetchPendingInvitationsByTeam,
  fetchTodayCount,
  fetchWorkSpecCards,
  fetchYesterdayCount,
  filterByModule,
  Get_loadActionableWorksByMe,
  loadHomeScreenCards_get,
  loggedInUser_get,
  resetFilteredData,
} from "../../redux/slices/HomePageSlice";
import { loadKNowledgeBasedCount_get } from "../../redux/slices/KnowledgeBaseModule";
import {
  fetchApprovedLeaves,
  fetchPendingApprovals,
  fetchRejectedLeaves,
  fetchTotalMyLeaves,
  fetchTotalTeamLeaves,
} from "../../redux/slices/LeavesModule";
import DottedSpinner from "../common/DottedSpinner";

const TaskCard = ({ searchInput }) => {
  const {
    pendingApprovals,
    totalMyLeaves,
    totalTeamLeaves,
    approvedLeaves,
    rejectedLeaves,
  } = useSelector((state) => state.LeavesModule);
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const {
    teamUnplannedCount,
    teamPlannedCount,
    plannedCount,
    actualCount,
    unplannedCount,
  } = useSelector((state) => state.DayPlannerModule);
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
    isLoadHomeScreenCards,
  } = useSelector((state) => state.HomePageModule);
  const { KnowledgeBaseCount, isKnoKnowledgeBaseCount } = useSelector(
    (state) => state.KnowledgeBaseReducerModule
  );
  const filteredLoadHomeScreenCards = [...(filteredHomePageData || [])].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(loadHomeScreenCards_get());

    dispatch(totalCustomersSize_get());
    dispatch(todaysCustomerVisits_get());
    dispatch(loadNotMetPast30Days_get());
    dispatch(loadMetPast30DaysPercentage_get());
    dispatch(loadYesterdayCustomerVisitsByTeam_get());
    dispatch(loadTodaysCustomerVisitsByTeam_get());
    dispatch(loadtotalsCustomersCountUnderEmployees_get());
    dispatch(loadNotMetPast30DaysByTeam_get());
    dispatch(loadKNowledgeBasedCount_get());
    dispatch(Get_loadActionableWorksByMe());
    dispatch(fetchInactiveWorks());
    dispatch(fetchPendingInvitationsByTeam());
    dispatch(fetchPendingInvitationsByMe());
    dispatch(fetchWorkSpecCards());
    dispatch(fetchFormApprovalsCountByManager());
    dispatch(fetchFormApprovalsCountByMe());
    //leaves
    dispatch(fetchPendingApprovals());
    dispatch(fetchTotalMyLeaves());
    dispatch(fetchTotalTeamLeaves());
    dispatch(fetchApprovedLeaves());
    dispatch(fetchRejectedLeaves());

    dispatch(
      fetchTeamUnplannedCustomerVisitsCount({
        allCustomers: false,
        normal: false,
        forced: false,
      })
    );

    dispatch(
      fetchTeamPlannedCustomersCount({
        allCustomers: false,
      })
    );

    dispatch(fetchPlannedCustomersCount({ allCustomers: false }));
    dispatch(
      fetchActualCustomerVisitsCount({
        allCustomers: false,
        normal: false,
        forced: false,
      })
    );
    dispatch(
      fetchUnplannedCustomerVisitsCount({
        allCustomers: false,
        normal: false,
        forced: false,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (!LoadHomeScreenCards?.length) return; // Wait until it's loaded

    if (searchInput?.trim()) {
      dispatch(filterByModule(searchInput));
    } else {
      dispatch(resetFilteredData());
    }
  }, [searchInput, LoadHomeScreenCards, dispatch]);

  useEffect(() => {
    dispatch(loggedInUser_get());
  }, [dispatch]);

  const navigateToShowAlldModule = (
    moduleId,
    formType,
    formSpecPermission,
    formSpecViewPermission,
    formAddPermission,
    formSpecId,
    customEntitySpecId
  ) => {
    const hasPermission = (value) => value === "true" || value === true;
    const hasEmployeeAddFormAccess =
      loggedInUser?.employeeAccessSettings?.addForm === "true" ||
      loggedInUser?.employeeAccessSettings?.addForm === true;

    if (moduleId === 37) {
      if (formType === 1) {
        if (hasPermission(formSpecPermission)) {
          if (hasPermission(formSpecViewPermission)) {
            if (hasPermission(formAddPermission)) {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
              );
            } else {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
              );
            }
          }
        } else if (hasEmployeeAddFormAccess) {
          navigate(
            `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=5&approvalView=2`
          );
        } else {
          navigate(
            `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
          );
        }
      } else if (formType === 2) {
        if (hasPermission(formSpecPermission)) {
          if (hasPermission(formSpecViewPermission)) {
            if (hasPermission(formAddPermission)) {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
              );
            } else {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
              );
            }
          }
        } else if (hasEmployeeAddFormAccess) {
          navigate(
            `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=3&approvalView=15`
          );
        } else {
          navigate(
            `/view/forms?empId=${loggedInUser?.empId}&viewType=5&formSpecId=${formSpecId}`
          );
        }
      } else {
        if (hasPermission(formSpecPermission)) {
          if (hasPermission(formSpecViewPermission)) {
            if (hasPermission(formAddPermission)) {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=2&formSpecId=${formSpecId}`
              );
            } else {
              navigate(
                `/view/forms?empId=${loggedInUser?.empId}&viewType=2&formSpecId=${formSpecId}`
              );
            }
          }
        } else if (hasEmployeeAddFormAccess) {
          navigate(
            `/view/forms?empId=${loggedInUser?.empId}&viewType=2&formSpecId=${formSpecId}`
          );
        } else {
          navigate(
            `/view/forms?empId=${loggedInUser?.empId}&viewType=2&formSpecId=${formSpecId}`
          );
        }
      }
    }
    // Then navigate based on moduleId
    switch (moduleId) {
      case 12:
        navigate("/knowledgebase/manage");
        break;
      case 9:
        navigate("/view/all/customers?viewType=9");
        break;
      case 15:
        navigate(
          "/view/leaves/new?leaveMenuType=2&viewType=2&teamLeaves=1&leaveViewType=2"
        );
        break;
      case 36:
        navigate(
          `/view/workSpec/actions/new?workSpecId=${customEntitySpecId}&viewType=8&workView=1`
        );

        break;
      case 34:
        navigate(
          "/workSpec/actions/new?workSpecId=14291&viewType=8&workView=1"
        );
        break;
      case 17:
        navigate("/dayplanner/customers");
        break;
      default:
        break;
    }
  };

  const handleNavigationForDatKnoweledgeBaseView = (id) => {
    switch (id) {
      case 1:
        navigate(`/knowledgebase/manage/new/?viewType=${id}`);
        break;
      case 2:
        navigate(`/knowledgebase/manage/new/?viewType=${id}`);
        break;
      case 3:
        navigate(`/knowledgebase/manage/new/?viewType=${id}`);
        break;
      default:
    }
  };
  const handlenavigationToCustomerModules = (id, title) => {
    dispatch(setTitleForCustomerView(title));

    switch (id) {
      case 1:
        navigate("/view/all/customers/typed?viewType=1&customerView=1");

        break;
      case 2:
        navigate("/view/all/customers/typed?viewType=8&customerView=1");
        break;
      case 3:
        navigate("/view/all/customers/typed?viewType=14&customerView=1");
        break;
      case 4:
        navigate("/view/all/customers/typed?viewType=3&customerView=1");
        break;
      case 5:
        navigate("/view/all/customers/typed?viewType=7&customerView=1");
        break;
      case 6:
        navigate("/view/all/customers/typed?viewType=10&customerView=1");
        break;
      case 7:
        navigate("/view/all/customers/typed?viewType=11&customerView=1");
        break;
      case 8:
        navigate("/view/all/customers/typed?viewType=12&customerView=1");
        break;
    }
  };

  const handleNavToAdd = (id) => {
    let workSpecId;
    switch (id) {
      case 15:
        navigate("/leave/my/create");
        break;
      case 36:
        workSpecId = 246481; // dynamic if needed
        window.location.href = `http://localhost:8080/effort/employeeService/add/form/${workSpecId}`;
      case 37:
        workSpecId = 246481; // dynamic if needed
        window.location.href = `http://localhost:8080/effort/employeeService/add/form/${workSpecId}`;

        break;
      case 2:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 3:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 4:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 5:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 6:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 7:
        navigate(`/customers/viewtype/${id}`);
        break;
      case 8:
        navigate(`/customers/viewtype/${id}`);
        break;
      default:
        console.log("no data");
    }
  };
  const navToLeaveModule = (view) => {
    if (view === 1) {
      navigate(`/view/leaves/new?leaveMenuType=1&viewType=1&leaveViewType=1`);
    } else if (view === 2) {
      navigate(
        `/view/leaves/new?leaveMenuType=2&viewType=2&teamLeaves=1&leaveViewType=2`
      );
    } else if (view === 3) {
      navigate(
        `/view/leaves/new?leaveMenuType=2&viewType=3&teamLeaves=2&leaveViewType=3`
      );
    } else if (view === 4) {
      navigate(`/view/leaves/new?leaveMenuType=1&viewType=1&leaveViewType=1`);
    } else if (view === 5) {
      navigate(`/view/leaves/new?leaveMenuType=5&viewType=3&leaveViewType=5`);
    } else {
      navigate(`/view/leaves/new?leaveMenuType=6&viewType=4&leaveViewType=6`);
    }
  };

  const handleDyaPlan = (label, title) => {
    if (!label) return;
    dispatch(setTitleForCustomerView(title));

    switch (label) {
      case 4:
        navigate(
          `/view/all/customers/typed?viewType=4&customerViewType=1&customerView=2`
        );
        break;
      case 5:
        navigate(
          `/view/all/customers/typed?viewType=5&customerViewType=2&customerView=2`
        );
        break;
      case 6:
        navigate(
          `/view/all/customers/typed?viewType=6&customerViewType=3&customerView=2`
        );
        break;
      case 7:
        navigate(`/view/all/customers/typed?viewType=7&customerView=2`);
        break;
      case 8:
        navigate(`/view/all/customers/typed?viewType=8&customerView=2`);
        break;
      default:
        break;
    }
  };
  const handleNavigationToFilledYestarday = (formSpecId) => {
    navigate(
      `/view/forms?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=102`
    );
  };
  const handleNavigationToFilledToday = (formSpecId) => {
    navigate(
      `/view/forms?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=101`
    );
  };
  useEffect(() => {
    if (loggedInUser?.empId) {
      dispatch(fetchYesterdayCount(loggedInUser?.empId));
      dispatch(fetchTodayCount(loggedInUser?.empId));
    }
  }, [loggedInUser?.empId, dispatch]);
  const handleNavigationToManagerApproval = (formSpecId) => {};
  const handleNavigateToAwaitingYourApproval = (formSpecId) => {
    navigate(
      `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=5&approvalView=2`
    );
  };
  const handleNavigateToAwaitingTeamApproval = (formSpecId) => {
    navigate(
      `/view/forms/new?formSpecId=${formSpecId}&empId=${loggedInUser?.empId}&viewType=2&approvalView=3&splitTeamWise=1&statusMessage=`
    );
  };

  const youneedToDoNavigation = (workSpecId) => {
    navigate(
      `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=8&workView=1
`
    );
  };

  const teamNeedToDO = (workSpecId) => {
    navigate(
      `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=9&workView=2`
    );
  };

  const needuraction = (workSpecId) => {
    navigate(
      `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=10&workView=4`
    );
  };

  const teamaction = (workSpecId) => {
    navigate(
      `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=11&workView=5`
    );
  };

  const noprogress = (workSpecId) => {
    navigate(
      `/view/workSpec/actions/new?workSpecId=${workSpecId}&viewType=12&workView=3`
    );
  };
  return (
    <Box sx={{}}>
      <Stack gap={1} sx={{ pt: 1 }}>
        {loggedInUser && isLoadHomeScreenCards ? (
          <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
            {/* <Box component={"img"} src={bgloader} /> */}

            <DottedSpinner size={40} color="#1976d2" />
          </Stack>
        ) : filteredLoadHomeScreenCards &&
          filteredLoadHomeScreenCards.length > 0 ? (
          filteredLoadHomeScreenCards?.map((data, index) => (
            <>
              {data.visible && (
                <>
                  {[37, 36, 17, 15, 12, 9].includes(data.moduleId) && (
                    <Stack
                      key={index}
                      sx={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Stack
                        sx={{
                          width: { sm: "80%", xs: "97%" },
                          bgcolor: "#FFF",
                          borderRadius: "8px",
                          border: "1px solid rgba(109, 236, 24, 0.12)",
                        }}
                      >
                        <Stack sx={{ px: 1, py: 1 }}>
                          <Stack
                            sx={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Stack
                              sx={{
                                flexDirection: "row",
                                gap: 1,
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {[12, 15, 17, 9, 36, 37].includes(
                                data.moduleId
                              ) && (
                                <React.Fragment>
                                  {data.moduleId === 37 ? (
                                    data.formType === 1 ? (
                                      <Box
                                        component="img"
                                        src={FormsIcon}
                                        alt="Forms Icon"
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                        }}
                                      />
                                    ) : data.formType === 2 ? (
                                      <Box
                                        component="img"
                                        src={fromRequition} // ✅ corrected "src"
                                        sx={{
                                          width: 24,
                                          height: 24,
                                        }}
                                      />
                                    ) : (
                                      <Box
                                        component={"img"}
                                        src={webliteFormSvg}
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                        }}
                                      />
                                    )
                                  ) : data.moduleId === 9 ? (
                                    <Box
                                      component="img"
                                      src={BlueCustomersIcon}
                                      alt="Customers Icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : data.moduleId === 12 ? (
                                    <Box
                                      component="img"
                                      src={KnowledgeBaseIcon}
                                      alt="Knowledge Base Icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : data.moduleId === 36 ? (
                                    <Box
                                      component="img"
                                      src={WorkActionFormIcon}
                                      alt="Work Action Icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : data.moduleId === 15 ? (
                                    <Box
                                      component="img"
                                      src={FormsIcon}
                                      alt="Leaves Icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : data.moduleId === 17 ? (
                                    <Box
                                      component="img"
                                      src={dayPlan}
                                      alt="Day Plan Icon"
                                      style={{ width: "24px", height: "24px" }}
                                    />
                                  ) : (
                                    <HelpOutlineIcon />
                                  )}

                                  <Typography
                                    sx={{
                                      fontWeight: { sm: 500, xs: 500 },
                                      fontSize: { sm: "12px", xs: "10px" },
                                    }}
                                  >
                                    {data.moduleName.length > 20
                                      ? `${data.moduleName.slice(0, 20)}...`
                                      : data.moduleName}
                                  </Typography>
                                </React.Fragment>
                              )}
                            </Stack>

                            <Stack
                              sx={{
                                flexDirection: "row",
                                gap: { sm: 1, xs: 0.5 },
                                fontSize: "13px",
                              }}
                            >
                              <Button
                                size="small"
                                variant="contained"
                                sx={{ fontSize: { xs: "9px", sm: "12px" } }}
                                onClick={() =>
                                  navigateToShowAlldModule(
                                    data.moduleId,
                                    data.formType,
                                    data.formSpecPermission,
                                    data.formSpecViewPermission,
                                    data.formAddPermission,
                                    data.formSpecId,
                                    data.customEntitySpecId
                                  )
                                }
                              >
                                Show all
                              </Button>

                              {data.moduleId === 36 &&
                                loggedInUser?.employeeAccessSettings?.addJob ===
                                  true && (
                                  <Button
                                    sx={{ fontSize: { xs: "9px", sm: "12px" } }}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                      handleNavToAdd(data.moduleId)
                                    }
                                  >
                                    add
                                  </Button>
                                )}
                              {data.moduleId === 15 &&
                                loggedInUser?.employeeAccessSettings
                                  ?.addLeave === true && (
                                  <Button
                                    sx={{ fontSize: { xs: "9px", sm: "12px" } }}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() =>
                                      handleNavToAdd(data.moduleId)
                                    }
                                  >
                                    add
                                  </Button>
                                )}
                              {data.moduleId === 37 && (
                                <>
                                  {data.formType === 1 ? (
                                    data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                      data.formSpecViewPermission === "true" ||
                                      data.formSpecViewPermission === true ? (
                                        data.formAddPermission === "true" ||
                                        data.formAddPermission === true ? (
                                          <Button
                                            sx={{
                                              fontSize: {
                                                xs: "9px",
                                                sm: "12px",
                                              },
                                            }}
                                            size="small"
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            onClick={() =>
                                              handleNavToAdd(data.moduleId)
                                            }
                                          >
                                            add
                                          </Button>
                                        ) : null
                                      ) : null
                                    ) : loggedInUser?.employeeAccessSettings
                                        ?.addForm === "true" ||
                                      loggedInUser?.employeeAccessSettings
                                        ?.addForm === true ? (
                                      <Button
                                        sx={{
                                          fontSize: { xs: "9px", sm: "12px" },
                                        }}
                                        size="small"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() =>
                                          handleNavToAdd(data.moduleId)
                                        }
                                      >
                                        add
                                      </Button>
                                    ) : null
                                  ) : data.formType === 2 ? (
                                    data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                      data.formSpecViewPermission === "true" ||
                                      data.formSpecViewPermission === true ? (
                                        data.formAddPermission === "true" ||
                                        data.formAddPermission === true ? (
                                          <Button
                                            sx={{
                                              fontSize: {
                                                xs: "9px",
                                                sm: "12px",
                                              },
                                            }}
                                            size="small"
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            onClick={() =>
                                              handleNavToAdd(data.moduleId)
                                            }
                                          >
                                            add
                                          </Button>
                                        ) : null
                                      ) : null
                                    ) : loggedInUser?.employeeAccessSettings
                                        ?.addForm === "true" ||
                                      loggedInUser?.employeeAccessSettings
                                        ?.addForm === true ? (
                                      <Button
                                        sx={{
                                          fontSize: { xs: "9px", sm: "12px" },
                                        }}
                                        size="small"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() =>
                                          handleNavToAdd(data.moduleId)
                                        }
                                      >
                                        add
                                      </Button>
                                    ) : null
                                  ) : data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                    data.formSpecViewPermission === "true" ||
                                    data.formSpecViewPermission === true ? (
                                      data.formAddPermission === "true" ||
                                      data.formAddPermission === true ? (
                                        <li className="search_card">
                                          Add Card - Other Form Type
                                        </li>
                                      ) : (
                                        <li className="search_card">
                                          Add Card - Other (No Add Permission)
                                        </li>
                                      )
                                    ) : null
                                  ) : loggedInUser?.employeeAccessSettings
                                      ?.addForm === "true" ||
                                    loggedInUser?.employeeAccessSettings
                                      ?.addForm === true ? (
                                    <Button
                                      sx={{
                                        fontSize: { xs: "9px", sm: "12px" },
                                      }}
                                      size="small"
                                      variant="outlined"
                                      startIcon={<AddIcon />}
                                      onClick={() =>
                                        handleNavToAdd(data.moduleId)
                                      }
                                    >
                                      add
                                    </Button>
                                  ) : null}{" "}
                                </>
                              )}
                            </Stack>
                          </Stack>
                          <Divider sx={{ width: "100%", height: "10px" }} />
                          {[9, 12, 15, 17, 37, 36].includes(data.moduleId) && (
                            <>
                              {data.moduleId === 9 && (
                                <Stack>
                                  <Stack
                                    direction="row"
                                    sx={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      mt: 1,
                                    }}
                                  >
                                    {CustomerModuleMenu.slice(0, 3).map(
                                      (label, index) => {
                                        return (
                                          <React.Fragment key={index}>
                                            <Stack
                                              sx={{
                                                flexGrow: { sm: 1, xs: 12 },
                                                width: "100px",
                                                textAlign: "center",

                                                py: 1.3,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                  boxShadow:
                                                    "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                  transform: "scale(1.01)",
                                                },
                                              }}
                                              onClick={() =>
                                                handlenavigationToCustomerModules(
                                                  label.id,
                                                  label.title
                                                  // displayCount
                                                )
                                              }
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    label.count > 0
                                                      ? "green"
                                                      : "red",

                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              >
                                                {label.count}
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              >
                                                {label.title}
                                              </Typography>
                                            </Stack>
                                            {index !== 2 && (
                                              <Divider
                                                orientation="vertical"
                                                variant="middle"
                                                flexItem
                                                sx={{
                                                  alignSelf: "center",
                                                  height: {
                                                    sm: "55px",
                                                    xs: "40px",
                                                  },
                                                  borderColor: "#e0e0e0",
                                                }}
                                              />
                                            )}
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                  </Stack>

                                  <Stack sx={{ mt: 1 }}>
                                    {CustomerModuleMenu.slice(3, 9).map(
                                      (label, index) => {
                                        return (
                                          <Stack
                                            key={index}
                                            sx={{
                                              cursor: "pointer",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              px: { sm: 1, xs: 0.4 },
                                              py: 0.5,
                                            }}
                                            onClick={() =>
                                              handlenavigationToCustomerModules(
                                                label.id,
                                                label.title
                                                // displayCount
                                              )
                                            }
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "13px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              {label.title}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    label.count > 0
                                                      ? "green"
                                                      : "red",
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "12px",
                                                  },
                                                }}
                                              >
                                                {label.count}
                                              </Typography>
                                              <Stack>
                                                <NavigateNextIcon
                                                  sx={{
                                                    color:
                                                      label.count > 0
                                                        ? "green"
                                                        : "red",
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "12px",
                                                    },
                                                  }}
                                                />
                                              </Stack>{" "}
                                            </Stack>
                                          </Stack>
                                        );
                                      }
                                    )}
                                  </Stack>
                                </Stack>
                              )}
                              {data.moduleId === 12 && (
                                <Stack
                                  sx={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-evenly",
                                    gap: 0.6,
                                    mt: 1,
                                  }}
                                >
                                  {[
                                    "Total count",
                                    "Total viewed",
                                    "Total unviewed",
                                  ].map((label, index) => (
                                    <>
                                      <Stack
                                        key={label}
                                        sx={{
                                          flexGrow: { sm: 1, xs: 12 },
                                          textAlign: "center",
                                          borderRadius: "5px",
                                          py: 2,
                                          cursor: "pointer",
                                          transition: "all 0.3s ease",
                                          "&:hover": {
                                            boxShadow:
                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                            transform: "scale(1.01)",
                                          },
                                        }}
                                        onClick={() =>
                                          handleNavigationForDatKnoweledgeBaseView(
                                            index + 1
                                          )
                                        }
                                      >
                                        {label === "Total count" && (
                                          <Typography>
                                            {isKnoKnowledgeBaseCount.totalCount ? (
                                              <DottedSpinner
                                                size={16}
                                                color="#1976d2"
                                                thickness={4}
                                              />
                                            ) : (
                                              KnowledgeBaseCount?.totalCount ??
                                              0
                                            )}
                                          </Typography>
                                        )}

                                        {label === "Total viewed" && (
                                          <Typography>
                                            {isKnoKnowledgeBaseCount.viewedSum ? (
                                              <DottedSpinner
                                                size={16}
                                                color="#1976d2"
                                                thickness={4}
                                              />
                                            ) : (
                                              KnowledgeBaseCount?.viewedSum ?? 0
                                            )}
                                          </Typography>
                                        )}

                                        {label === "Total unviewed" && (
                                          <Typography>
                                            {isKnoKnowledgeBaseCount.unviewedSum ? (
                                              <DottedSpinner
                                                size={16}
                                                color="#1976d2"
                                                thickness={4}
                                              />
                                            ) : (
                                              KnowledgeBaseCount?.unviewedSum ??
                                              0
                                            )}
                                          </Typography>
                                        )}

                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "12px",
                                              xs: "10px",
                                            },
                                          }}
                                        >
                                          {label}
                                        </Typography>
                                      </Stack>
                                      {index !== 2 && (
                                        <Divider
                                          orientation="vertical"
                                          variant="middle"
                                          flexItem
                                          sx={{
                                            alignSelf: "center",
                                            height: { sm: "55px", xs: "40px" },
                                            borderColor: "#e0e0e0",
                                          }}
                                        />
                                      )}
                                    </>
                                  ))}
                                </Stack>
                              )}
                              {data.moduleId === 15 &&
                                loggedInUser?.manager &&
                                [
                                  {
                                    title: "pending your manager approval",
                                    count: pendingApprovals,
                                    view: 1,
                                  },
                                  {
                                    title: "awaiting your approval",
                                    count: totalMyLeaves,
                                    view: 2,
                                  },
                                  {
                                    title: "awaiting team approval",
                                    count: totalTeamLeaves,
                                    view: 3,
                                  },
                                ].map((leaveData, i) => {
                                  const chipColors = [
                                    "#FEF8D6",
                                    "#EFFCFF",
                                    "#F6F5FD",
                                  ]; // Add more if needed
                                  const chipTextColors = [
                                    "#DEB883",
                                    "#3084A9",
                                    "#5663C4",
                                  ];
                                  return (
                                    <Stack sx={{ mt: 1 }} key={leaveData.title}>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          gap: 1,
                                          flexWrap: "wrap",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <>
                                          <Stack
                                            sx={{
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              width: "100%",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              navToLeaveModule(leaveData.view)
                                            }
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                                textTransform: "capitalize",
                                                gap: 1,
                                              }}
                                            >
                                              <Typography component={"span"}>
                                                <Chip
                                                  label={
                                                    leaveData.title.split(
                                                      " "
                                                    )[0]
                                                  }
                                                  size="small"
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "9px",
                                                    },
                                                    backgroundColor:
                                                      chipColors[
                                                        i % chipColors.length
                                                      ],
                                                    color:
                                                      chipTextColors[
                                                        i %
                                                          chipTextColors.length
                                                      ],
                                                    textTransform: "capitalize",
                                                    mr: 0.5,
                                                  }}
                                                />
                                              </Typography>
                                              {leaveData.title
                                                .split(" ")
                                                .slice(1)
                                                .join(" ")}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                textAlign: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    leaveData.count === 0
                                                      ? "green"
                                                      : "red",
                                                }}
                                              >
                                                {leaveData.count}
                                              </Typography>
                                              <NavigateNextIcon
                                                sx={{
                                                  color:
                                                    leaveData.count === 0
                                                      ? "green"
                                                      : "red",
                                                  fontSize: "13px",
                                                }}
                                              />
                                            </Stack>
                                          </Stack>
                                        </>
                                      </Stack>
                                    </Stack>
                                  );
                                })}
                              {data.moduleId === 15 &&
                                loggedInUser.manager === false &&
                                [
                                  {
                                    title: "pending your manager approval",
                                    count: pendingApprovals,
                                    view: 4,
                                  },
                                  {
                                    title: "Approved leaves",
                                    count: approvedLeaves,
                                    view: 5,
                                  },
                                  {
                                    title: "Rejected leaves",
                                    count: rejectedLeaves,
                                    view: 6,
                                  },
                                ].map((leaveData, i) => {
                                  return (
                                    <Stack sx={{ mt: 1 }} key={leaveData.title}>
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          gap: 2,
                                          flexWrap: "wrap",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <Stack
                                          sx={{
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                            justifyContent: "space-between",
                                            gap: 1,
                                            width: "100%",
                                            px: 1,

                                            borderRadius: "4px",
                                          }}
                                        >
                                          <Stack
                                            sx={{
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              width: "100%",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              navToLeaveModule(leaveData.view)
                                            }
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                                textTransform: "capitalize",
                                                gap: 1,
                                              }}
                                            >
                                              <Typography component={"span"}>
                                                <Chip
                                                  label={
                                                    leaveData.title.split(
                                                      " "
                                                    )[0]
                                                  }
                                                  size="small"
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "9px",
                                                    },

                                                    textTransform: "capitalize",
                                                    mr: 0.5,
                                                  }}
                                                />
                                              </Typography>
                                              {leaveData.title}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                textAlign: "center",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    leaveData.count === 0
                                                      ? "green"
                                                      : "red",
                                                }}
                                              >
                                                {leaveData.count}
                                              </Typography>
                                              <NavigateNextIcon
                                                sx={{
                                                  color:
                                                    leaveData.count === 0
                                                      ? "green"
                                                      : "red",
                                                  fontSize: "13px",
                                                }}
                                              />
                                            </Stack>
                                          </Stack>
                                        </Stack>
                                      </Stack>
                                    </Stack>
                                  );
                                })}
                              {data.moduleId === 17 && (
                                <Stack>
                                  <Stack
                                    sx={{
                                      width: "100%",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-evenly",
                                      gap: 1,
                                      mt: 1,
                                    }}
                                  >
                                    {[
                                      {
                                        title: "Planned Today",
                                        count: plannedCount,
                                        view: 4,
                                      },
                                      {
                                        title: "Visited ",
                                        count: actualCount,
                                        view: 5,
                                      },
                                      {
                                        title: "unplanned visits",
                                        count: unplannedCount,
                                        view: 6,
                                      },
                                      {
                                        view: 7,
                                        count: teamPlannedCount,
                                        title: " your team planned employees",
                                      },
                                      {
                                        view: 8,
                                        count: teamUnplannedCount,
                                        title: "yur team unplanned employees",
                                      },
                                    ]
                                      .slice(0, 3)
                                      .map((label, index) => (
                                        <>
                                          <Stack
                                            key={label}
                                            sx={{
                                              //  border: "1px solid #EEEEEE",
                                              flexGrow: { sm: 1, xs: 12 },
                                              width: {
                                                xs: "250px",
                                                sm: "auto",
                                              },
                                              textAlign: "center",
                                              borderRadius: "5px",
                                              py: 2,
                                              cursor: "pointer",
                                              transition: "all 0.3s ease",
                                              "&:hover": {
                                                boxShadow:
                                                  "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                transform: "scale(1.01)",
                                              },
                                            }}
                                            onClick={() =>
                                              handleDyaPlan(
                                                label.view,
                                                label.title
                                              )
                                            }
                                          >
                                            <Typography
                                              sx={{
                                                color:
                                                  label.count > 0
                                                    ? "green"
                                                    : "red",

                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              {label.count}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              {label.title}
                                            </Typography>
                                          </Stack>
                                          {index !== 2 && (
                                            <Divider
                                              orientation="vertical"
                                              variant="middle"
                                              flexItem
                                              sx={{
                                                alignSelf: "center",
                                                height: {
                                                  sm: "55px",
                                                  xs: "40px",
                                                },
                                                borderColor: "#e0e0e0",
                                              }}
                                            />
                                          )}
                                        </>
                                      ))}
                                  </Stack>
                                  <Stack sx={{ mt: 1 }}>
                                    {[
                                      {
                                        title: "Planned Today",
                                        count: plannedCount,
                                        view: 4,
                                      },
                                      {
                                        title: "Visited ",
                                        count: actualCount,
                                        view: 5,
                                      },
                                      {
                                        title: "unplanned visits",
                                        count: unplannedCount,
                                        view: 6,
                                      },
                                      {
                                        view: 7,
                                        count: teamPlannedCount,
                                        title: "team planned employees",
                                      },
                                      {
                                        view: 8,
                                        count: teamUnplannedCount,
                                        title: " team unplanned employees",
                                      },
                                    ]
                                      .slice(3)
                                      .map((label, index) => (
                                        <>
                                          <Stack
                                            key={label}
                                            sx={{
                                              borderRadius: "5px",
                                              cursor: "pointer",
                                              py: 0.9,
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                            }}
                                            onClick={() =>
                                              handleDyaPlan(
                                                label.view,
                                                label.title
                                              )
                                            }
                                          >
                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              {label.title}
                                            </Typography>
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  color:
                                                    label.count > 0
                                                      ? "green"
                                                      : "red",
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              >
                                                {label.count}
                                              </Typography>
                                              <NavigateNextIcon
                                                sx={{
                                                  color:
                                                    label.count > 0
                                                      ? "green"
                                                      : "red",
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                }}
                                              />
                                            </Stack>
                                          </Stack>
                                        </>
                                      ))}
                                  </Stack>
                                </Stack>
                              )}
                              {data.moduleId === 37 && (
                                <>
                                  {data.formType === 1 ? (
                                    data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                      data.formSpecViewPermission === "true" ||
                                      data.formSpecViewPermission === true ? (
                                        data.formAddPermission === "true" ||
                                        data.formAddPermission === true ? (
                                          <>
                                            <Stack
                                              sx={{
                                                flexGrow: { sm: 1, xs: 12 },
                                                alignContent: "center",
                                                justifyContent: "space-around",
                                                textAlign: "center",
                                                flexDirection: "row",
                                                py: 2,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                  boxShadow:
                                                    "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                  transform: "scale(1.01)",
                                                },

                                                "& > *": {
                                                  width: "32%",
                                                },
                                                "& > * >: nth-of-type(2)": {
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                },
                                              }}
                                            >
                                              {loggedInUser?.manager ? (
                                                <>
                                                  {" "}
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByMe ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByTeam ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              ) : (
                                                <>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.approvedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Approved Forms
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.rejectedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Rejected Forms
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              )}
                                            </Stack>
                                          </>
                                        ) : (
                                          <>
                                            <Stack
                                              sx={{
                                                flexGrow: { sm: 1, xs: 12 },
                                                alignContent: "center",
                                                justifyContent: "space-around",
                                                textAlign: "center",
                                                flexDirection: "row",
                                                py: 2,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                  boxShadow:
                                                    "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                  transform: "scale(1.01)",
                                                },

                                                "& > *": {
                                                  width: "32%",
                                                },
                                                "& > * >: nth-of-type(2)": {
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                },
                                              }}
                                            >
                                              {loggedInUser?.manager ? (
                                                <>
                                                  {" "}
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByMe ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByTeam ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              ) : (
                                                <>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.approvedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Approved Forms
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.rejectedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Rejected Forms
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              )}
                                            </Stack>
                                          </>
                                        )
                                      ) : null
                                    ) : loggedInUser?.employeeAccessSettings
                                        ?.addForm === "true" ||
                                      loggedInUser?.employeeAccessSettings
                                        ?.addForm === true ? (
                                      <>
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 2,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",

                                            "& > * >: nth-of-type(2)": {
                                              fontSize: {
                                                sm: "12px",
                                                xs: "10px",
                                              },
                                            },
                                          }}
                                        >
                                          {loggedInUser?.manager ? (
                                            <>
                                              {/* ====================== online sync from===================== */}{" "}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByMe_byMe?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.pendingCount ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigationToManagerApproval(
                                                          data.formSpecId
                                                        ); // You should define this handler
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component={"span"}
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                       
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>

                                                    <Typography
                                                      sx={{
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                      }}
                                                    >
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                              {/* Awaiting your approval */}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByManager_byManager?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.formApprovalByMe ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigateToAwaitingYourApproval(
                                                          data.formSpecId
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component="span"
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                      
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                      }}
                                                    >
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                              {/* Awaiting team approval */}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByManager_byManager?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.formApprovalByTeam ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigateToAwaitingTeamApproval(
                                                          data.formSpecId
                                                        ); // Define this
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component="span"
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>
                                                    <Typography
                                                      sx={{
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                      }}
                                                    >
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                            </>
                                          ) : (
                                            <>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.approvedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Approved Forms
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.rejectedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Rejected Forms
                                                </Typography>
                                              </Stack>
                                            </>
                                          )}
                                        </Stack>
                                      </>
                                    ) : (
                                      <>
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 2,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                              boxShadow:
                                                "0 1px 10px rgba(0, 0, 0, 0.10)",
                                              transform: "scale(1.01)",
                                            },

                                            "& > * >: nth-of-type(2)": {
                                              fontSize: {
                                                sm: "12px",
                                                xs: "10px",
                                              },
                                            },
                                          }}
                                        >
                                          {loggedInUser?.manager ? (
                                            <>
                                              {" "}
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByManager_byManager?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.formApprovalByMe ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Awaiting your approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByManager_byManager?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.formApprovalByTeam ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Awaiting team approval
                                                </Typography>
                                              </Stack>
                                            </>
                                          ) : (
                                            <>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.approvedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Approved Forms
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.rejectedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Rejected Forms
                                                </Typography>
                                              </Stack>
                                            </>
                                          )}
                                        </Stack>
                                      </>
                                    )
                                  ) : data.formType === 2 ? (
                                    data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                      data.formSpecViewPermission === "true" ||
                                      data.formSpecViewPermission === true ? (
                                        data.formAddPermission === "true" ||
                                        data.formAddPermission === true ? (
                                          <>
                                            <Stack
                                              sx={{
                                                flexGrow: { sm: 1, xs: 12 },
                                                alignContent: "center",
                                                justifyContent: "space-around",
                                                textAlign: "center",
                                                flexDirection: "row",
                                                py: 2,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                  boxShadow:
                                                    "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                  transform: "scale(1.01)",
                                                },

                                                "& > *": {
                                                  width: "32%",
                                                },
                                                "& > * >: nth-of-type(2)": {
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                },
                                              }}
                                            >
                                              {loggedInUser?.manager ? (
                                                <>
                                                  {" "}
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByMe ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByTeam ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              ) : (
                                                <>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.approvedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Approved Forms
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.rejectedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Rejected Forms
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              )}
                                            </Stack>
                                          </>
                                        ) : (
                                          <>
                                            <Stack
                                              sx={{
                                                flexGrow: { sm: 1, xs: 12 },
                                                alignContent: "center",
                                                justifyContent: "space-around",
                                                textAlign: "center",
                                                flexDirection: "row",
                                                py: 2,
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                  boxShadow:
                                                    "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                  transform: "scale(1.01)",
                                                },

                                                "& > *": {
                                                  width: "32%",
                                                },
                                                "& > * >: nth-of-type(2)": {
                                                  fontSize: {
                                                    sm: "12px",
                                                    xs: "10px",
                                                  },
                                                },
                                              }}
                                            >
                                              {loggedInUser?.manager ? (
                                                <>
                                                  {" "}
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByMe ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByManager_byManager?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.formApprovalByTeam ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              ) : (
                                                <>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.pendingCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.approvedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Approved Forms
                                                    </Typography>
                                                  </Stack>
                                                  <Stack>
                                                    <Typography>
                                                      {(() => {
                                                        const matchingGroup =
                                                          loadFormApprovalsCountByMe_byMe?.find(
                                                            (group) =>
                                                              group.formSpecId ===
                                                              data.formSpecId
                                                          );

                                                        const size =
                                                          matchingGroup?.rejectedCount ??
                                                          0;

                                                        return (
                                                          <Typography
                                                            component={"span"}
                                                            sx={{
                                                              color:
                                                                size > 0
                                                                  ? "green"
                                                                  : "red",
                                                            }}
                                                          >
                                                            {size}
                                                          </Typography>
                                                        );
                                                      })()}
                                                    </Typography>
                                                    <Typography>
                                                      Rejected Forms
                                                    </Typography>
                                                  </Stack>
                                                </>
                                              )}
                                            </Stack>
                                          </>
                                        )
                                      ) : null
                                    ) : loggedInUser?.employeeAccessSettings
                                        ?.addForm === "true" ||
                                      loggedInUser?.employeeAccessSettings
                                        ?.addForm === true ? (
                                      <>
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 2,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",

                                            "& > * >: nth-of-type(2)": {
                                              fontSize: {
                                                sm: "12px",
                                                xs: "10px",
                                              },
                                            },
                                          }}
                                        >
                                          {loggedInUser?.manager ? (
                                            <>
                                              {/* ====================== online sync from===================== */}{" "}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByMe_byMe?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.pendingCount ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigationToManagerApproval(
                                                          data.formSpecId
                                                        ); // You should define this handler
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component={"span"}
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                        fontWeight: 600,
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>

                                                    <Typography>
                                                      Pending your manager
                                                      approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                              {/* Awaiting your approval */}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByManager_byManager?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.formApprovalByMe ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigateToAwaitingYourApproval(
                                                          data.formSpecId
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component="span"
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                        fontWeight: 600,
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting your approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                              {/* Awaiting team approval */}
                                              {(() => {
                                                const matchingGroup =
                                                  loadFormApprovalsCountByManager_byManager?.find(
                                                    (group) =>
                                                      group.formSpecId ===
                                                      data.formSpecId
                                                  );
                                                const size =
                                                  matchingGroup?.formApprovalByTeam ??
                                                  0;
                                                const isClickable = size > 0;

                                                return (
                                                  <Stack
                                                    sx={{
                                                      width: "100%",
                                                      p: 1,
                                                      cursor: isClickable
                                                        ? "pointer"
                                                        : "not-allowed",
                                                      "&:hover": isClickable
                                                        ? {
                                                            boxShadow:
                                                              "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                            transform:
                                                              "scale(1.01)",
                                                          }
                                                        : {},
                                                    }}
                                                    onClick={() => {
                                                      if (isClickable) {
                                                        handleNavigateToAwaitingTeamApproval(
                                                          data.formSpecId
                                                        ); // Define this
                                                      }
                                                    }}
                                                  >
                                                    <Typography
                                                      component="span"
                                                      sx={{
                                                        color:
                                                          size > 0
                                                            ? "green"
                                                            : "red",
                                                        fontSize: {
                                                          sm: "12px",
                                                          xs: "10px",
                                                        },
                                                        fontWeight: 600,
                                                      }}
                                                    >
                                                      {size}
                                                    </Typography>
                                                    <Typography>
                                                      Awaiting team approval
                                                    </Typography>
                                                  </Stack>
                                                );
                                              })()}
                                            </>
                                          ) : (
                                            <>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.approvedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Approved Forms
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.rejectedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Rejected Forms
                                                </Typography>
                                              </Stack>
                                            </>
                                          )}
                                        </Stack>
                                      </>
                                    ) : (
                                      <>
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 2,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                              boxShadow:
                                                "0 1px 10px rgba(0, 0, 0, 0.10)",
                                              transform: "scale(1.01)",
                                            },

                                            "& > * >: nth-of-type(2)": {
                                              fontSize: {
                                                sm: "12px",
                                                xs: "10px",
                                              },
                                            },
                                          }}
                                        >
                                          {loggedInUser?.manager ? (
                                            <>
                                              {" "}
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByManager_byManager?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.formApprovalByMe ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Awaiting your approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByManager_byManager?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.formApprovalByTeam ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Awaiting team approval
                                                </Typography>
                                              </Stack>
                                            </>
                                          ) : (
                                            <>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.pendingCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Pending your manager approval
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.approvedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Approved Forms
                                                </Typography>
                                              </Stack>
                                              <Stack>
                                                <Typography>
                                                  {(() => {
                                                    const matchingGroup =
                                                      loadFormApprovalsCountByMe_byMe?.find(
                                                        (group) =>
                                                          group.formSpecId ===
                                                          data.formSpecId
                                                      );

                                                    const size =
                                                      matchingGroup?.rejectedCount ??
                                                      0;

                                                    return (
                                                      <Typography
                                                        component={"span"}
                                                        sx={{
                                                          color:
                                                            size > 0
                                                              ? "green"
                                                              : "red",
                                                        }}
                                                      >
                                                        {size}
                                                      </Typography>
                                                    );
                                                  })()}
                                                </Typography>
                                                <Typography>
                                                  Rejected Forms
                                                </Typography>
                                              </Stack>
                                            </>
                                          )}
                                        </Stack>
                                      </>
                                    )
                                  ) : data.formSpecPermission === "true" ||
                                    data.formSpecPermission === true ? (
                                    data.formSpecViewPermission === "true" ||
                                    data.formSpecViewPermission === true ? (
                                      data.formAddPermission === "true" ||
                                      data.formAddPermission === true ? (
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 1.5,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                          }}
                                        >
                                          {(() => {
                                            const matchingGroup =
                                              yesterdayCount?.find((group) =>
                                                group.forms?.some(
                                                  (form) =>
                                                    form.formSpecId ===
                                                    data.formSpecId
                                                )
                                              );
                                            const size =
                                              matchingGroup?.size ?? 0;
                                            const isClickable = size > 0;

                                            return (
                                              <Stack
                                                sx={{
                                                  width: "100%",
                                                  p: 1,
                                                  cursor: isClickable
                                                    ? "pointer"
                                                    : "not-allowed",
                                                  "&:hover": isClickable
                                                    ? {
                                                        boxShadow:
                                                          "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                        transform:
                                                          "scale(1.01)",
                                                      }
                                                    : {},
                                                }}
                                                onClick={() => {
                                                  if (isClickable) {
                                                    handleNavigationToFilledYestarday(
                                                      data.formSpecId
                                                    );
                                                  }
                                                }}
                                              >
                                                <Typography
                                                  component={"span"}
                                                  sx={{
                                                    color:
                                                      size > 0
                                                        ? "green"
                                                        : "red",

                                                    fontWeight: {
                                                      sm: 600,
                                                      xs: 500,
                                                    },
                                                  }}
                                                >
                                                  {size}
                                                </Typography>

                                                <Typography
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "10px",
                                                    },
                                                  }}
                                                >
                                                  filled yesterday
                                                </Typography>
                                              </Stack>
                                            );
                                          })()}

                                          {(() => {
                                            const matchingGroup =
                                              todayCount?.find((group) =>
                                                group.forms?.some(
                                                  (form) =>
                                                    form.formSpecId ===
                                                    data.formSpecId
                                                )
                                              );
                                            const size =
                                              matchingGroup?.size ?? 0;
                                            const isClickable = size > 0;

                                            return (
                                              <Stack
                                                sx={{
                                                  width: "100%",
                                                  p: 1,
                                                  cursor: isClickable
                                                    ? "pointer"
                                                    : "not-allowed",
                                                  "&:hover": isClickable
                                                    ? {
                                                        boxShadow:
                                                          "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                        transform:
                                                          "scale(1.01)",
                                                      }
                                                    : {},
                                                }}
                                                onClick={() => {
                                                  if (isClickable) {
                                                    handleNavigationToFilledToday(
                                                      data.formSpecId
                                                    );
                                                  }
                                                }}
                                              >
                                                <Typography
                                                  component={"span"}
                                                  sx={{
                                                    color:
                                                      size > 0
                                                        ? "green"
                                                        : "red",

                                                    fontWeight: {
                                                      sm: 600,
                                                      xs: 500,
                                                    },
                                                  }}
                                                >
                                                  {size}
                                                </Typography>

                                                <Typography
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "10px",
                                                    },
                                                  }}
                                                >
                                                  filled today
                                                </Typography>
                                              </Stack>
                                            );
                                          })()}
                                        </Stack>
                                      ) : (
                                        <Stack
                                          sx={{
                                            flexGrow: { sm: 1, xs: 12 },
                                            alignContent: "center",
                                            justifyContent: "space-around",
                                            textAlign: "center",
                                            flexDirection: "row",
                                            py: 1.5,
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                          }}
                                        >
                                          {(() => {
                                            const matchingGroup =
                                              yesterdayCount?.find((group) =>
                                                group.forms?.some(
                                                  (form) =>
                                                    form.formSpecId ===
                                                    data.formSpecId
                                                )
                                              );
                                            const size =
                                              matchingGroup?.size ?? 0;
                                            const isClickable = size > 0;

                                            return (
                                              <Stack
                                                sx={{
                                                  width: "100%",
                                                  p: 1,
                                                  cursor: isClickable
                                                    ? "pointer"
                                                    : "not-allowed",
                                                  "&:hover": isClickable
                                                    ? {
                                                        boxShadow:
                                                          "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                        transform:
                                                          "scale(1.01)",
                                                      }
                                                    : {},
                                                }}
                                                onClick={() => {
                                                  if (isClickable) {
                                                    handleNavigationToFilledYestarday(
                                                      data.formSpecId
                                                    );
                                                  }
                                                }}
                                              >
                                                <Typography
                                                  component={"span"}
                                                  sx={{
                                                    color:
                                                      size > 0
                                                        ? "green"
                                                        : "red",

                                                    fontWeight: {
                                                      sm: 600,
                                                      xs: 500,
                                                    },
                                                  }}
                                                >
                                                  {size}
                                                </Typography>

                                                <Typography
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "10px",
                                                    },
                                                  }}
                                                >
                                                  filled yesterday
                                                </Typography>
                                              </Stack>
                                            );
                                          })()}

                                          {(() => {
                                            const matchingGroup =
                                              todayCount?.find((group) =>
                                                group.forms?.some(
                                                  (form) =>
                                                    form.formSpecId ===
                                                    data.formSpecId
                                                )
                                              );
                                            const size =
                                              matchingGroup?.size ?? 0;
                                            const isClickable = size > 0;

                                            return (
                                              <Stack
                                                sx={{
                                                  width: "100%",
                                                  p: 1,
                                                  cursor: isClickable
                                                    ? "pointer"
                                                    : "not-allowed",
                                                  "&:hover": isClickable
                                                    ? {
                                                        boxShadow:
                                                          "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                        transform:
                                                          "scale(1.01)",
                                                      }
                                                    : {},
                                                }}
                                                onClick={() => {
                                                  if (isClickable) {
                                                    handleNavigationToFilledToday(
                                                      data.formSpecId
                                                    );
                                                  }
                                                }}
                                              >
                                                <Typography
                                                  component={"span"}
                                                  sx={{
                                                    color:
                                                      size > 0
                                                        ? "green"
                                                        : "red",

                                                    fontWeight: {
                                                      sm: 600,
                                                      xs: 500,
                                                    },
                                                  }}
                                                >
                                                  {size}
                                                </Typography>

                                                <Typography
                                                  sx={{
                                                    fontSize: {
                                                      sm: "12px",
                                                      xs: "10px",
                                                    },
                                                  }}
                                                >
                                                  filled today
                                                </Typography>
                                              </Stack>
                                            );
                                          })()}
                                        </Stack>
                                      )
                                    ) : null
                                  ) : loggedInUser?.employeeAccessSettings
                                      ?.addForm === "true" ||
                                    loggedInUser?.employeeAccessSettings
                                      ?.addForm === true ? (
                                    <Stack
                                      sx={{
                                        flexGrow: { sm: 1, xs: 12 },
                                        alignContent: "center",
                                        justifyContent: "space-around",
                                        textAlign: "center",
                                        flexDirection: "row",
                                        py: 1.5,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                      }}
                                    >
                                      {(() => {
                                        const matchingGroup =
                                          yesterdayCount?.find((group) =>
                                            group.forms?.some(
                                              (form) =>
                                                form.formSpecId ===
                                                data.formSpecId
                                            )
                                          );
                                        const size = matchingGroup?.size ?? 0;
                                        const isClickable = size > 0;

                                        return (
                                          <Stack
                                            sx={{
                                              width: "100%",
                                              p: 1,
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                              "&:hover": isClickable
                                                ? {
                                                    boxShadow:
                                                      "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                    transform: "scale(1.01)",
                                                  }
                                                : {},
                                            }}
                                            onClick={() => {
                                              if (isClickable) {
                                                handleNavigationToFilledYestarday(
                                                  data.formSpecId
                                                );
                                              }
                                            }}
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              filled yesterday
                                            </Typography>
                                          </Stack>
                                        );
                                      })()}

                                      {(() => {
                                        const matchingGroup = todayCount?.find(
                                          (group) =>
                                            group.forms?.some(
                                              (form) =>
                                                form.formSpecId ===
                                                data.formSpecId
                                            )
                                        );
                                        const size = matchingGroup?.size ?? 0;
                                        const isClickable = size > 0;

                                        return (
                                          <Stack
                                            sx={{
                                              width: "100%",
                                              p: 1,
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                              "&:hover": isClickable
                                                ? {
                                                    boxShadow:
                                                      "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                    transform: "scale(1.01)",
                                                  }
                                                : {},
                                            }}
                                            onClick={() => {
                                              if (isClickable) {
                                                handleNavigationToFilledToday(
                                                  data.formSpecId
                                                );
                                              }
                                            }}
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              filled today
                                            </Typography>
                                          </Stack>
                                        );
                                      })()}
                                    </Stack>
                                  ) : (
                                    <Stack
                                      sx={{
                                        flexGrow: { sm: 1, xs: 12 },
                                        alignContent: "center",
                                        justifyContent: "space-around",
                                        textAlign: "center",
                                        flexDirection: "row",
                                        py: 1.5,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                      }}
                                    >
                                      {(() => {
                                        const matchingGroup =
                                          yesterdayCount?.find((group) =>
                                            group.forms?.some(
                                              (form) =>
                                                form.formSpecId ===
                                                data.formSpecId
                                            )
                                          );
                                        const size = matchingGroup?.size ?? 0;
                                        const isClickable = size > 0;

                                        return (
                                          <Stack
                                            sx={{
                                              width: "100%",
                                              p: 1,
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                              "&:hover": isClickable
                                                ? {
                                                    boxShadow:
                                                      "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                    transform: "scale(1.01)",
                                                  }
                                                : {},
                                            }}
                                            onClick={() => {
                                              if (isClickable) {
                                                handleNavigationToFilledYestarday(
                                                  data.formSpecId
                                                );
                                              }
                                            }}
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              filled yesterday
                                            </Typography>
                                          </Stack>
                                        );
                                      })()}

                                      {(() => {
                                        const matchingGroup = todayCount?.find(
                                          (group) =>
                                            group.forms?.some(
                                              (form) =>
                                                form.formSpecId ===
                                                data.formSpecId
                                            )
                                        );
                                        const size = matchingGroup?.size ?? 0;
                                        const isClickable = size > 0;

                                        return (
                                          <Stack
                                            sx={{
                                              width: "100%",
                                              p: 1,
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                              "&:hover": isClickable
                                                ? {
                                                    boxShadow:
                                                      "0 1px 10px rgba(0, 0, 0, 0.10)",
                                                    transform: "scale(1.01)",
                                                  }
                                                : {},
                                            }}
                                            onClick={() => {
                                              if (isClickable) {
                                                handleNavigationToFilledToday(
                                                  data.formSpecId
                                                );
                                              }
                                            }}
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <Typography
                                              sx={{
                                                fontSize: {
                                                  sm: "12px",
                                                  xs: "10px",
                                                },
                                              }}
                                            >
                                              filled today
                                            </Typography>
                                          </Stack>
                                        );
                                      })()}
                                    </Stack>
                                  )}
                                </>
                              )}
                              {data.moduleId === 36 && (
                                <Stack
                                  sx={{
                                    width: "100%",
                                    gap: 1,
                                    mt: 1,
                                    "& > *": {
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    },

                                    "& > * >: first-of-type": {
                                      fontSize: { sm: "12px", xs: "10px" },
                                    },
                                  }}
                                >
                                  <Stack>
                                    <Typography>you need to do</Typography>
                                    <Typography>
                                      {(() => {
                                        const matchingGroup =
                                          loadActionableWorksByMe?.find(
                                            (group) =>
                                              group.formSpecId ===
                                              data.formSpecId
                                          );

                                        const size = matchingGroup?.count ?? 0;

                                        const isClickable = size > 0;

                                        return (
                                          <Stack
                                            onClick={() =>
                                              youneedToDoNavigation(
                                                data.customEntitySpecId
                                              )
                                            }
                                            sx={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                            }}
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <NavigateNextIcon
                                              sx={{
                                                fontSize: "13px",
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            />
                                          </Stack>
                                        );
                                      })()}
                                    </Typography>
                                  </Stack>
                                  {loggedInUser?.manager && (
                                    <Stack>
                                      <Typography>team need to do</Typography>

                                      <Typography>
                                        {(() => {
                                          const matchingGroup =
                                            workSpecCards?.find(
                                              (group) =>
                                                group.formSpecId ===
                                                data.formSpecId
                                            );

                                          const size =
                                            matchingGroup?.count ?? 0;
                                          const isClickable = size > 0;
                                          return (
                                            <Stack
                                              sx={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                cursor: isClickable
                                                  ? "pointer"
                                                  : "not-allowed",
                                              }}
                                              onClick={() =>
                                                teamNeedToDO(
                                                  data.customEntitySpecId
                                                )
                                              }
                                            >
                                              <Typography
                                                component={"span"}
                                                sx={{
                                                  color:
                                                    size > 0
                                                      ? "orange"
                                                      : "green",
                                                }}
                                              >
                                                {size}
                                              </Typography>

                                              <NavigateNextIcon
                                                sx={{
                                                  fontSize: "13px",
                                                  color:
                                                    size > 0
                                                      ? "orange"
                                                      : "green",
                                                }}
                                              />
                                            </Stack>
                                          );
                                        })()}
                                      </Typography>
                                    </Stack>
                                  )}
                                  {(() => {
                                    const matchingGroup = pendingByMe?.find(
                                      (group) =>
                                        group.formSpecId === data.formSpecId
                                    );

                                    const size = matchingGroup?.count ?? 0;
                                    const canSend =
                                      matchingGroup?.canSendWorkInvitation;

                                    if (!canSend) return null;
                                    const isClickable = size > 0;
                                    return (
                                      <Stack>
                                        <Typography>
                                          Invitations need your action
                                        </Typography>
                                        <Stack
                                          sx={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            cursor: isClickable
                                              ? "pointer"
                                              : "not-allowed",
                                          }}
                                          onClick={() =>
                                            needuraction(
                                              data.customEntitySpecId
                                            )
                                          }
                                        >
                                          <Typography
                                            component={"span"}
                                            sx={{
                                              color: size > 0 ? "green" : "red",
                                            }}
                                          >
                                            {size}
                                          </Typography>

                                          <NavigateNextIcon
                                            sx={{
                                              fontSize: "13px",
                                              color: size > 0 ? "green" : "red",
                                            }}
                                          />
                                        </Stack>
                                      </Stack>
                                    );
                                  })()}

                                  {(() => {
                                    const matchingGroup = pendingByTeam?.find(
                                      (group) =>
                                        group.formSpecId === data.formSpecId
                                    );
                                    const size = matchingGroup?.count ?? 0;
                                    const canSend =
                                      matchingGroup?.canSendWorkInvitation;

                                    if (!loggedInUser?.manager || !canSend)
                                      return null;
                                    const isClickable = size > 0;

                                    return (
                                      <Stack>
                                        <Typography>
                                          Invitations for team action
                                        </Typography>
                                        <Stack
                                          sx={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            cursor: isClickable
                                              ? "pointer"
                                              : "not-allowed",
                                          }}
                                          onClick={() =>
                                            teamaction(data.customEntitySpecId)
                                          }
                                        >
                                          <Typography
                                            component={"span"}
                                            sx={{
                                              color: size > 0 ? "green" : "red",
                                            }}
                                          >
                                            {size}
                                          </Typography>

                                          <NavigateNextIcon
                                            sx={{
                                              fontSize: "13px",
                                              color: size > 0 ? "green" : "red",
                                            }}
                                          />
                                        </Stack>
                                      </Stack>
                                    );
                                  })()}

                                  <Stack>
                                    <Typography>
                                      No progress past&nbsp;
                                      {loggedInUser?.inActiveDaysValue} days
                                    </Typography>
                                    <Typography>
                                      {(() => {
                                        const matchingGroup =
                                          inactiveWorks?.find(
                                            (group) =>
                                              group.formSpecId ===
                                              data.formSpecId
                                          );

                                        const size = matchingGroup?.count ?? 0;

                                        const isClickable = size > 0;
                                        return (
                                          <Stack
                                            sx={{
                                              flexDirection: "row",
                                              alignItems: "center",
                                              cursor: isClickable
                                                ? "pointer"
                                                : "not-allowed",
                                            }}
                                            onClick={() =>
                                              noprogress(
                                                data.customEntitySpecId
                                              )
                                            }
                                          >
                                            <Typography
                                              component={"span"}
                                              sx={{
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            >
                                              {size}
                                            </Typography>

                                            <NavigateNextIcon
                                              sx={{
                                                fontSize: "13px",
                                                color:
                                                  size > 0 ? "green" : "red",
                                              }}
                                            />
                                          </Stack>
                                        );
                                      })()}
                                    </Typography>
                                  </Stack>
                                </Stack>
                              )}{" "}
                            </>
                          )}
                        </Stack>
                      </Stack>
                    </Stack>
                  )}{" "}
                </>
              )}
            </>
          ))
        ) : (
          <Typography sx={{ textAlign: "center" }}>No data found</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default TaskCard;
