import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { globalstyle } from "../../styles/GlobalCss";

const EmployeeReport = () => {
  const [searchParams] = useSearchParams();
  const isToday = searchParams.get("isToday");
  const [OpenToDatePicker, setOpenToDatePicker] = useState(false);
  const [OpenDatePicker, setOpenDatePicker] = useState(false);

  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);
  const nav = useNavigate();

  const handleReportsBasednModule = () => {
    nav("/mobile/reports/empActivityReport");
  };
  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          background: "#FFF",
          boxShadow: "rgb(100 100 100 / 20%) 0px 0px 11px 0px",
          width: { sm: "95%", xs: "310px" },
          mt: 5,
          borderRadius: "15px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            py: 2,
            background: "blue",
            color: "#fff",
            borderStartEndRadius: "15px",
            borderStartStartRadius: "15px",
            fontSize: { sm: "12px", xs: "10px", fontWeight: "550" },
          }}
        >
          {title}
        </Typography>
        {isToday === "true" && <Typography sx={{textAlign:'center', p:1}}>no data found</Typography>}
        {isToday === "false" && (
          <Stack
            sx={{
              gap: 1.5,
              px: 1,
              pb: 7,
              pt: 4,
            }}
          >
            <Stack>
              <Typography
                sx={{ fontSize: { sm: "12px", xs: "10px" }, fontWeight: "600" }}
              >
                activities :
              </Typography>
              <TextField />
            </Stack>
            <Stack>
              <Typography
                sx={{ fontSize: { sm: "12px", xs: "10px" }, fontWeight: "600" }}
              >
                from date :
              </Typography>
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack
                    sx={{
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <DatePicker
                      // value={leaveData.fromDate}
                      // onChange={(newValue) => handleChange("fromDate", newValue)}
                      open={OpenDatePicker}
                      onOpen={() => setOpenDatePicker(true)}
                      onClose={() => setOpenDatePicker(false)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          onClick: () => setOpenDatePicker(true),
                        },
                      }}
                      label="Please Select Date"
                      sx={globalstyle.datepicker}
                    />
                  </Stack>
                </LocalizationProvider>
              </>
            </Stack>
            <Stack>
              <Typography
                sx={{ fontSize: { sm: "12px", xs: "10px" }, fontWeight: "600" }}
              >
                To date :
              </Typography>
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack
                    sx={{
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <DatePicker
                      label="Please Select Date"
                      ////  value={leaveData.toDate}
                      //  onChange={(newValue) => handleChange("toDate", newValue)}
                      sx={globalstyle.datepicker}
                      open={OpenToDatePicker}
                      onOpen={() => setOpenToDatePicker(true)}
                      onClose={() => setOpenToDatePicker(false)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          onClick: () => setOpenToDatePicker(true),
                        },
                      }}
                    />
                  </Stack>
                </LocalizationProvider>
              </>
            </Stack>
            <Typography
              sx={{ color: "tomato", fontSize: "10px", fontWeight: "bold" }}
            >
              Note: You can search for duration of past 6 months only
            </Typography>
            <Button variant="outlined" onClick={handleReportsBasednModule}>
              load
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default EmployeeReport;
