import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work"; // Import Work Icon
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
                width: { sm: "90%", xs: "95%" },
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
                  <Stack
                    sx={{
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                  
                    {data.moduleId === 37 &&data.formType === 1 ? (
                      <Typography>
                        <WorkIcon />
                      </Typography>
                    ) : (
                      <>
                        {data.moduleId === '9'  && (
                          <Typography>
                            <PeopleIcon />
                          </Typography>
                        )}
                       
                      </>
                    )}
                    <Typography
                      sx={{
                        fontWeight: { sm: 600, xs: 100 },
                        fontSize: { xs: "13px" },
                      }}
                    >
                      {data.moduleName}
                    </Typography>
                  </Stack>

               
                  <Stack sx={{ flexDirection: "row", gap: 1 }}>
                    <CustomButton title={"show all"} size={"small"} />
                    {data.isForm && (
                      <CustomButton title={"Add"} startIcon={<AddIcon />} />
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
                  <Stack sx={{ mt: 1 }}>
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
                          <Typography sx={{ py: '1px' ,fontSize:'13px'}}>{stat.label}</Typography>
                          <Typography sx={{ color: stat.color }}>  {stat.value} </Typography> 
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                )}

                {data.isEmployee && (
                  <Stack sx={{ mt: 1 }}>
                    <Typography variant="subtitle2">
                      Employee Details
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Stack>
            <Typography>uhui</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default TaskCard;
// import React from 'react'
// import { cardData } from './TaskData'
// import { Stack, Typography } from '@mui/material'

// const TaskCard = () => {
//   return (
//     <div>
//       {cardData.map((each)=>
//       <Stack>
//         {each.moduleId  === 36 && <Typography>form data</Typography>}
//         {each.moduleId === 37 && <Typography>workSpe</Typography>}
//       </Stack>)}
//     </div>
//   )
// }

// export default TaskCard
