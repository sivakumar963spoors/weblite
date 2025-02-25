import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlueCustomersIcon from "../../assets/menu_svg_filled/Blue/Customers.svg";
import FormsIcon from "../../assets/menu_svg_filled/Blue/Forms.svg";
import KnowledgeBaseIcon from "../../assets/menu_svg_filled/Blue/Knowledge_Base.svg";
import WorkActionFormIcon from "../../assets/menu_svg_filled/Blue/Work_Action_form.svg";
import { toggleMenuTitle } from "../../redux/slices/MenuSlice";
import CustomButton from "../reusablecomponents/CustomButton";
import { cardData, workSpecsData } from "./TaskData";

const TaskCard = () => {
  const { CustomerModuleMenu } = useSelector((state) => state.CustomerModule);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigateToShowAlldModule = (moduleId) => {
    let title = "Show All";
    switch (moduleId) {
      case 12:
        title = "Knowledge Base";
        dispatch(toggleMenuTitle(title));
        navigate("knowledgebase");
        break;
      case 9:
        title = "All Customers";
        dispatch(toggleMenuTitle(title));
        navigate("/Allcustomers");
        break;

      case 1000 :
      title ="Leaves" ;
      dispatch(toggleMenuTitle(title));
      navigate("/view/leaves/new?viewType=2&leaveMenuType=2");
      
      default:
        console.log("No data");
    }
  };

  const handleNavigationForDatKnoweledgeBaseView = (id) => {
    switch (id) {
      case 0:
        navigate(`/knowledgebase/${id}`);
        break;
      case 1:
        navigate(`/knowledgebase/${id}`);
        break;
      case 2:
        navigate(`/knowledgebase/${id}`);
        break;
      default:
        console.log("no data");
    }
  };
  const handlenavigationToCustomerModules = (id) => {
    switch (id) {
      case 0:
        navigate(`/customers/viewtype/${id}`);
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
  return (
    <Box sx={{ bgcolor: "#DDDBDB", m: 1 }}>
      <Stack gap={2} sx={{ mt: "15px", pt: 1 }}>
        {cardData
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((data, index) => (
            <Stack
              key={index}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Stack
                sx={{
                  width: { sm: "80%", xs: "95%" },
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
                      <React.Fragment>
                        {data.moduleId === 37 ? (
                          <Box
                            component={"img"}
                            src={FormsIcon}
                            alt="Forms Icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                        ) : data.moduleId === 34 ? (
                          <Box
                            component={"img"}
                            src={WorkActionFormIcon}
                            alt="Work Action Form"
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
                        ) : (
                          <HelpOutlineIcon />
                        )}
                        <Typography
                          sx={{
                            fontWeight: { sm: 600, xs: 400 },
                            fontSize: { xs: "13px" },
                          }}
                        >
                          {data.moduleName}
                        </Typography>
                      </React.Fragment>
                    </Stack>

                    <Stack
                      sx={{
                        flexDirection: { sm: "row", xs: "column" },
                        gap: { sm: 1, xs: 0.5 },
                        fontSize: "13px",
                      }}
                    >
                      <CustomButton
                        title="show all"
                        size="small"
                        sx={{
                          fontSize: "13px",
                          padding: "4px 8px",
                          minWidth: "auto",
                        }}
                        onClick={() => navigateToShowAlldModule(data.moduleId)}
                      />
                      {[37, 36, 34, 17, 1000].includes(data.moduleId) && (
                        <CustomButton
                          title={"Add"}
                          startIcon={<AddIcon />}
                          size={"small"}
                          sx={{
                            fontSize: "13px",
                            padding: "4px 8px",
                            minWidth: "auto",
                          }}
                        />
                      )}
                    </Stack>
                  </Stack>
                  <Divider sx={{ width: "100%", height: "10px" }} />
                  {data.moduleId === 34 &&
                    workSpecsData
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
                                gap: 1,
                                width: "100%",
                                padding: 1,
                                borderRadius: "4px",
                                fontFamily: '"Poppins", sans-serif',
                              }}
                            >
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  fontFamily: '"Poppins", sans-serif',
                                }}
                              >
                                <Typography
                                  sx={{
                                    flexGrow: 1,
                                    fontSize: "13px",
                                    fontFamily: '"Poppins", sans-serif',
                                  }}
                                >
                                  You need to do:
                                </Typography>
                                <Typography
                                  sx={{
                                    color:
                                      eachWorkData.tasks.todo.personal === 0
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {eachWorkData.tasks.todo.personal}
                                </Typography>
                              </Stack>

                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  fontFamily: '"Poppins", sans-serif',
                                }}
                              >
                                <Typography
                                  sx={{
                                    flexGrow: 1,
                                    fontSize: "13px",
                                    fontFamily: '"Poppins", sans-serif',
                                  }}
                                >
                                  Team needs to do:
                                </Typography>
                                <Typography
                                  sx={{
                                    color:
                                      eachWorkData.tasks.todo.team === 0
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {eachWorkData.tasks.todo.team}
                                </Typography>
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
                                    fontSize: "13px",
                                    fontFamily: '"Poppins", sans-serif',
                                  }}
                                >
                                  Invitations need your action:
                                </Typography>
                                <Typography
                                  sx={{
                                    color:
                                      eachWorkData.tasks.invitations
                                        .personal === 0
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {eachWorkData.tasks.invitations.personal}
                                </Typography>
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
                                    fontSize: "13px",
                                    fontFamily: '"Poppins", sans-serif',
                                  }}
                                >
                                  Team has invitations to process:
                                </Typography>
                                <Typography
                                  sx={{
                                    color:
                                      eachWorkData.tasks.invitations.team === 0
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  {eachWorkData.tasks.invitations.team}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack
                              sx={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                                width: "100%",
                                padding: 1,
                                borderRadius: "4px",
                                fontSize: "13px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontFamily: '"Poppins", sans-serif',
                                }}
                              >
                                No progress tasks:
                              </Typography>
                              <Typography
                                sx={{
                                  color:
                                    eachWorkData.tasks.noProgress === 0
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {eachWorkData.tasks.noProgress}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      ))}
                  {data.moduleId === 12 && (
                    <Stack
                      sx={{
                        width: "100%",
                        flexDirection: { sm: "row", xs: "column" },
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      {["Total count", "Total viewed", "Total unviewed"].map(
                        (label, index) => (
                          <Stack
                            key={index}
                            sx={{
                              border: "1px solid #EEEEEE",
                              flexGrow: { sm: 1, xs: 12 },
                              width: { xs: "250px", sm: "auto" },

                              textAlign: "center",
                              borderRadius: "5px",
                              py: 4,
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              handleNavigationForDatKnoweledgeBaseView(index)
                            }
                          >
                            <Typography
                              sx={{
                                fontFamily: '"Poppins", sans-serif',
                                fontSize: "14px",
                              }}
                            >
                              {label}
                            </Typography>
                          </Stack>
                        )
                      )}
                    </Stack>
                  )}

                  {data.moduleId === 1000 &&
                    [
                      { id: "pending your manager approval", count: 0 },
                      { id: "awaiting your approval", count: 1 },
                      { id: "awaiting team approval", count: 2 },
                    ].map((eachWorkData, i) => (
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
                              padding: 1,
                              borderRadius: "4px",
                              fontFamily: '"Poppins", sans-serif',
                            }}
                          >
                            <Stack
                              sx={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                fontFamily: '"Poppins", sans-serif',
                              }}
                            >
                              <Typography
                                sx={{
                                  flexGrow: 1,
                                  fontSize: "13px",
                                  fontFamily: '"Poppins", sans-serif',
                                }}
                              >
                              {eachWorkData.id}
                              </Typography>
                              <Typography
                                sx={{
                                  color:
                                    eachWorkData.count === 0 ? "green" : "red",
                                }}
                              >
                                {eachWorkData.count}
                              </Typography>
                            </Stack>
                          </Stack>

                       
                        </Stack>
                      </Stack>
                    ))}

                  {data.moduleId === 9 && (
                    <Stack>
                      <Stack
                        sx={{
                          width: "100%",
                          flexDirection: { sm: "row", xs: "column" },
                          alignItems: "center",
                          justifyContent: "space-evenly",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        {CustomerModuleMenu.slice(0, 3).map((label, index) => (
                          <>
                            <Stack
                              key={index}
                              sx={{
                                border: "1px solid #EEEEEE",
                                flexGrow: { sm: 1, xs: 12 },
                                width: { xs: "250px", sm: "auto" },

                                textAlign: "center",
                                borderRadius: "5px",
                                py: 4,
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handlenavigationToCustomerModules(label.id)
                              }
                            >
                              <Typography
                                sx={{
                                  color: label.count > 0 ? "green" : "red",
                                  fontWeight: "bold",
                                }}
                              >
                                {label.count}
                              </Typography>
                              <Typography
                                sx={{
                                  fontFamily: '"Poppins", sans-serif',
                                  fontSize: "14px",
                                }}
                              >
                                {label.title}
                              </Typography>
                            </Stack>
                          </>
                        ))}
                      </Stack>
                      <Stack>
                        {CustomerModuleMenu.slice(3, 9).map((label, index) => (
                          <>
                            <Stack
                              key={index}
                              sx={{
                                width: { xs: "250px", sm: "auto" },
                                borderRadius: "5px",
                                cursor: "pointer",
                                py: 0.9,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                px: 1,
                              }}
                              onClick={() =>
                                handlenavigationToCustomerModules(label.id)
                              }
                            >
                              <Typography
                                sx={{
                                  fontSize: "13px",
                                  fontFamily: '"Poppins", sans-serif',
                                }}
                              >
                                {label.title}
                              </Typography>
                              <Typography
                                sx={{
                                  color: label.count > 0 ? "green" : "red",
                                }}
                              >
                                {label.count}
                              </Typography>
                            </Stack>
                          </>
                        ))}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          ))}
      </Stack>
    </Box>
  );
};

export default TaskCard;
