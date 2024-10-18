import AddIcon from "@mui/icons-material/Add";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import BlueCustomersIcon from '../../assets/menu_svg_filled/Blue/Customers.svg';
import KnowledgeBaseIcon from '../../assets/menu_svg_filled/Blue/Knowledge_Base.svg';
import WorkActionFormIcon from '../../assets/menu_svg_filled/Blue/Work_Action_form.svg';
import FormsIcon from "../../assets/menu_svg_filled/Forms.svg";
import CustomButton from "../reusablecomponents/CustomButton";
import { cardData } from "./TaskData";

const TaskCard = () => {
  return (
    <>
      <Stack gap={2} sx={{  mt:"15px"}}>
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
                        style={{ width: '24px', height: '24px' }} 
                      />
                        ) : data.moduleId === 9 ? (
                          <img
                          src={BlueCustomersIcon}
                          alt="Customers Icon"
                          style={{ width: '24px', height: '24px' }} 
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
                  {data.isForm && data.resposedata && (
                    <Stack
                      sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 1,
                        textTransform: "capitalize",
                        mt: 1,
                      }}
                    >
                      {data.resposedata.map((eachResposeData) => (
                        <Stack
                          key={eachResposeData.cardTitle}
                          spacing={1}
                          sx={{
                            border: "1px solid rgba(0, 0, 0, 0.12)",
                            padding: 1,
                            textAlign: "center",
                            borderRadius: "4px",
                            width: "300px",
                            cursor: "pointer",
                            "&:hover": { bgcolor: "#F9F9F9" },
                          }}
                        >
                          <Typography>{eachResposeData.count}</Typography>
                          <Typography>{eachResposeData.cardTitle}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  )}

                  {data.isWork && (
                    <Stack sx={{ mt: 1}}>
                      <Stack
                        sx={{
                          flexDirection: "row",
                          gap: 2,
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                        }}
                      >
                        {data.stats.map((stat, statIndex) => (
                          <Stack
                            key={statIndex}
                            sx={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 1,
                              width: "100%",
                              padding: 1,
                              borderRadius: "4px",
                            }}
                          >
                            <Typography sx={{ py: "1px", fontSize: "13px" }}>
                              {stat.label}
                            </Typography>
                            <Typography sx={{ color: stat.color }}>
                              {" "}
                              {stat.value}{" "}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>

          ))}

          </Stack>
      
      
    </>
  );
};

export default TaskCard;
