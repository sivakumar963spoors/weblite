import {
  Autocomplete,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalstyle } from "../../../styles/GlobalCss";
import { customer_type } from "../../formdata/AllFormDataTypes";
const DayPlanReport = () => {
  const [OpenToDatePicker, setOpenToDatePicker] = useState(false);
  const [OpenDatePicker, setOpenDatePicker] = useState(false);
  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);
  const nav = useNavigate();
  const handleReportsBasednModule = () => {
nav(`/service/send/dayPlanReport/xls`)

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
          width: { sm: "800px", xs: "310px" },
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
              employees :
            </Typography>

            <Autocomplete
              sx={globalstyle.autoCompleteSelect}
              options={customer_type}
              renderInput={(params) => (
                <TextField {...params} label="Select employees" />
              )}
            />
          </Stack>
          <Stack>
            <Typography
              sx={{ fontSize: { sm: "12px", xs: "10px" }, fontWeight: "600" }}
            >
              date :
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
          <Button variant="outlined" onClick={handleReportsBasednModule}>
            load
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DayPlanReport;
