import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalstyle } from "../../../styles/GlobalCss";

const SignInSignOutReport = () => {
  const [OpenToDatePicker, setOpenToDatePicker] = useState(false);

  const { mobileReportTitle } = useSelector(
    (state) => state.MobileReportsModule
  );

  const [title] = useState(mobileReportTitle);
  const nav = useNavigate();
  const handleReportsBasednModule = (report) => {
    nav(
      `/service/report/employee/signin/signout/details/124462?date=2025-04-23&reportType=${report}&actionToken=52a21d58b1f2a8fe484b7f0e297dffeeda58d242c35815a74990d12c6ce3a390`
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
          <TableContainer
            sx={{
              overflowX: "auto",
            }}
          >
            <Table
              sx={{
                minWidth: 1090,
                border: "1px solid #ddd",
                "& .MuiTableCell-root": {
                  border: "1px solid #ddd",
                },
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>attendance status</TableCell>
                  <TableCell> count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>not signed-in</TableCell>
                  <TableCell
                    onClick={() => handleReportsBasednModule(1)}
                    sx={{ cursor: "pointer" }}
                  >
                    1
                  </TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell> signed-in</TableCell>
                  <TableCell sx={{ cursor: "pointer" }}>0</TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell> signed-out</TableCell>
                  <TableCell sx={{ cursor: "pointer" }}>0</TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell>on leave</TableCell>
                  <TableCell sx={{ cursor: "pointer" }}>0</TableCell>
                </TableRow>{" "}
                <TableRow>
                  <TableCell>action pending</TableCell>
                  <TableCell
                    onClick={() => handleReportsBasednModule(2)}
                    sx={{ cursor: "pointer" }}
                  >
                    1
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignInSignOutReport;
