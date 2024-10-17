import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CustomButton from "../reusablecomponents/CustomButton";
import { cardData } from "./TaskData";
const TaskCard = () => {
  return (
    <>
      <Stack gap={2} sx={{ bgcolor: "#F9F9F9" }}>
        {cardData.map((data, index) => (
          <Stack
            key={index}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Stack
              sx={{
                width: {sm:'90%', xs:'95%'},
                bgcolor: "#FFF",
                borderRadius: "4px",
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
                  <Stack sx={{ flexDirection: "row", gap: 1,justifyContent:'center', alignItems:'center' }}>
                    {data.isForm && data.isPublicForm && (
                      <Typography>
                        <PeopleIcon />
                      </Typography>
                    )}
                    {data.isForm && data.isPrivateForm && (
                      <Typography>
                        <AccountCircleIcon />
                      </Typography>
                    )}
                    <Typography sx={{ fontWeight: {sm:600, xs:100} , fontSize:{xs:'13px'}}}>
                      {data.title}
                    </Typography>
                  </Stack>
                  
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <CustomButton title={"show all"} size={"small"}/>
                {data.isForm&&   <CustomButton title={"Add"} startIcon={<AddIcon />} />}
                  </Stack>
                </Stack>
                <Divider sx={{ width: "100%" , height:'10px'}} />
                {data.resposedata && (
                  <Stack
                    sx={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",

                      flexWrap: "wrap",
                      gap: 1,
                      textTransform:'capitalize', mt:1
                    }}
                  >
                    {data.resposedata.map((eachresposedata) => (
                      <Stack
                        key={eachresposedata.cardTitle}
                        spacing={1}
                        sx={{
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          padding: 1,
                          textAlign: "center",
                          borderRadius: "4px",
                          width: "300px",
                          cursor:'pointer',
                          '&:hover':{
                            bgcolor:'#F9F9F9'
                          }
                          
                        }}
                      >
                        <Typography>{eachresposedata.count}</Typography>
                        <Typography>{eachresposedata.cardTitle}</Typography>
                      </Stack>
                    ))}
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
