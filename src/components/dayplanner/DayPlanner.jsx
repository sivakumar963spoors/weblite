import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetch_getDayPlanCustomerUrl } from "../../redux/slices/DayPalneModule";
const DayPlanner = () => {
  const [value, setValue] = React.useState(dayjs());
  const navigation = useNavigate();
  const { DayPlanCustomer, isDayPlanCustomer } = useSelector(
    (state) => state.DayPlannerModule
  );
  const dispatch = useDispatch();
  const handleNavToDaypalnCreation = (selectedDate) => {
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    navigation(`/dayPlan/creation?selectedDate=${formattedDate}`);
  };

  useEffect(() => {
    dispatch(fetch_getDayPlanCustomerUrl());
  }, [dispatch]);
  return (
    <Box sx={{ mt: 10 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["DateCalendar", "DateCalendar"]}
          sx={{
            display: "flex",
            alignItems: "center",

            height: "450px",
          }}
        >
          <DemoItem sx={{ border: "3px solid" }}>
            <DateCalendar
              slotProps={{
                calendarHeader: {
                  sx: {
                    position: "relative",
                    "& .MuiPickersArrowSwitcher-root": { width: 0 },
                    "& .MuiPickersCalendarHeader-labelContainer": {
                      margin: "auto",
                    },
                    "& .MuiIconButton-edgeEnd": {
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                    },
                    "& .MuiIconButton-edgeStart": {
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                    },
                  },
                },
                day: {
                  sx: {},
                },
              }}
              value={value}
              onChange={(newValue) => setValue(newValue)}
              format="dddd, DD MMMM YYYY" // "Monday, 03 March 2025"
              sx={{
                width: { sm: "450px", xs: "300px" },
                minHeight: { sm: "400px", xs: "420px" }, // Use minHeight instead of height for flexibility

                boxShadow: "0 7px 30px -10px rgba(150, 170, 180, 0.5)",
                "& .MuiDayCalendar-slideTransition": {
                  minHeight: "500px", // Increase calendar transition height
                },
                "& .MuiPickersDay-root": {
                  height: { sm: "40px", xs: "50px" }, // Increase day height
                  width: "40px",
                  borderRadius: "10px",
                },
                "& .Mui-selected": {
                  color: "#fff",
                  backgroundColor: "#000",
                  boxShadow: "0 3px 15px -5px var(--cal-color-primary)",
                  borderColor: "#FFF",
                },
              }}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>

      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Stack
          sx={{ width: "80%", border: "1px solid #000", textAlign: "center" }}
        >
          <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
            Day Plan details
          </Typography>
          <Typography>
            <CalendarTodayIcon sx={{ fontSize: "10px" }} />
            <Typography component={"span"} sx={{ fontSize: "12px" }}>
              {" "}
              {value.format("dddd, DD MMMM YYYY")}
            </Typography>
          </Typography>

          {isDayPlanCustomer ? (
            <Typography>Loading...</Typography>
          ) : (
            <>
              {DayPlanCustomer && DayPlanCustomer?.dayPlannerDetails ? (
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 1,
                    gap: 2,
                  }}
                >
                  <Stack sx={{ flexDirection: "row" }}>
                    <PersonIcon sx={{ fontSize: "19px" }} />

                    <Stack>
                      <Typography sx={{ fontSize: "10px" }}>
                        {
                          DayPlanCustomer?.dayPlannerDetails
                            ?.dayplanCustomerCount
                        }
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "10px" }}>
                        customer
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ flexDirection: "row" }}>
                    <EventAvailableIcon
                      sx={{ color: "green", fontSize: "19px" }}
                    />

                    <Stack>
                      <Typography sx={{ fontSize: "10px" }}>
                        {DayPlanCustomer.checkInCount}
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "10px" }}>checkin</Typography>
                    </Stack>
                  </Stack>
                  <Stack sx={{ flexDirection: "row" }}>
                    <EventBusyIcon sx={{ color: "red", fontSize: "19px" }} />

                    <Stack>
                      <Typography sx={{ fontSize: "10px" }}>
                        {DayPlanCustomer.checkOutCount}
                      </Typography>{" "}
                      <Typography sx={{ fontSize: "10px" }}>
                        checkout
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ) : (
                <Typography>No data found</Typography>
              )}
            </>
          )}
        </Stack>
        <Stack sx={{ width: "80%", textAlign: "center" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ my: 3 }}
            onClick={() => handleNavToDaypalnCreation(value)}
          >
            create
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DayPlanner;
