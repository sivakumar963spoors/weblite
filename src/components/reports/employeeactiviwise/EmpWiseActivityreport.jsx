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
const EmpWiseActivityreport = () => {
  const [OpenToDatePicker, setOpenToDatePicker] = useState(false);
  const [OpenDatePicker, setOpenDatePicker] = useState(false);
  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);
  const nav = useNavigate();
  const handleReportsBasednModule = () => {
    nav(
      "/service/employee/activity/wise/summary?dateType=1&empId=124462&actionToken=df6f96fb934559cf88bb2ff79d1442cc99285f373e6d1df6e143493874feedce&jwtToken=eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDUzOTIwMjUsInN1YiI6Im1vYmlsZS1yZXBvcnRzIiwiaXNzIjoiU3Bvb3JzIiwiZXhwIjoxNzQ1Mzk1NjI1fQ.Oc0FH8EY8rUOtUT0k_hWYWk5GsEAYKSMG_6EgMyKsec&empIds=136864&from=2025-03-06&to=2025-03-20&type=html&offset=-330"
    );
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
          borderRadius: "5px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            py: 2,
            background: "blue",
            color: "#fff",
            borderStartEndRadius: "5px",
            borderStartStartRadius: "5px",
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
            Note: Date range must be less than 31 days.
          </Typography>
          <Button variant="outlined" onClick={handleReportsBasednModule}>
            load
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmpWiseActivityreport;
