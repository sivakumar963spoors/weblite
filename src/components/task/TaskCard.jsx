import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Divider, Stack, Typography } from "@mui/material"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlueCustomersIcon from '../../assets/menu_svg_filled/Blue/Customers.svg';
import KnowledgeBaseIcon from '../../assets/menu_svg_filled/Blue/Knowledge_Base.svg';
import WorkActionFormIcon from '../../assets/menu_svg_filled/Blue/Work_Action_form.svg';

import FormsIcon from "../../assets/menu_svg_filled/Forms.svg";
import { getData } from "../../redux/slices/ActionRequiredSlice";
import CustomButton from "../reusablecomponents/CustomButton";
import { cardData, workSpecsData } from "./TaskData";

const TaskCard = () => {



  

  return (
    <>
      <Stack gap={2} sx={{}}>

        {cardData
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((data, index) => (
            <Stack
              key={index}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Stack
                sx={{
                  width: { sm: "90%", xs: "91%" },
                  bgcolor: "#FFF",
                  borderRadius: "4px",
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
                          <img
                            src={FormsIcon}
                            alt="Forms Icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                        ) : data.moduleId === 34 ? (
                          <img
                            src={WorkActionFormIcon}
                            alt="Work Action Form"
                            style={{ width: "24px", height: "24px" }}
                          />
                        ) : data.moduleId === 9 ? (
                          <img
                            src={BlueCustomersIcon}
                            alt="Customers Icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                        ) : data.moduleId === 12 ? (
                          <img
                            src={KnowledgeBaseIcon}
                            alt="Knowledge Base Icon"
                            style={{ width: "24px", height: "24px" }}
                          />
                        ) : (
                          <HelpOutlineIcon />
                        )}
                        <Typography
                          sx={{
                            fontWeight: { sm: 600, xs: 100 },
                            fontSize: { xs: "13px" },
                          }}
                        >
                          {data.moduleName}
                        </Typography>
                      </React.Fragment>
                    </Stack>

                    <Stack
                      sx={{ flexDirection: "row", gap: 1, fontSize: "13px" }}
                    >
                      <CustomButton
                        title={"show all"}
                        size={"small"}
                        sx={{
                          fontSize: "13px",
                          padding: "4px 8px",
                          minWidth: "auto",
                        }}
                      />
                      {[37, 36, 34, 9, 17].includes(data.moduleId) && (
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
                              }}
                            >
                              <Stack
                                sx={{
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Typography sx={{ flexGrow: 1 }}>
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
                                }}
                              >
                                <Typography sx={{ flexGrow: 1 }}>
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
                                <Typography sx={{ flexGrow: 1 }}>
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
                                <Typography sx={{ flexGrow: 1 }}>
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
                                // backgroundColor: '#f9f9f9',
                              }}
                            >
                              <Typography>No progress tasks:</Typography>
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
                </Stack>
              </Stack>
            </Stack>
          ))}
      </Stack>
    </>
  );
};

export default TaskCard;
