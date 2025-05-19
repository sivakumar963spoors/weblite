import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlueCustomersIcon from "../../assets/menu_svg_filled/Blue/Customers.svg";
import dayPlan from "../../assets/menu_svg_filled/Blue/Day_Plans.svg";
import FormsIcon from "../../assets/menu_svg_filled/Blue/Forms.svg";
import KnowledgeBaseIcon from "../../assets/menu_svg_filled/Blue/Knowledge_Base.svg";
import leavesIcon from "../../assets/menu_svg_filled/Blue/Leaves.svg";
import WorkActionFormIcon from "../../assets/menu_svg_filled/Blue/Work_Action_form.svg";
import {
  get_allCustomer,
  loadMetPast30DaysPercentage_get,
  loadNotMetPast30Days_get,
  loadNotMetPast30DaysByTeam_get,
  loadTodaysCustomerVisitsByTeam_get,
  loadtotalsCustomersCountUnderEmployees_get,
  loadYesterdayCustomerVisitsByTeam_get,
  setDisplayCount,
  setTitleForCustomerView,
  todaysCustomerVisits_get,
  totalCustomersSize_get,
} from "../../redux/slices/CustomerModule";
import {
  filterByModule,
  loadHomeScreenCards_get,
  loggedInUser_get,
  resetFilteredData,
} from "../../redux/slices/HomePageSlice";
import { loadKNowledgeBasedCount_get } from "../../redux/slices/KnowledgeBaseModule";
import CustomButton from "../reusablecomponents/CustomButton";
const approvalCards = [
  { count: 0, label: "Pending your manager approvals" },
  { count: 0, label: "Awaiting your approval" },
  { count: 0, label: "Awaiting team approval" },
];
const TaskCard = ({ searchInput }) => {
  const {
    CustomerModuleMenu,
    totalCustomersSize,
    todaysCustomerVisits,
    loadNotMetPast30Days,
    loadMetPast30DaysPercentage,
    loadtotalsCustomersCountUnderEmployees,
    loadYesterdayCustomerVisitsByTeam,
    loadTodaysCustomerVisitsByTeam,
    loadNotMetPast30DaysByTeam,
  } = useSelector((state) => state.CustomerModule);
  const { DayPlanModuleMenu } = useSelector((state) => state.DayPlannerModule);
  const { LoadHomeScreenCards, workSpecsDataMenu, loggedInUser } = useSelector(
    (state) => state.HomePageModule
  );
  const { KnowledgeBaseCount } = useSelector(
    (state) => state.KnowledgeBaseReducerModule
  );
  const filteredLoadHomeScreenCards = [...LoadHomeScreenCards].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHomeScreenCards_get());
    dispatch(loggedInUser_get());
    dispatch(totalCustomersSize_get());
    dispatch(todaysCustomerVisits_get());
    dispatch(loadNotMetPast30Days_get());
    dispatch(loadMetPast30DaysPercentage_get());
    dispatch(loadYesterdayCustomerVisitsByTeam_get());
    dispatch(loadTodaysCustomerVisitsByTeam_get());
    dispatch(loadtotalsCustomersCountUnderEmployees_get());
    dispatch(loadNotMetPast30DaysByTeam_get());
    dispatch(loadKNowledgeBasedCount_get());
  }, [dispatch]);

  useEffect(() => {
    if (searchInput && searchInput.trim() !== "") {
      dispatch(filterByModule(searchInput));
    } else {
      dispatch(resetFilteredData());
    }
  }, [dispatch, searchInput]);
  const navigateToShowAlldModule = (moduleId) => {
    let title = "Show All";
    alert(moduleId);
    switch (moduleId) {
      case 12:
        navigate("/knowledgebase/manage");
        break;
      case 9:
        
        navigate("/view/all/customers?viewType=9");
        break;
      case 15:
        navigate("/view/leaves/new?viewType=2&leaveMenuType=2");
        break;

      case 36:
        navigate("/view/forms/new?empId=136947&viewType=2&formSpecId=245583");
        break;
      case 37:
        navigate(
          "/workSpec/actions/new?workSpecId=14291&viewType=8&workView=1"
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
  const handlenavigationToCustomerModules = (id, title, displayCount) => {
    dispatch(setTitleForCustomerView(title));

   // dispatch(setDisplayCount(displayCount));
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
    alert(id);
    switch (id) {
      case 15:
        navigate("/leave/my/create");
        break;
      case 1:
        navigate(`/customers/viewtype/${id}`);
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
    if (view === 2) {
      navigate(`/view/leaves/new?viewType=2&leaveMenuType=2`);
    } else if (view === 3) {
      navigate(`/view/leaves/new?viewType=3&leaveMenuType=3`);
    } else {
      navigate(`/view/leaves/new?viewType=1&leaveMenuType=1`);
    }
  };

  const handleDyaPlan = (label) => {
    if (!label) return;

    localStorage.setItem("activeMenuTitle", label.title);
    switch (label.id) {
      case 1:
        navigate(
          `/view/all/customers?viewType=4&customerViewType=1&customerView=2`
        );
        break;
      case 2:
        navigate(
          `/view/all/customers?viewType=5&customerView=2&customerViewType=2`
        );
        break;
      case 3:
        navigate(
          `/view/all/customers?viewType=6&customerView=2&customerViewType=3`
        );
        break;
      case 4:
        navigate(
          `/view/all/employees?viewType=7&customerViewType=2&customerView=4`
        );
        break;
      case 5:
        navigate(
          `/view/all/employees?viewType=8&customerViewType=5&customerView=2`
        );
        break;
      default:
        break;
    }
  };
  return (
    <Box sx={{}}>
      <Stack gap={1} sx={{ pt: 1 }}>
        {filteredLoadHomeScreenCards ? (
          filteredLoadHomeScreenCards?.map((data, index) => (
            <>
              {[37, 36, 34, 17, 15, 12, 9].includes(data.moduleId) && (
                <Stack
                  key={index}
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Stack
                    sx={{
                      width: { sm: "80%", xs: "97%" },
                      bgcolor: "#FFF",
                      borderRadius: "8px",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
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
                          {[12, 15, 17, 9, 36, 37].includes(data.moduleId) && (
                            <React.Fragment>
                              {data.moduleId === 37 ? (
                                <Box
                                  component={"img"}
                                  src={FormsIcon}
                                  alt="Forms Icon"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : data.moduleId === 9 ? (
                                <Box
                                  component={"img"}
                                  src={BlueCustomersIcon}
                                  alt="Customers Icon"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : data.moduleId === 12 ? (
                                <Box
                                  component={"img"}
                                  src={KnowledgeBaseIcon}
                                  alt="Knowledge Base Icon"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : data.moduleId === 36 ? (
                                <Box
                                  component={"img"}
                                  src={WorkActionFormIcon}
                                  alt="worksssssss"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : data.moduleId === 15 ? (
                                <Box
                                  component={"img"}
                                  src={leavesIcon}
                                  alt="leaves Base Icon"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : data.moduleId === 17 ? (
                                <Box
                                  component={"img"}
                                  src={dayPlan}
                                  alt="dayplan Base Icon"
                                  style={{ width: "24px", height: "24px" }}
                                />
                              ) : (
                                <HelpOutlineIcon />
                              )}

                              <Typography
                                sx={{
                                  fontWeight: { sm: 500, xs: 500 },
                                  fontSize: { sm: "14px", xs: "10px" },
                                }}
                              >
                                {data.moduleName}
                              </Typography>
                            </React.Fragment>
                          )}
                        </Stack>

                        <Stack
                          sx={{
                            flexDirection: { sm: "row", xs: "column" },
                            gap: { sm: 1, xs: 0.5 },
                            fontSize: "13px",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              borderRadius: "5px",
                              fontSize: { sm: "13px", xs: "8px" },
                              boxShadow: "none",
                            }}
                            onClick={() =>
                              navigateToShowAlldModule(data.moduleId)
                            }
                          >
                            Show all
                          </Button>
                          {[37, 36, 15].includes(data.moduleId) && (
                            <CustomButton
                              title={"Add"}
                              startIcon={<AddIcon />}
                              size={"small"}
                              onClick={() => handleNavToAdd(data.moduleId)}
                            />
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
                                    const displayCount =
                                      label.title === "Visited today"
                                        ? todaysCustomerVisits
                                        : label.title === "Assigned to you"
                                        ? totalCustomersSize
                                        : label.title === "Coverage"
                                        ? loadNotMetPast30Days
                                        : label.count;

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
                                              label.title,
                                              displayCount
                                            )
                                          }
                                        >
                                          <Typography
                                            sx={{
                                              color:
                                                displayCount > 0
                                                  ? "green"
                                                  : "red",

                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          >
                                            {label.count}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              fontSize: {
                                                sm: "14px",
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
                                    const displayCount =
                                      label.title ===
                                      "You haven't visited in the past 30 days"
                                        ? loadMetPast30DaysPercentage
                                        : label.title === "Assigned to team"
                                        ? loadtotalsCustomersCountUnderEmployees
                                        : label.title ===
                                          "Visited by the team yesterday"
                                        ? loadYesterdayCustomerVisitsByTeam
                                        : label.title ===
                                          "Visited by the team today"
                                        ? loadTodaysCustomerVisitsByTeam
                                        : label.title ===
                                          "Team hasn't visited in the past 30 days"
                                        ? loadNotMetPast30DaysByTeam
                                        : label.count;

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
                                            label.title,
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
                                                displayCount > 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
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
                                                  displayCount > 0
                                                    ? "green"
                                                    : "red",
                                                fontSize: {
                                                  sm: "14px",
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
                                    key={index}
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
                                    <Typography>
                                      {KnowledgeBaseCount &&
                                        label === "Total count" &&
                                        KnowledgeBaseCount?.totalCount}
                                    </Typography>
                                    <Typography>
                                      {KnowledgeBaseCount &&
                                        label === "Total viewed" &&
                                        KnowledgeBaseCount?.viewedSum}
                                    </Typography>
                                    <Typography>
                                      {KnowledgeBaseCount &&
                                        label === "Total unviewed" &&
                                        KnowledgeBaseCount?.unviewedSum}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: { sm: "14px", xs: "10px" },
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
                            [
                              {
                                title: "pending your manager approval",
                                count: 0,
                                view: 1,
                              },
                              {
                                title: "awaiting your approval",
                                count: 1,
                                view: 2,
                              },
                              {
                                title: "awaiting team approval",
                                count: 2,
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
                                <Stack sx={{ mt: 1 }} key={i}>
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
                                              sm: "14px",
                                              xs: "10px",
                                            },
                                            textTransform: "capitalize",
                                            gap: 1,
                                          }}
                                        >
                                          <Typography component={"span"}>
                                            <Chip
                                              label={
                                                leaveData.title.split(" ")[0]
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
                                                    i % chipTextColors.length
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
                                            alignItems: "center",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              color:
                                                leaveData.count === 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
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
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
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
                                {DayPlanModuleMenu.slice(0, 3).map(
                                  (label, index) => (
                                    <>
                                      <Stack
                                        key={index}
                                        sx={{
                                          //  border: "1px solid #EEEEEE",
                                          flexGrow: { sm: 1, xs: 12 },
                                          width: { xs: "250px", sm: "auto" },
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
                                        onClick={() => handleDyaPlan(label)}
                                      >
                                        <Typography
                                          sx={{
                                            color:
                                              label.count > 0 ? "green" : "red",
                                            fontWeight: "bold",
                                            fontSize: {
                                              sm: "14px",
                                              xs: "10px",
                                            },
                                          }}
                                        >
                                          {label.count}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "14px",
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
                                            height: { sm: "55px", xs: "40px" },
                                            borderColor: "#e0e0e0",
                                          }}
                                        />
                                      )}
                                    </>
                                  )
                                )}
                              </Stack>
                              <Stack sx={{ mt: 1 }}>
                                {DayPlanModuleMenu.slice(3, 9).map(
                                  (label, index) => (
                                    <>
                                      <Stack
                                        key={index}
                                        sx={{
                                          borderRadius: "5px",
                                          cursor: "pointer",
                                          py: 0.9,
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                        }}
                                        onClick={() => handleDyaPlan(label)}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "14px",
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
                                                sm: "14px",
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
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          />
                                        </Stack>
                                      </Stack>
                                    </>
                                  )
                                )}
                              </Stack>
                            </Stack>
                          )}
                          {/* {data.moduleId === 37 ? (
                          
                          data.formType === 2 &&
                          data.formSpecPermission === true ? (
                            data.formAddPermission ? (
                              <Typography sx={{ color: "green" }}>
                                {data.moduleName}
                              </Typography>
                            ) : (
                              <Typography sx={{ color: "yellow" }}>
                                {data.moduleName}
                              </Typography>
                            )
                          ) : data.employeeAccessSettings ? (
                            <Typography sx={{ color: "pink" }}>
                              {data.moduleName}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "blue" }}>
                              {data.moduleName}
                            </Typography>
                          )
                        ) : null} */}
                          {/* {data.moduleId === 37 ? (
                          
                            data.formType === 1 &&
                            data.formSpecPermission === true ? (
                              data.formAddPermission ? (
                                <Typography sx={{ color: "green" }}>
                                  {data.moduleName}
                                </Typography>
                              ) : (
                                <Typography sx={{ color: "yellow" }}>
                                  {data.moduleName}
                                </Typography>
                              )
                            ) : data.employeeAccessSettings ? (
                              <Typography sx={{ color: "pink" }}>
                                {data.moduleName}
                              </Typography>
                            ) : (
                              <Typography sx={{ color: "blue" }}>
                                {data.moduleName}
                              </Typography>
                            )
                          ) : null} */}
                          {/* If moduleId is not 37, it renders nothing */}
                          {/* {data.moduleId === 37 &&
                          data.formType === 1 &&
                          data.formSpecPermission === true ? (
                            data.formAddPermission ? (
                              <Typography>{data.moduleName}</Typography>
                            ) : (
                              <Typography>{data.moduleName}</Typography>
                            )
                          ) : data.employeeAccessSettings ? (
                            <Typography sx={{ color: "pink" }}>
                              {data.moduleName}
                            </Typography>
                          ) : (
                            <Typography sx={{ color: "blue" }}>
                              {" "}
                              {data.moduleName}
                            </Typography>
                          )} */}
                          {data.moduleId === 37 &&
                            workSpecsDataMenu
                              .filter(
                                (eachWorkData) =>
                                  eachWorkData.customEntitySpecId ===
                                  data.customEntitySpecId
                              )
                              .map((eachWorkData) => (
                                <Stack sx={{ mt: 1 }} key={eachWorkData.id}>
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
                                        width: "100%",
                                        px: { sm: 2, xs: 1 },
                                        py: 0.5,
                                        gap: 0.5,
                                        borderRadius: "4px",
                                      }}
                                    >
                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            flexGrow: 1,
                                            fontSize: {
                                              sm: "14px",
                                              xs: "10px",
                                            },
                                          }}
                                        >
                                          You need to do:
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
                                                eachWorkData.tasks.todo
                                                  .personal === 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          >
                                            {eachWorkData.tasks.todo.personal}
                                          </Typography>
                                          <NavigateNextIcon
                                            sx={{
                                              color:
                                                eachWorkData.tasks.todo
                                                  .personal === 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          />
                                        </Stack>
                                      </Stack>

                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            flexGrow: 1,
                                            fontSize: {
                                              sm: "14px",
                                              xs: "10px",
                                            },
                                          }}
                                        >
                                          Team needs to do:
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
                                                eachWorkData.tasks.todo.team ===
                                                0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          >
                                            {eachWorkData.tasks.todo.team}
                                          </Typography>
                                          <NavigateNextIcon
                                            sx={{
                                              color:
                                                eachWorkData.tasks.todo.team ===
                                                0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          />
                                        </Stack>
                                      </Stack>

                                      <Stack
                                        sx={{
                                          flexDirection: "row",
                                          justifyContent: "space-between",
                                          width: "100%",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: {
                                              sm: "14px",
                                              xs: "10px",
                                            },
                                          }}
                                        >
                                          No progress tasks:
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
                                                eachWorkData.tasks
                                                  .noProgress === 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          >
                                            {eachWorkData.tasks.noProgress}
                                          </Typography>
                                          <NavigateNextIcon
                                            sx={{
                                              color:
                                                eachWorkData.tasks
                                                  .noProgress === 0
                                                  ? "green"
                                                  : "red",
                                              fontSize: {
                                                sm: "14px",
                                                xs: "10px",
                                              },
                                            }}
                                          />
                                        </Stack>
                                      </Stack>
                                    </Stack>
                                  </Stack>
                                </Stack>
                              ))}
                          {data.moduleId === 36 && (
                            <Stack
                              direction="row"
                              sx={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                gap: 1,
                                mt: 1,
                              }}
                            >
                              {approvalCards.map((card, index) => (
                                <React.Fragment key={index}>
                                  <Stack
                                    sx={{
                                      // border: "1px solid #EEEEEE",
                                      flexGrow: { sm: 1, xs: 12 },
                                      width: { xs: "250px", sm: "auto" },
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
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: { sm: "14px", xs: "10px" },
                                      }}
                                    >
                                      {card.count}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: { sm: "14px", xs: "10px" },
                                      }}
                                    >
                                      {card.label}
                                    </Typography>
                                  </Stack>

                                  {index !== approvalCards.length - 1 && (
                                    <Divider
                                      orientation="vertical"
                                      flexItem
                                      sx={{
                                        alignSelf: "center",
                                        height: "50px",
                                        borderColor: "#e0e0e0",
                                      }}
                                    />
                                  )}
                                </React.Fragment>
                              ))}
                            </Stack>
                          )}{" "}
                        </>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
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
