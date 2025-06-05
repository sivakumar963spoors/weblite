import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { GetcustomerActivity_data } from "../../../redux/slices/CustomerModule";

const ViewActivity = () => {
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const { customerActivity_data, isGetcustomerActivity_data } = useSelector(
    (state) => state.CustomerModule
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (customerId) {
      dispatch(GetcustomerActivity_data({ customerId }));
    }
  }, [dispatch]);

  return (
    <div>
      <Box sx={{ mt: 9, background: "#F0F3FA" }}>
        <Stack
          sx={{
            alignItems: "center",
            height: "100vh",
          }}
        >
          {isGetcustomerActivity_data ? (
            <Typography>Loading acitivities details .....</Typography>
          ) : (
            <>
              {customerActivity_data && (
                <Stack
                  sx={{
                    width: "95%",
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    py: 1,
                    px: 1,
                    marginTop: -2,
                    mb: 3,
                    zIndex: 1000,
                    border: "1px solid #C9C9C9",
                    "& > *": {
                      fontSize: { sm: "14px", xs: "12px" },
                      fontWeight: { sm: 600, xs: 500 },
                    },
                    position: "fixed",
                  }}
                >
                  <Typography>
                    {customerActivity_data?.customer?.customerName}
                  </Typography>
                  <Typography>
                    {customerActivity_data?.customerActivitiesCount === 0 ||
                    customerActivity_data?.customerActivitiesCount === 1
                      ? `${customerActivity_data?.customerActivitiesCount} Activity`
                      : `${customerActivity_data?.customerActivitiesCount} Activities`}
                  </Typography>
                </Stack>
              )}
              <Stack sx={{ mt: 2, width:'100%', alignItems:'center', justifyContent:'center' }}>
                {customerActivity_data?.customerActivities?.length > 0 ? (
                  customerActivity_data?.customerActivities?.map(
                    (activity,index) => (
                      <Stack
                        
                        key={activity.customerId}
                        sx={{
                          width: {sm:'95%', xs:'95%'},

                          borderRadius: 2,
                          mt: 2,
                          border: "1px  solid #E3E3E3",
                          borderRadius: "8px",
                          background: "#FFFFFF",
                          px: 1,
                          py: 3,
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#24A68A !important",
                            fontSize: "10px",
                            textTransform: "uppercase",
                            fontWeight: 400,
                          }}
                        >
                          COMPLETED ACTIVITY
                        </Typography>
                        <Typography
                          sx={{
                            color: "#011D45",
                            fontSize: "14px",
                            fontWeight: 600,
                            textTransform: "uppercase",
                          }}
                        >
                          {activity.activityName}
                        </Typography>

                        {activity.customerActivityEventDatas?.length > 0 ? (
                          activity.customerActivityEventDatas.map(
                            (eachEvent) => (
                              <Stack key={activity.formId} sx={{}}>
                                <Typography sx={{ color: "#3385ff" }}>
                                  {activity.activityName}
                                </Typography>
                                <Typography sx={{ color: "#011D45" }}>
                                  {eachEvent.time}
                                </Typography>
                              </Stack>
                            )
                          )
                       ) : (
                          <Typography variant="body2">
                            No events found
                          </Typography>
                        )}
                      </Stack>
                    )
                  )
                ) : (
                  <>
                    <Stack
                      sx={{
                        width: "90%",
                        background: "#FFF",
                        mt: 4,
                        py: 1,
                        borderRadius: "5px",
                        border: "1px solid #C9C9C9",
                      }}
                    >
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: { sm: "14px", xs: "12px" },
                        }}
                      >
                        No data found
                      </Typography>
                    </Stack>{" "}
                  </>
                )}
                  <br></br>
              <br></br>
              <br></br>
              <br></br>
              </Stack>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            
            </>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default ViewActivity;
